using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using VSTDesk.Common;
using VSTDesk.DB.Entities;
using VSTDesk.Models;

namespace VSTDesk.Data
{
    public class AccountData : IAccountData
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        AppSettings _appSettings;
        //private _app
        EmailService _emailService;
        IJwtFactory _jwtFactory;
        JwtIssuerOptions _jwtOptions;

        public AccountData(UserManager<ApplicationUser> userManager, ApplicationDbContext appDbContext, EmailService emailService, IOptions<AppSettings> appSettings, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _userManager = userManager;
            _appDbContext = appDbContext;
            _emailService = emailService;
            _appSettings = appSettings.Value;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }


        public string GetPersonalAccessToken()
        {
            var companySettings = _appDbContext.CompanySettings.FirstOrDefault();
            if (companySettings != null)
                return companySettings.PersonalAccessToken;
            else
                return null;
        }


        public async Task<bool> SendInvite(InviteCustomerModel inviteCustomerModel)
        {
            var companySettings = _appDbContext.CompanySettings.FirstOrDefault();
            if (companySettings == null)
                return false;

            (bool isSuccess, ApplicationUser user) = await CreateUser(inviteCustomerModel);
            string url = string.Empty;
            if (isSuccess)
            {
                url = "<a href =" + string.Format($"{HostSettings.RequestSchema}://{HostSettings.Host}/add-password?userId={{0}}", user.Id) +" target=\"_blank\">Neela</a>";

                companySettings.InvitationEmailMessage = companySettings.InvitationEmailMessage.Contains("{url}") ? companySettings.InvitationEmailMessage.Replace("{url}", url) : companySettings.InvitationEmailMessage;
                companySettings.InvitationEmailMessage = companySettings.InvitationEmailMessage.Contains("{name}") ? companySettings.InvitationEmailMessage.Replace("{name}", user.FirstName + " " + user.LastName) : companySettings.InvitationEmailMessage;


                SmtpSettingsModel smtpSettingsModel = new SmtpSettingsModel
                {
                    EmailMessage = companySettings.InvitationEmailMessage,
                    EmailSubject = companySettings.InvitationEmailSubject,
                    EncryptionType = companySettings.SmtpencrcyptionType,
                    SMTPAuthentication = companySettings.Smtpauthentication,
                    SMTPFromEmail = companySettings.SmtpfromEmail,
                    SMTPFromName = companySettings.SmtpfromName,
                    SMTPHostUrl = companySettings.Smtphost,
                    SMTPPassword = companySettings.Smtppassword,
                    SMTPPort = companySettings.Smtpport,
                    SMTPUserName = companySettings.Smtpusername
                };

                _emailService.Send(new List<string>() { inviteCustomerModel.Email }, null, null, smtpSettingsModel);
            }
            return isSuccess;

        }

        private async Task<(bool, ApplicationUser)> CreateUser(InviteCustomerModel inviteCustomerModel)
        {
            var user = new ApplicationUser
            {
                UserName = inviteCustomerModel.Email,
                Email = inviteCustomerModel.Email,
                FirstName = inviteCustomerModel.FirstName,
                LastName = inviteCustomerModel.LastName
            };


            //_appDbContext.Add(user);
            //await _appDbContext.SaveChangesAsync();


            var result = await _userManager.CreateAsync(user);
            await _userManager.AddToRoleAsync(user, "User");


            List<UserAndProjects> listUserProject = new List<UserAndProjects>();
            List<ProjectModel> projects = inviteCustomerModel.Projects.Where(x => x.IsSelected == true).ToList();
            foreach (var item in projects)
            {
                var userProjects = new UserAndProjects()
                {
                    UserId = user.Id,
                    ProjectId = item.Id
                };
                listUserProject.Add(userProjects);

            }
            _appDbContext.AddRange(listUserProject);
            return await _appDbContext.SaveChangesAsync() > 0 ? (true, user) : (false, user);

        }

