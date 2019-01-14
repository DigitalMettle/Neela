using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using VSTDesk.Model;
using VSTDesk.Models;

namespace VSTDesk.Logic
{
    public interface IWorkItemsRepository
    {
        Task<bool> CreateWorkItem(WorkItemModel workItemModelModel,bool isAdmin, string userId);
        
        Task<WorkItemModel> GetProjectWorkItemById(int id);
        Task <WorkItemHierarchy> GetProjectWorkItems(int projectId);
        Task<List<BarChartModel>> GetUserProjetsAndCustomStatus(int projeictId);
        Task<DashboardChartModel> GetAllChartsData(int projectId, string userId);
    }
}
