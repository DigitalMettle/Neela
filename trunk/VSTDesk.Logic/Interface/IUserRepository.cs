using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using VSTDesk.Models;

namespace VSTDesk.Logic
{ 
    public interface IUserRepository
    {
        Task<List<UserModel>> GetUsers(string search);
        Task<bool> AddUserProjects(UserProjectsModel userProjectsModel);
        Task<bool> RemoveUsers(string id);
        Task<bool> RemoveUserProjects(string userId, int projectId);
        Task<UserModel> GetUserDetail(string userId);
        Task<bool> UpdateUserDetail(UserModel userModel);
        Task<string> UploadImage(IFormFile formFile,string userId);
        Task<UserAndPojectDetailModel> GetUserAddProjectDetail(string userId);
        Task<bool> UpdateUserAndProject(UserAndPojectDetailModel userAndPojectDetailModel);
        Task<bool> ResetPassword(ResetPasswordModel resetPasswordModel);
        Task<List<UserModel>> GetAdminUsers();
    }
}
