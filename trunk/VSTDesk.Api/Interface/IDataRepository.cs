using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using VSTDesk.DB.Entities;
using VSTDesk.Model;
using VSTDesk.Models;

namespace VSTDesk.Api
{
    public interface IDataRepository
    {
        Task<(bool isSuccess, JObject data)> Get(string apiName, string query = "", string token = "");
        Task<Tuple<HttpStatusCode, VSTSMemberModel>> generateTfsToken(TokenModel tokenMOdel , string userId);
        Task<bool> CreateWorkItem(WorkItemModel userStoryModel,string api,string userName, string token1 = "");
        Task <WorkItemModel> GetWorkItemById(string api, string commentapi);
        Task<List<BarChartModel>> GetBarChartsData(List<ProjectsAndCustomStatusModel> userprojects);
        Task<WorkItemHierarchy> GetProjectWorkItems(AdminMasterSettings adminProjSettings, List<CustomStatus> customStatus, string projectsName);
        Task<List<string>> GetMemberList(string projectId);
        Task<DashboardChartModel> AsyncGetAllWorkItems(List<AdminMasterSettings> adminProjSettings, List<CustomStatus> customStatus, List<string> projectsName);
        Task<VSTSMembersResponseModel> GetVSTSGroupMembers(VSTSGroupModel vstsGroupModel);
        Task<VSTSGroupsModel> GetVSTSGroups();
    }
}
