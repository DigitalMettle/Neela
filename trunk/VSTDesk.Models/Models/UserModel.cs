using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Models
{
    public class UserModel
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ProfilePhoto { get; set; }

        public string AppName { get; set; }

    }
}
