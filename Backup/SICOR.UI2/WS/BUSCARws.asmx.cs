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

    public class BUSCARws : System.Web.Services.WebService
    {
        BUSCARbl bs = new BUSCARbl();

        //Lista de Insitituciones
        [WebMethod]
        public Object contInstGTws(Int32 grupo)
        {
            return bs.contInstGTbl(grupo);
        }


        // Lista de Contactos por insitución
        [WebMethod]
        public Object contacByInstiGTws(string inst)
        {
            return bs.contacByInstiGTbl(inst);
        }


        //Lista Correspondencia por institución
        [WebMethod]
        public Object corresFullByInstGTws(string inst,int grupo)
        {
            return bs.corresFullByInst(inst,grupo);
        }


        //Lista Correspondencia por contacto
        [WebMethod]
        public Object corresByContGTws(Int32 tipo,string cont,string texto,int grupo)
        {
            return bs.corresByContGTbl(tipo,cont,texto,grupo);
        }

        //Lista Correspondencia po Aunto
        [WebMethod]
        public Object corresByAsuntoGTws(string asunto,int grupo)
        {
            return bs.corresByAsuntoGTbl(asunto,grupo);
        }

        //Lista Correspondencia por fecha
        [WebMethod]
        public Object corresByFechaws(string fech01, string fech02, int grupo)
        {

            return bs.corresByFechabl(fech01, fech02,grupo);
        }

        //Lista Correspondencia CORRESID
        [WebMethod]
        public Object corresByCorresIdGTws(int corresid,int grupo)
        {
            return bs.corresByCorresIdGTbl(corresid,grupo);
        }
        //Lista Correspondencia COD/REF
        [WebMethod]
        public Object corresByCodRefGTws(string cod,int grupo)
        {
            return bs.corresByCodRefGTbl(cod,grupo);
        }
    }
}