        public async Task<bool> RegisterUser(RegisterModel registerModel)
        {
            try
            {
                var user = new ApplicationUser { UserName = registerModel.Email, Email = registerModel.Email };

                var result = await _userManager.CreateAsync(user, registerModel.Password);
                return result.Succeeded;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public async Task<Tuple<string, bool>> SendPasswordResetLink(string userName)
        {
            bool isUserExists = false;
            string token = string.Empty;
            string url = string.Empty;

            var companySettings =_appDbContext.CompanySettings.FirstOrDefault();
            if (companySettings == null)
                return new Tuple<string, bool>("Failed to send password reset link", false);

            ApplicationUser user = _userManager.FindByNameAsync(userName).Result;
            if (user != null)
            {
                if (user.PasswordHash == null)
                {
                    IdentityResult isSuccess = _userManager.AddPasswordAsync(user, "Test@1234").Result;
                    await _userManager.AddToRoleAsync(user, "Admin");
                }
                token = _userManager.GeneratePasswordResetTokenAsync(user).Result;
                isUserExists = true;
                url = "<a href =" + string.Format($"{HostSettings.RequestSchema}://{HostSettings.Host}/reset-password?token={{0}}&userId={{1}}", System.Web.HttpUtility.UrlEncode(token), user.Id) + " target=\"_blank\">password</a>";
            }

            if (isUserExists)
            {
                companySettings.PasswordResetEmailMessage = companySettings.PasswordResetEmailMessage.Contains("{url}") ? companySettings.PasswordResetEmailMessage.Replace("{url}", url) : companySettings.InvitationEmailMessage;
                companySettings.PasswordResetEmailMessage = companySettings.PasswordResetEmailMessage.Contains("{name}") ? companySettings.PasswordResetEmailMessage.Replace("{name}", user.FirstName + " " + user.LastName) : companySettings.PasswordResetEmailMessage;

                SmtpSettingsModel smtpSettingsModel = new SmtpSettingsModel
                {
                    EmailMessage = companySettings.PasswordResetEmailMessage,
                    EmailSubject = companySettings.PasswordResetEmailSubject,
                    EncryptionType = companySettings.SmtpencrcyptionType,
                    SMTPAuthentication = companySettings.Smtpauthentication,
                    SMTPFromEmail = companySettings.SmtpfromEmail,
                    SMTPFromName = companySettings.SmtpfromName,
                    SMTPHostUrl = companySettings.Smtphost,
                    SMTPPassword = companySettings.Smtppassword,
                    SMTPPort = companySettings.Smtpport,
                    SMTPUserName = companySettings.Smtpusername
                };     

                _emailService.Send(new List<string>() { userName },null, null, smtpSettingsModel);
            }

            return new Tuple<string, bool>(ResponseMessageModel.UserAccount.PasswordResetLink, isUserExists);
        }

        //private SmtpSettingsModel GetSmtpSettings(CompanySettings companySettings)
        //{
        //    return new SmtpSettingsModel
        //    {
        //        EmailMessage = 
        //    };
        //}

        public async Task<Tuple<bool,bool>> ResetPassword(ResetPasswordModel resetPasswordModel)
        {
            ApplicationUser user = _userManager.FindByIdAsync(resetPasswordModel.UserId).Result;
            if (user != null)
            {
                IdentityResult result = _userManager.ResetPasswordAsync(user,resetPasswordModel.Token, resetPasswordModel.Password).Result;
                return new Tuple<bool, bool>(result.Succeeded, true);
            }
            return new  Tuple<bool, bool>(false,false );
        }

        /// <summary>
        /// Refreshing and adding access token  when user is admin
        /// </summary>
        /// <param name="adminTokenModel"></param>
        /// <returns></returns>
        public async Task<bool> AddAdminToken(VstTokenModel vstTokenModel, string userId)
        {
            
                if (userId != string.Empty)
                {
                    var applicationUser = _userManager.Users.Where(x => x.IsAdmin == true && x.Id == userId).FirstOrDefault();
                    applicationUser.AccessToken = vstTokenModel.accessToken;
                    applicationUser.RefereshToken = vstTokenModel.refreshToken;
                    _appDbContext.Update(applicationUser);
                }
                else
                {
                    var applicationUser = _userManager.Users.Where(x => x.IsAdmin == true && x.RefereshToken != null && x.AccessToken != null).FirstOrDefault();
                    applicationUser.AccessToken = vstTokenModel.accessToken;
                    applicationUser.RefereshToken = vstTokenModel.refreshToken;
                    _appDbContext.Update(applicationUser);
                }
                var result = _appDbContext.SaveChanges();

                return Convert.ToBoolean(result);
            
           
            
            
        }


        public async Task<bool> CheckUserIsUserExists(string userName)
        {
            var user = _appDbContext.Users.FirstOrDefault(x => x.Email == userName);
            return !(user == null);
        }

        public async Task<bool> AddPassword(ResetPasswordModel resetPasswordModel)
        {
            ApplicationUser user = _userManager.FindByIdAsync(resetPasswordModel.UserId).Result;
            if (user != null)
            {
                IdentityResult result = _userManager.AddPasswordAsync(user, resetPasswordModel.Password).Result;
                return result.Succeeded;
            }
            return false;
        }

        public async Task<bool> CheckUserByName(string userName)
        {
            return !(_appDbContext.Users.FirstOrDefault(x => x.UserName == userName) == null);
        }

        public async Task<CompanySettingsModel> GetCompanySettings()
        {
            var companySettings = _appDbContext.CompanySettings.FirstOrDefault();
            if(companySettings==null)
            {
                return new CompanySettingsModel() {CompanyLogo=$"{_appSettings.FolderPath.CompanyImagePath}//no_image.jpg" };
            }
            else
            {
                return new CompanySettingsModel() {
                    CompanyLogo = string.IsNullOrWhiteSpace( companySettings.CompanyLogo)? $"{_appSettings.FolderPath.CompanyImagePath}//no_image.jpg" : $"{_appSettings.FolderPath.CompanyImagePath}//{companySettings.CompanyLogo}",
                    //AppId = companySettings.AppId,
                    //AppSecretKey = companySettings.AppSecretKey,
                    AppName = companySettings.AppName,
                    InvitationEmailMessage = companySettings.InvitationEmailMessage,
                    InvitationEmailSubject = companySettings.InvitationEmailSubject,
                    BackgroundImageUrlForLogin = string.IsNullOrWhiteSpace(companySettings.LoginBackgroundImagePath) ? $"{_appSettings.FolderPath.CompanyImagePath}//no_image.jpg" : $"{_appSettings.FolderPath.CompanyImagePath}//{companySettings.LoginBackgroundImagePath}",
                    PasswordResetEmailMessage = companySettings.PasswordResetEmailMessage,
                    PasswordResetEmailSubject = companySettings.PasswordResetEmailSubject,
                    PersonalAccessToken = companySettings.PersonalAccessToken,
                    SMTPAuthentication = companySettings.Smtpauthentication,
                    EncryptionType = companySettings.SmtpencrcyptionType,
                    SMTPFromEmail = companySettings.SmtpfromEmail,
                    SMTPFromName = companySettings.SmtpfromName,
                    SMTPHostUrl = companySettings.Smtphost,
                    SMTPPassword = companySettings.Smtppassword,
                    SMTPPort = companySettings.Smtpport,
                    SMTPUserName = companySettings.Smtpusername,
                    SettingOne = companySettings.VstssettingOne,
                    SettingTwo = companySettings.VstssettingTwo,
                    HeaderLogo = string.IsNullOrWhiteSpace(companySettings.HeaderLogo) ? $"{_appSettings.FolderPath.CompanyImagePath}//no_image.jpg" : $"{_appSettings.FolderPath.CompanyImagePath}//{companySettings.HeaderLogo}"
                };
            }
        }

        public async Task<bool> UploadPhoto(string filePath, string uploadedFileType)
        {
            var companySettings = _appDbContext.CompanySettings.FirstOrDefault();
            if(companySettings == null)
                companySettings = new CompanySettings();

            if (uploadedFileType == Constants.UploadProfileImage)
                companySettings.CompanyLogo = filePath;
            else if (uploadedFileType == Constants.UploadHeaderLogoImage)
                companySettings.HeaderLogo = filePath;
            else
                companySettings.LoginBackgroundImagePath = filePath;

            if (companySettings != null)
                _appDbContext.Update(companySettings);
            else
                _appDbContext.CompanySettings.Add(companySettings);

            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> SetCompanySettings(CompanySettingsModel companySettingsModel)
        {
            var companySettings = _appDbContext.CompanySettings.FirstOrDefault();
            if (companySettings != null)
            {
                //companySettings.AppId = companySettingsModel.AppId;
                //companySettings.AppSecretKey = companySettingsModel.AppSecretKey;
                //companySettings.CompanyLogo = companySettingsModel.CompanyLogo;
                companySettings.AppName = companySettingsModel.AppName;
                companySettings.InvitationEmailMessage = companySettingsModel.InvitationEmailMessage;
                companySettings.InvitationEmailSubject = companySettingsModel.InvitationEmailSubject;
                //companySettings.LoginBackgroundImagePath = companySettingsModel.BackgroundImageUrlForLogin;
                companySettings.PasswordResetEmailMessage = companySettingsModel.PasswordResetEmailMessage;
                companySettings.PasswordResetEmailSubject = companySettingsModel.PasswordResetEmailSubject;
                //companySettings.PersonalAccessToken = companySettingsModel.PersonalAccessToken;
                companySettings.Smtpauthentication = companySettingsModel.SMTPAuthentication;
                companySettings.SmtpencrcyptionType = companySettingsModel.EncryptionType;
                companySettings.SmtpfromEmail = companySettingsModel.SMTPFromEmail;
                companySettings.SmtpfromName = companySettingsModel.SMTPFromName;
                companySettings.Smtphost = companySettingsModel.SMTPHostUrl;
                companySettings.Smtppassword = companySettingsModel.SMTPPassword;
                companySettings.Smtpport = companySettingsModel.SMTPPort;
                companySettings.Smtpusername = companySettingsModel.SMTPUserName;
                companySettings.VstssettingOne = companySettingsModel.SettingOne;
                companySettings.VstssettingTwo = companySettingsModel.SettingTwo;

                _appDbContext.Update(companySettings);
            }
            else
            {
                _appDbContext.CompanySettings.Add(new CompanySettings()
                {
                    //AppId = companySettingsModel.AppId,
                    //AppSecretKey = companySettingsModel.AppSecretKey,
                    //CompanyLogo = companySettingsModel.CompanyLogo,
                    AppName = companySettingsModel.AppName,
                    InvitationEmailMessage = companySettingsModel.InvitationEmailMessage,
                    InvitationEmailSubject = companySettingsModel.InvitationEmailSubject,
                    //LoginBackgroundImagePath = companySettingsModel.BackgroundImageUrlForLogin,
                    PasswordResetEmailMessage = companySettingsModel.PasswordResetEmailMessage,
                    PasswordResetEmailSubject = companySettingsModel.PasswordResetEmailSubject,
                    PersonalAccessToken = companySettingsModel.PersonalAccessToken,
                    Smtpauthentication = companySettingsModel.SMTPAuthentication,
                    SmtpencrcyptionType = companySettingsModel.EncryptionType,
                    SmtpfromEmail = companySettingsModel.SMTPFromEmail,
                    SmtpfromName = companySettingsModel.SMTPFromName,
                    Smtphost = companySettingsModel.SMTPHostUrl,
                    Smtppassword = companySettingsModel.SMTPPassword,
                    Smtpport = companySettingsModel.SMTPPort,
                    Smtpusername = companySettingsModel.SMTPUserName,
                    VstssettingOne = companySettingsModel.SettingOne,
                    VstssettingTwo = companySettingsModel.SettingTwo
                });
            }

            return await _appDbContext.SaveChangesAsync() > 0;
        }


        public async Task<Tuple<HttpStatusCode, Response<dynamic>>> GenerateTokenForVSTAdmin(VSTSMemberModel vstsMemberModel)
        {
            //var result = await _userManager.FindByNameAsync(username);
            //if (result == null)
            //{
            //    return new Tuple<HttpStatusCode, Response<dynamic>>(HttpStatusCode.NotFound, null);
            //}

            List<ProjectModel> listProject = _appDbContext.UserAndProjects.Select(y => new ProjectModel() { Id = y.ProjectId, Name = y.Project.Name }).ToList();
            string projectIds = listProject.Count > 0 ? string.Join(",", listProject.Select(x => x.Id)) : string.Empty;
            //var role = await _userManager.GetRolesAsync(result);
            var claimIdentity = _jwtFactory.GenerateClaimsIdentity(vstsMemberModel.emailAddress, vstsMemberModel.emailAddress, true, projectIds, "Admin");
            var jwt = await Tokens.GenerateJwt(claimIdentity, _jwtFactory, vstsMemberModel.emailAddress, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });


            var response = new Response<dynamic>
            {
                Code = HttpStatusCode.OK,
                Message = string.Empty,
                Data = new
                {
                    Access_Token = jwt,
                    User = new
                    {
                        Username = vstsMemberModel.emailAddress,
                        ProjectList = listProject,
                        FirstName = vstsMemberModel.displayName ,
                        LastName = "",
                        ProfileImageUrl = $"{_appSettings.FolderPath.Path}/noimage.gif",
                        UserRole = "Admin" ,
                        UserId = 0,
                    }
                }
            };

            return new Tuple<HttpStatusCode, Response<dynamic>>(HttpStatusCode.OK, response);
        }


    }
}
