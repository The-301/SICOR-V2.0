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

    public class MARGINADOws : System.Web.Services.WebService
    {

        /***************sp_marginadoSVsw********************/

        MARGINADObl instan_MARGINADObl = new MARGINADObl();
        Funciones f = new Funciones();
        [WebMethod]
        public String marginadosSVws(List<MARGINADOel> Datos)
        {
            return instan_MARGINADObl.marginadosSVbl(Datos);
        }

        /***************MARGINADOws********************/

        [WebMethod]
        public Object sp_marginadoGTws(Int32 corresid)
        {
            return instan_MARGINADObl.sp_marginadoGTbl(corresid);
        }

        /***************MARGINADOws********************/

        [WebMethod]
        public Object sp_marginadoByIdGTws(Int32 margid)
        {
            return instan_MARGINADObl.sp_marginadoByIdGTbl(margid);
        }
        

        /***********MARGINADO SV**********/

        [WebMethod]
        public String marginadoSVws(MARGINADOel Datos, List<MARGI_CONTel> margiCont)
        {
            String res = instan_MARGINADObl.sp_marginadoSVbl(Datos);
            if (f.IsNumeric(res))
            {
               int margid = Convert.ToInt32(res);
                foreach (var m in margiCont)
                {
                    m.margid = margid;
                    res = instan_MARGINADObl.sp_margiContSV(m);
                    if (res == "Error interno, intente despues de recargar la página.") 
                    {
                        instan_MARGINADObl.sp_marginadoDLbl(Convert.ToInt32(m.margid));
                        break; 
                    }
                }
            }
            return res;
        }

        /***********MARGINADO RECIBE UPDATE SV**********/
        [WebMethod]
        public String sp_marginaRecibeUpdateSVws(int margcontid, string recibfec, string recibhora, string recibnombre, int updateusrid)
        {
            return instan_MARGINADObl.sp_marginaRecibeUpdateSVbl(margcontid, recibfec, recibhora, recibnombre, updateusrid);
        }

        /***********MARGINADO MDelete**********/
        [WebMethod]
        public String sp_marginadoMDLws(int margid, int updateusrid)
        {
            return instan_MARGINADObl.sp_marginadoMDLbl(margid, updateusrid);
        }

    }
}
