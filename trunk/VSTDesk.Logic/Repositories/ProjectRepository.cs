using System;
using System.Collections.Generic;
using System.Text;
using VSTDesk.Data;
using VSTDesk.Api;
using System.Threading.Tasks;
using VSTDesk.Models;
using System.Net.Http;
using VSTDesk.Common;
using Newtonsoft.Json.Linq;
using VSTDesk.DB.Entities;
using System.Reflection;
using System.Linq;
using Microsoft.Extensions.Options;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using VSTDesk.Model;

namespace VSTDesk.Logic
{
    public class ProjectRepository : IProjectRepository
    {

        private readonly IDataRepository _dataRepository;
        private readonly IProjectData _projectData;
        AppSettings _appSettings;

        public ProjectRepository(IProjectData projectData, IDataRepository dataRepository, IOptions<AppSettings> appSettings)
        {
            _dataRepository = dataRepository;
            _projectData = projectData;
            _appSettings = appSettings.Value;
        }

        public async Task<bool> GetProjects()
        {
            try
            {
                List<WorkItemsModel> listWorkItems = await GetProjectWorkItems();
                List<ProjectModel> projectList = new List<ProjectModel>();
                var apiName = string.Format(VSTSAPI.GetAllProjects, _appSettings.VSTS.AccountName);

                //Call VSTS get all projects API
                (bool isSuccess, JObject projects) = await _dataRepository.Get(apiName);
                if (isSuccess)
                {
                    InsertProjects(projectList, projects);

                    isSuccess = await SetProjects(projectList);

                    if (isSuccess)
                    {
                        List<WorkItemsModel> listWorkItemsState = new List<WorkItemsModel>();
                        projectList = await GetProjectsList();
                        List<WorkItemsModel> workItemStateList = await GetWorkItemList();
                        foreach (ProjectModel model in projectList)
                        {
                            foreach (WorkItemsModel workItem in listWorkItems)
                            {
                                apiName = string.Format(VSTSAPI.GetWorkItemStatus,_appSettings.VSTS.AccountName, model.Name, workItem.Name);
                                (bool isWorkItemSuccess, JObject WorkItems) = await _dataRepository.Get(apiName);
                                if (isWorkItemSuccess)
                                {
                                    mapDataToWorkItem(listWorkItemsState, model.Id, WorkItems, workItemStateList);
                                }
                            }
                        }

                        //If atleast one item found for insert then it will work
                        isSuccess = listWorkItemsState.Count() > 0 ? await insertAndUpdateWorkItemState(listWorkItemsState) : true;

                    }

                }

                return isSuccess;
            }
            catch (Exception ex)
            {
            }

            return false;
        }

        /// <summary>
        /// Get All Work item list related to project
        /// </summary>
        /// <returns></returns>
        public async Task<List<WorkItemsModel>> GetWorkItemList(int projectId = 0)
        {
            List<WorkItemsState> workItemStates = await _projectData.GetWorkItemsState();
            if (projectId == 0)
            {
                return workItemStates.Select(x => new WorkItemsModel() { Id = x.ProjectId, Name = x.Name }).ToList();
            }
            else
            {
                return workItemStates.Where(x => x.ProjectId == projectId).Select(x => new WorkItemsModel() { Id = x.ProjectId, Name = x.Name }).ToList();
            }

        }

        private async Task<bool> insertAndUpdateWorkItemState(List<WorkItemsModel> listWorkItem)
        {
            return await _projectData.insertAndUpdateWorkItemState(listWorkItem);
        }

        private void mapDataToWorkItem(List<WorkItemsModel> listWorkItemsState, int id, JObject workItems, List<WorkItemsModel> workItemStateList)
        {
            List<WorkItemsModel> newWorkItemModel = new List<WorkItemsModel>();
            foreach (var item in workItems["value"])
            {
                var projectModel = new WorkItemsModel()
                {
                    Id = id,
                    Name = item["name"].ToString()
                };

                if (listWorkItemsState.Where(x => x.Id == id && x.Name == projectModel.Name).Count() == 0 && workItemStateList.Where(x => x.Name == projectModel.Name && x.Id == id).Count() == 0)
                {
                    listWorkItemsState.Add(projectModel);
                }

            }
        }

        public async Task<List<ProjectModel>> GetProjectsList(string userId = null)
        {
            return await _projectData.FetchProjectsLists(userId);
        }

