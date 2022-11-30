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

    public class IMPRIMIRws : System.Web.Services.WebService
    {
        IMPRIMIRbl imp = new IMPRIMIRbl();

        //Lista enviados sin respuesta por fecha
        [WebMethod]
        public Object enviadosSinResByFechaGTws(string fech01, string fech02,int grupo,int TipoC)
        {

            return imp.enviadosSinResByFechaGTbl(fech01, fech02, grupo, TipoC);
        }

        //Lista marginados sin respuesta por fecha
        [WebMethod]
        public Object marginadosSinResByFechaGTws(string fech01, string fech02,int grupo,int TipoC)
        {

            return imp.marginadosSinResByFechaGTbl(fech01, fech02,grupo,TipoC);
        }

        //Lista marginados detalle ful by fecha
        [WebMethod]
        public Object margiRepByFechaGTws(string fech01, string fech02,int grupo)
        {

            return imp.margiRepByFechaGTbl(fech01, fech02,grupo);
        }

        //Lista marginados detalle ful by fecha
        [WebMethod]
        public Object margiRepActiveByFechaGTws(string fech01, string fech02,int grupo)
        {
            return imp.margiRepActiveByFechaGTbl(fech01, fech02,grupo);
        }

        //Lista marginados detalle ful by fecha
        [WebMethod]
        public Object corresRepByFechaGTws(string fech01, string fech02,int grupo,int TipoC)
        {
            return imp.corresRepByFechaGTbl(fech01, fech02,grupo,TipoC);
        }

        //Lista marginados detalle ful by fecha
        [WebMethod]
        public Object corresRepByFechaContIDGTws(string fech01, string fech02, Int32 contID,int grupo,int TipoC)
        {
            return imp.corresRepByFechaContIDGTbl(fech01, fech02, contID,grupo,TipoC);
        }
    }
}
