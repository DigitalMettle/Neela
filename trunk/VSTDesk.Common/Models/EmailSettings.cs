using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Common
{
    public class EmailSettings
    {
        /// <summary>
        /// Name of Sender 
        /// </summary>
        public string SenderName { get; set; }

        /// <summary>
        /// Email Id of sender  
        /// </summary>
        public string SenderEmail { get; set; }

        /// <summary>
        /// Sender Password
        /// </summary>
        public string SenderEmailPassword { get; set; }

        /// <summary>
        /// SMTP Host 
        /// </summary>
        public string SmtpHost { get; set; }

        /// <summary>
        /// SMTP port number
        /// </summary>
        public int SmtpPort { get; set; }

        /// <summary>
        /// PostMarkKey
        /// </summary>
        public string PostMarkKey { get; set; }

        /// <summary>
        /// CC Email
        /// </summary>
        public string CCEmail { get; set; }
    }
}
