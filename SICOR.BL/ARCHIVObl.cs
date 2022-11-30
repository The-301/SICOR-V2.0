using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.EL;
using SICOR.DL;

namespace SICOR.BL
{
    public class ARCHIVObl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();
        
        /***************sp_archivoSVbl********************/

        public String sp_archivoSVbl(ARCHIVOel Datos,int grupo)
        {
            String res = valsp_archivoSVbl(Datos);
            if (res == "")
            {
                try
                {
                    res = cx.sp_archivoSV(
                      Datos.archid
                      , Datos.corresid
                      , Datos.archivo
                      , Datos.archvocod
                      , Datos.archvodsc
                      , Datos.tipoid
                      , Datos.updateusrid
                      ,grupo
                      ).SingleOrDefault().ARCHID.ToString();
                }
                catch { res = "Error interno, intente después de recargar la página."; }
            }
            return res;
        }

        /***************Validacion sp_archivoSVbl********************/

        public String valsp_archivoSVbl(ARCHIVOel Datos)
        {
            String res = "";
            long Dft = 0;
            if (Datos.archivo <= 0)
            {
                res += "<li> El campo <b>archivo</b> es obligatorio. </li>";
            }
            if (Datos.archvocod == "")
            {
                res += "<li> El campo <b>código ampo</b> es obligatorio. </li>";
            }
            //if (Datos.archvodsc == "")
            //{
            //    res += "<li> El campo <b>descripción</b> es obligatorio. </li>";
            //}
            if (Datos.tipoid <= 0)
            {
                res += "<li> El Campo <b>tipo doc</b> es obligatorio. </li>";
            }
            return res;
        }


        /***************archivarSV******************/
        public String archivarSV(List<ARCHIVOel> Datos,int grupo)
        {
            String res = "";

            foreach (var item in Datos)
            {
                res = sp_archivoSVbl(item,grupo);
            }

            return res;
        }
        
        
        /***************sp_archivoGTbl********************/

        public Object sp_archivoGTbl(Int32 corresid)
        {
            return cx.sp_archivoGT(corresid);
 
        }





    }
}
