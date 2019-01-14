using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using VSTDesk.Models;

namespace VSTDesk.Data
{
    public interface IUserData
    {
        Task<List<UserModel>> GetUsers(string search);
        Task<bool> AddUserProjects(UserProjectsModel userProjectsModel);
        Task<bool> DeleteUserData(string id);
        Task<bool> DeleteUserProjectData(string userId, int projectId);
        Task<UserModel> GetUserDetail(string userId);
        Task<bool> UpdateUserDetail(UserModel userModel);
        Task<bool> UploadPhoto(UploadImageModel uploadImageModel);
        Task<UserAndPojectDetailModel> GetUserAddProjectDetail(string userId);
        Task<bool> UpdateUserAndProject(UserAndPojectDetailModel userAndPojectDetailModel);
        Task<bool> ResetPassword(ResetPasswordModel resetPasswordModel);
    }
}
