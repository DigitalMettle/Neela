using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using VSTDesk.Common;
using VSTDesk.Data;
using VSTDesk.Logic;
using VSTDesk.Models;

namespace VSTDesk.Controller
{
    [Produces("application/json")]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        // private readonly ApplicationDbContext _appDbContext;
        // private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAccountRepository _accountRepository;

        public AccountController(IAccountRepository accountRepository)
        {
            //_userManager = userManager;
            //_appDbContext = appDbContext;
            _accountRepository = accountRepository;
        }


        /// <summary>
        /// Send Invite to the customer.
        /// </summary>
        /// <returns></returns>
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        [HttpPost]
        [Route("sendinvite")]
        public async Task<IActionResult> SendInvite([FromBody]InviteCustomerModel inviteCustomerModel)
        {
            // string callBackUrl = $"{Request.Scheme}://{Request.Host}/add-password?userId={{0}}";
            if (ModelState.IsValid)
            {
                var result = await _accountRepository.SendInvite(inviteCustomerModel);
                if (result)
                {
                    return Ok(new Response<bool> { Code = HttpStatusCode.OK, Data = result, Message = ResponseMessageModel.UserAccount.InviteSuccessfullySent });
                }
            }

            return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.InviteNotSent));

        }

        /// <summary>
        /// Send Reset Password Link.
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("sendpasswordresetlink")]
        public async Task<IActionResult> SendPasswordResetLink([FromQuery] string username)
        {
            // string callBackUrl = $"{Request.Scheme}://{Request.Host}/reset-password?token={{0}}&userId={{1}}";
            Tuple<string, bool> resetLink = await _accountRepository.SendPasswordResetLink(username);
            if (resetLink.Item2)
            {
                return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = resetLink.Item2, Message = resetLink.Item1 });
            }
            else
            {
                return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotExist));
            }
        }

        [HttpPost]
        [Route("resetpassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel resetPasswordModel)
        {
          

            Tuple <bool,bool> isResetSuccessful = await _accountRepository.ResetPassword(resetPasswordModel);
            if (isResetSuccessful.Item1)
            {
                return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = isResetSuccessful, Message = ResponseMessageModel.UserAccount.ResetPasswordSuccessfully });
            }
            else if(isResetSuccessful.Item2)
            {
                return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.LinkExpired));
            }
            else
            {
                return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.ResetPasswordNotSuccessfully));
            }
        }

        //[Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost]
        [Route("generatetfstoken")]
        public async Task<IActionResult> GenerateTfsToken([FromBody] TokenModel tokenMOdel)
        {
            string userId = string.Empty;
            //var currentUser = HttpContext.User;
            //if (currentUser != null)
            //{
            //    userId = currentUser.FindFirst("id").Value;
            //}
            var result = await _accountRepository.GenerateTfsToken(tokenMOdel, userId);
            if (result.Item1 == HttpStatusCode.OK)
            {
                return Ok(result.Item2);
                //return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = result, Message = ResponseMessageModel.AuthenticateUser.TokenGenerateSuccess });
            }
            else if(result.Item1 == HttpStatusCode.NotFound || result.Item1 == HttpStatusCode.Forbidden)
            {
                // HttpStatusCode.NotFound : when user does not exist in members of vsts group
                // HttpStatusCode.Forbidden : when user does not have permission to get members of vsts group
                return BadRequest(new ErrorResponse("You are not authorize to access Neela Admin. Please logout from vsts account for login with different admin. It's a good idea to close all browser window."));
            }
            else
            {
                return BadRequest(new ErrorResponse(ResponseMessageModel.AuthenticateUser.TokenGenerateError));
            }
        }

        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        [HttpGet]
        [Route("useremailexist")]
        public async Task<IActionResult> CheckUserIsUserExists(string emailId)
        {
            bool isExist = await _accountRepository.CheckUserIsUserExists(emailId);
            //  if (isExist)
            // {
            return Ok(new Response<bool> { Code = HttpStatusCode.OK, Data = isExist, Message = string.Empty });
            //}
            //   return BadRequest(new ErrorResponse(string.Empty));

        }
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        [HttpGet]
        [Route("verifyusername")]
        public async Task<IActionResult> VerifyUserName(string userName)
        {
            bool isExist = await _accountRepository.CheckUserByName(userName);
            return Ok(new Response<bool> { Code = HttpStatusCode.OK, Data = isExist, Message = string.Empty });
            //if (isExist)
            //{
            //    return Ok(new Response<bool> { Code = HttpStatusCode.OK, Data = isExist, Message = string.Empty });
            //}
            //return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotExist));
        }

        [HttpPost]
        [Route("createuserpassword")]
        public async Task<IActionResult> CreateUserPassword([FromBody] ResetPasswordModel resetPasswordModel)
        {
            bool isAddedSuccessful = await _accountRepository.CreatePasswordAsync(resetPasswordModel);
            if (isAddedSuccessful)
            {
                return Ok(new Response<bool> { Code = HttpStatusCode.OK, Data = isAddedSuccessful, Message = ResponseMessageModel.UserAccount.UserPasswordAddedSuccessfully });
            }
            else
            {
                return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserPasswordNotAdded));
            }

        }

        [HttpGet]
        [Route("getcompanysettings")]
        public async Task<IActionResult> GetCompanySettings()
        {
            CompanySettingsModel companySettingsModel =await _accountRepository.GetCompanySettings();
            if (companySettingsModel!=null)
            {
                return Ok(new Response<CompanySettingsModel> { Code = HttpStatusCode.OK, Data = companySettingsModel, Message =string.Empty });
            }

            return BadRequest(new ErrorResponse(ResponseMessageModel.CompanySetting.UnableToGet));
        }

        [HttpPost]
        [Route("savecompanysettings")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        public async Task<IActionResult> SaveCompanySettings([FromBody]CompanySettingsModel  companySettingsModel)
        {
            bool isSuccess  = await _accountRepository.SetCompanySettings(companySettingsModel);
            if (isSuccess)
            {
                return Ok(new Response<bool> { Code = HttpStatusCode.OK, Data = isSuccess, Message = ResponseMessageModel.CompanySetting.CompanySettingsUpdated });
            }

            return BadRequest(new ErrorResponse(ResponseMessageModel.CompanySetting.CompanyUpdateFailed));
        }

        [HttpPost]
        [Route("uploadimage")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy ="Admin")]
        public async Task<IActionResult> UploadImage(IFormFile files, [FromQuery]string type)
        {
            string userId = null;
            var currentUser = HttpContext.User;
            if (currentUser != null)
            {
                userId = currentUser.FindFirst("id").Value;
            }

            if (userId != null && (type == Constants.UploadProfileImage || type == Constants.UploadBackgroundImageForLogin || type == Constants.UploadHeaderLogoImage))
            {
                string path = await _accountRepository.UploadImage(files, userId, type);

                if (!string.IsNullOrWhiteSpace(path))
                {
                    return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = path, Message = ResponseMessageModel.CompanySetting.ImageUploadSuccess });
                }

            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.CompanySetting.ImageUploadFail));

        }

        /// <summary>
        /// Endpoint for generating redirect and callback url for vsts login
        /// </summary>
        /// <returns></returns>
        [Route("loginasadmin")]
        [HttpGet]
        public IActionResult LoginAsAdmin() => Ok(new Response<dynamic>{ Data = _accountRepository.GenerateAuthorizeUrl() });

    }
}