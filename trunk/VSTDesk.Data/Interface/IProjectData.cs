using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using VSTDesk.DB.Entities;
using VSTDesk.Model;
using VSTDesk.Models;

namespace VSTDesk.Data
{
    public interface IProjectData
    {
        Task<bool> UpdateProjects(List<ProjectModel> projectModel);
        Task<List<ProjectModel>> FetchProjectsLists(string userId=null);
        Task<bool> DeleteUserData(string id);
        Task<List<AdminMasterSettings>> GetProjectSettings(int projectId, string userId = null);
        Task<List<DB.Entities.CustomStatus>> GetProjectCustomStatus(int projectId, string userId = null);
        Task<bool> UpdateProjectSettings(AdminMasterSettings adminMasterSettings, List<DB.Entities.CustomStatus> customStatus);
        Task<List<string>> GetProjectName(int id, string userId = null);
        Task<List<ProjectsAndCustomStatusModel>> GetUserProjetsAndCustomStatus(int projectId);
        Task<List<string>> GetProjectStatusById(int id);
        Task<List<WorkItemsModel>> GetProjectWorkItems();
        Task<bool> insertAndUpdateWorkItemState(List<WorkItemsModel> listWorkItem);
        Task<List<WorkItemsState>> GetWorkItemsState();
        Task<List<Series>> GetUsersByProject();
        Task<string> GetProjectId(int projectId);
    }
}