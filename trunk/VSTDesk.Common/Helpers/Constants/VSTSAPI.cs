using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Common
{
    public class VSTSAPI
    {
        /// <summary>
        /// To Get All projects of this account.
        /// </summary>
        //const string GetAllProjects = "https://{account}.visualstudio.com/DefaultCollection/_apis/projects";
        public const string BaseAddress = "https://dev.azure.com/{0}/";
        public const string GetAllProjects = "https://dev.azure.com/{0}/_apis/projects";
        public const string CreateWorkItem = "https://dev.azure.com/{0}/{1}/_apis/wit/workitems/${2}?bypassRules={3}&api-version=4.1";
        public const string GetWorkItemsById = "https://dev.azure.com/{0}/_apis/wit/workitems?ids={1}&fields=System.Id,System.Title,System.WorkItemType,System.Description&api-version=4.1";
        public const string GetWorkItemCommentsByID = "https://dev.azure.com/{0}/_apis/wit/workitems/{1}/comments?fromRevision=1&order=dsc&api-version=4.1-preview.2";
        public const string UpdateWorkItem = "https://dev.azure.com/{0}/{1}/_apis/wit/workitems/{2}?bypassRules={3}&api-version=4.1";
        public const string GetWorkItemStatus = "https://dev.azure.com/{0}/{1}/_apis/wit/workitemtypes/{2}/states?api-version=4.1-preview.1";
        public const string GetProjectTeamMembers = "https://dev.azure.com/{0}/_apis/projects/{1}/teams/{2}/members?api-version=4.1";
        public const string GetProjectTeamId = "https://dev.azure.com/{0}/_apis/projects/{1}/teams?api-version=4.1";
        public const string GetProjectSummary = "https://dev.azure.com/{0}/{1}?__rt=fps&__ver=2";
        public const string PatchWorkItemDetails = "https://dev.azure.com/{0}/_apis/wit/workitems/{1}?api-version=4.1";
        public const string GetProjectWorkItems = "https://dev.azure.com/{0}/_apis/wit/wiql?api-version=4.1";
        public const string GetWorkItems = "_apis/wit/workitems?ids={0}&fields=System.TeamProject,System.Id,System.WorkItemType,System.Description,System.Title,Custom.ShowInNeela,System.ChangedDate,System.State&asOf={1}&api-version=4.1";

        //public const string GetProjectTeamMembers = "https://{0}.visualstudio.com/_apis/projects/{1}/teams/{2}/members?api-version=4.1";

    }

}
