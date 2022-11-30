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

    public class ARCIVO : System.Web.Services.WebService
    {

        /***************sp_archivoSVsw********************/

        ARCHIVObl instan_ARCHIVObl = new ARCHIVObl();
        [WebMethod]
        public String archivarSVws(List<ARCHIVOel> Datos,int grupo)
        {
            return instan_ARCHIVObl.archivarSV(Datos,grupo);
        }


        /***************ARCHIVOws********************/

        [WebMethod]
        public Object sp_archivoGTws(Int32 corresid)
        {
            return instan_ARCHIVObl.sp_archivoGTbl(corresid);
        }





    }
}
