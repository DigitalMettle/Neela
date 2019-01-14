using System;
using System.Collections.Generic;

namespace VSTDesk.DB.Entities
{
    public partial class Projects
    {
        public Projects()
        {
            AdminMasterSettings = new HashSet<AdminMasterSettings>();
            CustomStatus = new HashSet<CustomStatus>();
            UserAndProjects = new HashSet<UserAndProjects>();
            WorkItems = new HashSet<WorkItems>();
            WorkItemsState = new HashSet<WorkItemsState>();
        }

        public int Id { get; set; }
        public Guid? ProjectId { get; set; }
        public string Name { get; set; }

        public ICollection<AdminMasterSettings> AdminMasterSettings { get; set; }
        public ICollection<CustomStatus> CustomStatus { get; set; }
        public ICollection<UserAndProjects> UserAndProjects { get; set; }
        public ICollection<WorkItems> WorkItems { get; set; }
        public ICollection<WorkItemsState> WorkItemsState { get; set; }
    }
}
