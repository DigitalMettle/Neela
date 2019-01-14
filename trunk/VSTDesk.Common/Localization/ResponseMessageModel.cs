using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Common
{
    public class ResponseMessageModel
    {
        public static JObject jsonFileContent;
        public static string currentCulture;

        public class AuthenticateUser
        {
            public static string UserNameRequired
            {
                get { return Convert.ToString(jsonFileContent.GetValue("AuthenticateUser")["UserNameRequired"]); }
            }
            public static string PasswordRequired
            {
                get { return Convert.ToString(jsonFileContent.GetValue("AuthenticateUser")["PasswordRequired"]); }
            }
            public static string UserAuthFail
            {
                get { return Convert.ToString(jsonFileContent.GetValue("AuthenticateUser")["UserAuthFail"]); }
            }
            public static string UserAuthSuccess
            {
                get { return Convert.ToString(jsonFileContent.GetValue("AuthenticateUser")["UserAuthSuccess"]); }
            }
            public static string TokenGenerateSuccess
            {
                get { return Convert.ToString(jsonFileContent.GetValue("AuthenticateUser")["TokenGenerateSuccess"]); }
            }
            public static string TokenGenerateError
            {
                get { return Convert.ToString(jsonFileContent.GetValue("AuthenticateUser")["TokenGenerateError"]); }
            }
            public static string UnAuthorizedProject
            {
                get { return Convert.ToString(jsonFileContent.GetValue("AuthenticateUser")["UnAuthorizedProject"]); }
            }
            public static string UserMustHaveDomainAccount
            {
                get { return Convert.ToString(jsonFileContent.GetValue("AuthenticateUser")["UserMustHaveDomainAccount"]); }
            }
        }

        public class UserAccount
        {
            public static string UserNotFound
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["UserNotFound"]);
                }
            }
            public static string ProfileImageUpload
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["ProfileImageUpload"]);
                }
            }

            public static string ProfileImageNotUpload
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["ProfileImageNotUpload"]);
                }
            }
            
            public static string UserProfileFoundSuccessfully
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["UserProfileFoundSuccessfully"]);
                }
            }
            public static string PasswordResetLink
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["PasswordResetLink"]);
                }
            }
            public static string UserNotExist
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["UserNotExist"]);
                }
            }
            public static string ResetPasswordSuccessfully
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["ResetPasswordSuccessfully"]);
                }
            }
            public static string ResetPasswordNotSuccessfully
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["ResetPasswordNotSuccessfully"]);
                }
            }
            public static string InviteSuccessfullySent
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["InviteSuccessfullySent"]);
                }
            }
            public static string InviteNotSent
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["InviteNotSent"]);
                }
            }
            public static string UserPasswordAddedSuccessfully
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["UserPasswordAddedSuccessfully"]);
                }
            }
            public static string UserPasswordNotAdded
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["UserPasswordNotAdded"]);
                }
            }
            public static string ProjectSync
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["ProjectSync"]);
                }
            }

            public static string ProjectNotSync
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["ProjectNotSync"]);
                }
            }
            public static string UserUpdatedSuccessFully
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["UserUpdatedSuccessFully"]);
                }
            }

            public static string UserRemoved
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["UserRemovedSuccessfully"]);
                }
            }
            public static string LinkExpired
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("UserAccount")["LinkExpired"]);
                }
            }
        }

        public class ProjectSetting
        {
            public static string ProjectNotFound
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("ProjectSetting")["ProjectNotFound"]);
                }
            }

            public static string UpdateProjectSetting
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("ProjectSetting")["UpdateProjectSetting"]);
                }
            }



            public static string NotUpdateProjectSetting
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("ProjectSetting")["NotUpdateProjectSetting"]);
                }
            }

            public static string ProjectRemoved {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("ProjectSetting")["ProjectRemoved"]);
                }
            }

            public static string ProjectAdded {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("ProjectSetting")["ProjectAdded"]);
                }
            }

            public static string ProjectNotAdded {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("ProjectSetting")["ProjectNotAdded"]);
                }
            }
        }


        public class CompanySetting
        {
            public static string ImageUploadSuccess
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("CompanySetting")["ImageUploadSuccess"]);
                }
            }
            public static string ImageUploadFail
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("CompanySetting")["ImageUploadFail"]);
                }
            }
            public static string CompanyUpdateFailed
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("CompanySetting")["CompanyUpdateFailed"]);
                }
            }
            public static string CompanySettingsUpdated
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("CompanySetting")["CompanySettingsUpdated"]);
                }
            }
            
           public static string UnableToGet
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("CompanySetting")["UnableToGet"]);
                }
            }
        }


            public class WorkItemMessage
        {
            public static string WorkItemNotExist
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("WorkItemMessage")["WorkItemNotExist"]);
                }
            }
            public static string WorkItemCreated
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("WorkItemMessage")["WorkItemCreatedSuccessfully"]);
                }
            }
            public static string ProjectNotExist
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("WorkItemMessage")["ProjectNotExist"]);
                }
            }
            public static string WorkItemUpdation
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("WorkItemMessage")["WorkItemUpdation"]);
                }
            }
            public static string WorkItemNotUpdated
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("WorkItemMessage")["WorkItemNotUpdated"]);
                }
            }
            public static string PleaseContactToAdministrator
            {
                get
                {
                    return Convert.ToString(jsonFileContent.GetValue("WorkItemMessage")["PleaseContactToAdministrator"]);
                }
            }


        }

         
        
    }
}
