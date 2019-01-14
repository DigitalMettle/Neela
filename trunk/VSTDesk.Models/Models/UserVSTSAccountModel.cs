using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Models
{
    public class VSTSMemberModel
    {
        // These two properties we are using for binding data of vsts user profile api
        public string emailAddress { get; set; }
        public string id { get; set; }

        // These three properties we are using for binding data of vsts group members api
        public string mailAddress { get; set; }
        public string originId { get; set; }
        public string displayName { get; set; }
    }
}
