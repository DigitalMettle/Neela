using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using VSTDesk.Api;
using VSTDesk.Common;
using VSTDesk.Data;
using VSTDesk.Models;

namespace VSTDesk.Logic
{
    public class UserRepository : IUserRepository
    {
        private readonly IUserData _userData;
        private readonly IDataRepository _dataRepository ;
        AppSettings _appSettings;
        public UserRepository(IUserData userData, IOptions<AppSettings> appSettings, IDataRepository dataRepository)
        {
            _userData = userData;
            _appSettings = appSettings.Value;
            _dataRepository=dataRepository;
        }

        public async Task<List<UserModel>> GetUsers(string search)
        {
            List<UserModel> userModel = new List<UserModel>();
            try
            {
                
                 userModel = await _userData.GetUsers(search);
               
            }
            catch(Exception)
            {

            }
            return userModel;
        }

        public async Task<bool> AddUserProjects(UserProjectsModel userProjectsModel)
        {
            return await _userData.AddUserProjects(userProjectsModel);
        }


        public async Task<bool> RemoveUsers(string id)
        {
           return await _userData.DeleteUserData(id);
           
        }

        public async Task<bool> RemoveUserProjects(string userId,int projectId)
        {
            return await _userData.DeleteUserProjectData(userId, projectId);
        }

        /// <summary>
        /// Get User Detail By User Id.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<UserModel> GetUserDetail(string userId)
        {
            return await _userData.GetUserDetail(userId);
        }

        public async Task<bool> UpdateUserDetail(UserModel userModel)
        {
            return await _userData.UpdateUserDetail(userModel);
        }

        public async Task<string> UploadImage(IFormFile formFile,string userId)
        {
            string filePath = _appSettings.FolderPath.Path;
            var path =$"{Environment.CurrentDirectory}\\{_appSettings.FolderPath.RootFolder}\\{_appSettings.FolderPath.Path}" ;
            string fileName = $"{userId}_{Guid.NewGuid()}.{formFile.FileName.Split('.')[1]}";
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            string[] files = Directory.GetFiles(path,$"{userId}*");
            if (files.Length > 0)
            {
                if (File.Exists($"{files[0]}"))
                {
                    File.Delete($"{files[0]}");
                }

            }


            var fileData =Utility.Upload(formFile,path, fileName);
            UploadImageModel uploadImageModel = new UploadImageModel()
            {
                FileName = fileData.FilePath,
                UserId = userId
            }; 
            if(fileData!=null)
            {
               bool isSuccess =await _userData.UploadPhoto(uploadImageModel);
                if(isSuccess)
                {
                    return $"{_appSettings.FolderPath.Path}/{fileData.FilePath}";
                }
            }
            return null;
           


        }

        public async Task<UserAndPojectDetailModel> GetUserAddProjectDetail(string userId)
        {
            return await _userData.GetUserAddProjectDetail(userId);
        }

        public async Task<bool> UpdateUserAndProject(UserAndPojectDetailModel userAndPojectDetailModel)
        {
            return await _userData.UpdateUserAndProject(userAndPojectDetailModel);
        }

        public async Task<bool> ResetPassword(ResetPasswordModel resetPasswordModel)
        {


            return await _userData.ResetPassword(resetPasswordModel);
        }

        public async Task<List<UserModel>> GetAdminUsers()
        {
            VSTSGroupsModel vstsGroups = await  _dataRepository.GetVSTSGroups();
            if (vstsGroups == null ||
                vstsGroups.Groups.Count(group => group.GroupName.ToString().ToLower() == _appSettings.VSTS.VSTSGroupName.ToLower()) == 0)
            {
                return null;
            }

            VSTSGroupModel vstsGroupModel = vstsGroups.Groups.Where(group => group.GroupName.ToString().ToLower() == _appSettings.VSTS.VSTSGroupName.ToLower()).FirstOrDefault();
            VSTSMembersResponseModel vstsMembersResponseModel = await _dataRepository.GetVSTSGroupMembers(vstsGroupModel);
            List<UserModel> userList = new List<UserModel>();
            vstsMembersResponseModel.members.ForEach(u=> {
                userList.Add(new UserModel() { FirstName = u.user.displayName, Email = u.user.mailAddress });
            });
            return userList;
        }
    }
}
