using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using VSTDesk.Api;
using VSTDesk.Common;
using VSTDesk.Data;
using VSTDesk.DB.Entities;
using VSTDesk.Model;
using VSTDesk.Models;

namespace VSTDesk.Logic
{
    public class WorkItemsRepository : IWorkItemsRepository
    {
        private readonly IDataRepository _dataRepository;
        private readonly IUserData _userData;
        private readonly IProjectData _projectdata;
        AppSettings _appSettings;
        public WorkItemsRepository(IDataRepository dataRepository, IOptions<AppSettings> appSettings, IProjectData projectData,IUserData userData)
        {
            _dataRepository = dataRepository;
            _appSettings = appSettings.Value;
            _projectdata = projectData;
            _userData = userData;
        }

        public async Task<bool> CreateWorkItem(WorkItemModel workItemModel, bool isAdmin, string userId)
        {
            string userName = string.Empty;
            var adminProjSettings = await _projectdata.GetProjectSettings(workItemModel.Id);
            if(!isAdmin)
            {
                UserModel user = await _userData.GetUserDetail(userId);
                if(user != null)
                {
                    userName = user.UserName;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                userName = userId;
            }
            
            string api =string.Empty;
            workItemModel.AssignTo = adminProjSettings != null && adminProjSettings.Count > 0 ?  adminProjSettings[0].DefaultAssignment : string.Empty;
            List<string> projectNames = await _projectdata.GetProjectName(workItemModel.Id);
            workItemModel.ProjectId = projectNames != null && projectNames.Count > 0 ? projectNames[0] : string.Empty;
            workItemModel.State = adminProjSettings != null && adminProjSettings.Count > 0 ? adminProjSettings[0].CreatedItemStatus : string.Empty;
          
            if (adminProjSettings!=null && adminProjSettings.Count > 0)
            {
                api = workItemModel.WorkItemId != 0 ? String.Format(VSTSAPI.UpdateWorkItem,_appSettings.VSTS.AccountName, workItemModel.ProjectId,workItemModel.WorkItemId, _appSettings.VSTS.ByPassRules) : String.Format(VSTSAPI.CreateWorkItem, _appSettings.VSTS.AccountName, workItemModel.ProjectId, adminProjSettings[0].CreatedItemType.ToLower(), _appSettings.VSTS.ByPassRules);
            }
            return await  _dataRepository.CreateWorkItem(workItemModel,api, userName);
        }

        public async Task<WorkItemHierarchy> GetProjectWorkItems(int projectId)
        {
            List<string> projectsNames = await _projectdata.GetProjectName(projectId); 
            var adminProjSettings = await _projectdata.GetProjectSettings(projectId);
            var customStatus = await _projectdata.GetProjectCustomStatus(projectId);
            return await _dataRepository.GetProjectWorkItems(adminProjSettings[0], customStatus, projectsNames[0]);
            

        }

        public async Task<WorkItemModel> GetProjectWorkItemById(int id)
        {
            WorkItemModel workItemModel = new WorkItemModel();
            string api = string.Empty;
            string commentapi = string.Empty;
            if (id.ToString() != null)
            {
                api = String.Format(VSTSAPI.GetWorkItemsById, _appSettings.VSTS.AccountName,id);
                commentapi = String.Format(VSTSAPI.GetWorkItemCommentsByID, _appSettings.VSTS.AccountName, id);
            }
            return  await _dataRepository.GetWorkItemById(api,commentapi);
        }

        //public Task<List<BarChartModel>> GetAllProjectWorkItemStatus(string userId)
        //{
        //    throw new NotImplementedException();
        //}



        public async Task<List<BarChartModel>> GetUserProjetsAndCustomStatus(int projectId)
        {
            var userprojects = await _projectdata.GetUserProjetsAndCustomStatus(projectId);
            return await _dataRepository.GetBarChartsData(userprojects);
        }

        public async Task<DashboardChartModel> GetAllChartsData(int projectId, string userId)
        {
            List<string> projectNames = await _projectdata.GetProjectName(projectId, userId);
            var adminProjSettings = await _projectdata.GetProjectSettings(projectId, userId);
            var customStatus = await _projectdata.GetProjectCustomStatus(projectId, userId);
            return await _dataRepository.AsyncGetAllWorkItems(adminProjSettings, customStatus, projectNames);
        }
    }
}
