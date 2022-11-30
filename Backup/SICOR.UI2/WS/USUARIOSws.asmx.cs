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


    public class USUARIOSws : System.Web.Services.WebService
    {
        USUARIOSbl usu = new USUARIOSbl();
        
        [WebMethod]
        public Object sp_usuariosGTws(Int32 grupo)
        {
            return usu.sp_usuariosGT(grupo);
        }

        [WebMethod]
        public Object sp_usuariosVerifGTws(String cuenta, String pass)
        {
            return usu.sp_usuariosVerifGT(
                    cuenta
                    , pass
                );
        }
        
        [WebMethod]
        public Object sp_usuariosUpPassSVws(int id, string pass, string npass)
        {
            return usu.sp_usuariosUpPassSVbl(id, pass, npass);
        }
    }
}
