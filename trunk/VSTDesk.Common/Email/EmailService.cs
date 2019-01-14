using Microsoft.Extensions.Options;
using PostmarkDotNet;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using VSTDesk.DB.Entities;

namespace VSTDesk.Common
{
    public  class EmailService
    {
        private string senderName, senderEmail, emailPassword, smtpHost, postMarkKey;
        private int smtpPort;
        AppSettings _appSettings;

        /// <summary>
        /// Email Service Controller
        /// </summary>
        /// <param name="appSettings"></param>
        public EmailService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;

        }

        /// <summary>
        /// Get the Email settings from appsettings
        /// </summary>
        public void GetEmailSetting()
        {
            senderName = _appSettings.EmailSettings.SenderName;
            senderEmail = _appSettings.EmailSettings.SenderEmail;
            emailPassword = _appSettings.EmailSettings.SenderEmailPassword;
            smtpHost = _appSettings.EmailSettings.SmtpHost;
            smtpPort = _appSettings.EmailSettings.SmtpPort;
            postMarkKey = _appSettings.EmailSettings.PostMarkKey;
        }

        /// <summary>
        /// Send the mail to the list of users based on the defined template
        /// </summary>
        /// <param name="emailTolist"></param>
        /// <param name="subject"></param>
        /// <param name="message"></param>
        /// <param name="templateFileName"></param>
        /// <param name="emailCcList"></param>
        /// <param name="emailBccList"></param>
        /// <returns></returns>
        public void Send(List<string> emailTolist, string subject, string message, string templateFileName, List<string> emailCcList = null, List<string> emailBccList = null,string name="")
        {

            GetEmailSetting();

            // Example asynchronous request
            PostmarkMessage postMarkMessage = new PostmarkMessage()
            {
                From = senderEmail,
            };
            foreach (var email in emailTolist)
            { postMarkMessage.To = email; }

            if (emailCcList != null && emailCcList.Count > 0)
            {
                foreach (var emailCc in emailTolist)
                { postMarkMessage.Cc = emailCc; }
            }

            if (emailBccList != null && emailBccList.Count > 0)
            {
                foreach (var emailBcc in emailBccList)
                { postMarkMessage.Cc = emailBcc; }
            }

            postMarkMessage.Subject = subject;


            string emailBody = BodyTemplate.CreateMailBody(message, templateFileName, senderName, NotificationType.Email, name);

            postMarkMessage.HtmlBody = emailBody;


            //var imageContent = File.ReadAllBytes("test.jpg");
            //message.AddAttachment(imageContent, "test.jpg", "image/jpg", "cid:embed_name.jpg");

            var client = new PostmarkClient(postMarkKey);
            var sendResult = client.SendMessageAsync(postMarkMessage);

        }

        public void Send(List<string> emailTolist, List<string> emailCcList = null, List<string> emailBccList = null, SmtpSettingsModel smtpSettingsModel = null)
        {
            using (SmtpClient smtpClient = new SmtpClient())
            {
                var basicCredential = new NetworkCredential(smtpSettingsModel.SMTPUserName, smtpSettingsModel.SMTPPassword);
                using (MailMessage message = new MailMessage())
                {
                    MailAddress fromAddress = new MailAddress(smtpSettingsModel.SMTPFromEmail);

                    smtpClient.Host = smtpSettingsModel.SMTPHostUrl;
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = basicCredential;

                    message.From = fromAddress;
                    message.Subject = smtpSettingsModel.EmailSubject;
                    // Set IsBodyHtml to true means you can send HTML email.
                    message.IsBodyHtml = true;
                    message.Body = smtpSettingsModel.EmailMessage;
                    message.To.Add(string.Join(";",emailTolist));

                    smtpClient.Send(message);
                }
            }

        }


        /// <summary>
        /// Send the mail to the list of users based on the defined template
        /// </summary>
        /// <param name="emailTolist"></param>
        /// <param name="subject"></param>
        /// <param name="message"></param>
        /// <param name="templateFileName"></param>
        /// <param name="emailCcList"></param>
        /// <param name="emailBccList"></param>
        /// <returns></returns>
        public void Send(List<string> emailTolist, string subject, List<string> changeObject, Dictionary<string, string> changeValue, string templateFileName,  List<string> emailCcList = null, List<string> emailBccList = null)
        {
            SetSupporInfo(changeValue);
            GetEmailSetting();

            // Example asynchronous request
            PostmarkMessage message = new PostmarkMessage()
            {
                From = senderEmail,
                Cc = string.IsNullOrEmpty(_appSettings.EmailSettings.CCEmail) ? null : _appSettings.EmailSettings.CCEmail
            };
            foreach (var email in emailTolist)
            { message.To = email; }

            if (emailCcList != null && emailCcList.Count > 0)
            {
                foreach (var emailCc in emailTolist)
                { message.Cc = emailCc; }
            }

            if (emailBccList != null && emailBccList.Count > 0)
            {
                foreach (var emailBcc in emailBccList)
                { message.Cc = emailBcc; }
            }

            message.Subject = subject;


            string emailBody = BodyTemplate.CreateMailBody(changeObject, changeValue, templateFileName, senderName, NotificationType.Email);

            message.HtmlBody = emailBody;

            //File Attachment for Images in Mail
            string filePath = Directory.GetCurrentDirectory() + "\\wwwroot\\TemplateImages\\";
            List<string> files = Directory.GetFiles(filePath).ToList();
            foreach (string file in files)
            {
                var imageContent = File.ReadAllBytes(file);
                message.AddAttachment(imageContent, file.Replace(filePath, "").ToLower(), "image/png", "cid:" + file.Replace(filePath, "").ToLower());
            }

            var client = new PostmarkClient(postMarkKey);
            var sendResult = client.SendMessageAsync(message);

        }

        private void SetSupporInfo(Dictionary<string, string> changeValue)
        {
            changeValue.Add("SupportPhone", _appSettings.SupportSettings.SupportPhone);
            changeValue.Add("SupportEmail", _appSettings.SupportSettings.SupportEmail);
            changeValue.Add("KnowledgeBase", _appSettings.SupportSettings.KnowledgeBase);
            changeValue.Add("MainPhone", _appSettings.SupportSettings.MainPhone);
        }

    }
}
