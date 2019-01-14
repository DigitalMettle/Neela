using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Common
{
    public static class BodyTemplate
    {
        /// <summary>
        /// Create a mail body by using template
        /// </summary>
        /// <param name="templateFileName"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public static string CreateMailBody(string message, string templateFileName, string senderName, NotificationType type,string name)
        {
            return ReadFileTemplate.ReadFile(message, templateFileName, senderName, type,name);
        }

        /// <summary>
        /// Create a mail body by using template
        /// </summary>
        /// <param name="templateFileName"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public static string CreateMailBody(List<string> changeObject, Dictionary<string, string> changeValue, string templateFileName, string senderName, NotificationType type)
        {
            return ReadFileTemplate.ReadFile(changeObject, changeValue, templateFileName, senderName, type);
        }
    }
}
