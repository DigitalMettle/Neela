using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using VSTDesk.Common;
using VSTDesk.Models;

namespace VSTDesk.Logic
{
    public interface IAccountRepository
    {
        Task<bool> RegisterUser(RegisterModel registerModel);
        Task<bool> SendInvite(InviteCustomerModel inviteCustomerModel);
        Task<Tuple<string, bool>> SendPasswordResetLink(string userName);
        Task<Tuple<bool,bool>> ResetPassword(ResetPasswordModel resetPasswordModel);
        Task<Tuple<HttpStatusCode, Response<dynamic>>> GenerateTfsToken(TokenModel tokenMOdel,string userId);
        Task<bool> CheckUserIsUserExists(string userName);
        Task<bool> CreatePasswordAsync(ResetPasswordModel resetPasswordModel);
        Task<bool> CheckUserByName(string userName);
        Task<CompanySettingsModel> GetCompanySettings();
        Task<string> UploadImage(IFormFile files, string userId, string type);
        Task<bool> SetCompanySettings(CompanySettingsModel companySettingsModel);
        String GenerateAuthorizeUrl();
    }
}
