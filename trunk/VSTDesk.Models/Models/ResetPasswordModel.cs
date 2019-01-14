using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VSTDesk.Models
{
    public class ResetPasswordModel
    {
        /// <summary>
        /// Email is use as UserId
        /// </summary>
        public string UserId{ get; set; }

        /// <summary>
        /// Password
        /// </summary>
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Enter the Password")]
        [Compare("NewPassword", ErrorMessage = "The Password and Confirm Password don't matched.")]
        [RegularExpression("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]))", ErrorMessage = "The Password must contain one lower,upper, numeric and special symbol.")]
        [StringLength(6, ErrorMessage = "The Password must be at least 6 characters long.")]
        public string Password { get; set; }
         
        /// <summary>
        /// ConfirmPassword
        /// </summary>
        public string ConfirmPassword { get; set; }

        /// <summary>
        /// Token
        /// </summary>
        public string Token { get; set; }

    }
}
