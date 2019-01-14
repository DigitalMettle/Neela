using System;
using System.Collections.Generic;

namespace VSTDesk.DB.Entities
{
    public partial class CustomStatus
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string StatusName { get; set; }
        public string DisplayName { get; set; }

        public Projects Project { get; set; }
    }
}
