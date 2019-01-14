using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Common
{
    public class SmtpSettingsModel
    {
        public string SMTPFromEmail { get; set; }

        public string SMTPFromName { get; set; }

        public string SMTPHostUrl { get; set; }

        public string SMTPPort { get; set; }

        public string EncryptionType { get; set; }

        public string SMTPAuthentication { get; set; }

        public string SMTPUserName { get; set; }

        public string SMTPPassword { get; set; }

        public string EmailSubject { get; set; }

        public string EmailMessage { get; set; }
    }
}
