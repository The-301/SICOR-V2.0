using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.DL;
using SICOR.EL;

namespace SICOR.BL
{
    public class CORRESPONDENCIAbl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();
        MARGINADObl m = new MARGINADObl();

        /******Lista de Correspondencia*****/ 
        public Object sp_corresFullGT(Int32 tipo, Int32 grupo)
        {
            List<CORRESPONDENCIAFULLel> listaCorres = new List<CORRESPONDENCIAFULLel>();
            List<CORRESPONDENCIAFULL2el> listaCorres2 = new List<CORRESPONDENCIAFULL2el>();

            foreach (var c2 in cx.sp_corresFull2GT(grupo).ToList())
            {
                CORRESPONDENCIAFULL2el DatosLista = new CORRESPONDENCIAFULL2el();
                DatosLista.TIPO = c2.TIPO;
                DatosLista.CORRESID = c2.CORRESID;
                DatosLista.DETALLE = c2.DETALLE;
                DatosLista.FECHA = c2.FECHA.ToString();

                listaCorres2.Add(DatosLista);
            }

            foreach(var c in cx.sp_detallefullGT(tipo,grupo).ToList()){
                CORRESPONDENCIAFULLel Corres = new CORRESPONDENCIAFULLel();

                Corres.datCorres = c;
                List<CORRESPONDENCIAMARGINA> mar1 = new List<CORRESPONDENCIAMARGINA>();
                List<CORRESPONDENCIAREMITIDO> rem1 = new List<CORRESPONDENCIAREMITIDO>();
                List<CORRESPONDENCIAARCHIVO> arc1 = new List<CORRESPONDENCIAARCHIVO>();
                List<CORRESPONDENCIAENVIADO> env1 = new List<CORRESPONDENCIAENVIADO>();
                List<CORRESPONDENCIADEB> deb1 = new List<CORRESPONDENCIADEB>();

                List<CORRESPONDENCIAFILE> file1 = new List<CORRESPONDENCIAFILE>();

                //marginado*/
                List<CORRESPONDENCIAFULL2el> elemento = listaCorres2.FindAll(x => x.CORRESID == c.CORRESID && x.TIPO == 1).ToList();
                if(elemento.Count>0){
                    foreach (var v in elemento)
                    {
                        if (v.DETALLE != null)
                        {
                            CORRESPONDENCIAMARGINA mar1_t = new CORRESPONDENCIAMARGINA();
                            string[] data = v.DETALLE.Split('~');
                            mar1_t.MARGID = Convert.ToInt32(data[0].Split(':')[1]);
                            mar1_t.CORRESID = v.CORRESID;
                            mar1_t.MARGFEC = data[2].Split(':')[1];
                            mar1_t.MARGTIEMPO = data[3].Split(':')[1];
                            mar1_t.TIEMPO = Convert.ToInt32(data[4].Split(':')[1]);
                            mar1_t.MARGMOTIVO = data[5].Split(':')[1];
                            mar1_t.MARGINSTRUC = data[6].Split(':')[1];
                            mar1_t.MARGINSTRUCDSC = data[7].Split(':')[1];
                            mar1_t.MARGPENDIENTE = Convert.ToInt32(data[8].Split(':')[1]);
                            mar1_t.INSERTUSRID = Convert.ToInt32(data[9].Split(':')[1]);
                            mar1_t.INSERTUSRNOM = data[10].Split(':')[1];
                            mar1_t.INSERTUSRAPE = data[11].Split(':')[1];
                            mar1_t.MARGINADOPOR = data[12].Split(':')[1];

                            mar1_t.MARGICONT = cx.sp_margiContGT(mar1_t.MARGID);

                            mar1.Add(mar1_t);
                        }
                    }
                }
                        //remitido
                List<CORRESPONDENCIAFULL2el> elemento2 = listaCorres2.FindAll(x => x.CORRESID == c.CORRESID && x.TIPO == 2).ToList();
                if(elemento2.Count>0){
                    foreach (var v in elemento2)
                    {
                        if (v.DETALLE != null)
                        {
                            CORRESPONDENCIAREMITIDO rem1_t = new CORRESPONDENCIAREMITIDO();
                            string[] data = v.DETALLE.Split('~');
                            rem1_t.REMID = Convert.ToInt32(data[0].Split(':')[1]);
                            rem1_t.CLM_USRS_ID = Convert.ToInt32(data[1].Split(':')[1]);
                            rem1_t.USRNOM = data[2].Split(':')[1];
                            rem1_t.USRAPE = data[3].Split(':')[1];
                            rem1_t.CORRESID = v.CORRESID;
                            rem1_t.REMCFR_RCBD = Convert.ToInt32(data[5].Split(':')[1]);
                            rem1_t.REMFEC = data[6].Split(':')[1];
                            rem1_t.INSERTUSRID = Convert.ToInt32(data[7].Split(':')[1]);
                            rem1_t.INSERTUSRNOM = data[8].Split(':')[1];
                            rem1_t.INSERTUSRAPE = data[8].Split(':')[1];

                            rem1.Add(rem1_t);
                        }
                    }
                            
                }
                        //archivo
                List<CORRESPONDENCIAFULL2el> elemento3 = listaCorres2.FindAll(x => x.CORRESID == c.CORRESID && x.TIPO == 3).ToList();
                if(elemento3.Count>0){
                    foreach (var v in elemento3)
                    {
                        if (v.DETALLE != null)
                        {
                            CORRESPONDENCIAARCHIVO arc1_t = new CORRESPONDENCIAARCHIVO();
                            string[] data = v.DETALLE.Split('~');
                            arc1_t.ARCHID = Convert.ToInt32(data[0].Split(':')[1]);
                            arc1_t.CORRESID = v.CORRESID;
                            arc1_t.ARCHIVO = Convert.ToInt32(data[2].Split(':')[1]);
                            arc1_t.ARCHIVONOMBRE = data[3].Split(':')[1];
                            arc1_t.ARCHVOCOD = data[4].Split(':')[1];
                            arc1_t.ARCHVODSC = data[5].Split(':')[1];
                            arc1_t.TIPOID = Convert.ToInt32(data[6].Split(':')[1]);
                            arc1_t.TIPONOMBRE = data[7].Split(':')[1];

                            arc1.Add(arc1_t);
                        }
                    }                           
                }
                        //envio corresponencia
                List<CORRESPONDENCIAFULL2el> elemento4 = listaCorres2.FindAll(x => x.CORRESID == c.CORRESID && x.TIPO == 4).ToList();
                if(elemento4.Count>0){
                    foreach (var v in elemento4)
                    {
                        if (v.DETALLE != null)
                        {
                            CORRESPONDENCIAENVIADO env1_t = new CORRESPONDENCIAENVIADO();
                            string[] data = v.DETALLE.Split('~');

                            env1_t.ENVIAID = Convert.ToInt32(data[0].Split(':')[1]);
                            env1_t.CONTID = Convert.ToInt32(data[1].Split(':')[1]);
                            env1_t.CONTNOMBRE = data[2].Split(':')[1];
                            env1_t.CONTINST = data[3].Split(':')[1];
                            env1_t.CONTUNIDAD = data[4].Split(':')[1];
                            env1_t.CORRESID = v.CORRESID;
                            env1_t.ENVIOFEC = data[6].Split(':')[1];
                            env1_t.ENVIORECIBFEC = data[7].Split(':')[1];
                            env1_t.ENVIORECIBHORA = data[8].Substring(data[8].IndexOf(':') + 1);//data[8].Split(':')[1];
                            env1_t.ENVIORECIBNOMBRE = data[9].Split(':')[1];
                            env1_t.ENVIOINSTRUC = Convert.ToInt32(data[10].Split(':')[1]);
                            env1_t.ENVIOINSTRUCDSC = data[11].Split(':')[1];
                            env1_t.ENVIODIGITAL = Convert.ToInt32(data[12].Split(':')[1]);
                            env1_t.ENVIOFISICO = Convert.ToInt32(data[13].Split(':')[1]);
                            env1_t.INSERTUSRNOM = data[14].Split(':')[1];
                            env1_t.INSERTUSRAPE = data[15].Split(':')[1];
                            env1_t.INSERTUSRID = Convert.ToInt32(data[16].Split(':')[1]);

                            env1.Add(env1_t);
                        }
                    }
                }
                        //corres_deb
                List<CORRESPONDENCIAFULL2el> elemento5 = listaCorres2.FindAll(x => x.CORRESID == c.CORRESID && x.TIPO == 5).ToList();
                if(elemento5.Count>0){
                    foreach (var v in elemento5)
                    {
                        if (v.DETALLE != null)
                        {
                            CORRESPONDENCIADEB deb1_t = new CORRESPONDENCIADEB();
                            string[] data = v.DETALLE.Split('~');
                            deb1_t.CORRESDEBID = Convert.ToInt32(data[0].Split(':')[1]);
                            deb1_t.CORRESID = v.CORRESID;
                            deb1_t.CORRESDEBDSC = data[2].Split(':')[1];
                            deb1_t.CORRESDEB_RECIBFEC = data[3].Split(':')[1];
                            deb1_t.CORRESDEB_RECIBHORA = data[4].Substring(data[4].IndexOf(':') + 1);//data[4].Split(':')[1];
                            deb1_t.CORRESDEBFEC = data[5].Split(':')[1];
                            deb1_t.INSERTUSRID = Convert.ToInt32(data[6].Split(':')[1]);
                            deb1_t.INSERTUSRNOMFULL = data[7].Split(':')[1];
                            deb1_t.UPDATEUSRID = Convert.ToInt32(data[8].Split(':')[1]);
                            deb1_t.UPDATEUSRNOMFULL = data[9].Split(':')[1];

                            deb1.Add(deb1_t);
                        }
                    }
                }

                //adjuntos
                List<CORRESPONDENCIAFULL2el> elemento6 = listaCorres2.FindAll(x => x.CORRESID == c.CORRESID && x.TIPO == 6).ToList();
                if (elemento6.Count > 0)
                {
                    foreach (var v in elemento6)
                    {
                        if (v.DETALLE != null)
                        {
                            CORRESPONDENCIAFILE file1_t = new CORRESPONDENCIAFILE();
                            string[] data = v.DETALLE.Split('~');
                            file1_t.ADJUNTOID = Convert.ToInt32(data[0].Split(':')[1]);
                            file1_t.CORRESID = v.CORRESID;
                            file1_t.ADJUNTO_NAME = data[2].Split(':')[1];
                            //file1_t.ADJUNTO_NAME = data[2].Split(':')[1];
                            file1_t.ADJUNTO_SIZE = ((Convert.ToDouble(data[3].Split(':')[1]) / 1024) < 1024) ? (Convert.ToDouble(data[3].Split(':')[1]) / 1024).ToString("#.#0") + " KB" : ((Convert.ToDouble(data[3].Split(':')[1]) / 1024) / 1024).ToString("#.#0") + " MB";

                            file1.Add(file1_t);
                        }
                    }
                }

                Corres.datmargi = mar1;
                Corres.datremi = rem1;
                Corres.datarchi = arc1;
                Corres.datenvia = env1;
                Corres.datdev = deb1;
                Corres.datfile = file1;

                listaCorres.Add(Corres);
            }

            return listaCorres;
        }

