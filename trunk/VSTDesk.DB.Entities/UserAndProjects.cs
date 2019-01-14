using System;
using System.Collections.Generic;

namespace VSTDesk.DB.Entities
{
    public partial class UserAndProjects
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ProjectId { get; set; }

        public Projects Project { get; set; }
        public ApplicationUser User { get; set; }
    }
}
