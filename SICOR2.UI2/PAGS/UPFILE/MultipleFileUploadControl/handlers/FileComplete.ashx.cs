using System.Web;

namespace MultipleFileUpload.handlers
{
    public class FileComplete : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "image/png";
            context.Response.WriteFile(context.Server.MapPath("/PAGS/MultipleFileUploadControl/img/file-complete-icon.png"));
        }

        public bool IsReusable { get { return false; } }
    }
}
