using System;
using System.Collections.Generic;
using System.Text;
using VSTDesk.DB.Entities;

namespace VSTDesk.Models
{
    public class ProjectsAndCustomStatusModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<CustomStatusModel> CutomStatus { get; set; }
        public AdminMasterSettings AdminMasterSettings { get; set; }
    }

        

}
