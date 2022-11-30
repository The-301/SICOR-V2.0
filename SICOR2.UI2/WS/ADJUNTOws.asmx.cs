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


    public class ADJUNTOws : System.Web.Services.WebService
    {

        /***************sp_adjuntoSVsw********************/

        ADJUNTObl instan_ADJUNTObl = new ADJUNTObl();
        [WebMethod]
        public String sp_adjuntoSVws(ADJUNTOel Datos, int grupo)
        {
            return instan_ADJUNTObl.sp_adjuntoSVbl(Datos,grupo);
        }


        /***************ADJUNTOws********************/

        [WebMethod]
        public Object sp_adjuntoGTws(Int32 corresid)
        {
            return instan_ADJUNTObl.sp_adjuntoGTbl(corresid);
        }


        /***************ADJUNTODLws********************/

        [WebMethod]
        public String sp_adjuntoDLws(String adjuntoName, Int32 usrs_id,Int32 CorresId)
        {
            return instan_ADJUNTObl.sp_adjuntoDLbl(adjuntoName, usrs_id, CorresId);
        }


    }
}
