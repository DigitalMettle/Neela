using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Reflection;
using System.Text;

namespace VSTDesk.Common
{
    public static class Utility
    {
        public static FileData Upload(IFormFile file, string filePath,string fileName)
        {
            DateTime currentDateTime = DateTime.Now;
            string date = currentDateTime.Year + "-" + currentDateTime.Month + "-" + currentDateTime.Day;
            if ((file == null) || (file.Length == 0)) throw new Exception("Invalid File Input");
            Int64 fileSize = file.Length;
            
            var documentfilePath = Path.Combine(filePath, fileName);
            if (file.Length > 0)    
            {
                using (var fileStream = new FileStream(documentfilePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                    FileData fileData = new FileData
                    {
                        FilePath = documentfilePath.Replace(filePath, "").Remove(0, 1),
                        FileSize = file.Length
                    };
                    return fileData;
                }
            }

            return null;
        }
    }
}
