using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using VSTDesk.Api;
using VSTDesk.Common;
using VSTDesk.Data;
using VSTDesk.Models;

namespace VSTDesk.Logic
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IAccountData _accountData;
        private readonly IDataRepository _dataRepository;
        AppSettings _appSettings;

        public AccountRepository(IAccountData accountData , IDataRepository dataRepository , IOptions<AppSettings> appSettings)
        {
            _accountData = accountData;
            _dataRepository = dataRepository;
            _appSettings = appSettings.Value;
        }

        public async Task<bool> CheckUserByName(string userName)
        {
            return await _accountData.CheckUserByName(userName);
        }

        public async Task<bool> CheckUserIsUserExists(string userName)
        {
            return await _accountData.CheckUserIsUserExists(userName);
        }

        public async Task<bool> CreatePasswordAsync(ResetPasswordModel resetPasswordModel)
        {
             return await _accountData.AddPassword(resetPasswordModel);

        }

        public async Task<Tuple<HttpStatusCode, Response<dynamic>>> GenerateTfsToken(TokenModel tokenMOdel , string userId)
        {
            Tuple<HttpStatusCode, VSTSMemberModel> result = await _dataRepository.generateTfsToken(tokenMOdel , userId);
            if(result.Item1 == HttpStatusCode.OK)
            {
                return await _accountData.GenerateTokenForVSTAdmin(result.Item2);
            }
            return new Tuple<HttpStatusCode, Response<dynamic>>(result.Item1, null);
        }

        public async Task<CompanySettingsModel> GetCompanySettings()
        {
              return await _accountData.GetCompanySettings();
             
        }

        public async Task<bool> RegisterUser(RegisterModel registerModel)
        {
            return await _accountData.RegisterUser(registerModel);
        }

        public Task<Tuple <bool,bool>>ResetPassword(ResetPasswordModel resetPasswordModel)
        {
            return _accountData.ResetPassword(resetPasswordModel);
        }

        public Task <bool> SendInvite(InviteCustomerModel inviteCustomerModel)
        {
            return _accountData.SendInvite(inviteCustomerModel);
        }

       

        public async Task<Tuple<string, bool>> SendPasswordResetLink(string userName)
        {
            return await  _accountData.SendPasswordResetLink(userName);
        }

        public async Task<bool> SetCompanySettings(CompanySettingsModel companySettingsModel)
        {
            return await _accountData.SetCompanySettings(companySettingsModel);
        }

        public async Task<string> UploadImage(IFormFile formFile, string userId, string uploadedFileType)
        {
            string filePath = _appSettings.FolderPath.CompanyImagePath;
            var path = $"{Environment.CurrentDirectory}\\{_appSettings.FolderPath.RootFolder}\\{_appSettings.FolderPath.CompanyImagePath}";

            string fileName = string.Empty;
            if (uploadedFileType == Constants.UploadProfileImage)
            {
                fileName = $"companyLogo.{formFile.FileName.Split('.')[1]}";
            }
            else if (uploadedFileType == Constants.UploadHeaderLogoImage)
            {
                fileName = $"headerLogo.{formFile.FileName.Split('.')[1]}";
            }
            else
            {
                fileName = $"loginBackgroundImage.{formFile.FileName.Split('.')[1]}";
            }

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            string[] files = Directory.GetFiles(path, uploadedFileType == Constants.UploadProfileImage ? $"companyLogo*" : 
                uploadedFileType == Constants.UploadBackgroundImageForLogin ? $"loginBackgroundImage*" : $"headerLogo*");

            if (files.Length > 0)
            {
                if (File.Exists($"{files[0]}"))
                {
                    File.Delete($"{files[0]}");
                }

            }


            var fileData = Utility.Upload(formFile, path, fileName);
            UploadImageModel uploadImageModel = new UploadImageModel()
            {
                FileName = fileData.FilePath,
                UserId = userId
            };
            if (fileData != null)
            {
                bool isSuccess = await _accountData.UploadPhoto(fileData.FilePath, uploadedFileType);
                if (isSuccess)
                {
                    return $"{_appSettings.FolderPath.CompanyImagePath}/{fileData.FilePath}";
                }
            }
            return null;
        }

        public String GenerateAuthorizeUrl()
        {
            UriBuilder uriBuilder = new UriBuilder(_appSettings.AppSettingOauth.AuthUrl);
            var queryParams = HttpUtility.ParseQueryString(uriBuilder.Query ?? String.Empty);

            queryParams["client_id"] = _appSettings.AppSettingOauth.AppId;                   // ConfigurationManager.AppSettings["AppId"];
            queryParams["response_type"] = "Assertion";
            queryParams["state"] = "state";
            queryParams["scope"] = _appSettings.AppSettingOauth.Scope;                  // ConfigurationManager.AppSettings["Scope"];
            queryParams["redirect_uri"] = _appSettings.AppSettingOauth.CallbackUrl;       //ConfigurationManager.AppSettings["CallbackUrl"];

            uriBuilder.Query = queryParams.ToString();

            return uriBuilder.ToString();
        }
    }
}
