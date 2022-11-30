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


    public class CORRESPONDENCIAws : System.Web.Services.WebService
    {

        CORRESPONDENCIAbl corres = new CORRESPONDENCIAbl();

        [WebMethod]
        public Object sp_corresFullGTws(Int32 tipo,Int32 grupo) {
            return corres.sp_corresFullGT(tipo,grupo);
        }
        
        //[WebMethod]
        //public Object sp_corresFullByIdGTws(int corresId)
        //{
        //    return corres.sp_corresFullByIdGT(corresId);
        //}


        /***************sp_correspondenciaSVsw********************/

        CORRESPONDENCIAbl instan_CORRESPONDENCIAbl = new CORRESPONDENCIAbl();
        [WebMethod]
        public String sp_correspondenciaSVws(CORRESPONDENCIAel Datos)
        {
            return instan_CORRESPONDENCIAbl.sp_correspondenciaSVbl(Datos);
        }

        /**************ELIMINAR CORRESPONDENCIA****************/


        [WebMethod]
        public String sp_corresElimSVws(int corresid,int marginaid, int updateusrid)
        {
            return instan_CORRESPONDENCIAbl.sp_corresElimSVbl(corresid,marginaid, updateusrid);
        }

        /**************ACTUALIZAR FIRMA****************/


        [WebMethod]
        public String sp_corresFirmaSVws(int corresid, int updateusrid)
        {
            return instan_CORRESPONDENCIAbl.sp_corresFirmaSVbl(corresid, updateusrid);
        }

        /**************Activar / Desactivar CORRESPONDENCIA****************/


        [WebMethod]
        public String sp_corresActivoSVws(CORRESPONDENCIAbl.activaCorres Datos )
        {
            return instan_CORRESPONDENCIAbl.sp_corresActivoSVbl(Datos);
        }

        [WebMethod]
        public String activaSVws(List<CORRESPONDENCIAbl.activaCorres> Datos)
        {
            return instan_CORRESPONDENCIAbl.activaSVbl(Datos);
        }

        /*************CORRESDEB by CORRESID GT************/
        [WebMethod]
        public Object sp_corresDebByCorresIdGTws(int corresid)
        {
            return instan_CORRESPONDENCIAbl.sp_corresDebByCorresIdGTbl(corresid);
        }

        /**********CORRESDEB SV**************/
        [WebMethod]
        public String sp_corresDebSVws(int corresdebid, int corresid, string corredebdsc, string corresdebfec, int updateusrid)
        {
            return instan_CORRESPONDENCIAbl.sp_corresDebSVbl(corresdebid, corresid, corredebdsc, corresdebfec, updateusrid);
        }

        /*****CORRESPONDENCIA UP CORRESDEB**********/
        [WebMethod]
        public String sp_corresDebUpSVws(
            int corresdebid
            , int corresid
            , string corresdeb_recibfec
            , string corresdeb_recibhora
            , int updateusrid)
        {
            return instan_CORRESPONDENCIAbl.sp_corresDebUpSVbl(
                corresdebid
                , corresid
                , corresdeb_recibfec
                , corresdeb_recibhora
                , updateusrid
                );
        }
    }
}