        public async Task<ProjectSettingsModel> GetProjectSettings(int projectId)
        {
            var projectSettings = await _projectData.GetProjectSettings(projectId);

            ProjectSettingsModel projectSettingsModel = null;

            if (projectSettings != null && projectSettings.Count > 0)
            {
                //Set Project Settings.
                projectSettingsModel = await SetProjectSettings(projectSettings[0] , projectId);

                string id =await _projectData.GetProjectId(projectId);
                projectSettingsModel.MemberList = await _dataRepository.GetMemberList(id);

                //Fetch Custom status for the project.
                List<DB.Entities.CustomStatus> customStatus = await _projectData.GetProjectCustomStatus(projectId);

                //Bind CustomStatus model by CustomStatus Entity model. 
                projectSettingsModel.CustomStatus = SetCustomStatus(customStatus);
            }

            return projectSettingsModel;
        }

        public async Task<bool> UpdateProjectSettings(ProjectSettingsModel projectSettingsModel)
        {
            //Set the ProjectSettingsModel data to AdminMasterSettings entity model.
            var adminMasterSettings = new AdminMasterSettings()
            {
                Id = projectSettingsModel.Id,
                ProjectId = projectSettingsModel.ProjectId,
                CreatedItemStatus = projectSettingsModel.CreatedItemStatus,
                DefaultAssignment = projectSettingsModel.DefaultAssignment,
                VstdeskActive = projectSettingsModel.VSTDeskActive,
                CreatedItemType = projectSettingsModel.CreatedItemType,
                EditableFields = getValues(projectSettingsModel.EditableFields),
                Layout = getValues(projectSettingsModel.Layout),
                GridVisibleFields = getValues(projectSettingsModel.GridVisibleFields),
                Status = string.Join(",", projectSettingsModel.WorkItemsState.Where(x => x.IsSelected == true).Select(y => y.Name)),// getValues(projectSettingsModel.Status),
                WorkItems = string.Join(",", projectSettingsModel.WorkItemsList.Where(x => x.IsSelected == true).Select(y => y.Name))

            };
            List<DB.Entities.CustomStatus> customStatus = new List<DB.Entities.CustomStatus>();

            projectSettingsModel.CustomStatus.ForEach(cs =>
                    customStatus.Add(new DB.Entities.CustomStatus()
                    {
                        Id = cs.Id,
                        DisplayName = cs.DisplayName,
                        ProjectId = cs.ProjectId,
                        StatusName = cs.StatusName
                    })
                );
            bool isSuccess = await _projectData.UpdateProjectSettings(adminMasterSettings, customStatus);
            return isSuccess;
        }

        /// <summary>
        /// Return value in comma seprated form.
        /// </summary>
        /// <param name="editableFields"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        private string getValues<T>(T obj)
        {
            string strValue = string.Empty;
            PropertyInfo[] properties = obj.GetType().GetProperties();
            foreach (var item in properties)
            {
                bool isActive = false;
                object obj1 = new object();
                isActive = Convert.ToBoolean(item.GetValue(obj, null));
                if (isActive)
                {
                    string s = Regex.Replace(item.Name.ToString(), "([a-z])([A-Z])", "$1 $2");

                    strValue = (string.IsNullOrEmpty(strValue)) == true ? $"{strValue}{s}" : $"{strValue},{s}";
                }

            }
            return strValue;

        }

        #region ======================================================= Private Methods===========================================================================

        /// <summary>
        /// Bind CustomStatus model by CustomStatus Entity model.
        /// </summary>
        /// <param name="projectSettingsModel"></param>
        /// <returns></returns>
        private List<CustomStatusModel> SetCustomStatus(List<DB.Entities.CustomStatus> projectSettingsModel)
        {
            List<CustomStatusModel> customlist = new List<CustomStatusModel>();
            projectSettingsModel.ForEach(psm =>
                                            customlist.Add(new CustomStatusModel()
                                            {
                                                Id = psm.Id,
                                                ProjectId = psm.ProjectId,
                                                StatusName = psm.StatusName,
                                                DisplayName = psm.DisplayName
                                            })
                                         );
            return customlist;
        }

