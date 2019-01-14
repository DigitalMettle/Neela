using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Models
{
    public class TeamModel
    {
        public List<TeamProperties> value { get; set; } = new List<TeamProperties>();
    }
    public class TeamProperties
    {
        public string id { get; set; }
        public string name { get; set; }
        public string url { get; set; }
        public string description { get; set; }
        public string identityUrl { get; set; }
        public string projectName { get; set; }
        public string projectId { get; set; }
    }
}
