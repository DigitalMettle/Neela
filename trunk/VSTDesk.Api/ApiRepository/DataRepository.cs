using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using VSTDesk.Common;
using VSTDesk.Data;
using VSTDesk.DB.Entities;
using VSTDesk.Model;
using VSTDesk.Models;

namespace VSTDesk.Api
{
    public class DataRepository : IDataRepository
    {
        private readonly IAccountData _accountData;
        AppSettings _appSettings;
        EmailService _emailService;

        public DataRepository(IAccountData accountData, IOptions<AppSettings> appSettings, EmailService emailService)
        {
            _accountData = accountData;
            _appSettings = appSettings.Value;
            _emailService = emailService;
        }

        public async Task<(bool isSuccess, JObject data)> Get(string apiName, string query = "", string token1 = "")
        {
            //bool isSuccess = false;
            //(string token, string refereshToken) = await _accountData.GetToken();
            //if (string.IsNullOrEmpty(token))
            //{
            //    return (isSuccess: false, data: null);
            //}
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Add(
                        new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                     Convert.ToBase64String(
                         System.Text.ASCIIEncoding.ASCII.GetBytes(
                             string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));
                    // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    using (HttpResponseMessage response = await client.GetAsync(
                               apiName))
                    {
                        if (response.StatusCode == HttpStatusCode.OK)
                        {
                            //response.EnsureSuccessStatusCode();
                            string responseBody = await response.Content.ReadAsStringAsync();
                            JObject results = JObject.Parse(responseBody);
                            return (isSuccess: true, data: results);
                        }
                        else if (response.StatusCode == HttpStatusCode.NonAuthoritativeInformation)
                        {
                            // Need to ask from Ashu
                            return (isSuccess: false, data: null);
                        }
                        else if (response.StatusCode == HttpStatusCode.Unauthorized)
                        {
                            SendPATExpirationEmailToAdmin();
                            return (isSuccess: false, data: null);
                        }
                        else
                        {
                            //isSuccess = await RefreshToken(refereshToken);
                            return await Get(apiName, query, string.Empty);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> RefreshToken(string refreshToken)
        {

            VstTokenModel token = new VstTokenModel();
            String error = null;
            bool isSuccess = false;

            if (!String.IsNullOrEmpty(refreshToken))
            {
                error = PerformTokenRequest(GenerateRefreshPostData(refreshToken), out token);
                if (String.IsNullOrEmpty(error))
                {
                    isSuccess = await _accountData.AddAdminToken(token, string.Empty);
                }
            }
            return isSuccess;
        }

        private String PerformTokenRequest(Dictionary<string, string> postData, out VstTokenModel token)
        {
            var error = String.Empty;
            try
            {
                using (var httpClient = new HttpClient())
                {
                    using (var content = new FormUrlEncodedContent(postData))
                    {
                        content.Headers.Clear();
                        content.Headers.Add("Content-Type", "application/x-www-form-urlencoded");

                        HttpResponseMessage response = httpClient.PostAsync(_appSettings.AppSettingOauth.TokenUrl, content).Result;

                        var result = response.Content.ReadAsStringAsync().Result;
                        token = JsonConvert.DeserializeObject<VstTokenModel>(result);
                        //calling addAdminToken Method when admin is true
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                token = new VstTokenModel();
                return string.Empty;
            }
        }

        public Dictionary<string, string> GenerateRefreshPostData(string refreshToken)
        {
            Dictionary<string, string> authdictionary = new Dictionary<string, string>();
            authdictionary.Add("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer");
            authdictionary.Add("client_assertion", _appSettings.AppSettingOauth.AppSecret);
            authdictionary.Add("grant_type", "refresh_token");
            authdictionary.Add("assertion", refreshToken);
            authdictionary.Add("redirect_uri", _appSettings.AppSettingOauth.CallbackUrl);
            return authdictionary;
        }

        public async Task<Tuple<HttpStatusCode, VSTSMemberModel>> generateTfsToken(TokenModel tokenModel, string userId)
        {

            VstTokenModel token = new VstTokenModel();
            String error = null;
            if (!String.IsNullOrEmpty(tokenModel.Code))
            {
                error = PerformTokenRequest(GenerateRequestPostData(tokenModel.Code), out token);
                if (String.IsNullOrEmpty(error))
                {
                    if (string.IsNullOrEmpty(_appSettings.VSTS.VSTSGroupName))
                    {
                        return new Tuple<HttpStatusCode, VSTSMemberModel>(HttpStatusCode.BadRequest, null);
                    }

                    VSTSGroupsModel vstsGroups = await GetVSTSGroups();
                    if (vstsGroups == null ||
                        vstsGroups.Groups.Count(group => group.GroupName.ToString().ToLower() == _appSettings.VSTS.VSTSGroupName.ToLower()) == 0)
                    {
                        return new Tuple<HttpStatusCode, VSTSMemberModel>(HttpStatusCode.BadRequest, null);
                    }

                    VSTSGroupModel vstsGroupModel = vstsGroups.Groups.Where(group => group.GroupName.ToString().ToLower() == _appSettings.VSTS.VSTSGroupName.ToLower()).FirstOrDefault();
                    VSTSMembersResponseModel vstsGroupMembers = await GetVSTSGroupMembers(vstsGroupModel);
                    if (vstsGroupMembers == null)
                    {
                        return new Tuple<HttpStatusCode, VSTSMemberModel>(HttpStatusCode.BadRequest, null);
                    }

                    VSTSMemberModel vstsMemberModel = await GetUserProfileUsingToken(token.accessToken);
                    if (vstsMemberModel == null && string.IsNullOrEmpty(vstsMemberModel.emailAddress))
                    {
                        return new Tuple<HttpStatusCode, VSTSMemberModel>(HttpStatusCode.NotFound, null);
                    }

                    if (vstsGroupMembers.members.Count(member => member.user.mailAddress == vstsMemberModel.emailAddress) > 0)
                        return new Tuple<HttpStatusCode, VSTSMemberModel>(HttpStatusCode.OK, vstsMemberModel);
                    else
                        return new Tuple<HttpStatusCode, VSTSMemberModel>(HttpStatusCode.NotFound, null);
                }
                new Tuple<HttpStatusCode, VSTSMemberModel>(HttpStatusCode.BadRequest, null);
            }

            return new Tuple<HttpStatusCode, VSTSMemberModel>(HttpStatusCode.BadRequest, null);
        }

        public async Task<VSTSMemberModel> GetUserProfileUsingToken(string token)
        {
            var error = String.Empty;
            try
            {
                using (var client = new HttpClient())
                {
                    //set our headers
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    var method = new HttpMethod("GET");
                    var requestWorkItem = new HttpRequestMessage(method, _appSettings.VSTS.UserProfileUrl);
                    using (HttpResponseMessage responseWorkItem = await client.SendAsync(requestWorkItem))
                    {
                        if (responseWorkItem.IsSuccessStatusCode && responseWorkItem.StatusCode == HttpStatusCode.OK)
                        {
                            return JsonConvert.DeserializeObject<VSTSMemberModel>(responseWorkItem.Content.ReadAsStringAsync().Result);
                            //if (result != null && !string.IsNullOrEmpty(result.emailAddress))
                            //{
                            //    return vstsGroupMembers.members.Count(member => member.user.emailAddress == result.emailAddress) > 0;
                            //}

                            //return false;
                        }

                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                return null;
            }


        }

        public async Task<VSTSMembersResponseModel> GetVSTSGroupMembers(VSTSGroupModel vstsGroupModel)
        {
            //string personalAccessToken = _accountData.GetPersonalAccessToken();
            //if (personalAccessToken == null)
            //    return null;

            var error = String.Empty;
            using (var client = new HttpClient())
            {
                //set our headers
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(
                System.Text.ASCIIEncoding.ASCII.GetBytes(
                    string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));

                var method = new HttpMethod("GET");
                var requestWorkItem = new HttpRequestMessage(method, string.Format(_appSettings.VSTS.GroupMembersUrl, _appSettings.VSTS.AccountName, vstsGroupModel.GroupId));
                using (HttpResponseMessage responseWorkItem = await client.SendAsync(requestWorkItem))
                {
                    if (responseWorkItem.IsSuccessStatusCode && responseWorkItem.StatusCode == HttpStatusCode.OK)
                    {
                        return JsonConvert.DeserializeObject<VSTSMembersResponseModel>(responseWorkItem.Content.ReadAsStringAsync().Result);
                    }
                    else if (responseWorkItem.StatusCode == HttpStatusCode.NonAuthoritativeInformation)
                    {
                        // Need to ask from Ashu
                        return null;
                    }
                    else if (responseWorkItem.StatusCode == HttpStatusCode.Unauthorized)
                    {
                        SendPATExpirationEmailToAdmin();
                        return null;
                    }
                    else
                        return null;
                }
            }
        }

        public async Task<VSTSGroupsModel> GetVSTSGroups()
        {
            //string personalAccessToken = _accountData.GetPersonalAccessToken();
            //if (personalAccessToken == null)
            //    return null;

            var error = String.Empty;
            using (var client = new HttpClient())
            {
                //set our headers
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(
                System.Text.ASCIIEncoding.ASCII.GetBytes(
                    string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));

                var method = new HttpMethod("GET");
                var requestWorkItem = new HttpRequestMessage(method, String.Format(_appSettings.VSTS.GroupListUrl, _appSettings.VSTS.AccountName));
                using (HttpResponseMessage responseWorkItem = await client.SendAsync(requestWorkItem))
                {
                    if (responseWorkItem.IsSuccessStatusCode && responseWorkItem.StatusCode == HttpStatusCode.OK)
                    {
                        return JsonConvert.DeserializeObject<VSTSGroupsModel>(responseWorkItem.Content.ReadAsStringAsync().Result);
                    }
                    else if (responseWorkItem.StatusCode == HttpStatusCode.NonAuthoritativeInformation)
                    {
                        // Need to ask from Ashu
                        return null;
                    }
                    else if (responseWorkItem.StatusCode == HttpStatusCode.Unauthorized)
                    {
                        SendPATExpirationEmailToAdmin();
                        return null;
                    }
                    else
                        return null;
                }
            }
        }

        private Dictionary<string, string> GenerateRequestPostData(string code)
        {
            Dictionary<string, string> authdictionary = new Dictionary<string, string>();
            authdictionary.Add("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer");
            authdictionary.Add("client_assertion", _appSettings.AppSettingOauth.AppSecret);
            authdictionary.Add("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
            authdictionary.Add("assertion", code);
            authdictionary.Add("redirect_uri", _appSettings.AppSettingOauth.CallbackUrl);
            return authdictionary;
        }

        /// <summary>
        /// Create User Story
        /// </summary>
        /// <param name="userStoryModel"></param>
        /// <returns></returns>
        public async Task<bool> CreateWorkItem(WorkItemModel workItemModel, string api, string userName, string token1 = "")
        {
            //bool isSuccess = false;

            //(string token, string refereshToken) = await _accountData.GetToken();
            //if (string.IsNullOrEmpty(token))
            //{
            //    return isSuccess;
            //}
            try
            {
                Object[] patchDocument;
                if (workItemModel.WorkItemId <= 0)
                {
                    if (!string.IsNullOrWhiteSpace(workItemModel.AssignTo))
                    {
                        patchDocument = new Object[9];
                        patchDocument[0] = new { op = "add", path = "/fields/System.Title", value = (string.IsNullOrWhiteSpace(workItemModel.Title) == true ? "" : workItemModel.Title) };
                        patchDocument[1] = new { op = "add", path = "/fields/System.Description", value = (string.IsNullOrWhiteSpace(workItemModel.Description) == true ? "" : workItemModel.Description) };
                        patchDocument[2] = new { op = "add", path = "/fields/Microsoft.VSTS.Common.Priority", value = (string.IsNullOrWhiteSpace(workItemModel.Priority) == true ? "1" : workItemModel.Priority) };
                        patchDocument[3] = new { op = "add", path = "/fields/Microsoft.VSTS.Common.Severity", value = "2 - High" };
                        patchDocument[4] = new { op = "add", path = "/fields/System.AssignedTo", value = workItemModel.AssignTo };
                        patchDocument[5] = new { op = "add", path = "/fields/System.Tags", value = "Created By Customer" };
                        patchDocument[6] = new { op = "add", path = "/fields/System.CreatedBy", value = userName };
                        patchDocument[7] = new { op = "add", path = "/fields/System.ChangedBy", value = userName };
                        patchDocument[8] = new { op = "add", path = "/fields/Custom.ShowInNeela", value = "true" };
                    }
                    else
                    {
                        patchDocument = new Object[5];
                        patchDocument[0] = new { op = "add", path = "/fields/System.Title", value = (string.IsNullOrWhiteSpace(workItemModel.Title) == true ? "" : workItemModel.Title) };
                        patchDocument[1] = new { op = "add", path = "/fields/System.Description", value = (string.IsNullOrWhiteSpace(workItemModel.Description) == true ? "" : workItemModel.Description) };
                        patchDocument[2] = new { op = "add", path = "/fields/Microsoft.VSTS.Common.Priority", value = (string.IsNullOrWhiteSpace(workItemModel.Priority) == true ? "1" : workItemModel.Priority) };
                        patchDocument[3] = new { op = "add", path = "/fields/Microsoft.VSTS.Common.Severity", value = "2 - High" };
                        patchDocument[4] = new { op = "add", path = "/fields/System.Tags", value = "Created By Customer" };
                    }

                }
                else
                {
                    patchDocument = new Object[2];
                    patchDocument[0] = new { op = "add", path = "/fields/System.Title", value = (string.IsNullOrWhiteSpace(workItemModel.Title) == true ? "" : workItemModel.Title) };
                    patchDocument[1] = new { op = "add", path = "/fields/System.Description", value = (string.IsNullOrWhiteSpace(workItemModel.Description) == true ? "" : workItemModel.Description) };

                }

                //string personalAccessToken = _accountData.GetPersonalAccessToken();
                //if (personalAccessToken == null)
                //    return false;

                using (var client = new HttpClient())
                {
                    //set our headers
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                     Convert.ToBase64String(
                         System.Text.ASCIIEncoding.ASCII.GetBytes(
                             string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));
                    //serialize the fields array into a json string
                    var patchValue = new StringContent(JsonConvert.SerializeObject(patchDocument), Encoding.UTF8, "application/json-patch+json");

                    var method = new HttpMethod("PATCH");
                    var request = new HttpRequestMessage(method, api) { Content = patchValue };
                    using (HttpResponseMessage response = await client.SendAsync(request))
                    {

                        //if the response is successfull, set the result to the workitem object
                        if (response.IsSuccessStatusCode && response.StatusCode == HttpStatusCode.OK)
                        {
                            var result = response.Content.ReadAsStringAsync().Result;
                            JObject results = JObject.Parse(result);
                            if (workItemModel.WorkItemId <= 0)
                            {
                                await UpdateStatusAsync(workItemModel, Convert.ToInt32(results["id"]), userName);

                            }


                            if (!string.IsNullOrEmpty(workItemModel.Comment))
                            {
                                await AddComment(Convert.ToInt32(results["id"].ToString()), workItemModel.Comment, userName);

                            }
                            return true;
                        }
                        else if (response.StatusCode == HttpStatusCode.NonAuthoritativeInformation)
                        {
                            // Need to ask from Ashu
                            return false;
                        }
                        else if (response.StatusCode == HttpStatusCode.Unauthorized)
                        {
                            //isSuccess = await RefreshToken(refereshToken);
                            return await CreateWorkItem(workItemModel, api, string.Empty);

                            //}
                        }

                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task<bool> UpdateStatusAsync(WorkItemModel workItemModel, int id, string username)
        {
            //bool isSuccess = false;

            //(string token, string refereshToken) = await _accountData.GetToken();
            //if (string.IsNullOrEmpty(token))
            //{
            //    return isSuccess;
            //}
            try
            {
                string apiUpdate = string.Format(VSTSAPI.UpdateWorkItem, _appSettings.VSTS.AccountName, workItemModel.ProjectId, id, _appSettings.VSTS.ByPassRules);

                Object[] patchDocument = new Object[2];

                patchDocument[0] = new { op = "add", path = "/fields/System.State", value = (!string.IsNullOrWhiteSpace(workItemModel.State)) ? workItemModel.State : "New" };
                patchDocument[1] = new { op = "add", path = "/fields/System.ChangedBy", value = username };

                //string personalAccessToken = _accountData.GetPersonalAccessToken();
                //if (personalAccessToken == null)
                //    return false;

                using (var client = new HttpClient())
                {
                    //set our headers
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                     Convert.ToBase64String(
                         System.Text.ASCIIEncoding.ASCII.GetBytes(
                             string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));

                    //serialize the fields array into a json string
                    var patchValue = new StringContent(JsonConvert.SerializeObject(patchDocument), Encoding.UTF8, "application/json-patch+json");

                    var method = new HttpMethod("PATCH");
                    var request = new HttpRequestMessage(method, apiUpdate) { Content = patchValue };
                    using (HttpResponseMessage response = await client.SendAsync(request))
                    {

                        //if the response is successfull, set the result to the workitem object
                        if (response.IsSuccessStatusCode && response.StatusCode == HttpStatusCode.OK)
                        {
                            var result = response.Content.ReadAsStringAsync().Result;
                            JObject results = JObject.Parse(result);
                            return true;
                        }
                        else if (response.StatusCode == HttpStatusCode.NonAuthoritativeInformation)
                        {
                            // Need to ask from Ashu
                            return false;
                        }
                        else if (response.StatusCode == HttpStatusCode.Unauthorized)
                        {
                            SendPATExpirationEmailToAdmin();
                            return false;
                        }
                        else
                        {
                            //isSuccess = await RefreshToken(refereshToken);
                            return await UpdateStatusAsync(workItemModel, id, username);

                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return false;


        }

        public async Task<bool> AddComment(int workItemId, string comment, string userName)
        {
            //bool isSuccess = false;
            comment = AddUserNameInComment(comment, userName);
            //(string token, string refereshToken) = await _accountData.GetToken();
            //if (string.IsNullOrEmpty(token))
            //{
            //    return isSuccess;
            //}
            try
            {
                Object[] patchDocument = new Object[1];
                patchDocument[0] = new { op = "add", path = "/fields/System.History", value = comment };

                //string personalAccessToken = _accountData.GetPersonalAccessToken();
                //if (personalAccessToken == null)
                //    return false;

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                     Convert.ToBase64String(
                         System.Text.ASCIIEncoding.ASCII.GetBytes(
                             string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));

                    //serialize the fields array into a json string
                    var patchValue = new StringContent(JsonConvert.SerializeObject(patchDocument), Encoding.UTF8, "application/json-patch+json");

                    var method = new HttpMethod("PATCH");
                    var request = new HttpRequestMessage(method, String.Format(VSTSAPI.PatchWorkItemDetails, _appSettings.VSTS.AccountName, workItemId)) { Content = patchValue };
                    var response = client.SendAsync(request).Result;

                    if (response.IsSuccessStatusCode && response.StatusCode == HttpStatusCode.OK)
                    {
                        var result = response.Content.ReadAsStringAsync().Result;
                        return true;
                    }
                    else if (response.StatusCode == HttpStatusCode.NonAuthoritativeInformation)
                    {
                        // Need to ask from Ashu
                        return false;
                    }
                    else if (response.StatusCode == HttpStatusCode.Unauthorized)
                    {
                        SendPATExpirationEmailToAdmin();
                        return false;
                    }
                    else
                    {
                        //   isSuccess = await RefreshToken(refereshToken);
                        return await AddComment(workItemId, comment, userName);

                    }

                }

            }
            catch (Exception ex)
            {

            }
            return false;
        }

        private string AddUserNameInComment(string comment, string userName)
        {
            return $"<div style='color:blue; '>@VSTDesk</div> <div style='color:chocolate;'>{userName}</div> <div>{comment}<div>";

        }

        public async Task<WorkItemHierarchy> GetProjectWorkItems(AdminMasterSettings adminMasterSettings, List<CustomStatus> listCustomStatus, string projectName)
        {

            bool isSuccess = false;
            WorkItemHierarchy workItemHierarchy = new WorkItemHierarchy();
            List<WorkItemsNew> workItemParent = new List<WorkItemsNew>();
            List<WorkItemsNew> workItemChild = new List<WorkItemsNew>();
            WorkItemQueryResult workItemQueryResult = null; ;

            // (string token, string refereshToken) = await _accountData.GetToken();
            //if (string.IsNullOrEmpty(token))
            //{
            //  return workItemHierarchy;
            //}
            object wiql;

            //create wiql object
            if (adminMasterSettings.Layout.ToLower() == "flat")
            {
                wiql = new
                {
                    query = "Select [State], [Title] " +
                            "From WorkItems " +
                            "Where [Work Item Type] IN('" + AddSingleQuotesInString(adminMasterSettings.WorkItems) + "') " +
                            "And [System.TeamProject] = '" + projectName + "' " +
                            "And [System.State] IN ('" + AddSingleQuotesInString(adminMasterSettings.Status) + "' ) " +
                            "Order By [State] Asc," +
                            "[Changed Date] Desc"
                };
            }
            else
            {
                wiql = new
                {
                    query = "SELECT [System.Id], [System.Links.LinkType], [System.WorkItemType], [System.Title], [System.State] " +
                    "FROM WorkItemLinks " +
                    "WHERE (" +
                    "[Source].[System.TeamProject]= '" + projectName + "' " +
                    "AND  [Source].[System.WorkItemType] IN GROUP 'Microsoft.RequirementCategory'" +
                    "AND  [Source].[System.State] IN ('" + AddSingleQuotesInString(adminMasterSettings.Status) + "')" +
                    ") " +
                    //"AND ([System.Links.LinkType] <> '') " +
                    "And ([Target].[System.State] IN ('" + AddSingleQuotesInString(adminMasterSettings.Status) + "') " +
                    "AND [Target].[System.WorkItemType]  IN ('" + AddSingleQuotesInString(adminMasterSettings.WorkItems) + "')" +
                    ")" +
                    " mode(MustContain)"
                };
            }

            await AsyncGetAllWorkItems(new List<AdminMasterSettings>() { adminMasterSettings }, listCustomStatus, new List<string>() { projectName });

            //string personalAccessToken = _accountData.GetPersonalAccessToken();
            //if (personalAccessToken == null)
            //    return null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(String.Format(VSTSAPI.BaseAddress, _appSettings.VSTS.AccountName));
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                     Convert.ToBase64String(
                         System.Text.ASCIIEncoding.ASCII.GetBytes(
                             string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));

                //serialize the wiql object into a json string   
                var postValue = new StringContent(JsonConvert.SerializeObject(wiql), Encoding.UTF8, "application/json"); //mediaType needs to be application/json for a post call

                var method = new HttpMethod("POST");
                var httpRequestMessage = new HttpRequestMessage(method, String.Format(VSTSAPI.GetProjectWorkItems, _appSettings.VSTS.AccountName)) { Content = postValue };
                var httpResponseMessage = client.SendAsync(httpRequestMessage).Result;
                if (httpResponseMessage.IsSuccessStatusCode && httpResponseMessage.StatusCode == HttpStatusCode.OK)
                {
                    workItemQueryResult = JsonConvert.DeserializeObject<WorkItemQueryResult>(httpResponseMessage.Content.ReadAsStringAsync().Result);

                    //now that we have a bunch of work items, build a list of id's so we can get details
                    var builder = new System.Text.StringBuilder();
                    if (adminMasterSettings.Layout.ToLower() == "flat")
                    {
                        foreach (var item in workItemQueryResult.WorkItems)
                        {
                            builder.Append(item.Id.ToString()).Append(",");
                        }

                        //clean up string of id's
                        string ids = builder.ToString().TrimEnd(new char[] { ',' });
                        HttpResponseMessage getWorkItemsHttpResponse = null;

                        if (ids.Length > 800)
                        {
                            while (ids.Length > 0)
                            {
                                string str = ids.Length >= 800 ? ids.Substring(0, 800) : ids;
                                int index = str.LastIndexOf(',');
                                str = index < 0 ? str : str.Substring(0, index);
                                ids = index < 0 ? "" : ids.Substring(str.Length + 1);
                                getWorkItemsHttpResponse = client.GetAsync(String.Format(VSTSAPI.GetWorkItems, str, workItemQueryResult.AsOf)).Result;
                                if (getWorkItemsHttpResponse.IsSuccessStatusCode && getWorkItemsHttpResponse.StatusCode == HttpStatusCode.OK)
                                {
                                    WorkItemsNew result = JsonConvert.DeserializeObject<WorkItemsNew>(getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result);
                                    workItemParent.Add(result);
                                }
                                else
                                {
                                    //isSuccess = await RefreshToken(refereshToken);
                                    //return await GetProjectWorkItems(adminMasterSettings, listCustomStatus, projectName);
                                    return new WorkItemHierarchy();
                                }
                            }

                        }

                        else if (ids.Length > 0)
                        {

                            getWorkItemsHttpResponse = client.GetAsync(String.Format(VSTSAPI.GetWorkItems, ids, workItemQueryResult.AsOf)).Result;
                            if (getWorkItemsHttpResponse.IsSuccessStatusCode && getWorkItemsHttpResponse.StatusCode == HttpStatusCode.OK)
                            {
                                WorkItemsNew result = JsonConvert.DeserializeObject<WorkItemsNew>(getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result);
                                workItemParent.Add(result);
                            }
                            else
                            {
                                //isSuccess = await RefreshToken(refereshToken);
                                return await GetProjectWorkItems(adminMasterSettings, listCustomStatus, projectName);
                            }
                        }

                    }
                    else if (adminMasterSettings.Layout.ToLower() == "hierarchical")
                    {
                        foreach (var item in workItemQueryResult.WorkItemRelations.Where(w => w.Source == null).ToList())
                        {
                            builder.Append(item.Target.Id.ToString()).Append(",");
                        }

                        //clean up string of id's
                        string ids = builder.ToString().TrimEnd(new char[] { ',' });

                        var builderIds = new System.Text.StringBuilder();
                        foreach (var item in workItemQueryResult.WorkItemRelations.Where(w => w.Source != null).ToList())
                        {
                            builderIds.Append(item.Target.Id.ToString()).Append(",");
                        }
                        string childIds = builderIds.ToString().TrimEnd(new char[] { ',' });

                        HttpResponseMessage getWorkItemsHttpResponse = null;

                        if (ids.Length > 800)
                        {
                            while (ids.Length > 0)
                            {
                                string str = ids.Length >= 800 ? ids.Substring(0, 800) : ids;
                                int index = str.LastIndexOf(',');
                                str = index < 0 ? str : str.Substring(0, index);
                                ids = index < 0 ? "" : ids.Substring(str.Length + 1);
                                getWorkItemsHttpResponse = client.GetAsync(String.Format(VSTSAPI.GetWorkItems, str, workItemQueryResult.AsOf)).Result;
                                if (getWorkItemsHttpResponse.IsSuccessStatusCode && getWorkItemsHttpResponse.StatusCode == HttpStatusCode.OK)
                                {
                                    WorkItemsNew result = JsonConvert.DeserializeObject<WorkItemsNew>(getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result);
                                    workItemParent.Add(result);
                                }
                                else
                                {
                                    //isSuccess = await RefreshToken(refereshToken);
                                    return await GetProjectWorkItems(adminMasterSettings, listCustomStatus, projectName);
                                }
                            }

                        }

                        else if (ids.Length > 0)
                        {

                            getWorkItemsHttpResponse = client.GetAsync(String.Format(VSTSAPI.GetWorkItems, ids, workItemQueryResult.AsOf)).Result;
                            if (getWorkItemsHttpResponse.IsSuccessStatusCode && getWorkItemsHttpResponse.StatusCode == HttpStatusCode.OK)
                            {
                                WorkItemsNew result = JsonConvert.DeserializeObject<WorkItemsNew>(getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result);
                                workItemParent.Add(result);


                            }
                            else
                            {
                                //isSuccess = await RefreshToken(refereshToken);
                                return await GetProjectWorkItems(adminMasterSettings, listCustomStatus, projectName);
                            }
                        }


                        if (childIds.Length > 800)
                        {
                            while (childIds.Length > 0)
                            {
                                string str = childIds.Length >= 800 ? childIds.Substring(0, 800) : childIds;
                                int index = str.LastIndexOf(',');
                                str = index < 0 ? str : str.Substring(0, index);
                                childIds = index < 0 ? "" : childIds.Substring(str.Length + 1);
                                getWorkItemsHttpResponse = client.GetAsync(String.Format(VSTSAPI.GetWorkItems, str, workItemQueryResult.AsOf)).Result;
                                if (getWorkItemsHttpResponse.IsSuccessStatusCode && getWorkItemsHttpResponse.StatusCode == HttpStatusCode.OK)
                                {
                                    WorkItemsNew result = JsonConvert.DeserializeObject<WorkItemsNew>(getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result);
                                    workItemChild.Add(result);
                                }
                                else
                                {
                                    //isSuccess = await RefreshToken(refereshToken);
                                    return await GetProjectWorkItems(adminMasterSettings, listCustomStatus, projectName);
                                }
                            }

                        }

                        else if (childIds.Length > 0)
                        {

                            getWorkItemsHttpResponse = client.GetAsync(String.Format(VSTSAPI.GetWorkItems, childIds, workItemQueryResult.AsOf)).Result;
                            if (getWorkItemsHttpResponse.IsSuccessStatusCode && getWorkItemsHttpResponse.StatusCode == HttpStatusCode.OK)
                            {
                                WorkItemsNew result = JsonConvert.DeserializeObject<WorkItemsNew>(getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result);
                                workItemChild.Add(result);


                            }
                            else
                            {
                                //isSuccess = await RefreshToken(refereshToken);
                                return await GetProjectWorkItems(adminMasterSettings, listCustomStatus, projectName);
                            }
                        }

                    }

                }
                else if (httpResponseMessage.StatusCode == HttpStatusCode.NonAuthoritativeInformation || httpResponseMessage.StatusCode == HttpStatusCode.BadRequest)
                {
                    // Need to ask from Ashu
                    return null;
                }
                else if (httpResponseMessage.StatusCode == HttpStatusCode.Unauthorized)
                {
                    SendPATExpirationEmailToAdmin();
                    return null;
                }
                else
                {
                    //isSuccess = await RefreshToken(refereshToken);
                    return await GetProjectWorkItems(adminMasterSettings, listCustomStatus, projectName);
                }
            }
            if (adminMasterSettings.Layout.ToLower() == "hierarchical")
            {
                WorkItemGridModel parentModel = new WorkItemGridModel();
                WorkItemGridModel childModel = new WorkItemGridModel();
                foreach (var item in workItemParent)
                {
                    parentModel.Count = parentModel.Count + item.Count;
                    parentModel.Item.AddRange(item.Value);
                }
                foreach (var item in workItemChild)
                {
                    childModel.Count = childModel.Count + item.Count;
                    childModel.Item.AddRange(item.Value);
                }

                workItemHierarchy.Count = parentModel.Count;
                parentModel.Item.ForEach(p =>
                {
                    if (adminMasterSettings.VstdeskActive)
                    {
                        if (p.Fields.ShowInNeela)
                        {
                            workItemHierarchy.Items.Add(new WorkItemList() { Field = new Field() { Id = p.Id, Description = p.Fields.Description, State = listCustomStatus.Where(l => l.StatusName == p.Fields.State).FirstOrDefault().DisplayName, Title = p.Fields.Title, WorkItemType = p.Fields.WorkItemType, ShowInNeela = p.Fields.ShowInNeela } });
                        }

                    }
                    else
                    {
                        workItemHierarchy.Items.Add(new WorkItemList() { Field = new Field() { Id = p.Id, Description = p.Fields.Description, State = listCustomStatus.Where(l => l.StatusName == p.Fields.State).FirstOrDefault().DisplayName, Title = p.Fields.Title, WorkItemType = p.Fields.WorkItemType, ShowInNeela = p.Fields.ShowInNeela } });
                    }

                });
                workItemHierarchy.Items.ForEach(w =>
                {
                    var ids = workItemQueryResult.WorkItemRelations.Where(wo => wo.Source != null && wo.Source.Id == w.Field.Id).Select(x => x.Target.Id).ToList();
                    if (adminMasterSettings.VstdeskActive)
                    {
                        w.ChildList.AddRange(childModel.Item.Where(c => ids.Contains(c.Id) && c.Fields.WorkItemType != "User Story" && c.Fields.ShowInNeela)
                                                                                .Select(x =>
                                                                                            new Field()
                                                                                            {
                                                                                                Id = x.Fields.Id,
                                                                                                WorkItemType = x.Fields.WorkItemType,
                                                                                                Description = x.Fields.Description,
                                                                                                State = listCustomStatus.Where(l => l.StatusName == x.Fields.State).FirstOrDefault().DisplayName,
                                                                                                Title = x.Fields.Title,
                                                                                                ShowInNeela = x.Fields.ShowInNeela
                                                                                            }
                                                                                       )
                                                                                .ToList());
                    }
                    else
                    {
                        w.ChildList.AddRange(childModel.Item.Where(c => ids.Contains(c.Id) && c.Fields.WorkItemType != "User Story")
                                                      .Select(x =>
                                                                  new Field()
                                                                  {
                                                                      Id = x.Fields.Id,
                                                                      WorkItemType = x.Fields.WorkItemType,
                                                                      Description = x.Fields.Description,
                                                                      State = listCustomStatus.Where(l => l.StatusName == x.Fields.State).FirstOrDefault().DisplayName,
                                                                      Title = x.Fields.Title,
                                                                      ShowInNeela = x.Fields.ShowInNeela
                                                                  }
                                                             )
                                                      .ToList());
                    }

                    w.Count = ids.Count;

                });

                // Calling Flat structure API again to get unparented Task 

                wiql = new
                {
                    query = "Select [State], [Title] " +
                            "From WorkItems " +
                            "Where [Work Item Type] IN('" + AddSingleQuotesInString(adminMasterSettings.WorkItems) + "') " +
                            "And [System.TeamProject] = '" + projectName + "' " +
                            "And [System.State] IN ('" + AddSingleQuotesInString(adminMasterSettings.Status) + "' ) " +
                            "Order By [State] Asc," +
                            "[Changed Date] Desc"
                };

                using (var client = new HttpClient())
                {

                    client.BaseAddress = new Uri(String.Format(VSTSAPI.BaseAddress, _appSettings.VSTS.AccountName));
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                     Convert.ToBase64String(
                         System.Text.ASCIIEncoding.ASCII.GetBytes(
                             string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));

                    //serialize the wiql object into a json string   
                    var postValue = new StringContent(JsonConvert.SerializeObject(wiql), Encoding.UTF8, "application/json"); //mediaType needs to be application/json for a post call

                    var method = new HttpMethod("POST");
                    var httpRequestMessage = new HttpRequestMessage(method, String.Format(VSTSAPI.GetProjectWorkItems, _appSettings.VSTS.AccountName)) { Content = postValue };
                    var httpResponseMessage = client.SendAsync(httpRequestMessage).Result;
                    if (httpResponseMessage.IsSuccessStatusCode && httpResponseMessage.StatusCode == HttpStatusCode.OK)
                    {
                        workItemQueryResult = JsonConvert.DeserializeObject<WorkItemQueryResult>(httpResponseMessage.Content.ReadAsStringAsync().Result);

                        //now that we have a bunch of work items, build a list of id's so we can get details
                        var builder = new System.Text.StringBuilder();

                        foreach (var item in workItemQueryResult.WorkItems)
                        {
                            builder.Append(item.Id.ToString()).Append(",");
                        }

                        //clean up string of id's
                        string ids = builder.ToString().TrimEnd(new char[] { ',' });
                        HttpResponseMessage getWorkItemsHttpResponse = null;
                        workItemParent = new List<WorkItemsNew>();
                        if (ids.Length > 800)
                        {
                            while (ids.Length > 0)
                            {
                                string str = ids.Length >= 800 ? ids.Substring(0, 800) : ids;
                                int index = str.LastIndexOf(',');
                                str = index < 0 ? str : str.Substring(0, index);
                                ids = index < 0 ? "" : ids.Substring(str.Length + 1);
                                getWorkItemsHttpResponse = client.GetAsync(String.Format(VSTSAPI.GetWorkItems, str, workItemQueryResult.AsOf)).Result;
                                if (getWorkItemsHttpResponse.IsSuccessStatusCode && getWorkItemsHttpResponse.StatusCode == HttpStatusCode.OK)
                                {
                                    WorkItemsNew result = JsonConvert.DeserializeObject<WorkItemsNew>(getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result);
                                    workItemParent.Add(result);
                                }
                                else
                                {
                                    //isSuccess = await RefreshToken(refereshToken);
                                    return await GetProjectWorkItems(adminMasterSettings, listCustomStatus, projectName);
                                }
                            }
                        }

                        else if (ids.Length > 0)
                        {

                            getWorkItemsHttpResponse = client.GetAsync(String.Format(VSTSAPI.GetWorkItems, ids, workItemQueryResult.AsOf)).Result;
                            if (getWorkItemsHttpResponse.IsSuccessStatusCode && getWorkItemsHttpResponse.StatusCode == HttpStatusCode.OK)
                            {
                                WorkItemsNew result = JsonConvert.DeserializeObject<WorkItemsNew>(getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result);
                                workItemParent.Add(result);
                            }
                            else
                            {
                                //isSuccess = await RefreshToken(refereshToken);
                                return await GetProjectWorkItems(adminMasterSettings, listCustomStatus, projectName);
                            }
                        }
                    }
                    else if (httpResponseMessage.StatusCode == HttpStatusCode.NonAuthoritativeInformation)
                    {
                        // Need to ask from Ashu
                        return null;
                    }
                    else if (httpResponseMessage.StatusCode == HttpStatusCode.Unauthorized)
                    {
                        SendPATExpirationEmailToAdmin();
                        return null;
                    }
                    else
                    {
                        //isSuccess = await RefreshToken(refereshToken);
                        return await GetProjectWorkItems(adminMasterSettings, listCustomStatus, projectName);
                    }
                }

                parentModel = new WorkItemGridModel();
                foreach (var item in workItemParent)
                {
                    //parentModel.Count = parentModel.Count + item.Count;
                    parentModel.Item.AddRange(item.Value);
                }

                WorkItemHierarchy remainingWorkItemList = new WorkItemHierarchy();
                parentModel.Item.ForEach(p =>
                {
                    if (adminMasterSettings.VstdeskActive)
                    {
                        if (p.Fields.ShowInNeela)
                        {
                            remainingWorkItemList.Items.Add(new WorkItemList()
                            {
                                Field = new Field()
                                {
                                    Id = p.Id,
                                    Description = p.Fields.Description,
                                    State = listCustomStatus.Where(l => l.StatusName == p.Fields.State).FirstOrDefault().DisplayName,
                                    Title = p.Fields.Title,
                                    WorkItemType = p.Fields.WorkItemType,
                                    ShowInNeela = p.Fields.ShowInNeela
                                }
                            });
                        }

                    }
                    else
                    {
                        remainingWorkItemList.Items.Add(new WorkItemList()
                        {
                            Field = new Field()
                            {
                                Id = p.Id,
                                Description = p.Fields.Description,
                                State = listCustomStatus.Where(l => l.StatusName == p.Fields.State).FirstOrDefault().DisplayName,
                                Title = p.Fields.Title,
                                WorkItemType = p.Fields.WorkItemType,
                                ShowInNeela = p.Fields.ShowInNeela
                            }
                        });
                    }
                });

                // add all those Ids which is already in work item
                var alreadyAddedIds = new List<int>();
                foreach (var item in workItemHierarchy.Items)
                {
                    alreadyAddedIds.Add(item.Field.Id);
                    foreach (var child in item.ChildList)
                    {
                        alreadyAddedIds.Add(child.Id);
                    }
                }

                // add all those ids which is not in a work item
                remainingWorkItemList.Items = remainingWorkItemList.Items.Where(x => (!alreadyAddedIds.Contains(x.Field.Id)) && (x.Field.WorkItemType == "Bug" || x.Field.WorkItemType == "Task")).ToList();

                if (remainingWorkItemList.Items.Count > 0)
                {
                    workItemHierarchy.Items.Insert(0, new WorkItemList() { ChildList = new List<Field>(), Count = 0, Field = new Field() { Description = "", ShowInNeela = true, State = "New", Title = "Unparented Tasks and Bugs", WorkItemType = "" } });
                    workItemHierarchy.Count++;

                    // unparented task will always be on 0 index 
                    workItemHierarchy.Items[0].ChildList.AddRange(remainingWorkItemList.Items.Select(x => x.Field));
                    // End Here
                }
            }
            else
            {
                WorkItemGridModel parentModel = new WorkItemGridModel();

                foreach (var item in workItemParent)
                {
                    parentModel.Count = parentModel.Count + item.Count;
                    parentModel.Item.AddRange(item.Value);
                }
                parentModel.Item.ForEach(p =>
                {
                    if (adminMasterSettings.VstdeskActive)
                    {
                        if (p.Fields.ShowInNeela)
                        {
                            workItemHierarchy.Items.Add(new WorkItemList()
                            {
                                Field = new Field()
                                {
                                    Id = p.Id,
                                    Description = p.Fields.Description,
                                    State = listCustomStatus.Where(l => l.StatusName == p.Fields.State).FirstOrDefault().DisplayName,
                                    Title = p.Fields.Title,
                                    WorkItemType = p.Fields.WorkItemType,
                                    ShowInNeela = p.Fields.ShowInNeela
                                }
                            });
                        }

                    }
                    else
                    {
                        workItemHierarchy.Items.Add(new WorkItemList()
                        {
                            Field = new Field()
                            {
                                Id = p.Id,
                                Description = p.Fields.Description,
                                State = listCustomStatus.Where(l => l.StatusName == p.Fields.State).FirstOrDefault().DisplayName,
                                Title = p.Fields.Title,
                                WorkItemType = p.Fields.WorkItemType,
                                ShowInNeela = p.Fields.ShowInNeela
                            }
                        });
                    }
                });
            }

            return workItemHierarchy;
        }

        private string AddSingleQuotesInString(string str)
        {
            return string.Join("','", (str.Split(',').ToList()).Select(i => i.Replace("'", "''")).ToArray());
        }

        public async Task<WorkItemModel> GetWorkItemById(string api, string commentapi)
        {
            //bool isSuccess = false;

            //(string token, string refereshToken) = await _accountData.GetToken();
            //if (string.IsNullOrEmpty(token))
            //{
            //    return await GetWorkItemById(api, commentapi);
            //}

            //string personalAccessToken = _accountData.GetPersonalAccessToken();
            //if (personalAccessToken == null)
            //    return null;

            using (var client = new HttpClient())
            {

                //set our headers
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                //                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                     Convert.ToBase64String(
                         System.Text.ASCIIEncoding.ASCII.GetBytes(
                             string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));
                var method = new HttpMethod("GET");
                var requestWorkItem = new HttpRequestMessage(method, api);
                var requestComment = new HttpRequestMessage(method, commentapi);
                using (HttpResponseMessage responseWorkItem = await client.SendAsync(requestWorkItem))
                {
                    WorkItemComments resultComment;
                    if (responseWorkItem.IsSuccessStatusCode && responseWorkItem.StatusCode == HttpStatusCode.OK)
                    {
                        WorkItemsNew resultWorkItem = JsonConvert.DeserializeObject<WorkItemsNew>(responseWorkItem.Content.ReadAsStringAsync().Result);

                        using (HttpResponseMessage responseComments = await client.SendAsync(requestComment))
                        {
                            if (responseWorkItem.IsSuccessStatusCode && responseWorkItem.StatusCode == HttpStatusCode.OK)
                            {
                                resultComment = JsonConvert.DeserializeObject<WorkItemComments>(responseComments.Content.ReadAsStringAsync().Result);

                                var item = resultWorkItem.Value.FirstOrDefault();

                                var workmodel = new WorkItemModel()
                                {
                                    Id = item.Id,
                                    Title = item.Fields.Title,
                                    Description = item.Fields.Description,

                                };

                                List<Comments> com = new List<Comments>();
                                resultComment.Comments.Where(d => d.text.Contains("@VSTDesk")).ToList().ForEach(c =>
                                 {
                                     string text = "";
                                     if (c.text.Contains("chocolate"))
                                     {
                                         int indexofChoc = c.text.IndexOf("chocolate") + 12;
                                         text = c.text.Substring(indexofChoc);
                                         text = text.Substring(0, text.IndexOf("</div>"));

                                     }
                                     if (!string.IsNullOrWhiteSpace(text))
                                     {
                                         c.text = c.text.Replace(text, "");
                                     }
                                     c.text = c.text.Replace("@VSTDesk", "");
                                     com.Add(new Comments()
                                     {
                                         Text = c.text,
                                         Date = c.revisedDate,
                                         Name = c.text.Contains("chocolate") ? text : c.revisedBy.name.Substring(c.revisedBy.name.IndexOf('<') + 1, (c.revisedBy.name.LastIndexOf('>') - 1) - c.revisedBy.name.IndexOf('<')),
                                     });

                                 });
                                workmodel.totalCount = resultComment.Comments.Count;
                                var sortedCommentList = com.Select(x => new { Date = Convert.ToDateTime(x.Date), x.Text, x.Name })
                                         .OrderByDescending(x => x.Date)
                                         .ToList();
                                workmodel.CommentList.AddRange(sortedCommentList.Select(x => new Comments() { Date = x.Date.ToString(), Name = x.Name, Text = x.Text }));
                                return workmodel;
                            }
                            else
                            {
                                //isSuccess = await RefreshToken(refereshToken);
                                return await GetWorkItemById(api, commentapi);
                            }

                        }
                    }
                    else if (responseWorkItem.StatusCode == HttpStatusCode.NonAuthoritativeInformation)
                    {
                        // Need to ask from Ashu
                        return null;
                    }
                    else if (responseWorkItem.StatusCode == HttpStatusCode.Unauthorized)
                    {
                        SendPATExpirationEmailToAdmin();
                        return null;
                    }
                    else
                    {
                        //isSuccess = await RefreshToken(refereshToken);
                        return await GetWorkItemById(api, commentapi);

                    }

                }


            }
        }

        public async Task<List<BarChartModel>> GetBarChartsData(List<ProjectsAndCustomStatusModel> userprojects)
        {
            List<BarChartModel> bachartModel = new List<BarChartModel>();
            foreach (var item in userprojects)
            {

                bachartModel.Add(await GetProjectStatusCountAsync(item));
            }
            return bachartModel;
        }

        private async Task<BarChartModel> GetProjectStatusCountAsync(ProjectsAndCustomStatusModel projectsAndCustomStatusModel)
        {
            List<string> status = projectsAndCustomStatusModel.AdminMasterSettings.Status.Split(",").ToList();
            object wiql;
            BarChartModel barChartModel = new BarChartModel();

            foreach (var item in status)
            {
                barChartModel.Name = projectsAndCustomStatusModel.Name;

                wiql = new
                {
                    query = "Select [State], [Title] " +
                             "From WorkItems " +
                             "Where [Work Item Type] IN('" + AddSingleQuotesInString(projectsAndCustomStatusModel.AdminMasterSettings.WorkItems) + "') " +
                             "And [System.TeamProject] = '" + projectsAndCustomStatusModel.Name + "' " +
                             "And [System.State] IN ('" + item + "' ) " +
                             "Order By [State] Asc," +
                             "[Changed Date] Desc"
                };

                int count = await GetCountStatusByQuery(wiql);
                barChartModel.Series.Add(new Series() { Name = item, Value = count });

            }

            return barChartModel;
        }

        private async Task<int> GetCountStatusByQuery(object wiql)
        {
            //bool isSuccess = false;
            //(string token, string refereshToken) = await _accountData.GetToken();
            //if (string.IsNullOrEmpty(token))
            //{
            //    return 0;
            //}

            //string personalAccessToken = _accountData.GetPersonalAccessToken();
            //if (personalAccessToken == null)
            //    return 0;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(String.Format(VSTSAPI.BaseAddress, _appSettings.VSTS.AccountName));
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                     Convert.ToBase64String(
                         System.Text.ASCIIEncoding.ASCII.GetBytes(
                             string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));

                //serialize the wiql object into a json string   
                var postValue = new StringContent(JsonConvert.SerializeObject(wiql), Encoding.UTF8, "application/json"); //mediaType needs to be application/json for a post call

                var method = new HttpMethod("POST");
                var httpRequestMessage = new HttpRequestMessage(method, String.Format(VSTSAPI.GetProjectWorkItems, _appSettings.VSTS.AccountName)) { Content = postValue };
                var httpResponseMessage = client.SendAsync(httpRequestMessage).Result;
                if (httpResponseMessage.IsSuccessStatusCode && httpResponseMessage.StatusCode == HttpStatusCode.OK)
                {
                    var result = JsonConvert.DeserializeObject<WorkItemQueryResult>(httpResponseMessage.Content.ReadAsStringAsync().Result);
                    return result.WorkItems.Count();
                }
                else if (httpResponseMessage.StatusCode == HttpStatusCode.NonAuthoritativeInformation)
                {
                    // Need to ask from Ashu
                    return 0;
                }
                else if (httpResponseMessage.StatusCode == HttpStatusCode.Unauthorized)
                {
                    SendPATExpirationEmailToAdmin();
                    return 0;
                }
                else
                {
                    //isSuccess = await RefreshToken(refereshToken);
                    return await GetCountStatusByQuery(wiql);

                }
            }
        }

        public async Task<List<string>> GetMemberList(string projectId)
        {
            //string personalAccessToken = _accountData.GetPersonalAccessToken();
            //if (personalAccessToken == null)
            //    return null;

            using (var client = new HttpClient())
            {

                //set our headers
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));

                var method = new HttpMethod("GET");
                var requestTeamId = new HttpRequestMessage(method, string.Format(VSTSAPI.GetProjectTeamId, _appSettings.VSTS.AccountName, projectId));

                using (HttpResponseMessage responseWorkItem = await client.SendAsync(requestTeamId))
                {

                    if (responseWorkItem.IsSuccessStatusCode && responseWorkItem.StatusCode == HttpStatusCode.OK)
                    {
                        TeamModel resultTeamModel = JsonConvert.DeserializeObject<TeamModel>(responseWorkItem.Content.ReadAsStringAsync().Result);
                        string id = resultTeamModel.value.FirstOrDefault().id;

                        var requestTeamMembers = new HttpRequestMessage(method, string.Format(VSTSAPI.GetProjectTeamMembers, _appSettings.VSTS.AccountName, projectId, id));
                        using (HttpResponseMessage responseItems = await client.SendAsync(requestTeamMembers))
                        {

                            if (responseItems.IsSuccessStatusCode && responseItems.StatusCode == HttpStatusCode.OK)
                            {
                                List<string> listMembers = new List<string>();
                                var results = JObject.Parse(responseItems.Content.ReadAsStringAsync().Result);
                                foreach (var item in results["value"])
                                {
                                    if (!item["identity"]["displayName"].ToString().Contains("["))
                                    {
                                        listMembers.Add(item["identity"]["displayName"].ToString());
                                    }

                                }
                                return listMembers;
                            }
                            else
                            {
                                //isSuccess = await RefreshToken(refereshToken);
                                return await GetMemberList(projectId);
                            }
                        }
                    }
                    else if (responseWorkItem.StatusCode == HttpStatusCode.NonAuthoritativeInformation)
                    {
                        // Need to ask from Ashu
                        return null;
                    }
                    else if (responseWorkItem.StatusCode == HttpStatusCode.Unauthorized)
                    {
                        SendPATExpirationEmailToAdmin();
                        return null;
                    }
                    else
                    {
                        //isSuccess = await RefreshToken(refereshToken);
                        return await GetMemberList(projectId);
                    }
                }

            }

        }

        public async Task<DashboardChartModel> AsyncGetAllWorkItems(List<AdminMasterSettings> adminMasterSettings, List<CustomStatus> listCustomStatus, List<string> projectNames)
        {

            WorkItemHierarchy workItemHierarchy = new WorkItemHierarchy();
            List<WorkItemsNew> workItemParent = new List<WorkItemsNew>();
            List<WorkItemsNew> workItemChild = new List<WorkItemsNew>();
            WorkItemQueryResult workItemQueryResult = null;
            DashboardChartModel dashboardChartModel = new DashboardChartModel();

            var wiql = new
            {
                query = "Select [State], [Title] " +
                           "From WorkItems " +
                           "Where [System.TeamProject] IN ('" + AddSingleQuotesInString(string.Join(",", projectNames)) + "') " + //+ projectName + "' " +
                           "And [System.State] Not IN ('Closed' ) " +
                           "Order By [State] Asc," +
                           "[Changed Date] Desc"
            };

            //var wiql = new
            //{
            //    query = "Select [State], [Title] " +
            //   "From WorkItems " +
            //   "Where [System.TeamProject] IN ('SDS Macoy','JGH') " + //+ projectName + "' " +
            //   "And [System.State] Not IN ('Closed' ) " +
            //   "Order By [State] Asc," +
            //   "[Changed Date] Desc"
            //};

            //string personalAccessToken = _accountData.GetPersonalAccessToken();
            //if (personalAccessToken == null)
            //    return null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(String.Format(VSTSAPI.BaseAddress, _appSettings.VSTS.AccountName));
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                     Convert.ToBase64String(
                         System.Text.ASCIIEncoding.ASCII.GetBytes(
                             string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));

                //serialize the wiql object into a json string   
                var postValue = new StringContent(JsonConvert.SerializeObject(wiql), Encoding.UTF8, "application/json"); //mediaType needs to be application/json for a post call

                var method = new HttpMethod("POST");
                var httpRequestMessage = new HttpRequestMessage(method, String.Format(VSTSAPI.GetProjectWorkItems, _appSettings.VSTS.AccountName)) { Content = postValue };
                var httpResponseMessage = client.SendAsync(httpRequestMessage).Result;
                if (httpResponseMessage.IsSuccessStatusCode && httpResponseMessage.StatusCode == HttpStatusCode.OK)
                {
                    workItemQueryResult = JsonConvert.DeserializeObject<WorkItemQueryResult>(httpResponseMessage.Content.ReadAsStringAsync().Result);

                    //now that we have a bunch of work items, build a list of id's so we can get details
                    var builder = new System.Text.StringBuilder();

                    foreach (var item in workItemQueryResult.WorkItems)
                    {
                        builder.Append(item.Id.ToString()).Append(",");
                    }

                    //clean up string of id's
                    string ids = builder.ToString().TrimEnd(new char[] { ',' });
                    HttpResponseMessage getWorkItemsHttpResponse = null;

                    if (ids.Length > 800)
                    {
                        while (ids.Length > 0)
                        {
                            string str = ids.Length >= 800 ? ids.Substring(0, 800) : ids;
                            int index = str.LastIndexOf(',');
                            str = index < 0 ? str : str.Substring(0, index);
                            ids = index < 0 ? "" : ids.Substring(str.Length + 1);
                            getWorkItemsHttpResponse = client.GetAsync(String.Format(VSTSAPI.GetWorkItems, str, workItemQueryResult.AsOf)).Result;

                            if (getWorkItemsHttpResponse.IsSuccessStatusCode && getWorkItemsHttpResponse.StatusCode == HttpStatusCode.OK)
                            {
                                WorkItemsNew result = JsonConvert.DeserializeObject<WorkItemsNew>(getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result);
                                workItemParent.Add(result);
                            }
                            else
                            {
                                //isSuccess = await RefreshToken(refereshToken);
                                //return await AsyncGetAllWorkItems(adminMasterSettings, listCustomStatus, projectName);
                                return new DashboardChartModel();
                            }
                        }

                    }

                    else if (ids.Length > 0)
                    {

                        getWorkItemsHttpResponse = client.GetAsync(String.Format(VSTSAPI.GetWorkItems, ids, workItemQueryResult.AsOf)).Result;
                        if (getWorkItemsHttpResponse.IsSuccessStatusCode && getWorkItemsHttpResponse.StatusCode == HttpStatusCode.OK)
                        {
                            WorkItemsNew result = JsonConvert.DeserializeObject<WorkItemsNew>(getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result);
                            workItemParent.Add(result);

                        }
                        else
                        {
                            //isSuccess = await RefreshToken(refereshToken);
                            //return await AsyncGetAllWorkItems(adminMasterSettings, listCustomStatus, projectName);
                            return new DashboardChartModel();
                        }
                    }
                    WorkItemGridModel dataModel = new WorkItemGridModel();

                    workItemParent.ForEach(w =>
                    {
                        dataModel.Item.AddRange(w.Value);

                    });

                    dataModel.Item.ForEach(d =>
                    {
                        d.Fields.State = listCustomStatus.Where(l => l.StatusName == d.Fields.State && l.Project.Name == d.Fields.ProjectName).FirstOrDefault() != null ? listCustomStatus.Where(l => l.StatusName == d.Fields.State && l.Project.Name == d.Fields.ProjectName).FirstOrDefault().DisplayName : string.Empty;

                    });

                    adminMasterSettings.ForEach(item =>
                    {
                        if (item.VstdeskActive)
                        {
                            dataModel.Item.RemoveAll(d => d.Fields.ShowInNeela == false && d.Fields.ProjectName == item.Project.Name);
                        }
                    });

                    //if (adminMasterSettings.VstdeskActive)
                    //{
                    //    dataModel.Item.RemoveAll(d => d.Fields.ShowInNeela == false );
                    //}

                    //dataModel.Item.RemoveAll(d => d.Fields.State!="Planning" || d.Fields.State != "In Progress" || d.Fields.State != "Testing");

                    #region Creating Chart Data ===================================================
                    List<ChartModel> barChartList = new List<ChartModel>();
                    List<ChartModel> lineChartListFirst = new List<ChartModel>();
                    List<ChartModel> lineChartListSecond = new List<ChartModel>();
                    List<String> workItemList = new List<String>();
                    List<String> customStatusList = new List<String>();
                    List<String> adminProjectSettingStates = new List<String>();

                    if (projectNames.Count == 1)
                    {
                        adminProjectSettingStates= adminMasterSettings[0].Status.Split(",").ToList();
                        foreach(var status in adminProjectSettingStates)
                        {
                            if (listCustomStatus.Where(d => d.StatusName == status).Select(d => d.DisplayName).FirstOrDefault() != null  && listCustomStatus.Where(d => d.StatusName == status).Select(d => d.DisplayName).FirstOrDefault()!="")
                            { customStatusList.Add(listCustomStatus.Where(d => d.StatusName == status).Select(d => d.DisplayName).FirstOrDefault()); }
                        }
                        
                        if(customStatusList.Count==0)
                        {
                            customStatusList.Add("");
                        }
                        else
                        {
                            customStatusList = customStatusList.Distinct().ToList();
                        }
                        //customStatusList = listCustomStatus.Select(d => d.DisplayName).Distinct().ToList();
                        workItemList = adminMasterSettings[0].WorkItems.Split(",").ToList();
                        
                        //To get top 5 custom state with higher number of tickets
                        if (customStatusList.Count > 5)
                        {
                            Dictionary<string, int> customStatusCount = new Dictionary<string, int>();

                            foreach (var state in customStatusList)
                            {
                                customStatusCount.Add(state, dataModel.Item.Where(i => i.Fields.State == state).Count());
                            }


                            customStatusList = customStatusCount.OrderByDescending(x => x.Value).Select(x => x.Key).Take(5).ToList();
                        }

                        foreach (var item in workItemList)
                        {
                            List<int> dataList = new List<int>();
                            foreach (var state in customStatusList)
                            {
                                dataList.Add(dataModel.Item.Where(i => i.Fields.State == state && i.Fields.WorkItemType == item).Count());
                            }
                            barChartList.Add(new ChartModel()
                            {
                                data = dataList,
                                label = item
                            });
                        }

                        foreach (var state in customStatusList)

                        {
                            lineChartListFirst.Add(new ChartModel()
                            {
                                data = {dataModel.Item.Where(i => i.Fields.State == state && DateTime.Now.Subtract(i.Fields.ChangedDate).Days>21).Count(),
                               dataModel.Item.Where(i => i.Fields.State == state  && DateTime.Now.Subtract(i.Fields.ChangedDate).Days>14 && DateTime.Now.Subtract(i.Fields.ChangedDate).Days<=21).Count(),
                               dataModel.Item.Where(i => i.Fields.State == state  && DateTime.Now.Subtract(i.Fields.ChangedDate).Days>7 && DateTime.Now.Subtract(i.Fields.ChangedDate).Days<=14).Count(),
                               dataModel.Item.Where(i => i.Fields.State == state  && DateTime.Now.Subtract(i.Fields.ChangedDate).Days>=0 && DateTime.Now.Subtract(i.Fields.ChangedDate).Days<=7 ).Count()
                              },
                                label = state

                            });
                        }

                        foreach (var workItem in workItemList)
                        {
                            lineChartListSecond.Add(new ChartModel()
                            {
                                data ={dataModel.Item.Where(i => i.Fields.WorkItemType == workItem &&  DateTime.Now.Subtract(i.Fields.ChangedDate).Days>21).Count(),
                               dataModel.Item.Where(i => i.Fields.WorkItemType == workItem  && DateTime.Now.Subtract(i.Fields.ChangedDate).Days>14 && DateTime.Now.Subtract(i.Fields.ChangedDate).Days<=21).Count(),
                               dataModel.Item.Where(i => i.Fields.WorkItemType == workItem  && DateTime.Now.Subtract(i.Fields.ChangedDate).Days>7 && DateTime.Now.Subtract(i.Fields.ChangedDate).Days<=14).Count(),
                               dataModel.Item.Where(i => i.Fields.WorkItemType == workItem  && DateTime.Now.Subtract(i.Fields.ChangedDate).Days>=0 && DateTime.Now.Subtract(i.Fields.ChangedDate).Days<=7 ).Count()

                              },
                                label = workItem

                            });
                        }

                    }

                    #endregion
                    dashboardChartModel.BarChartModel = barChartList;
                    dashboardChartModel.FistLineChartModel = lineChartListFirst;
                    dashboardChartModel.SecondLineChartModel = lineChartListSecond;
                    dashboardChartModel.BarChartLabels = customStatusList;

                }


            }

            if (projectNames != null && projectNames.Count == 0)
            {
                using (var client1 = new HttpClient())
                {

                    //set our headers
                    client1.DefaultRequestHeaders.Accept.Clear();
                    client1.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                    client1.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                         Convert.ToBase64String(
                             System.Text.ASCIIEncoding.ASCII.GetBytes(
                                 string.Format("{0}:{1}", "", _appSettings.VSTS.PersonalAccessToken))));
                    var method1 = new HttpMethod("GET");
                    var requestWorkItem = new HttpRequestMessage(method1, string.Format(VSTSAPI.GetProjectSummary, _appSettings.VSTS.AccountName, projectNames[0]));

                    using (HttpResponseMessage responseWorkItem = await client1.SendAsync(requestWorkItem))
                    {

                        if (responseWorkItem.IsSuccessStatusCode && responseWorkItem.StatusCode == HttpStatusCode.OK)
                        {
                            ProjectSummary projectSummary = JsonConvert.DeserializeObject<ProjectSummary>(responseWorkItem.Content.ReadAsStringAsync().Result);
                            if (projectSummary.fps.dataProviders.data.provider is null) { }
                            else
                                dashboardChartModel.Description = projectSummary.fps.dataProviders.data.provider.projectOverviewPageData.projectBasicData.description;


                        }


                    }


                }
            }
            return dashboardChartModel;


        }

        private async Task SendPATExpirationEmailToAdmin()
        {
            _emailService.Send(new List<string>() { _appSettings.VSTS.PersonalAccessTokenEmailReciever }, "Personal Access Token Expiration Alert", "Personal Access Token has expired. Please re-generate your Personal Access Token and configure same in VSTDesk.", "PATExpirationAlert.txt", null, null, _appSettings.VSTS.PersonalAccessTokenEmailRecieverName);
        }
    }

}
