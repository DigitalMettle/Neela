using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace VSTDesk.Common
{
    public class Response<T>
    {
        public HttpStatusCode Code { get; set; }

        public string Message { get; set; }

        public T Data { get; set; }
    }

    public class ErrorResponse
    {
        public ErrorResponse() { }

        public ErrorResponse(string message)
        {
            this.ErrorMessage = new List<string>() { message };
        }

        public ErrorResponse(List<string> messages)
        {
            this.ErrorMessage = messages;
        }

        public List<string> ErrorMessage { get; set; }
    }
}
