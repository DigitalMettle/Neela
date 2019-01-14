using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Models
{
    public class ProjectModel
    {
        public int Id { get; set; }

        public Guid ProjectId { get; set; }

        public string Name { get; set; }

        public bool IsSelected { get; set; }

    }
}