        /***********Correspondencia by id************/
        //public Object sp_corresFullByIdGT(int corresId)
        //{

        //    List<CORRESPONDENCIAFULLel> listaCorres = new List<CORRESPONDENCIAFULLel>();

        //    foreach (var c in cx.sp_detallefullByIdGT(corresId).ToList())
        //    {
        //        CORRESPONDENCIAFULLel Corres = new CORRESPONDENCIAFULLel();

        //        Corres.datCorres = c;
        //        Corres.datmargi = cx.sp_marginadoGT(c.CORRESID);
        //        Corres.datremi = cx.sp_remitidoGT(c.CORRESID);
        //        Corres.estado = cx.sp_estadoGT(c.CORRESID);

        //        listaCorres.Add(Corres);
        //    }

        //    return listaCorres;
        //}

        /***************sp_correspondenciaSVbl********************/
        public String sp_correspondenciaSVbl(CORRESPONDENCIAel Datos)
        {
            String res = "";
            if (Datos.categoid == 1)
            {
                res = valsp_correspondenciaSVbl(Datos);
            }
            else if (Datos.categoid == 2)
            {
                res = valsp_resMargiSVbl(Datos);
            }
            if (res == "")
            {
                try
                {
                    DateTime notaelabfec;
                    notaelabfec = new DateTime();
                    notaelabfec = DateTime.ParseExact(Datos.notaelabfec, "dd/MM/yyyy", null);

                    DateTime notarecibfec;
                    notarecibfec = new DateTime();
                    notarecibfec = DateTime.ParseExact(Datos.notarecibfec, "dd/MM/yyyy", null);
                    
                    
                    res = cx.sp_correspondenciaSV(
                      Datos.corresid
                      , Datos.correscod
                      , Datos.claseid
                      , Datos.tipoid
                      , Datos.prioid
                      , Datos.contid_remite
                      , Datos.categoid
                      , Datos.asunto
                      , notaelabfec
                      , notarecibfec
                      , Datos.notarecibhora
                      , Datos.reqfirma
                      , Datos.contid_dirigido
                      , Datos.contid_elaboro
                      , Datos.corresid_contesta
                      , Datos.marginaid
                      , Datos.marginaformares
                      , Datos.eliminado
                      , Datos.updateusrid
                      , Datos.responsableid
                      ).SingleOrDefault().CORRESID.ToString();

                    /*Inserta primer Estado*/
                    if (Convert.ToInt32(res) > 0)
                    {
                        if (Datos.corresid < 0)
                        {
                            cx.sp_estadoSV(
                                -1
                                , Convert.ToInt32(res)
                                , 1
                                , 1
                                , Datos.updateusrid
                                );
                        }
                        /*Actualiza marginado si es categoria 2*/
                        if (Datos.categoid == 2)
                        {
                            cx.sp_margiPendienteUpdate(
                                    Datos.marginaid
                                    , 2
                                    , Datos.updateusrid
                                );
                        }
                    }

                    
                }
                catch (Exception EX) { res = EX.InnerException.Message; }
            }
            return res;
        }

