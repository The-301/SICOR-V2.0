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

    public class MENSAJE_INws : System.Web.Services.WebService
    {

        /***************sp_mensaje_inSVsw********************/

        MENSAJE_INbl instan_MENSAJE_INbl = new MENSAJE_INbl();
        [WebMethod]
        public String sp_mensaje_inSVws(MENSAJE_INel Datos)
        {
            return instan_MENSAJE_INbl.sp_mensaje_inSVbl(Datos);
        }

        /***************MENSAJE_INws********************/

        [WebMethod]
        public Object sp_mensaje_inGTws(Int32 clm_usrs_id)
        {
            return instan_MENSAJE_INbl.sp_mensaje_inGTbl(clm_usrs_id);
        }

        /***************sp_mensajeRecib_inGTws********************/

        [WebMethod]
        public Object sp_mensajeRecib_inGTws(Int32 clm_usrs_id)
        {
            return instan_MENSAJE_INbl.sp_mensajeRecib_inGTbl(clm_usrs_id);
        }
        /***************sp_mensajeEnvi_inGTws********************/

        [WebMethod]
        public Object sp_mensajeEnvi_inGTws(Int32 clm_usrs_id)
        {
            return instan_MENSAJE_INbl.sp_mensajeEnvi_inGTbl(clm_usrs_id);
        }


        /***************sp_mensajeRecibNum_inGTws********************/

        [WebMethod]
        public Object sp_mensajeRecibNum_inGTws(Int32 clm_usrs_id)
        {
            return instan_MENSAJE_INbl.sp_mensajeRecibNum_inGTbl(clm_usrs_id);
        }

        /***************sp_mensajeUpLeido_inGTws********************/

        [WebMethod]
        public Object sp_mensajeUpLeido_inGTws(Int32 clm_usrs_id)
        {
            return instan_MENSAJE_INbl.sp_mensajeUpLeido_inGTbl(clm_usrs_id);
        }

        /***************sp_mensajeByIdFech_inGTws********************/

        [WebMethod]
        public Object sp_mensajeByIdFech_inGTws(Int32 clm_usrs_id, String FECH01, String FECH02)
        {
            return instan_MENSAJE_INbl.sp_mensajeByIdFech_inGTbl(clm_usrs_id,FECH01, FECH02);
        }
    }
}
