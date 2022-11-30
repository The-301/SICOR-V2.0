using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SICOR.BL;
using SICOR.EL;

namespace SICOR.UI2.WS
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    //[System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
 
    public class NOTIFICACIONws1 : System.Web.Services.WebService
    {

        NOTIFICACIONbl mensaje = new NOTIFICACIONbl();

        [WebMethod]
        public Object sp_notificacionGTws(int userid)
        {
            return mensaje.sp_notificacionGT(userid);
        }

        [WebMethod]
        public String sp_notificacionUPws(int mensajeid, int userid)
        {
            return mensaje.sp_notificacionUP(mensajeid, userid);
        }
    }
}
