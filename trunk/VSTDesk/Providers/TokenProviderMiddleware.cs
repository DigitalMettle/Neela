using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using VSTDesk.Common;
using VSTDesk.Data;
using VSTDesk.DB.Entities;
using VSTDesk.Models;

namespace VSTDesk
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class TokenProviderMiddleware
    {
        private readonly RequestDelegate _next;
        JwtIssuerOptions _options;
        IServiceProvider _serviceProvider;
        IJwtFactory _jwtFactory;
        UserManager<ApplicationUser> _userManager;
        JwtIssuerOptions _jwtOptions;
        AppSettings _appSettings;
        ApplicationDbContext _applicationDbContext;

        public TokenProviderMiddleware(RequestDelegate next, IOptions<JwtIssuerOptions> options, IServiceProvider serviceProvider, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions , IOptions<AppSettings> appSettings)
        {
            _next = next;
            _options = options.Value;
            _serviceProvider = serviceProvider;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _appSettings = appSettings.Value;
        }

        public Task Invoke(HttpContext httpContext)
        {
            // If the request path doesn't match, skip
            if (!httpContext.Request.Path.Equals(_options.Path, StringComparison.Ordinal))
            {
                return _next(httpContext);
            }

            // Request must be POST with Content-Type: application/x-www-form-urlencoded
            if (!httpContext.Request.Method.Equals("POST")
               || !httpContext.Request.HasFormContentType)
            {
                httpContext.Response.StatusCode = 400;
                return httpContext.Response.WriteAsync("Bad request.");
            }

            return GenerateToken(httpContext);

            //   return _next(httpContext);
        }


        private async Task GenerateToken(HttpContext context)
        {
            var username = context.Request.Form["Username"][0].Trim();
            var password = context.Request.Form["Password"][0].Trim();

            if (string.IsNullOrEmpty(password) && string.IsNullOrEmpty(username))
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                await context.Response.WriteAsync(JsonConvert.SerializeObject(new { ErrorMessage = new List<string>() { ResponseMessageModel.AuthenticateUser.UserNameRequired, ResponseMessageModel.AuthenticateUser.PasswordRequired } }, new JsonSerializerSettings { Formatting = Formatting.Indented }));
                return;
            }
            else if (string.IsNullOrEmpty(username))
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                await context.Response.WriteAsync(JsonConvert.SerializeObject(new { ErrorMessage = new List<string>() { ResponseMessageModel.AuthenticateUser.UserNameRequired } }, new JsonSerializerSettings { Formatting = Formatting.Indented }));
                return;
            }
            else if (string.IsNullOrEmpty(password))
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                await context.Response.WriteAsync(JsonConvert.SerializeObject(new { ErrorMessage = new List<string>() { ResponseMessageModel.AuthenticateUser.PasswordRequired } }, new JsonSerializerSettings { Formatting = Formatting.Indented }));
                return;
            }

            using (var serviceScope = _serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                _userManager = serviceScope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
                var result = await _userManager.FindByNameAsync(username);
                if (result == null)
                {
                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new { ErrorMessage = new List<string>() { ResponseMessageModel.AuthenticateUser.UserAuthFail } }, new JsonSerializerSettings { Formatting = Formatting.Indented }));
                    return;
                }

                //if ((result.IsAdmin.HasValue && result.IsAdmin.Value == true) && !result.Email.ToLower().Contains(_appSettings.VSTS.AccountName.ToLower()))
                //{
                //    context.Response.ContentType = "application/json";
                //    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                //    await context.Response.WriteAsync(JsonConvert.SerializeObject(new { ErrorMessage = new List<string>() { ResponseMessageModel.AuthenticateUser.UserMustHaveDomainAccount } }, new JsonSerializerSettings { Formatting = Formatting.Indented }));
                //    return;
                //}

                if (await _userManager.CheckPasswordAsync(result, password))
                {
                    _applicationDbContext = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
                    List<ProjectModel> listProject = _applicationDbContext.UserAndProjects.Where(x => x.UserId == result.Id)?.Select(y => new ProjectModel() {Id = y.ProjectId , Name = y.Project.Name}).ToList();
                    string projectIds = listProject.Count >0 ? string.Join("," ,  listProject.Select(x => x.Id)) : string.Empty;
                    var role = "User";//await _userManager.GetRolesAsync(result);
                    var claimIdentity = _jwtFactory.GenerateClaimsIdentity(username, result.Id , result.IsAdmin , projectIds ,role.Length > 0 ? role.ToString() : "");
                    var jwt = await Tokens.GenerateJwt(claimIdentity, _jwtFactory, username, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });


                    var response = new Response<dynamic>
                    {
                        Code = HttpStatusCode.OK,
                        Message = string.Empty,
                        Data = new
                        {
                            Access_Token = jwt,
                            User = new
                            {
                                Username = username,
                                ProjectList = listProject,
                                result.FirstName,
                                result.LastName,
                                ProfileImageUrl = (!string.IsNullOrWhiteSpace(result.ProfilePhoto))? $"{_appSettings.FolderPath.Path}/{result.ProfilePhoto}": $"{_appSettings.FolderPath.Path}/noimage.gif",
                                UserRole = "User", // result.IsAdmin.HasValue ? "Admin" : "User",
                                UserId = result.Id,
                                //RedirectUrl = result.IsAdmin.HasValue && string.IsNullOrEmpty(result.AccessToken) ? GenerateAuthorizeUrl(username) : string.Empty
                            }
                        }
                    };

                    // Serialize and return the response
                    context.Response.ContentType = "application/json";
                    //if (result.IsAdmin.HasValue && string.IsNullOrEmpty(result.AccessToken))
                    //{
                    //    context.Response.StatusCode = (int)HttpStatusCode.Redirect;
                    //}
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
                }
                else
                {
                   
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(new { ErrorMessage = new List<string>() { ResponseMessageModel.AuthenticateUser.UserAuthFail } }, new JsonSerializerSettings { Formatting = Formatting.Indented }));
                        return;
                }
            }
        }

        public String GenerateAuthorizeUrl(string username)
        {
            UriBuilder uriBuilder = new UriBuilder(_appSettings.AppSettingOauth.AuthUrl);
            var queryParams = HttpUtility.ParseQueryString(uriBuilder.Query ?? String.Empty);

            queryParams["client_id"] = _appSettings.AppSettingOauth.AppId;                   // ConfigurationManager.AppSettings["AppId"];
            queryParams["response_type"] = "Assertion";
            queryParams["state"] = username;
            queryParams["scope"] = _appSettings.AppSettingOauth.Scope;                  // ConfigurationManager.AppSettings["Scope"];
            queryParams["redirect_uri"] = _appSettings.AppSettingOauth.CallbackUrl;       //ConfigurationManager.AppSettings["CallbackUrl"];

            uriBuilder.Query = queryParams.ToString();

            return uriBuilder.ToString();
        }
    }




    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class TokenProviderMiddlewareExtensions
    {
        public static IApplicationBuilder UseTokenProviderMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<TokenProviderMiddleware>();
        }
    }
}
