using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Models
{
    public class UserProjectsModel
    {
        public string UserId { get; set; }

        public List<int> ProjectId { get; set; }
    }
}
