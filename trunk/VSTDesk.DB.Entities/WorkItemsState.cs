using System;
using System.Collections.Generic;

namespace VSTDesk.DB.Entities
{
    public partial class WorkItemsState
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ProjectId { get; set; }

        public Projects Project { get; set; }
    }
}
