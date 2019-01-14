using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Models
{
    public class UserAndPojectDetailModel :UserModel
    {

       public List<ProjectModel> Projects { get; set; } = new List<ProjectModel>();
    }
    

   
}
