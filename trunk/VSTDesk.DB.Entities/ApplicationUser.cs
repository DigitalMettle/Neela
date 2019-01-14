using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.DB.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string AccessToken { get; set; }

        public string RefereshToken { get; set; }

        public bool? IsAdmin { get; set; }

        public string ProfilePhoto { get; set; }
    }
}
