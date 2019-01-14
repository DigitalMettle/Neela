using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using VSTDesk.Common;

namespace VSTDesk.Models
{
   public class VstTokenModel
    {
        [JsonProperty(PropertyName = "access_token")]
        public String accessToken { get; set; }

        [JsonProperty(PropertyName = "token_type")]
        public String tokenType { get; set; }

        [JsonProperty(PropertyName = "expires_in")]
        public String expiresIn { get; set; }

        [JsonProperty(PropertyName = "refresh_token")]
        public String refreshToken { get; set; }

       


    }
}
