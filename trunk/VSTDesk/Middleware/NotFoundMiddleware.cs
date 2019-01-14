using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace VSTDesk.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class NotFoundMiddleware
    {
        private readonly RequestDelegate _next;

        public NotFoundMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            
            await _next(httpContext);
            if(httpContext.Response.StatusCode == 404)
            {
                var file = new FileInfo(Path.Combine(Path.Combine(Directory.GetCurrentDirectory(), @"VSTDeskApp"), "Index.html"));
                byte[] buffer;
                if (file.Exists)
                {
                    httpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                    httpContext.Response.ContentType = "text/html";

                    buffer = File.ReadAllBytes(file.FullName);
                }
                else
                {
                    httpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    httpContext.Response.ContentType = "text/plain";
                    buffer = Encoding.UTF8
                        .GetBytes("Unable to find the requested file");
                }

                using (var stream = httpContext.Response.Body)
                {
                    //await stream.WriteAsync(buffer, 0, buffer.Length);
                    //await stream.FlushAsync();
                    stream.Write(buffer, 0, buffer.Length);
                    stream.Flush();
                }

                //context.Response.ContentLength = buffer.Length;

                return;
            }
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class NotFoundMiddlewareExtensions
    {
        public static IApplicationBuilder UseNotFoundMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<NotFoundMiddleware>();
        }
    }
}
