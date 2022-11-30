using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Configuration;
using System.Web.UI;

namespace SICOR.UI2.PAGS.UPFILE
{
    /// <summary>
    /// Summary description for FileUpload
    /// </summary>
    public class FileUpload : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            foreach (string file in context.Request.Files)
            {
                string gpo = HttpContext.Current.Request.Cookies["CLASE"].Value;
                string StorageFolder = "storagegpo" + context.Request.QueryString["grupo"]; //Page.MapPath(ConfigurationManager.AppSettings["StorageFolder"]) + "gpo" + gpo;
                string iddoc = context.Request.QueryString["CORRESID"];

                var hpf = HttpContext.Current.Request.Files["UploadedImage"];
                if (hpf.ContentLength == 0)
                    break;

                var savedFileName = context.Server.MapPath(Path.Combine("~/PAGS/UPFILE/"+ StorageFolder +"/"+ "IDOC_" + iddoc + "-"+Path.GetFileName(hpf.FileName)));
                
                //if (File.Exists(context.Server.MapPath(Path.Combine("~/Uploads", ordenid + "_" + subordenid + "_" + ordensubordenid + "_" + Path.GetFileName(hpf.FileName)))))
                //{
                //    File.Delete(context.Server.MapPath(Path.Combine("~/Uploads", ordenid + "_" + subordenid + "_" + ordensubordenid + "_" + Path.GetFileName(hpf.FileName))));
                //}
                hpf.SaveAs(savedFileName);
                //save file
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}