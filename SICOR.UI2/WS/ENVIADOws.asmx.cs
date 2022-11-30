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

    public class ENVIADOws : System.Web.Services.WebService
    {

        /***************sp_enviadoSVsw********************/

        ENVIADObl instan_ENVIADObl = new ENVIADObl();
        [WebMethod]
        public String sp_enviadoSVws(List<ENVIADOel> Datos)
        {
            string res = "";
            string r = "";
            foreach (ENVIADOel d in Datos)
            {
                r = instan_ENVIADObl.sp_enviadoSVbl(d);
            }
            if (r == "Error interno, intente después de recargar la página.") { res = "Uno o varios de los envíos no pudo realizarse, presione F5 e intente de nuevo."; }
            else { res = "1"; }
            return res;
        }

        /***************ENVIADOws********************/

        [WebMethod]
        public Object sp_enviadoGTws(Int32 corresid)
        {
            return instan_ENVIADObl.sp_enviadoGTbl(corresid);
        }

        /***********ENVIADO RECIBE UPDATE SV**********/
        [WebMethod]
        public String sp_enviadoRecibeUpdateSVws(int enviaid, string recibfec, string recibhora, string recibnombre, int updateusrid)
        {
            return instan_ENVIADObl.sp_enviadoRecibeUpdateSVbl(enviaid, recibfec, recibhora, recibnombre, updateusrid);
        }

        /***********sp_enviadoMDL**********/
        [WebMethod]
        public String sp_enviadoMDLws(int enviaid,int updateusrid)
        {
            return instan_ENVIADObl.sp_enviadoMDLbl(enviaid,updateusrid);
        }
    }
}
