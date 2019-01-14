using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VSTDesk.Common;

namespace VSTDesk.Middleware
{
    public class ValidationMessageMiddleware
    {
        private readonly RequestDelegate _next;
        IHostingEnvironment _hostingEnvironment;

        public ValidationMessageMiddleware(RequestDelegate next , IHostingEnvironment hostingEnvironment)
        {
            _next = next;
            _hostingEnvironment = hostingEnvironment;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            if ((string.IsNullOrEmpty(ResponseMessageModel.currentCulture) || (ResponseMessageModel.currentCulture.ToString() != CultureInfo.CurrentCulture.ToString())))
            {
                HostSettings.RequestSchema = httpContext.Request.Scheme;
                HostSettings.Host = httpContext.Request.Host.ToString();
                var jsonSerializerSettings = new JsonSerializerSettings();
                jsonSerializerSettings.MissingMemberHandling = MissingMemberHandling.Ignore;
              //  ValidationMessageModel.jsonFileContent = JsonConvert.DeserializeObject<JObject>(File.ReadAllText(Path.Combine(_hostingEnvironment.ContentRootPath, "wwwroot/Localization/ResourceFiles/Message." + CultureInfo.CurrentCulture + ".json")), jsonSerializerSettings);
                ResponseMessageModel.jsonFileContent = JsonConvert.DeserializeObject<JObject>(File.ReadAllText(Path.Combine(_hostingEnvironment.ContentRootPath, "wwwroot/ResponseMessages/Message." + CultureInfo.CurrentCulture + ".json")), jsonSerializerSettings);
                ResponseMessageModel.currentCulture = CultureInfo.CurrentCulture.ToString();
            }
            await _next(httpContext);

        }

    }

    public static class ValidationMessageMiddlewareExtensions
    {
        public static IApplicationBuilder UseValidationMessageMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ValidationMessageMiddleware>();
        }
    }

}
