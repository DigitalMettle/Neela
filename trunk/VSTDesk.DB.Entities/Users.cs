using System;
using System.Collections.Generic;

namespace VSTDesk.DB.Entities
{
    public partial class Users
    {
        public Users()
        {
            UserAndProjects = new HashSet<UserAndProjects>();
            UserClaims = new HashSet<UserClaims>();
            UserLogins = new HashSet<UserLogins>();
            UserRoles = new HashSet<UserRoles>();
            UserTokens = new HashSet<UserTokens>();
        }

        public string Id { get; set; }
        public int AccessFailedCount { get; set; }
        public string ConcurrencyStamp { get; set; }
        public string Discriminator { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool LockoutEnabled { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public string NormalizedEmail { get; set; }
        public string NormalizedUserName { get; set; }
        public string PasswordHash { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string SecurityStamp { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AccessToken { get; set; }
        public string RefereshToken { get; set; }
        public bool? IsAdmin { get; set; }
        public string ProfilePhoto { get; set; }

        public ICollection<UserAndProjects> UserAndProjects { get; set; }
        public ICollection<UserClaims> UserClaims { get; set; }
        public ICollection<UserLogins> UserLogins { get; set; }
        public ICollection<UserRoles> UserRoles { get; set; }
        public ICollection<UserTokens> UserTokens { get; set; }
    }
}
