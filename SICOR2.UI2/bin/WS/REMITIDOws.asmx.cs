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


    public class REMITIDOws : System.Web.Services.WebService
    {

        /***************sp_remitidoSVsw********************/

        REMITIDObl instan_REMITIDObl = new REMITIDObl();
        
        [WebMethod]
        public String remitidosSVws(List<REMITIDOel> Datos)
        {
            return instan_REMITIDObl.remitidosSVbl(Datos);
        }

        /***************REMITIDOws********************/

        [WebMethod]
        public Object sp_remitidoGTws(Int32 corresid)
        {
            return instan_REMITIDObl.sp_remitidoGTbl(corresid);
        }


        /***********sp_remiConfirByUsridGT***********/
        [WebMethod]
        public Object sp_remiConfirByUsridGTws(int usrid,int grupo)
        {
            return instan_REMITIDObl.sp_remiConfirByUsridGTbl(usrid,grupo);
        }

        /**************sp_remiConfirSV*******************/
        [WebMethod]
        public String sp_remiConfirSVws(Int32[] remid)
        {
            String res = "";
            foreach (var c in remid) {
                res = instan_REMITIDObl.sp_remiConfirSVbl(c);
                if(res == "Error Interno, intente despues de recargar la página."){break;}
            }
            return res;
        }
    }
}
