using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.DL;
using SICOR.EL;

namespace SICOR.BL
{
    public class CONTACTOSbl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();

        /***************sp_contactosGTbl********************/

        public Object sp_contactosGTbl(int grupo)
        {
            return cx.sp_contactosGT(grupo);
        }

        public Object sp_contactosInternosGTbl(int grupo)
        {
            return cx.sp_contactosInternosGT(grupo);
        }

        public Object sp_contUnidadGTbl(int grupo)
        {
            return cx.sp_contUnidadGT(grupo);
        }
        /***************sp_contactosSVbl********************/

        public String sp_contactosSVbl(CONTACTOSel Datos,int grupo)
        {
            String res = "";
            if (res == "")
            {
                try
                {
                    res = cx.sp_contactosSV(
                      Datos.contid
                      , Datos.contnombre
                      ,Datos.contcargo
                      , Datos.continst
                      , Datos.contunidad
                      , Datos.contdsc
                      , Datos.tipoid
                      , Datos.contemail
                      , Datos.conttels
                      , Datos.updateusrid
                      , grupo
                      ).SingleOrDefault().CONTID.ToString();
                }
                catch { res = "<i>Error interno, intente despues de recargar la página.</i>"; }
            }
            return res;
        }

        /***************Validacion sp_contactosSVbl********************/

        public String valsp_contactosSVbl(CONTACTOSel Datos)
        {
            String res = "";
            long Dft = 0;
            if (Datos.contnombre == "")
            {
                res += "<li> El campo <b>Nombre</b> es obligatorio. </li>";
            }
            if (Datos.continst == "")
            {
                res += "<li> El campo <b>Institución</b> es obligatorio. </li>";
            }
            if (Datos.tipoid <= 0)
            {
                res += "<li> El campo <b>Tipo</b> es obligatorio. </li>";
            }
            if (Datos.contemail == "" && Datos.tipoid == 5)
            {
                res += "<li> El campo <b>Email</b> es obligatorio. </li>";
            }
            return res;
        }



        //Actualiza email contacto
        public String sp_cpntactosUpMailSVbl(int contid, string contemail, int updateusrid)
        {
            String res = "";
                try
                {
                    res = cx.sp_contactosUpMailSV(
                      contid
                      , contemail
                      ,updateusrid
                      ).SingleOrDefault().CONTID.ToString();
                }
                catch { res = "<i>Error interno, intente despues de recargar la página.</i>"; }
            
            return res;
        }


        //Contactos by Nombre 
        public Object sp_contByNomGTbl(string nombre)
        {
            return cx.sp_contByNomGT(nombre);
        }

        //eliminar contacto
        public Object sp_contactoDLbl(Int32 contactoid, Int32 usuarioid)
        {
            return cx.sp_contactoDL(contactoid, usuarioid);
        }

    }
}