        /// <summary>
        /// Set ProjectSettingsModel Settings by EntityModel
        /// </summary>
        /// <param name="projectSttings"></param>
        /// <returns></returns>
        private async Task<ProjectSettingsModel> SetProjectSettings(AdminMasterSettings projectSettings , int projectId)
        {
            ProjectSettingsModel projectSettingsModel = new ProjectSettingsModel
            {
                Id = projectSettings.Id,
                ProjectId = projectSettings.ProjectId,
                VSTDeskActive = projectSettings.VstdeskActive,
                CreatedItemStatus = projectSettings.CreatedItemStatus,
                CreatedItemType = projectSettings.CreatedItemType,
                DefaultAssignment = projectSettings.DefaultAssignment,
                Layout = new Models.Layout(),
                GridVisibleFields = new GridVisibleFieldsModel(),
                WorkItemsList = await setWorkItemsModel(projectSettings.WorkItems != null ? projectSettings.WorkItems.Split(',').ToList() : new List<string>()),
                EditableFields = new Models.EditableFields(),
                WorkItemsState = await SetItemStatus(projectSettings.Status !=null ? projectSettings.Status.Split(",").ToList() : new List<string>() , projectId) //new Models.Status()
            };

            SetProperties(projectSettings.Layout.Replace(" ", ""), typeof(Models.Layout), projectSettingsModel.Layout);

            SetProperties(projectSettings.GridVisibleFields.Replace(" ", ""), typeof(Models.GridVisibleFieldsModel), projectSettingsModel.GridVisibleFields);


            SetProperties(projectSettings.EditableFields.Replace(" ", ""), typeof(Models.EditableFields), projectSettingsModel.EditableFields);

            return projectSettingsModel;

        }

        private async Task<List<WorkItemsModel>> SetItemStatus(List<string> list , int projectId)
        {
            List<WorkItemsModel> listWorksItemsState = await GetWorkItemList(projectId);
            listWorksItemsState.ForEach(res =>
            {
                res.IsSelected = list.Contains(res.Name) ? true : false;
            });

            return listWorksItemsState;

        }

        private async Task<List<WorkItemsModel>> setWorkItemsModel(List<string> workItems)
        {
            List<WorkItemsModel> workItemlist = await GetProjectWorkItems();
            // workItems.Split(',')

            workItemlist.ForEach(res =>
            {
                res.IsSelected = workItems.Contains(res.Name) ? true : false;
            });

            return workItemlist;
        }

        /// <summary>
        /// Bind the values to the type of object is passed.
        /// </summary>
        /// <param name="values"></param>
        /// <param name="type"></param>
        /// <param name="instance"></param>
        private void SetProperties(string values, Type type, object instance)
        {
            PropertyInfo[] properties = type.GetProperties();
            foreach (var item in properties)
            {
                if (values.Contains(item.Name.ToString()))
                {
                    item.SetValue(instance, true, null);
                }
            }
        }

        private void InsertProjects(List<ProjectModel> projectList, JObject projects)
        {
            foreach (var item in projects["value"])
            {
                var projectModel = new ProjectModel()
                {
                    ProjectId = Guid.Parse(item["id"].ToString()),
                    Name = item["name"].ToString()
                };
                projectList.Add(projectModel);

            }
        }

        private async Task<bool> SetProjects(List<ProjectModel> projectList)
        {
            bool isSuccess = await _projectData.UpdateProjects(projectList);
            return isSuccess;
        }

        #endregion

        public async Task<bool> RemoveUsers(string id)
        {
            var isSuccess = _projectData.DeleteUserData(id);
            return true;
        }

        public async Task<List<string>> getProjectStatus(int id)
        {
            return await _projectData.GetProjectStatusById(id);
        }

        public async Task<List<WorkItemsModel>> GetProjectWorkItems()
        {
            return await _projectData.GetProjectWorkItems();
        }

        public async Task<List<Series>> GetUsersByProject()
        {
            return await _projectData.GetUsersByProject();
        }

        public async Task<EditableFields> GetEditableItems(int id)
        {
            if(id>0)
            {
                ProjectSettingsModel projectSettingsModel = await GetProjectSettings(id);
                return projectSettingsModel.EditableFields;
            }
            return null;
           
        }

        public async Task<GridVisibleFieldsModel> GetGridColumnFields(int id)
        {
            if(id>0)
            {
                ProjectSettingsModel projectSettingsModel = await GetProjectSettings(id);
                return projectSettingsModel.GridVisibleFields;
            }
            return null;
        }
    }
}
