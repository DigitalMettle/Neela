using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using  VSTDesk.Common;

namespace VSTDesk.Common
{
    public static class ReadFileTemplate
    {
        /// <summary>
        /// Read the File based on Notification Type
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public static string ReadFile(string message, string fileName, string senderName, NotificationType type, string name)
        {
            string filePath = Directory.GetCurrentDirectory() + "\\wwwroot\\EmailTemplates\\";

            switch (type)
            {
                case NotificationType.Email:
                    filePath = filePath  + fileName;
                    break;
                case NotificationType.SMS:
                    filePath = filePath + "SMS\\" + fileName;
                    break;
                case NotificationType.PushNotification:
                    filePath = filePath + "PushNotification\\" + fileName;
                    break;
            }

            using (StreamReader reader = File.OpenText(filePath))
            {
                string fileContent = reader.ReadToEnd();
                if (fileContent != null && fileContent != "")
                {
                    fileContent = fileContent.Replace("{message}", message);
                    fileContent = fileContent.Replace("{name}", name);

                    if (type == NotificationType.Email)
                        fileContent = fileContent.Replace("{senderName}", senderName);
                    return fileContent;
                }
            }
            return null;
        }


        /// <summary>
        /// Read the File based on Notification Type
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public static string ReadFile(List<string> changeObject, Dictionary<string, string> changeValue, string fileName, string senderName, NotificationType type)
        {
            string filePath = Directory.GetCurrentDirectory() + "\\wwwroot\\Templates\\";

            switch (type)
            {
                case NotificationType.Email:
                    
                     filePath = filePath + "Email\\" + fileName;
                   
                    break;
                case NotificationType.SMS:
                    filePath = filePath + "SMS\\" + fileName;
                    break;
                case NotificationType.PushNotification:
                    filePath = filePath + "PushNotification\\" + fileName;
                    break;
            }


            using (StreamReader reader = File.OpenText(filePath))
            {
                string fileContent = reader.ReadToEnd();
                if (fileContent != null && fileContent != "")
                {
                    fileContent = fileContent.Replace("{Header}", GetHeaders()).Replace("{Footer}", GetFooters());
                    for (int index = 0; index < changeObject.Count; index++)
                    {
                        fileContent = fileContent.Replace("{" + changeObject[index] + "}", changeValue.ContainsKey(changeObject[index]) ? changeValue[changeObject[index]] : null);
                        if (type == NotificationType.Email)
                            fileContent = fileContent.Replace("{senderName}", senderName);
                    }
                }
                return fileContent;
            }
        }

        /// <summary>
        /// Method to Get Footer of Email Template
        /// </summary>
        /// <returns></returns>
        private static string GetFooters()
        {
            string filePath = Directory.GetCurrentDirectory() + "\\wwwroot\\Templates\\Email\\Footer.txt";
            using (StreamReader reader = File.OpenText(filePath))
            {
                return reader.ReadToEnd();
            }
        }


        /// <summary>
        /// Method to Get Header of Email Template
        /// </summary>
        /// <returns></returns>
        private static string GetHeaders()
        {
            string filePath = Directory.GetCurrentDirectory() + "\\wwwroot\\Templates\\Email\\Header.txt";
            using (StreamReader reader = File.OpenText(filePath))
            {
                return reader.ReadToEnd();
            }
        }
    }

}


