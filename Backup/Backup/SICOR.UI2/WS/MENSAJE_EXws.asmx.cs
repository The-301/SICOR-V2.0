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
    [System.Web.Script.Services.ScriptService]

    public class MENSAJE_EXws : System.Web.Services.WebService
    {
        MENSAJE_EXbl msj_ex = new MENSAJE_EXbl();
        
        [WebMethod]
        public String sp_mensaje_exSVws(MENSAJE_EXel Datos)
        {
            return msj_ex.sp_mensaje_exSVbl(Datos);
        }

        [WebMethod]
        public String mensaje_exMasMailws(MENSAJE_EXel Datos, MENSAJE_EXbl.MAILel mail, String[] adjuntos)
        {
            return msj_ex.mensaje_exMasMailbl(Datos, mail,adjuntos);
        }
    }
}
