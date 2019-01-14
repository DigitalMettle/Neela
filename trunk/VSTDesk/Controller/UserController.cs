using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Options;
using Microsoft.Extensions.Options;
using VSTDesk.Common;
using VSTDesk.Logic;
using VSTDesk.Models;

namespace VSTDesk.Controller
{
    [Produces("application/json")]
    // [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly AppSettings _appSetting;

        public UserController(IUserRepository userRepository, IProjectRepository projectRepository, IOptions<AppSettings> appSetting)
        {
            _userRepository = userRepository;
            _projectRepository = projectRepository;
            _appSetting = appSetting.Value;
        }

        /// <summary>
        /// Get All Users.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("getuserlist")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        public async Task<IActionResult> GetUsersList(string search)
        {
            try
            {
                List<UserModel> UserModel = await _userRepository.GetUsers(search);
                //return Ok(UserModel);
                if (UserModel != null)
                {
                    return Ok(new Response<List<UserModel>>() { Code = HttpStatusCode.OK, Data = UserModel, Message = string.Empty });
                }

                return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotFound));
            }
            catch (Exception)
            {

                throw;
            }

        }

        /// <summary>
        /// Get All Users.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("getadminuserlist")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        public async Task<IActionResult> GetAdminUsersList(string search)
        {
            try
            {
                List<UserModel> UserModel = await _userRepository.GetAdminUsers();
                //return Ok(UserModel);
                if (UserModel != null)
                {
                    return Ok(new Response<List<UserModel>>() { Code = HttpStatusCode.OK, Data = UserModel, Message = string.Empty });
                }

                return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotFound));
            }
            catch (Exception)
            {

                throw;
            }

        }


        /// <summary>
        /// Add Projects To The User.
        /// </summary>
        /// <param name="userProjectsModel"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("adduserproject")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        public async Task<IActionResult> AddUserProjects([FromBody]UserProjectsModel userProjectsModel)
        {
            bool result = await _userRepository.AddUserProjects(userProjectsModel);
            //return Ok("User projects has been added successfully!!");
            if (result)
            {
                return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = result, Message = ResponseMessageModel.ProjectSetting.ProjectAdded });
            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.ProjectSetting.ProjectNotAdded));
        }

        /// <summary>
        /// Delete User.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("deleteusers")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        public async Task<IActionResult> DeleteUsers([FromQuery] string userId)
        {
            bool isSuccess = false;
            if (userId != null)
            {
                isSuccess = await _userRepository.RemoveUsers(userId);
                if (isSuccess)
                {
                    return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = isSuccess, Message = ResponseMessageModel.UserAccount.UserRemoved });
                }
            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotFound));

        }

        /// <summary>
        /// Unassign The User Project.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="projectId"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("deleteUserProject")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        public async Task<IActionResult> DeleteUserProjects(string userId, int projectId)
        {
            bool result = await _userRepository.RemoveUserProjects(userId, projectId);
            //return Ok();
            if (result)
            {
                return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = result, Message = ResponseMessageModel.ProjectSetting.ProjectRemoved });
            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.ProjectSetting.ProjectNotFound));
        }

        /// <summary>
        /// Get User Detail By User Id.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("getuserdetails")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        public async Task<IActionResult> GetUserDetail(string userId)
        {
            UserModel result = await _userRepository.GetUserDetail(userId);
            //return Ok(result);
            if (result != null)
            {
                result.ProfilePhoto = $"{_appSetting.FolderPath.Path}/{result.ProfilePhoto}";
                return Ok(new Response<UserModel>() { Code = HttpStatusCode.OK, Data = result, Message = string.Empty });
            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotFound));
        }

        /// <summary>
        /// Update User Detail.
        /// </summary>
        /// <param name="userModel"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("updateuserdetail")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> UpdateUserDetail([FromBody] UserModel userModel)
        {
            bool isSuccess = await _userRepository.UpdateUserDetail(userModel);
            //return Ok(isSuccess);
            if (isSuccess)
            {
                return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = isSuccess, Message = ResponseMessageModel.UserAccount.UserUpdatedSuccessFully });
            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotFound));
        }

        [HttpGet]
        [Route("getuserprofiledata")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetUserProfileData()
        {
            string userId = null;
            var currentUser = HttpContext.User;
            if (currentUser != null)
            {
                userId = currentUser.FindFirst("id").Value;
            }
            if (userId != null)
            {
                UserModel userProfile = await _userRepository.GetUserDetail(userId);
                if (userProfile != null)
                {
                    //userProfile.ProfilePhoto = $"{_appSetting.FolderPath.Path}/{userProfile.ProfilePhoto}";
                    return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = userProfile, Message = string.Empty });
                }

            }

            return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotFound));


        }

        [HttpPost]
        [Route("setuserprofiledata")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> SetUserProfileData([FromBody]UserModel userProfile)
        {
            string userId = null;
            var currentUser = HttpContext.User;
            if (currentUser != null)
            {
                userId = currentUser.FindFirst("id").Value;
            }
            if (userId != null)
            {
                userProfile.Id = userId;
                var isSuccess = await _userRepository.UpdateUserDetail(userProfile);
                if (isSuccess)
                {
                    return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = isSuccess, Message = ResponseMessageModel.UserAccount.UserUpdatedSuccessFully });
                }

            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotFound));
        }

        [HttpGet]
        [Route("getassingedprojectlist")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetAssignedProjectList()
        {

            string userId = null;
            var currentUser = HttpContext.User;
            if (currentUser != null)
            {
                userId = currentUser.FindFirst("id").Value;
            }
            if (userId != null)
            {

                List<ProjectModel> projectList = await _projectRepository.GetProjectsList(userId);
                if (projectList != null)
                {
                    return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = projectList, Message = string.Empty });

                }

            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.ProjectSetting.ProjectNotFound));

        }

        [HttpPost]
        [Route("uploadimage")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> UploadImage(IFormFile files)
        {
            string userId = null;
            var currentUser = HttpContext.User;
            if (currentUser != null)
            {
                userId = currentUser.FindFirst("id").Value;
            }
            if (userId != null)
            {
                string path = await _userRepository.UploadImage(files, userId);

                if (!string.IsNullOrWhiteSpace(path))
                {
                    return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = path, Message = ResponseMessageModel.UserAccount.ProfileImageUpload });
                }

            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.ProfileImageNotUpload));

        }

        [HttpGet]
        [Route("getuseraddprojectdetail")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        public async Task<IActionResult> GetUserAddProjectDetail(string userId)
        {
            var userAndProjects = await _userRepository.GetUserAddProjectDetail(userId);
            if (userAndProjects != null)
            {
                return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = userAndProjects, Message = string.Empty });

            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotFound));
        }

        [HttpPost]
        [Route("updateuserandprojects")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        public async Task<IActionResult> UpdateUserAndProject([FromBody]UserAndPojectDetailModel userAndPojectDetailModel)
        {
            bool isSuccess = await _userRepository.UpdateUserAndProject(userAndPojectDetailModel);
            if (isSuccess)
            {
                return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = isSuccess, Message = ResponseMessageModel.UserAccount.UserUpdatedSuccessFully });
            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotFound));
        }

        [HttpPost]
        [Route("resetpassword")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordModel resetPasswordModel)
        {

            var currentUser = HttpContext.User;
            if (currentUser != null)
            {
                resetPasswordModel.UserId = currentUser.FindFirst("id").Value;
            }
            bool isSuccess = await _userRepository.ResetPassword(resetPasswordModel);
            if (isSuccess)
            {
                return Ok(new Response<bool> { Code = HttpStatusCode.OK, Data = isSuccess, Message = ResponseMessageModel.UserAccount.ResetPasswordSuccessfully });
            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotFound));
        }
      

    }
}