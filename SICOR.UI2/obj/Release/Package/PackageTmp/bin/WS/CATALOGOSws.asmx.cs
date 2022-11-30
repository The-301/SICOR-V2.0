using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using SICOR.BL;

namespace SICOR.UI.WS
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.Web.Script.Services.ScriptService]

    public class CATALOGOSws : System.Web.Services.WebService
    {

        CATALOGOSbl cats = new CATALOGOSbl();
        
        [WebMethod]
        public Object sp_catalogosGTws(int grupo)
        {

            return cats.sp_catalogosGTbl(grupo);
        }

    }
}
