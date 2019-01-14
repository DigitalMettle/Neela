using System;
using System.Collections.Generic;

namespace VSTDesk.DB.Entities
{
    public partial class UserTokens
    {
        public string UserId { get; set; }
        public string LoginProvider { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public Users User { get; set; }
    }
}
