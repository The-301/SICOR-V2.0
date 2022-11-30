using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.DL;
using SICOR.EL;

namespace SICOR.BL
{
    public class MENSAJE_INbl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();
        
        /***************sp_mensaje_inSVbl********************/

        public String sp_mensaje_inSVbl(MENSAJE_INel Datos)
        {
            String res = valsp_mensaje_inSVbl(Datos);
            if (res == "")
            {
                try
                {
                    res = cx.sp_mensaje_inSV(
                      Datos.msjinid
                      , Datos.corresid
                      , Datos.clm_usrs_id
                      , Datos.tipoid
                      , Datos.msjinmensaje
                      , Datos.updateusrid
                      ).SingleOrDefault().MSJINID.ToString();
                }
                catch { res = "Error Interno, intente después de recargar la página."; }
            }
            return res;
        }

        /***************Validacion sp_mensaje_inSVbl********************/

        public String valsp_mensaje_inSVbl(MENSAJE_INel Datos)
        {
            String res = "";
            long Dft = 0;
            if (Datos.msjinmensaje == "")
            {
                res += "<li> El campo <b>mensaje</b> es obligatorio. </li>";
            }
            return res;
        }


        /***************sp_mensaje_inGTbl********************/

        public Object sp_mensaje_inGTbl(Int32 clm_usrs_id)
        {
            return cx.sp_mensaje_inGT(clm_usrs_id);
        }


        /***************sp_mensajeRecib_inGTbl********************/

        public Object sp_mensajeRecib_inGTbl(Int32 clm_usrs_id)
        {
            return cx.sp_mensajeRecib_inGT(clm_usrs_id);
        }

        /***************sp_mensajeEnvi_inGTbl********************/

        public Object sp_mensajeEnvi_inGTbl(Int32 clm_usrs_id)
        {
            return cx.sp_mensajeEnvi_inGT(clm_usrs_id);
        }



        /***************sp_mensajeRecibNum_inGTbl********************/

        public Object sp_mensajeRecibNum_inGTbl(Int32 clm_usrs_id)
        {
            return cx.sp_mensajeRecibNum_inGT(clm_usrs_id);
        }

        /***************sp_mensajeUpLeido_inGTbl********************/

        public Object sp_mensajeUpLeido_inGTbl(Int32 clm_usrs_id)
        {
            return cx.sp_mensajeUpLeido_inGT(clm_usrs_id);
        }
        /***************sp_mensajeByIdFech_inGTbl********************/

        public Object sp_mensajeByIdFech_inGTbl(Int32 clm_usrs_id, String FECH01, String FECH02)
        {
            DateTime F1;
            F1 = new DateTime();
            F1 = DateTime.ParseExact(FECH01, "dd/MM/yyyy", null);

            DateTime F2;
            F2 = new DateTime();
            F2 = DateTime.ParseExact(FECH02, "dd/MM/yyyy", null);
            
            return cx.sp_mensajeByIdFech_inGT(clm_usrs_id, F1,F2);
        }

    }
}
