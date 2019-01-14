using System.Security.Claims;
using System.Threading.Tasks;

namespace VSTDesk.Common
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(string userName, ClaimsIdentity identity);
        ClaimsIdentity GenerateClaimsIdentity(string userName, string id , bool? isAdmin , string projectIds , string role);
    }
}
