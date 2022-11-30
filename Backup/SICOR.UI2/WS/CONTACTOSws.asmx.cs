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


    public class CONTACTOSws : System.Web.Services.WebService
    {

        CONTACTOSbl instan_CONTACTOSbl = new CONTACTOSbl(); 
        
        /***************CONTACTOSws********************/

        [WebMethod]
        public Object sp_contactosGTws(int grupo)
        {
            return instan_CONTACTOSbl.sp_contactosGTbl(grupo);
        }

        [WebMethod]
        public Object sp_contactosInternosGTws(int grupo)
        {
            return instan_CONTACTOSbl.sp_contactosInternosGTbl(grupo);
        }

        [WebMethod]
        public Object sp_contUnidadGTws(int grupo)
        {
            return instan_CONTACTOSbl.sp_contUnidadGTbl(grupo);
        }

        /***************sp_contactosSVsw********************/

        [WebMethod]
        public String sp_contactosSVws(CONTACTOSel Datos,int grupo)
        {
            return instan_CONTACTOSbl.sp_contactosSVbl(Datos,grupo);
        }

        /***************sp_contactosUpMailSVsw********************/

        [WebMethod]
        public String sp_contactosUpMailSVws(int contid, string contemail, int updateusrid)
        {
            return instan_CONTACTOSbl.sp_cpntactosUpMailSVbl(contid, contemail, updateusrid);
        }

        /***************sp_contByNomGT********************/

        [WebMethod]
        public Object sp_contByNomGTws(String nombre)
        {
            return instan_CONTACTOSbl.sp_contByNomGTbl(nombre);
        }

        /************* delete contacto ************/
        [WebMethod]
        public Object sp_contactoDLws(Int32 contactoid, Int32 usuarioid)
        {
            return instan_CONTACTOSbl.sp_contactoDLbl(contactoid, usuarioid);
        }
    }
}
