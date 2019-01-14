using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using VSTDesk.DB.Entities;
using VSTDesk.Models;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using VSTDesk.Common;
using Microsoft.Extensions.Options;

namespace VSTDesk.Data
{
    public class UserData : IUserData
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        AppSettings _appSettings;
        public UserData(ApplicationDbContext appDbContext, UserManager<ApplicationUser> userManager,IOptions<AppSettings> appSettings)
        {
            _appDbContext = appDbContext;
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        public async Task<List<UserModel>> GetUsers(string search)
        {
            List<ApplicationUser> userList;
            if (string.IsNullOrEmpty(search))
            {
                userList = await _userManager.Users.Where(x=>x.IsAdmin!=true).ToListAsync();
            }
            else
            { 
                userList =  _userManager.Users.ToList().Select(x=> new ApplicationUser() { Id = x.Id, IsAdmin = x.IsAdmin, LastName = x.LastName, FirstName = x.FirstName, ProfilePhoto = x.ProfilePhoto, PhoneNumber = x.PhoneNumber, Email = x.Email, UserName = $"{x.FirstName } { x.LastName}" }).Where(x => (x.UserName.Contains(search) || x.Email.Contains(search) || x.FirstName.Contains(search) || x.LastName.Contains(search) || x.UserName.ToLower().Contains(search.ToLower()) ) && x.IsAdmin!=true ).ToList();
            }

            var appName = _appDbContext.CompanySettings.FirstOrDefault().CompanyMessage;
            List<UserModel> userModel = new List<UserModel>();
            foreach (var item in userList)
            {
                UserModel user = new UserModel
                {
                    Id = item.Id,
                    Email = item.Email,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    PhoneNumber = item.PhoneNumber,
                    UserName = item.UserName,
                    ProfilePhoto = (!string.IsNullOrWhiteSpace(item.ProfilePhoto)) ? $"{_appSettings.FolderPath.Path}//{ item.ProfilePhoto}" : $"{_appSettings.FolderPath.Path}//noimage.gif",
                    AppName = appName
                };
                userModel.Add(user);
            }
            return userModel;
        }

        public async Task<bool> AddUserProjects(UserProjectsModel userProjectsModel)
        {
            List<UserAndProjects> userProjects = new List<UserAndProjects>();
            try
            {
                foreach (var item in userProjectsModel.ProjectId)
                {
                    UserAndProjects userProject = new UserAndProjects
                    {
                        ProjectId = item,
                        UserId = userProjectsModel.UserId
                    };
                    userProjects.Add(userProject);
                }
                _appDbContext.AddRange(userProjects);
                var results = await _appDbContext.SaveChangesAsync();
                return Convert.ToBoolean(results);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<bool> DeleteUserData(string id)
        {
            var userData = _appDbContext.Users.Where(x => x.Id == id).FirstOrDefault();
            if (userData != null)
            {
               var projectList = _appDbContext.UserAndProjects.Where(x => x.UserId == id).ToList();
                _appDbContext.RemoveRange(projectList);
                _appDbContext.Remove(userData);

                return _appDbContext.SaveChanges() > 0;
            }
            return false;

        }

        public async Task<bool> DeleteUserProjectData(string userId, int projectId)
        {
            List<UserAndProjects> userProjects = new List<UserAndProjects>();

            var deleteData = _appDbContext.UserAndProjects.Where(x => x.UserId == userId && x.ProjectId == projectId).FirstOrDefault();
            _appDbContext.Remove(deleteData);
            return await _appDbContext.SaveChangesAsync() > 0 ? true : false;

        }

        /// <summary>
        /// Get User Detail By User Id.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<UserModel> GetUserDetail(string userId)
        {

            var user = _userManager.Users.Where(x => x.Id == userId).FirstOrDefault();
            if (user == null)
            {
                return null;
            }

            else
            {
                return new UserModel()
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Id = user.Id,
                    PhoneNumber = user.PhoneNumber,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ProfilePhoto = $"{_appSettings.FolderPath.Path}//{user.ProfilePhoto}"
                };
            }
        }

        public async Task<UserAndPojectDetailModel> GetUserAddProjectDetail(string userId)
        {

            var user = _userManager.Users.Where(x => x.Id == userId).FirstOrDefault();
            var projects = _appDbContext.UserAndProjects.Where(u => u.UserId == user.Id).ToList();
            var allprojects = _appDbContext.Projects.OrderBy(p => p.Name).ToList();
            if (user == null)
            {
                return null;
            }

            else
            {
                var userAndProjects = new UserAndPojectDetailModel()
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Id = user.Id,
                    PhoneNumber = user.PhoneNumber,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ProfilePhoto = user.ProfilePhoto,

                };
                List<ProjectModel> listProjectModel = new List<ProjectModel>();
                foreach (var item in allprojects)
                {
                    ProjectModel project = new ProjectModel
                    {
                        Id = item.Id,
                        Name = item.Name,
                        IsSelected = (projects.Where(p => p.ProjectId == item.Id).ToList().Count > 0) ? true : false,
                    };
                    listProjectModel.Add(project);

                }
                userAndProjects.Projects.AddRange(listProjectModel);
                return userAndProjects;
            }
        }




        public async Task<bool> UpdateUserDetail(UserModel userModel)
        {
            var user =await _userManager.FindByIdAsync(userModel.Id);
            if(user != null)
            {
                user.FirstName = userModel.FirstName;
                user.LastName = userModel.LastName;
                user.PhoneNumber = userModel.PhoneNumber;
            }
            _appDbContext.Update(user);
            return await _appDbContext.SaveChangesAsync() > 0;

            //var users = _appDbContext.Users.Where(x => x.Id == userModel.Id).FirstOrDefault();
            //if (users != null)
            //{
            //   // users.UserName = userModel.UserName;
            //    users.Email = userModel.Email;
            //    users.PhoneNumber = userModel.PhoneNumber;

            //    _appDbContext.Update(users);
            //    return await _appDbContext.SaveChangesAsync() > 0 ? true : false;

            //}
            //return false;
        }

        public async Task<bool> UploadPhoto(UploadImageModel uploadImageModel)
        {

            var user = _userManager.FindByIdAsync(uploadImageModel.UserId).Result;
            if (user != null)
            {
                user.ProfilePhoto = uploadImageModel.FileName;
                _appDbContext.Update(user);
                return _appDbContext.SaveChanges() > 0;

            }
            return false;
        }

        public async Task<bool> UpdateUserAndProject(UserAndPojectDetailModel userAndPojectDetailModel)
        {
            var user = _userManager.FindByIdAsync(userAndPojectDetailModel.Id).Result;
            user.PhoneNumber = userAndPojectDetailModel.PhoneNumber;
            user.FirstName = userAndPojectDetailModel.FirstName.Trim();
            user.LastName = userAndPojectDetailModel.LastName.Trim();
            _appDbContext.Update(user);
            _appDbContext.SaveChanges();
            var userProjects = _appDbContext.UserAndProjects.Where(u => u.UserId == userAndPojectDetailModel.Id).ToList();
            _appDbContext.UserAndProjects.RemoveRange(userProjects);
            List <UserAndProjects> userAndProjects = new List<UserAndProjects>();
           
            foreach (var item in userAndPojectDetailModel.Projects)
            {
                if(item.IsSelected)
                {
                    userAndProjects.Add(new UserAndProjects() { UserId = userAndPojectDetailModel.Id, ProjectId = item.Id });
                }
                
            }
            _appDbContext.UserAndProjects.AddRange(userAndProjects);
            return _appDbContext.SaveChanges()>0;
        }

       

        public async Task<bool> ResetPassword(ResetPasswordModel resetPasswordModel)
        {
            ApplicationUser user = _userManager.FindByIdAsync(resetPasswordModel.UserId).Result;
            
            if (user != null)
            {
               var token = _userManager.GeneratePasswordResetTokenAsync(user).Result;
                IdentityResult result = _userManager.ResetPasswordAsync(user,token, resetPasswordModel.Password).Result;
                return result.Succeeded;
            }
            return false;
        }

      
    }
}
