using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VSTDesk.Common;
using VSTDesk.Logic;
using VSTDesk.Model;
using VSTDesk.Models;

namespace VSTDesk.Controller
{
    [Produces("application/json")]
    //[Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/project")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IWorkItemsRepository _workItemsRepository;

        public ProjectController(IProjectRepository projectRepository,IWorkItemsRepository workItemsRepository)
        {
            _projectRepository = projectRepository;
            _workItemsRepository = workItemsRepository;
        }

        /// <summary>
        /// Sync all new projects to the VSTDesk.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        [Route("syncprojects")]
        public async Task<IActionResult> SyncProjects()
        {
            bool isSuccess = await _projectRepository.GetProjects();
            if (isSuccess)
            {
                return Ok(new Response<bool> { Code = HttpStatusCode.OK, Data = isSuccess, Message = ResponseMessageModel.UserAccount.ProjectSync });
            }
            else
            {
                return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.ProjectNotSync));
            }

        }

        /// <summary>
        /// Get admin project settings.
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        [Route("getprojectsettings")]
        public async Task<IActionResult> GetProjectSettings([FromQuery] int projectId)
        {
            ProjectSettingsModel projectSettingsModel = null;
            try
            {
                projectSettingsModel = await _projectRepository.GetProjectSettings(projectId);

            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
            //return Ok(new Response<ProjectSettingsModel>() {  Code = HttpStatusCode.OK , Data = projectSettingsModel , Message = string.Empty });

            if (projectSettingsModel != null)
            {
                return Ok(new Response<ProjectSettingsModel>() { Code = HttpStatusCode.OK, Data = projectSettingsModel, Message = string.Empty });
            }

            return BadRequest(new ErrorResponse(ResponseMessageModel.ProjectSetting.ProjectNotFound));
        }

        /// <summary>
        /// Get All Projects.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        [Route("getprojectslist")]
        public async Task<IActionResult> getProjectList()
        {
            List<ProjectModel> projectList = await _projectRepository.GetProjectsList();
            if (projectList != null)
            {
                return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = projectList, Message = string.Empty });
            }
            else
            {
                return BadRequest(new ErrorResponse(ResponseMessageModel.ProjectSetting.ProjectNotFound));
            }
        }

        /// <summary>
        /// Update Admin Project Settings.
        /// </summary>
        /// <param name="projectSettingsModel"></param>
        /// <returns></returns>
        [HttpPut]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        [Route("updateprojectsettings")]
        public async Task<IActionResult> UpdateProjectSettings([FromBody] ProjectSettingsModel projectSettingsModel)
        {
            var isSuccess = false;
            isSuccess = await _projectRepository.UpdateProjectSettings(projectSettingsModel);
            if (isSuccess)
            {
                return Ok(new Response<bool>() { Code = HttpStatusCode.OK, Data = isSuccess, Message = ResponseMessageModel.ProjectSetting.UpdateProjectSetting });
            }
            else
            {
                return BadRequest(new ErrorResponse(ResponseMessageModel.ProjectSetting.NotUpdateProjectSetting));
            }
        }

        /// <summary>
        /// Used to delete user from the UserAndProjects 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        [Route("deleteusers")]
        public async Task<IActionResult> DeleteUsers(string id)
        {
            bool isSuccess = false;
            try
            {
                isSuccess = await _projectRepository.RemoveUsers(id);
            }
            catch (Exception)
            {
                throw;
            }

            // return Ok(isSuccess);
            if (isSuccess)
            {
                return Ok(new Response<dynamic> { Code = HttpStatusCode.OK, Data = isSuccess, Message = ResponseMessageModel.UserAccount.UserRemoved });
            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.UserAccount.UserNotFound));

        }

        [HttpGet]
        [Route("projectstatus/project/{id:int}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        [AccessResource]
        public async Task<IActionResult> ProjectStatus(int id)
        {
            List<string> projectStatus = await _projectRepository.getProjectStatus(id);
            // return Ok(new Response<List<string>> { Code = HttpStatusCode.OK, Data = projectStatus, Message = string.Empty });
            if (projectStatus != null)
            {
                return Ok(new Response<List<string>> { Code = HttpStatusCode.OK, Data = projectStatus, Message = string.Empty });
            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.ProjectSetting.ProjectNotFound));
        }
        [HttpGet]
        [Route("getEditableItems/project/{id:int}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        [AccessResource]
        public async Task<IActionResult> GetEditableItems(int id)
        {
             EditableFields  editableFields= await _projectRepository.GetEditableItems(id);
            if (editableFields != null)
            {
                return Ok(new Response<EditableFields> { Code = HttpStatusCode.OK, Data = editableFields, Message = string.Empty });
            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.ProjectSetting.ProjectNotFound));
        }
        

        [HttpGet]
        [Route("getgridcolumnfields/project/{id:int}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        [AccessResource]
        public async Task<IActionResult> GetGridColumnFields(int id)
        {
            GridVisibleFieldsModel gridVisibleFields = await _projectRepository.GetGridColumnFields(id);
            if (gridVisibleFields != null)
            {
                return Ok(new Response<GridVisibleFieldsModel> { Code = HttpStatusCode.OK, Data = gridVisibleFields, Message = string.Empty });
            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.ProjectSetting.ProjectNotFound));
        }

        [HttpGet]
        [Route("getworkItemstypes")]
        [Authorize(AuthenticationSchemes = "Bearer", Policy = "Admin")]
        public async Task<IActionResult> GetWorkItemTypes()
        {
            List<WorkItemsModel> workItemsList = await _projectRepository.GetProjectWorkItems();
            // return Ok(new Response<List<WorkItemsModel>> { Code = HttpStatusCode.OK, Data = workItemsList, Message = string.Empty });

            if (workItemsList != null)
            {
                return Ok(new Response<List<WorkItemsModel>> { Code = HttpStatusCode.OK, Data = workItemsList, Message = string.Empty });
            }
            return BadRequest(new ErrorResponse(ResponseMessageModel.WorkItemMessage.WorkItemNotExist));

        }

        [HttpGet]
        [Route("getusersbyproject")]
        [Authorize(AuthenticationSchemes="Bearer", Policy="Admin")]
        public async Task<IActionResult> GetUsersByProject()
        {
            List<Series> usersByProject = await _projectRepository.GetUsersByProject();
            
            return Ok(new Response<List<Series>> { Code = HttpStatusCode.OK, Data = usersByProject, Message = string.Empty });
            
            
        }



        [HttpGet]
        [Route("getchartsdata/project/{projectId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetAllChartsData(int projectId)
        {
            string userId = null;
            var currentUser = HttpContext.User;
            if (currentUser != null)
            {
                userId = currentUser.FindFirst("id").Value;
            }
            if (userId != null)
            {
                string role = currentUser.FindFirst("Role").Value;
                if(!string.IsNullOrEmpty(role) && role.ToLower().Equals("admin"))
                {
                    userId = string.Empty;
                }

                DashboardChartModel dashboardChartModel = await _workItemsRepository.GetAllChartsData( projectId, userId);
                return Ok(new Response<DashboardChartModel> { Code = HttpStatusCode.OK, Data = dashboardChartModel, Message = string.Empty });

                //if (projectId != 0)
                //{
                //    DashboardChartModel dashboardChartModel = await _workItemsRepository.GetAllChartsData(projectId);
                //    return Ok(new Response<DashboardChartModel> { Code = HttpStatusCode.OK, Data = dashboardChartModel, Message = string.Empty });
                //}
                //else
                //{
                //    List<ProjectModel> projectList = await _projectRepository.GetProjectsList();
                //    if (projectList != null)
                //    {
                //        DashboardChartModel dashboardChartData = new DashboardChartModel();
                //        foreach(var item in projectList)
                //        {
                //            DashboardChartModel dashboardChartModel = await _workItemsRepository.GetAllChartsData(item.Id);
                //            if (dashboardChartModel != null)
                //            {
                //                dashboardChartData.BarChartModel.AddRange(dashboardChartModel.BarChartModel);
                //                dashboardChartData.FistLineChartModel.AddRange(dashboardChartModel.FistLineChartModel);
                //                dashboardChartData.SecondLineChartModel.AddRange(dashboardChartModel.SecondLineChartModel);
                //            }
                //        };
                //        return Ok(new Response<DashboardChartModel> { Code = HttpStatusCode.OK, Data = dashboardChartData, Message = string.Empty });
                //    }
                //    return BadRequest(new ErrorResponse(ResponseMessageModel.WorkItemMessage.PleaseContactToAdministrator));
                //}

            }
            else
            {
                return BadRequest(new ErrorResponse(ResponseMessageModel.WorkItemMessage.PleaseContactToAdministrator));
            }

        }

    }
}