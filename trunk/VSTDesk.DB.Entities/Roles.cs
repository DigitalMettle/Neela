using System;
using System.Collections.Generic;

namespace VSTDesk.DB.Entities
{
    public partial class Roles
    {
        public Roles()
        {
            RoleClaims = new HashSet<RoleClaims>();
            UserRoles = new HashSet<UserRoles>();
        }

        public string Id { get; set; }
        public string ConcurrencyStamp { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }

        public ICollection<RoleClaims> RoleClaims { get; set; }
        public ICollection<UserRoles> UserRoles { get; set; }
    }
}