        /***************Validacion sp_correspondenciaSVbl********************/

        public String valsp_correspondenciaSVbl(CORRESPONDENCIAel Datos)
        {
            String res = "";
            long Dft = 0;
            if (Datos.claseid <= 0)
            {
                res += "<li> El campo <b>Clase</b> es obligatorio. </li>";
            }
            if (Datos.tipoid <= 0)
            {
                res += "<li> El campo <b>Tipo</b> es obligatorio. </li>";
            }
            if (Datos.prioid <= 0)
            {
                res += "<li> El campo <b>Prioridad</b> es obligatorio. </li>";
            }
            if (Datos.contid_remite <= 0)
            {
                res += "<li> El campo <b>Remitente</b> es obligatorio. </li>";
            }
            if (Datos.asunto == "")
            {
                res += "<li> El campo <b>Asunto</b> es obligatorio. </li>";
            }
            if (Datos.notaelabfec == "")
            {
                res += "<li> El campo <b>Fecha elaboración</b> es obligatorio. </li>";
            }
            if (Datos.notarecibfec == "")
            {
                res += "<li> El campo <b>Fecha recibido</b> es obligatorio. </li>";
            }
            if (Datos.notarecibhora == "")
            {
                res += "<li> El campo <b>Hora recibido</b> es obligatorio. </li>";
            }
            return res;
        }

