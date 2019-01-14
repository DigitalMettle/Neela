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
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/worktitems")]
    public class WorkItemsController : ControllerBase
    {
        private readonly IWorkItemsRepository _workItemsRepository;
        public WorkItemsController(IWorkItemsRepository workItemsRepository)
        {
            _workItemsRepository = workItemsRepository;
        }

        [HttpPost]
        [Route("createworkitem/project/{projectId:int}")]
        [AccessResource]
        public async Task <IActionResult> CreateWorkItem([FromBody] WorkItemModel workItemModel)
        {
            string userId = null;
            bool isAdmin = false;
            var currentUser = HttpContext.User;
            if (currentUser != null)
            {
                userId = currentUser.FindFirst("id").Value;
                isAdmin = currentUser.FindFirst("Role").Value.ToLower().Equals("admin");
            }
            if (userId != null)
            {
                bool isSuccess = await _workItemsRepository.CreateWorkItem(workItemModel, isAdmin,userId);

                if (isSuccess)
                {
                    if (workItemModel.WorkItemId > 0)
                    {
                        return Ok(new Response<bool> { Code = HttpStatusCode.OK, Data = isSuccess, Message = ResponseMessageModel.WorkItemMessage.WorkItemUpdation });
                    }
                    return Ok(new Response<bool> { Code = HttpStatusCode.OK, Data = isSuccess, Message = ResponseMessageModel.WorkItemMessage.WorkItemCreated });

                }
            }
            
            return BadRequest(new ErrorResponse(ResponseMessageModel.WorkItemMessage.PleaseContactToAdministrator));
            
        }

        [HttpGet]
        [Route("getprojectworkitems/project/{projectId:int}")]
        [AccessResource]
        public async Task<IActionResult> GetProjectWorkItems(int projectId)
        {
            WorkItemHierarchy workItems = await _workItemsRepository.GetProjectWorkItems(projectId);
            if (workItems != null)
            {
                return Ok(new Response<WorkItemHierarchy> { Code = HttpStatusCode.OK, Data = workItems, Message = string.Empty });
            }
            else
            {
                return BadRequest(new ErrorResponse(ResponseMessageModel.WorkItemMessage.ProjectNotExist));
            }
        }

        [HttpGet]
        [Route("getprojectworkitembyid/project/{projectId:int}/workitem/{workItemId:int}")]
        [AccessResource]
        public async Task<IActionResult> GetProjectWorkItemsById(int projectId , int workItemId)
        {

             WorkItemModel WorkItem = await _workItemsRepository.GetProjectWorkItemById(workItemId);
            if (WorkItem != null)
            {
                return Ok(new Response<WorkItemModel> { Code = HttpStatusCode.OK, Data = WorkItem, Message = string.Empty });

            }
            else
            {
                return BadRequest(new ErrorResponse(ResponseMessageModel.WorkItemMessage.PleaseContactToAdministrator));
            }
        }

        [HttpGet]
        [Route("getallprojectworkitemstatus/project/{projectId:int}")]
        [AccessResource]
        public async Task<IActionResult> GetAllProjectWorkItemStatus(int projectId)
        {
            string userId = null;
            var currentUser = HttpContext.User;
            if (currentUser != null)
            {
                userId = currentUser.FindFirst("id").Value;
            }
            if(userId!=null)
            {
                List<BarChartModel> listBarChartModel = await _workItemsRepository.GetUserProjetsAndCustomStatus(projectId);
                return Ok(new Response<List<BarChartModel>> { Code = HttpStatusCode.OK, Data = listBarChartModel, Message = string.Empty });
            }
            else
            {
                return BadRequest(new ErrorResponse(ResponseMessageModel.WorkItemMessage.PleaseContactToAdministrator));
            }
           
        }
    }
}