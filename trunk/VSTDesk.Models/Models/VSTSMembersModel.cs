using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Models
{

    public class VSTSMembersResponseModel
    {
        public List<VSTSMembersModel> members { get; set; } = new List<VSTSMembersModel>();
    }

    public class VSTSMembersModel
    {
        public string id { get; set; }

        public VSTSMemberModel user { get;set; }
    }
    
}
