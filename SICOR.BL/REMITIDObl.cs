using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.EL;
using SICOR.DL;

namespace SICOR.BL
{
    public class REMITIDObl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();
        
        /***************sp_remitidoGTbl********************/
        public Object sp_remitidoGTbl(Int32 corresid)
        {
            return cx.sp_remitidoGT(corresid);
        }

        /***************sp_remitidoSVbl********************/
        public String sp_remitidoSVbl(REMITIDOel Datos)
        {
            String res = valsp_remitidoSVbl(Datos);
            if (res == "")
            {
                try
                {
                    DateTime remfec;
                    remfec = new DateTime();
                    remfec = DateTime.ParseExact(Datos.remfec, "dd/MM/yyyy", null);

                    res = cx.sp_remitidoSV(
                      Datos.remid
                      , Datos.clm_usrs_id
                      , Datos.corresid
                      , remfec
                      , Datos.updateusrid
                      ).SingleOrDefault().REMID.ToString();
                }
                catch { res = "Error interno, intente después de recargar la página."; }
            }
            return res;
        }

        /***************Validacion sp_remitidoSVbl********************/
        public String valsp_remitidoSVbl(REMITIDOel Datos)
        {
            String res = "";
            long Dft = 0;
            if (Datos.clm_usrs_id <= 0)
            {
                res += "<li> El campo <b>usuario</b> es obligatorio. </li>";
            }
            if (Datos.remfec == "")
            {
                res += "<li> El campo <b>fecha remitido</b> es obligatorio. </li>";
            }
            return res;
        }

        /***********remitidosSV**************/
        public String remitidosSVbl(List<REMITIDOel> Datos)
        {
            String res = "";
            foreach (var r in Datos)
            {
                res = sp_remitidoSVbl(r);
            }
            return res;
        }

        /************sp_remiConfirByUsridGT**************/
        public Object sp_remiConfirByUsridGTbl(int usrid,int grupo)
        {
            List<REMICONFIRLISTel> listRemi = new List<REMICONFIRLISTel>();
            

            foreach (var l in cx.sp_remiConfirByUsridGT(usrid)) {
                REMICONFIRLISTel itemRemi = new REMICONFIRLISTel();
                itemRemi.datRemi = l;
                itemRemi.datCorres = cx.sp_detallefullByIdGT(l.CORRESID,grupo);
                foreach(var c in cx.sp_detallefullByIdGT(l.CORRESID,grupo)){
                    if(c.CATEGOID == 2){
                        itemRemi.datMargi = cx.sp_marginadoByIdGT(c.MARGINAID);
                        itemRemi.datCorresContesta = cx.sp_detallefullByIdGT(c.CORRESID_CONTESTA,grupo);
                    }
                }

                listRemi.Add(itemRemi);
            }
            return listRemi;
        }

        /**************sp_remiConfirSV*******************/
        public String sp_remiConfirSVbl(Int32 remid) 
        {
            String res;
            try
            {
                res = cx.sp_remiConfirSV(remid).SingleOrDefault().REMID.ToString();
            }
            catch { res = "Error interno, intente después de recargar la página."; }

            return res;
        }

    }
}
