using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Models
{
    public class VSTSGroupsModel
    {
        [JsonProperty("value")]
        public List<VSTSGroupModel> Groups { get; set; } = new List<VSTSGroupModel>();
    }

    public class VSTSGroupModel
    {
        [JsonProperty("originId")]
        public string GroupId { get; set; }

        [JsonProperty("displayName")]
        public string GroupName { get; set; }
    }
}
