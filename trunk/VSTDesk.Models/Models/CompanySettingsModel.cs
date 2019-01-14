using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VSTDesk.Models
{
    public class CompanySettingsModel
    {
        public int Id { get; set; }
        //public string CompanyMessage { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter App Name")]
        public string AppName { get; set; }

        public string CompanyLogo { get; set; }

        //[Required(AllowEmptyStrings = false, ErrorMessage = "Please enter App Id")]
        //public string AppId { get; set; }

        //[Required(AllowEmptyStrings = false, ErrorMessage = "Please enter App Secret Key")]
        //public string AppSecretKey { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Personal Access Token")]
        public string PersonalAccessToken { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Setting 01")]
        public string SettingOne { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Setting 02")]
        public string SettingTwo { get; set; }
        
        public string BackgroundImageUrlForLogin { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter SMTP From Email")]
        public string SMTPFromEmail { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter SMTP From Name")]
        public string SMTPFromName { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter SMTP Host Url")]
        public string SMTPHostUrl { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter SMTP Port")]
        public string SMTPPort { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please select Type of Encryption")]
        public string EncryptionType { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please select SMTP Authentication")]
        public string SMTPAuthentication { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter SMTP Username")]
        public string SMTPUserName { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter SMTP Password")]
        public string SMTPPassword { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Invitation Email Subject")]
        public string InvitationEmailSubject { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Invitation Email Message")]
        public string InvitationEmailMessage { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Password Reset Email Subject")]
        public string PasswordResetEmailSubject { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter Password Reset Email Message")]
        public string PasswordResetEmailMessage { get; set; }

        public string HeaderLogo { get; set; }
    }
}
