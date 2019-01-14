using System;
using System.Collections.Generic;

namespace VSTDesk.DB.Entities
{
    public partial class AdminMasterSettings
    {
        public int Id { get; set; }
        public int? ProjectId { get; set; }
        public string WorkItems { get; set; }
        public string Layout { get; set; }
        public string Status { get; set; }
        public string EditableFields { get; set; }
        public bool VstdeskActive { get; set; }
        public string CreatedItemStatus { get; set; }
        public string CreatedItemType { get; set; }
        public string DefaultAssignment { get; set; }
        public string GridVisibleFields { get; set; }

        public Projects Project { get; set; }
    }
}
