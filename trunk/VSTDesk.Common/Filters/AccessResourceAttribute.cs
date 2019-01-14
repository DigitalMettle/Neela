using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using VSTDesk.DB.Entities;

namespace VSTDesk.Common
{
    public class AccessResourceAttribute : TypeFilterAttribute
    {
        public AccessResourceAttribute() : base(typeof(MyAccessResourceAttribute))
        {
        }

        private class MyAccessResourceAttribute : ActionFilterAttribute
        {
            private readonly ApplicationDbContext _appDbContext;
            public MyAccessResourceAttribute(ApplicationDbContext appDbContext)
            {
                _appDbContext = appDbContext;
            }
          
            public override void OnActionExecuting(ActionExecutingContext context)
            {
                string userRole = context.HttpContext.User.FindFirst("Role").Value;
                if (userRole != "Admin")
                {
                   var projectIds = _appDbContext.UserAndProjects.Where(x => x.UserId == context.HttpContext.User.FindFirst("id").Value).Select(x=> x.ProjectId.ToString()).ToList();
                    string userProjectId = context.HttpContext.Request.Path.ToString().Split('/')[5];
                    //string[] projectIds = context.HttpContext.User.FindFirst("ProjectIds").Value.Split(',');
                    if (!projectIds.Contains(userProjectId))
                    {
                        context.Result = new ForbidResult();
                        return;
                    }
                    else
                    {
                    }
                }
            }

        }

    }
}