        public String valsp_resMargiSVbl(CORRESPONDENCIAel Datos)
        {
            String res = "";
            if (Datos.claseid <= 0)
            {
                res += "<li> El campo <b>Clase</b> es obligatorio. </li>";
            }
            if (Datos.marginaid <= 0)
            {
                res += "<li> El campo <b>Marginado al que responde</b> es obligatorio. </li>";
            }
            if (Datos.marginaformares == "")
            {
                res += "<li> El campo <b>Forma de respuesta</b> es obligatorio. </li>";
            }
            if (Datos.notaelabfec == "")
            {
                res += "<li> El campo <b>Fecha elaboración</b> es obligatorio. </li>";
            }
            if (Datos.notarecibfec == "")
            {
                res += "<li> El campo <b>Fecha recibido</b> es obligatorio. </li>";
            }
            if (Datos.notarecibhora == "")
            {
                res += "<li> El campo <b>Hora recibido</b> es obligatorio. </li>";
            }
            return res;
        }

        /*****************ELIMINAR REGISTRO*************/
        public String sp_corresElimSVbl(int corresid,int marginaid, int updateusrid)
        {
            String res = "";
            try
            {
                res = cx.sp_corresElimSV(
                        corresid
                        , marginaid
                        ,1
                        ,updateusrid
                    ).SingleOrDefault().CORRESID.ToString();
            }
            catch { res = "Error interno, intente después de recargar la página."; }

            return res;
        }


