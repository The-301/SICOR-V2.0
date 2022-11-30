using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.IO;
using System.Web;

namespace MultipleFileUpload
{
    public partial class Default : Page
    {
        
        protected void Page_Load(object sender, EventArgs e)
        {
            //ClientScript.GetPostBackEventReference(this, "");
            // seteo del folder de archivos para cada grupo
            if (!IsPostBack)
            {
                string gpo = HttpContext.Current.Request.Cookies["CLASE"].Value;
                MultipleFileUpload.StorageFolder = MapPath(ConfigurationManager.AppSettings["StorageFolder"]) + "gpo" + gpo;
            }
            else
            {
                string parameter = Request["__EVENTARGUMENT"]; // parameter
                if (Request["__EVENTTARGET"] == "delete")
                { // btnSave
                    eliminarFile(parameter);
                }
            }
        }

        protected void eliminarFile(string fileName)
        {
            var filePath = Path.Combine(MapPath(ConfigurationManager.AppSettings["StorageFolder"]), fileName);
            String fecha = DateTime.Now.ToString("dd-MM-yyyy-hh-mm-ss");

            var newFilePath = Path.Combine(MapPath(ConfigurationManager.AppSettings["StorageFolder"]), "DeleteX2[" + fecha + "]_" + fileName);

            if (File.Exists(filePath))
            {
                //File.Delete(filePath);
                ////File.Move(filePath, newFilePath);
            }
        }
    }
}