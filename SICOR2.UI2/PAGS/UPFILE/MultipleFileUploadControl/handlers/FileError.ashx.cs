using System.Web;

namespace MultipleFileUpload.handlers
{
    public class FileError : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "image/png";
            context.Response.WriteFile(context.Server.MapPath("/MultipleFileUploadControl/img/file-error-icon.png"));
        }

        public bool IsReusable { get { return false; } }
    }
}
