using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Models
{
   public class RegisterModel
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}
