using System;
using System.Collections.Generic;

namespace VSTDesk.DB.Entities
{
    public partial class CompanySettings
    {
        public int Id { get; set; }
        public string CompanyMessage { get; set; }
        public string CompanyLogo { get; set; }
        public string AppName { get; set; }
        public string AppId { get; set; }
        public string AppSecretKey { get; set; }
        public string PersonalAccessToken { get; set; }
        public string VstssettingOne { get; set; }
        public string VstssettingTwo { get; set; }
        public string LoginBackgroundImagePath { get; set; }
        public string SmtpfromEmail { get; set; }
        public string SmtpfromName { get; set; }
        public string Smtphost { get; set; }
        public string SmtpencrcyptionType { get; set; }
        public string Smtpport { get; set; }
        public string Smtpauthentication { get; set; }
        public string Smtpusername { get; set; }
        public string Smtppassword { get; set; }
        public string InvitationEmailSubject { get; set; }
        public string InvitationEmailMessage { get; set; }
        public string PasswordResetEmailSubject { get; set; }
        public string PasswordResetEmailMessage { get; set; }
        public string HeaderLogo { get; set; }
    }
}
