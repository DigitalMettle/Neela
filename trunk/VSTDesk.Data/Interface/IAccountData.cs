using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using VSTDesk.Common;
using VSTDesk.Models;

namespace VSTDesk.Data
{
    public interface IAccountData
    {
        Task<bool> RegisterUser(RegisterModel registerModel);
        Task<bool> SendInvite(InviteCustomerModel inviteCustomerModel);
        string GetPersonalAccessToken();
        Task<Tuple<string, bool>> SendPasswordResetLink(string userName);
        Task<Tuple<bool,bool>> ResetPassword(ResetPasswordModel resetPasswordModel);
        Task<bool> AddAdminToken(VstTokenModel vstTokenModel , string userId);
        Task<bool> CheckUserIsUserExists(string userName);
        Task<bool> CheckUserByName(string userName);
        Task<bool> AddPassword(ResetPasswordModel resetPasswordModel);
        Task<CompanySettingsModel> GetCompanySettings();
        Task<bool> UploadPhoto(string filePath, string uploadedFileType);
        Task<bool> SetCompanySettings(CompanySettingsModel companySettingsModel);
        Task<Tuple<HttpStatusCode, Response<dynamic>>> GenerateTokenForVSTAdmin(VSTSMemberModel vstsMemberModel);
    }
}
