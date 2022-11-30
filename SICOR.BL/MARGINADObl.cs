using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.DL;
using SICOR.EL;

namespace SICOR.BL
{
    public class MARGINADObl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();

        /***************sp_marginadoGTbl********************/

        public Object sp_marginadoGTbl(Int32 corresid)
        {
            List<MARGI_GT> marginados = new List<MARGI_GT>();
            foreach (var M in cx.sp_marginadoGT(corresid))
            {
                MARGI_GT MR = new MARGI_GT();
                MR.CORRESID = M.CORRESID;
                MR.INSERTUSRAPE = M.INSERTUSRAPE;
                MR.INSERTUSRNOM = M.INSERTUSRNOM;
                MR.INSERTUSRID = M.INSERTUSRID;
                MR.MARGFEC = M.MARGFEC;
                MR.MARGID = M.MARGID;
                MR.MARGMOTIVO = M.MARGMOTIVO;
                MR.MARGPENDIENTE = M.MARGPENDIENTE;
                MR.MARGTIEMPO = M.MARGTIEMPO;
                MR.TIEMPO = Convert.ToInt32(M.TIEMPO);
                MR.MARGINSTRUC = Convert.ToInt32(M.MARGINSTRUC);
                MR.MARGINSTRUCDSC = M.MARGINSTRUCDSC;
                MR.MARGICONT = cx.sp_margiContGT(M.MARGID);
                MR.MARGINADOPOR = M.MARGINADOPOR;

                marginados.Add(MR);
            }

            return marginados;
        }

        /***************sp_marginadoByIdGTbl********************/
        public Object sp_marginadoByIdGTbl(Int32 margid)
        {
            return cx.sp_marginadoByIdGT(margid);
        }

        /***************sp_marginadoSVbl********************/
        public String sp_marginadoSVbl(MARGINADOel Datos)
        {
            String res = valsp_marginadoSVbl(Datos);
            if (res == "")
            {
                try
                {
                    DateTime margfec;
                    margfec = new DateTime();
                    margfec = DateTime.ParseExact(Datos.margfec, "dd/MM/yyyy", null);

                    DateTime margtiempo;
                    margtiempo = new DateTime();
                    margtiempo = DateTime.ParseExact(Datos.margtiempo, "dd/MM/yyyy", null);

                    res = cx.sp_marginadoSV(
                      Datos.margid
                      , Datos.corresid
                      , margfec
                      , margtiempo
                      , Datos.margmotivo
                      , Datos.margpendiente
                      , Datos.margintruc
                      , Datos.updateusrid
                      , Datos.marginadopor
                      ).SingleOrDefault().MARGID.ToString();

                    if (Convert.ToInt32(res) > 0)
                    {
                        cx.sp_estadoSV(
                            -1
                            , Datos.corresid
                            , 2
                            , 1
                            , Datos.updateusrid
                            );
                    }
                }
                catch { res = "Error interno, intente después de recargar la página."; }
            }
            return res;
        }

        /***************Validacion sp_marginadoSVbl********************/

        public String valsp_marginadoSVbl(MARGINADOel Datos)
        {
            String res = "";
            long Dft = 0;
            
            if (Datos.margfec == "")
            {
                res += "<li> El campo <b>fecha marginado</b> es obligatorio. </li>";
            }
            if (Datos.margtiempo == "")
            {
                res += "<li> El campo <b>tiempo respuesta</b> es obligatorio. </li>";
            }
            if (Datos.margmotivo == "" && Datos.margintruc == -1)
            {
                res += "<li> El campo <b>motivo de marginación</b> es obligatorio. </li>";
            }
            return res;
        }


        /***********marginadosSV**************/
        public String marginadosSVbl(List<MARGINADOel> Datos)
        {
            String res = "";
            foreach (var r in Datos)
            {
                res = sp_marginadoSVbl(r);
            }
            return res;
        }


        /****MARGICONT SV sp_margiContSV****/
        public String sp_margiContSV(MARGI_CONTel Datos)
        {
            String res = "";
            try
            {
                DateTime f1;
                f1 = new DateTime();
                f1 = DateTime.ParseExact(Datos.margrecibfec, "dd/MM/yyyy", null);

                res = cx.sp_margiContSV(
                  Datos.margicontid
                  , Datos.margid
                  , Datos.contid
                  , Datos.tipoid
                  , f1
                  , Datos.margrecibhora
                  , Datos.margrecibnombre
                  , Datos.enviofisico
                  , Datos.enviodigital
                  , Datos.updateusrid                  
                  ).SingleOrDefault().MARGICONTID.ToString();
            }
            catch { res = "Error interno, intente después de recargar la página."; }
            return res;
        }

        /******MARGICONT GT dbo.sp_margiContGT***/
        public Object sp_margiContGT(int margid) {
            return cx.sp_margiContGT(margid);
        }

        /**********MARGINADO DL sp_marginadoMarcaDL**********/
        public String sp_marginadoMDLbl(int margid,int updateusrid) 
        {
            String res = "";
            try
            {
                res = cx.sp_marginadoMarcaDL(margid, updateusrid).SingleOrDefault().MARGID.ToString();
            }
            catch { res = "Error interno, intente después de recargar la página."; }
            return res;
        }

        /**********MARGINADO DL sp_marginadoDL**********/
        public String sp_marginadoDLbl(int margid)
        {
            String res = "";
            try
            {
                res = cx.sp_marginadoDL(margid).SingleOrDefault().MARGID.ToString();
            }
            catch { res = "Error interno, intente después de recargar la página."; }
            return res;
        }

        /********MARGINADO RECIBIDO UPDATE dbo.sp_marginaRecibeUpdateSV************/

        public String sp_marginaRecibeUpdateSVbl(int margicontid, string recibfec, string recibhora, string recibnombre, int updateusrid)
        {
            DateTime margirecibfec;
            margirecibfec = new DateTime();
            margirecibfec = DateTime.ParseExact(recibfec, "dd/MM/yyyy", null);
            String res = "";
            try 
            {
                res = cx.sp_marginaRecibeUpdateSV(margicontid, margirecibfec, recibhora, recibnombre, updateusrid).SingleOrDefault().MARGICONTID.ToString();
            }
            catch 
            {
                res = "Error interno, intente después de recargar la página.";
            }
            return res;
        }
    }
}
