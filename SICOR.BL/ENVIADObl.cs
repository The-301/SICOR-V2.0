using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.EL;
using SICOR.DL;

namespace SICOR.BL
{
    public class ENVIADObl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();

        /***************sp_enviadoSVbl********************/

        public String sp_enviadoSVbl(ENVIADOel Datos)
        {
            String res = valsp_enviadoSVbl(Datos);
            if (res == "")
            {
                try
                {
                    DateTime enviofec;
                    enviofec = new DateTime();
                    enviofec = DateTime.ParseExact(Datos.enviofec, "dd/MM/yyyy", null);

                    if (Datos.enviorecibfec == "")
                    {
                        Datos.enviorecibfec = "01/01/2000";
                    }
                    DateTime enviorecibfec;
                    enviorecibfec = new DateTime();
                    enviorecibfec = DateTime.ParseExact(Datos.enviorecibfec, "dd/MM/yyyy", null);
                    
                    res = cx.sp_enviadoSV(
                      Datos.enviaid
                      , Datos.contid
                      , Datos.corresid
                      , enviofec
                      , enviorecibfec
                      , Datos.enviorecibhora
                      , Datos.enviorecibnombre
                      ,Datos.envioinstruc
                      ,Datos.enviodigital
                      ,Datos.enviofisico
                      , Datos.updateusrid
                      ).SingleOrDefault().ENVIAID.ToString();
                }
                catch { res = "Error interno, intente después de recargar la página."; }
            }
            return res;
        }

        /***************Validacion sp_enviadoSVbl********************/

        public String valsp_enviadoSVbl(ENVIADOel Datos)
        {
            String res = "";
            long Dft = 0;
            if (Datos.contid <= 0)
            {
                res += "<li> El campo <b>institución o unidad administrativa</b> es obligatorio. </li>";
            }
            if (Datos.enviofec == "")
            {
                res += "<li> El campo <b>fecha envio</b> es obligatorio. </li>";
            }
            return res;
        }



        /***************sp_enviadoGTbl********************/

        public Object sp_enviadoGTbl(Int32 corresid)
        {
            return cx.sp_enviadoGT(corresid);
        }



        /********dbo.sp_enviadoRecibeUpdateSV************/

        public String sp_enviadoRecibeUpdateSVbl(int enviaid, string recibfec, string recibhora, string recibnombre, int updateusrid)
        {
            DateTime margirecibfec;
            margirecibfec = new DateTime();
            margirecibfec = DateTime.ParseExact(recibfec, "dd/MM/yyyy", null);
            String res = "";
            try
            {
                res = cx.sp_enviadoRecibeUpdateSV(enviaid, margirecibfec, recibhora, recibnombre, updateusrid).SingleOrDefault().ENVIAID.ToString();
            }
            catch
            {
                res = "Error interno, intente después de recargar la página.";
            }
            return res;
        }

        /**********sp_enviadonadoDL**********/
        public String sp_enviadoMDLbl(int enviaid, int updateusrid)
        {
            String res = "";
            try
            {
                res = cx.sp_enviadoMDL(enviaid, updateusrid).SingleOrDefault().ENVIAID.ToString();
            }
            catch { res = "Error interno, intente después de recargar la página."; }
            return res;
        }
    }
}
