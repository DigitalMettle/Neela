using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using VSTDesk.Model;
using VSTDesk.Models;

namespace VSTDesk.Logic
{
    public interface IProjectRepository
    {
        Task<bool> GetProjects();
        Task<bool> RemoveUsers(string id);
        Task<List<ProjectModel>> GetProjectsList(string userId =null);
        Task<ProjectSettingsModel> GetProjectSettings(int projectId);
        Task<bool> UpdateProjectSettings(ProjectSettingsModel projectSettingsModel);
        Task<List<string>> getProjectStatus(int id);
        Task<List<WorkItemsModel>> GetProjectWorkItems();
        Task<List<Series>> GetUsersByProject();
        Task<GridVisibleFieldsModel> GetGridColumnFields(int id);
        Task<EditableFields> GetEditableItems(int id);

    }
}
