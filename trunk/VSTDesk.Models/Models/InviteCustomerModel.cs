using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace VSTDesk.Models
{
    public class InviteCustomerModel
    {
        /// <summary>
        /// Email of user
        /// </summary>
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        /// <summary>
        /// FirstName
        /// </summary>
        [Required]
        public string FirstName { get; set; }

        /// <summary>
        /// FirstName
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Project Ids
        /// </summary>
       
        [Required]
        public List<ProjectModel> Projects{ get; set; }
    }
}