        /*****************Actualizar estado firma*************/
        public String sp_corresFirmaSVbl(int corresid, int updateusrid)
        {
            String res = "";
            try
            {
                res = cx.sp_corresFimaSV(
                        corresid
                        , 3
                        , updateusrid
                    ).SingleOrDefault().CORRESID.ToString();
            }
            catch { res = "Error interno, intente después de recargar la página."; }

            return res;
        }

        /*****************Activar / Desactivar REGISTRO*************/
         public class activaCorres
        {
            public Int32 corresid;
            public byte activo;
            public int updateusrid;
        }
        
        public String sp_corresActivoSVbl(activaCorres Datos)
        {
            String res = "";
            try
            {
                res = cx.sp_corresActivoSV(
                        Datos.corresid
                        , Datos.activo
                        , Datos.updateusrid
                    ).SingleOrDefault().CORRESID.ToString();
            }
            catch { res = "Error interno, intente después de recargar la página."; }

            return res;
        }

       
        public String activaSVbl(List<activaCorres> Datos)
        {
            String res = "";
            foreach(var item in Datos){
                res = sp_corresActivoSVbl(item);
            }
            return res;
        }

        /***************Marca la Correspondencia debuelta por corresciones***********/
        public String sp_corresDebUpSVbl(
            int corresdebid
            , int corresid
            , string corresdeb_recibfec
            , string corresdeb_recibhora
            , int updateusrid)
        {
            String res = "";
            DateTime fec;
            fec = new DateTime();
            fec = DateTime.ParseExact(corresdeb_recibfec, "dd/MM/yyyy", null);

            try
            {
                res = cx.sp_corresDebUpSV(
                    corresdebid
                    , corresid
                    , fec
                    , corresdeb_recibhora
                    , updateusrid
                    ).SingleOrDefault().CORRESID.ToString();
            }
            catch
            {
                res = "Error interno, intente después de recargar la página.";
            }
            return res;
        }

        /**************agrega resgistro detalle de debolucion por corresciones******/
        public String sp_corresDebSVbl(int corresdebid,int corresid,string corredebdsc, string corresdebfec,int updateusrid)
        {
            string res = "";
            try
            {
                DateTime fec;
                fec = new DateTime();
                fec = DateTime.ParseExact(corresdebfec, "dd/MM/yyyy", null);

                res = cx.sp_corresDebSV(
                    corresdebid
                    , corresid
                    , corredebdsc
                    , fec
                    , updateusrid
                    ).SingleOrDefault().CORRESDEBID.ToString();
            }
            catch
            {
                res = "Error interno, intente después de recargar la página.";
            }
            return res;
        }
        /*************detalle de debolucion por correcciones*****************/
        public Object sp_corresDebByCorresIdGTbl(int corresid)
        {
            return cx.sp_corresDebByCorresIdGT(corresid);
        }
    }
}
