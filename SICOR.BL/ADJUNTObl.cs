using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.DL;
using SICOR.EL;

namespace SICOR.BL
{
    public class ADJUNTObl
    {

        SICOR_DBEntities cx = new SICOR_DBEntities();
        
        /***************sp_adjuntoSVbl********************/

        public String sp_adjuntoSVbl(ADJUNTOel Datos,int grupo)
        {
            String res = valsp_adjuntoSVbl(Datos);
            if (res == "")
            {
                try
                {
                    res = cx.sp_adjuntoSV(
                      Datos.adjuntoid
                      , Datos.corresid
                      , Datos.adjunto_name
                      , Datos.adjunto_size
                      , Datos.adjunto_type
                      , Datos.adjunto_urldown
                      , Datos.adjunto_urldel
                      , Datos.adjunto_tipo
                      , Datos.updateusrid
                      , grupo
                      ).SingleOrDefault().ADJUNTOID.ToString();
                }
                catch { res = "Error Interno, intente despues de recargar la página."; }
            }
            return res;
        }

        /***************Validacion sp_adjuntoSVbl********************/

        public String valsp_adjuntoSVbl(ADJUNTOel Datos)
        {
            String res = "";
            long Dft = 0;
            return res;
        }


        /***************sp_adjuntoGTbl********************/

        public Object sp_adjuntoGTbl(Int32 corresid)
        {
            return cx.sp_adjuntoGT(corresid);
        }

        /***************sp_adjuntoDLbl********************/

        public String sp_adjuntoDLbl(String adjuntoName, Int32 usrs_id, Int32 CorresId)
        {
            String res = "";
            try
            {
                res = cx.sp_adjuntoDL(adjuntoName, usrs_id, CorresId).SingleOrDefault().res.ToString();
            }
            catch { res = "Error Interno, intente después de recargar la página."; }

            return res;

        }

    }
}
