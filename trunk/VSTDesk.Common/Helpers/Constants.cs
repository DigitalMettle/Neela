using System;
using System.Collections.Generic;
using System.Text;

namespace VSTDesk.Common
{
    public static class Constants
    {
        public static class Strings
        {
            public static class JwtClaimIdentifiers
            {
                public const string Rol = "Role", Id = "id", Username = "Username", ProjectIds = "ProjectIds";
            }

            public static class JwtClaims
            {
                public const string ApiAccess = "Admin";
            }
        }

        /// <summary>
        /// Constant terms
        /// </summary>
        public const string UploadProfileImage = "profileimage";
        public const string UploadBackgroundImageForLogin = "backgroundimage";
        public const string UploadHeaderLogoImage = "headerlogo";
    }
}
