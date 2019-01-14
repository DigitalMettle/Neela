using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace VSTDesk.Common
{
   public class Tokens
    {
        public static async Task<string> GenerateJwt(ClaimsIdentity identity, IJwtFactory jwtFactory, string userName, JwtIssuerOptions jwtOptions, JsonSerializerSettings serializerSettings)
        {
            var response = new
            {
                id = identity.FindFirst(x => x.Type.Equals("id"))?.Value,
                auth_token = await jwtFactory.GenerateEncodedToken(userName, identity),
              //  expires_in = (int)jwtOptions.ValidFor.TotalSeconds,
                Role = identity.FindFirst(x => x.Type.Equals("Role"))?.Value,
            };

            return JsonConvert.SerializeObject(response, serializerSettings);
        }
    }
}
    