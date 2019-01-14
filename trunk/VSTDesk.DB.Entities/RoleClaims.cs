using System;
using System.Collections.Generic;

namespace VSTDesk.DB.Entities
{
    public partial class RoleClaims
    {
        public int Id { get; set; }
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
        public string RoleId { get; set; }

        public Roles Role { get; set; }
    }
}
