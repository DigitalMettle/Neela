using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Common
{
    public class AppSettings
    {
        public EmailSettings EmailSettings { get; set; }
        public SupportSettings SupportSettings { get; set; }
        //public VSTSTokenOptions VstsTokenOptions { get; set; }
        public AppSettingOauth AppSettingOauth { get; set; }
        public VSTSService VSTS { get; set; }
        public FolderPath FolderPath { get; set; }
    }
    //public class VSTSTokenOptions
    //{
    //    public string TokenUrl { get; set; }

    //    public string AppSecret { get; set; }

    //    public string Scope { get; set; }

    //    public string CallbackUrl { get; set; }
    //}

    public class AppSettingOauth
    {
        public string AppId { get; set; }
        public string AppSecret { get; set; }
        public string Scope { get; set; }
        public string AuthUrl { get; set; }
        public string TokenUrl { get; set; }
        public string CallbackUrl { get; set; }

    }
    public class VSTSService
    {
        public string AccountName { get; set; }
        public string ByPassRules { get; set; }
        public string UserProfileUrl { get; set; }
        public string GroupListUrl { get; set; }
        public string VSTSGroupName { get; set; }
        public string GroupMembersUrl { get; set; }
        public string PersonalAccessToken { get; set; }
        public string PersonalAccessTokenEmailReciever { get; set; }
        public string PersonalAccessTokenEmailRecieverName { get; set; }
        public string APIVersion { get; set; }
    }

    public class FolderPath
    {
        public string Path { get; set; }
        public string ImagePath { get; set; }
        public string RootFolder { get; set; }
        public string CompanyImagePath { get; set; }
            
    }
}
