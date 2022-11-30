using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.DL;
using SICOR.EL;

namespace SICOR.BL
{
    public class BUSCARbl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();
        MARGINADObl m = new MARGINADObl();
        //Lista de Insitituciones

        public Object contInstGTbl(Int32 grupo)
        {
            return cx.sp_contInstGT(grupo);
        }
        
        // Lista de Contactos por insitución
        public Object contacByInstiGTbl(string inst)
        {
            return cx.sp_contactosByInstGT(inst);
        }

        //Lista Correspondencia por institución

        public Object corresFullByInst(string inst,int grupo)
        {
            List<CORRESPONDENCIAFULLel> listaCorres = new List<CORRESPONDENCIAFULLel>();

            foreach (var cont in cx.sp_contactosByInstGT(inst))
            {
                //Padres
                foreach (var c in cx.sp_detallefullByContIdPadreGT(cont.CONTID,grupo).ToList())
                {
                    CORRESPONDENCIAFULLel Corres = new CORRESPONDENCIAFULLel();

                    Corres.datCorres = c;
                    Corres.datmargi = m.sp_marginadoGTbl(c.CORRESID);
                    Corres.datremi = cx.sp_remitidoGT(c.CORRESID);
                    Corres.datarchi = cx.sp_archivoGT(c.CORRESID);
                    Corres.datenvia = cx.sp_enviadoGT(c.CORRESID);
                    Corres.datdev = cx.sp_corresDebByCorresIdGT(c.CORRESID);
                    Corres.datfile = cx.sp_archivosGT(c.CORRESID);

                    listaCorres.Add(Corres);


                    if (c.CORRESID_CONTESTA > 0)
                    {
                        //Padre
                        foreach (var e in cx.sp_detallefullByIdGT(c.CORRESID_CONTESTA,grupo).ToList())
                        {
                            CORRESPONDENCIAFULLel CorP = new CORRESPONDENCIAFULLel();

                            CorP.datCorres = e;
                            CorP.datmargi = m.sp_marginadoGTbl(e.CORRESID);
                            CorP.datremi = cx.sp_remitidoGT(e.CORRESID);
                            CorP.datarchi = cx.sp_archivoGT(e.CORRESID);
                            CorP.datenvia = cx.sp_enviadoGT(e.CORRESID);
                            CorP.datdev = cx.sp_corresDebByCorresIdGT(e.CORRESID);
                            CorP.datfile = cx.sp_archivosGT(e.CORRESID);

                            listaCorres.Add(CorP);
                        }
                    }
                    else
                    {
                        //Hijos
                        foreach (var d in cx.sp_detallefullByContestaIdGT(c.CORRESID,grupo).ToList())
                        {
                            CORRESPONDENCIAFULLel CorH = new CORRESPONDENCIAFULLel();

                            CorH.datCorres = d;
                            CorH.datmargi = m.sp_marginadoGTbl(d.CORRESID);
                            CorH.datremi = cx.sp_remitidoGT(d.CORRESID);
                            CorH.datarchi = cx.sp_archivoGT(d.CORRESID);
                            CorH.datenvia = cx.sp_enviadoGT(d.CORRESID);
                            CorH.datdev = cx.sp_corresDebByCorresIdGT(d.CORRESID);
                            CorH.datfile = cx.sp_archivosGT(d.CORRESID);

                            listaCorres.Add(CorH);
                        }
                    }
                }
                
            }
            return listaCorres;
        }
        
        
        
        //Lista Correspondencia por contacto
        public Object corresByContGTbl(Int32 tipo,string cont,string texto,int grupo)
        {
            List<CORRESPONDENCIAFULLel> listaCorres = new List<CORRESPONDENCIAFULLel>();

            
            //Padres
            foreach (var c in cx.sp_detallefullByContTIPOGT(tipo,cont,texto,grupo).ToList())
            {
                CORRESPONDENCIAFULLel Corres = new CORRESPONDENCIAFULLel();

                Corres.datCorres = c;
                Corres.datmargi = m.sp_marginadoGTbl(c.CORRESID);
                Corres.datremi = cx.sp_remitidoGT(c.CORRESID);
                Corres.datarchi = cx.sp_archivoGT(c.CORRESID);
                Corres.datenvia = cx.sp_enviadoGT(c.CORRESID);
                Corres.datdev = cx.sp_corresDebByCorresIdGT(c.CORRESID);
                Corres.datfile = cx.sp_archivosGT(c.CORRESID);
                
                listaCorres.Add(Corres);

                if (c.CORRESID_CONTESTA > 0)
                {
                    //Padre
                    foreach (var e in cx.sp_detallefullByIdGT(c.CORRESID_CONTESTA,grupo).ToList())
                    {
                        CORRESPONDENCIAFULLel CorP = new CORRESPONDENCIAFULLel();

                        CorP.datCorres = e;
                        CorP.datmargi = m.sp_marginadoGTbl(e.CORRESID);
                        CorP.datremi = cx.sp_remitidoGT(e.CORRESID);
                        CorP.datarchi = cx.sp_archivoGT(e.CORRESID);
                        CorP.datenvia = cx.sp_enviadoGT(e.CORRESID);
                        CorP.datdev = cx.sp_corresDebByCorresIdGT(e.CORRESID);
                        CorP.datfile = cx.sp_archivosGT(e.CORRESID);

                        listaCorres.Add(CorP);
                    }
                }
                else
                {

                    //Hijos
                    foreach (var d in cx.sp_detallefullByContestaIdGT(c.CORRESID,grupo).ToList())
                    {
                        CORRESPONDENCIAFULLel CorH = new CORRESPONDENCIAFULLel();

                        CorH.datCorres = d;
                        CorH.datmargi = m.sp_marginadoGTbl(d.CORRESID);
                        CorH.datremi = cx.sp_remitidoGT(d.CORRESID);
                        CorH.datarchi = cx.sp_archivoGT(d.CORRESID);
                        CorH.datenvia = cx.sp_enviadoGT(d.CORRESID);
                        CorH.datdev = cx.sp_corresDebByCorresIdGT(d.CORRESID);
                        CorH.datfile = cx.sp_archivosGT(d.CORRESID);

                        listaCorres.Add(CorH);
                    }
                }
            }
            return listaCorres;
        }

        //Lista Correspondencia po Asunto
        public Object corresByAsuntoGTbl(string asunto,int grupo)
        {
            List<CORRESPONDENCIAFULLel> listaCorres = new List<CORRESPONDENCIAFULLel>();

            foreach (var c in cx.sp_detallefullByAsuntoGT(asunto,grupo).ToList())
            {
                CORRESPONDENCIAFULLel Corres = new CORRESPONDENCIAFULLel();

                Corres.datCorres = c;
                Corres.datmargi = m.sp_marginadoGTbl(c.CORRESID);
                Corres.datremi = cx.sp_remitidoGT(c.CORRESID);
                Corres.datarchi = cx.sp_archivoGT(c.CORRESID);
                Corres.datenvia = cx.sp_enviadoGT(c.CORRESID);
                Corres.datdev = cx.sp_corresDebByCorresIdGT(c.CORRESID);
                Corres.datfile = cx.sp_archivosGT(c.CORRESID);

                listaCorres.Add(Corres);

                if (c.CORRESID_CONTESTA > 0)
                {
                    //Padre
                    foreach (var e in cx.sp_detallefullByIdGT(c.CORRESID_CONTESTA,grupo).ToList())
                    {
                        CORRESPONDENCIAFULLel CorP = new CORRESPONDENCIAFULLel();

                        CorP.datCorres = e;
                        CorP.datmargi = m.sp_marginadoGTbl(e.CORRESID);
                        CorP.datremi = cx.sp_remitidoGT(e.CORRESID);
                        CorP.datarchi = cx.sp_archivoGT(e.CORRESID);
                        CorP.datenvia = cx.sp_enviadoGT(e.CORRESID);
                        CorP.datdev = cx.sp_corresDebByCorresIdGT(e.CORRESID);
                        CorP.datfile = cx.sp_archivosGT(e.CORRESID);

                        listaCorres.Add(CorP);
                    }
                }
                else
                {

                    //Hijos
                    foreach (var d in cx.sp_detallefullByContestaIdGT(c.CORRESID,grupo).ToList())
                    {
                        CORRESPONDENCIAFULLel CorH = new CORRESPONDENCIAFULLel();

                        CorH.datCorres = d;
                        CorH.datmargi = m.sp_marginadoGTbl(d.CORRESID);
                        CorH.datremi = cx.sp_remitidoGT(d.CORRESID);
                        CorH.datarchi = cx.sp_archivoGT(d.CORRESID);
                        CorH.datenvia = cx.sp_enviadoGT(d.CORRESID);
                        CorH.datdev = cx.sp_corresDebByCorresIdGT(d.CORRESID);
                        CorH.datfile = cx.sp_archivosGT(d.CORRESID);

                        listaCorres.Add(CorH);
                    }
                }
            }

            return listaCorres;
        }

        //Lista Correspondencia por fecha
        public Object corresByFechabl(string fech01, string fech02,int grupo)
        {
            DateTime f1;
            f1 = new DateTime();
            f1 = DateTime.ParseExact(fech01, "dd/MM/yyyy", null);

            DateTime f2;
            f2 = new DateTime();
            f2 = DateTime.ParseExact(fech02, "dd/MM/yyyy", null);
            

            List<CORRESPONDENCIAFULLel> listaCorres = new List<CORRESPONDENCIAFULLel>();

            //List<CORRESPONDENCIAFULLel> listaCorres = new List<CORRESPONDENCIAFULLel>();
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

            foreach (var c in cx.sp_detallefullByFechaGT(f1, f2, grupo).ToList())
            {
                CORRESPONDENCIAFULLel Corres = new CORRESPONDENCIAFULLel();

                Corres.datCorres = c;
                List<CORRESPONDENCIAMARGINA> mar1 = new List<CORRESPONDENCIAMARGINA>();
                List<CORRESPONDENCIAREMITIDO> rem1 = new List<CORRESPONDENCIAREMITIDO>();
                List<CORRESPONDENCIAARCHIVO> arc1 = new List<CORRESPONDENCIAARCHIVO>();
                List<CORRESPONDENCIAENVIADO> env1 = new List<CORRESPONDENCIAENVIADO>();
                List<CORRESPONDENCIADEB> deb1 = new List<CORRESPONDENCIADEB>();

                List<CORRESPONDENCIAFILE> file1 = new List<CORRESPONDENCIAFILE>();

                /*Corres.datmargi = m.sp_marginadoGTbl(c.CORRESID);
                Corres.datremi = cx.sp_remitidoGT(c.CORRESID);
                Corres.datarchi = cx.sp_archivoGT(c.CORRESID);
                Corres.datenvia = cx.sp_enviadoGT(c.CORRESID);
                Corres.datdev = cx.sp_corresDebByCorresIdGT(c.CORRESID);*/

                //inicio nuevo método
                //marginado*/
                List<CORRESPONDENCIAFULL2el> elemento = listaCorres2.FindAll(x => x.CORRESID == c.CORRESID && x.TIPO == 1).ToList();
                if (elemento.Count > 0)
                {
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
                if (elemento2.Count > 0)
                {
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
                if (elemento3.Count > 0)
                {
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
                if (elemento4.Count > 0)
                {
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
                            env1_t.ENVIORECIBHORA = data[8].Substring(data[8].IndexOf(':') + 1); //data[8].Split(':')[1];
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
                if (elemento5.Count > 0)
                {
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
                            deb1_t.CORRESDEB_RECIBHORA = data[4].Substring(data[4].IndexOf(':') + 1); //data[4].Split(':')[1];
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
                //fin nuevo método

                listaCorres.Add(Corres);
                //***********************************************************************************
                if (c.CORRESID_CONTESTA > 0)
                {
                    //Padre
                    foreach (var e in cx.sp_detallefullByIdGT(c.CORRESID_CONTESTA,grupo).ToList())
                    {
                        CORRESPONDENCIAFULLel CorP = new CORRESPONDENCIAFULLel();

                        List<CORRESPONDENCIAMARGINA> mar2 = new List<CORRESPONDENCIAMARGINA>();
                        List<CORRESPONDENCIAREMITIDO> rem2 = new List<CORRESPONDENCIAREMITIDO>();
                        List<CORRESPONDENCIAARCHIVO> arc2 = new List<CORRESPONDENCIAARCHIVO>();
                        List<CORRESPONDENCIAENVIADO> env2 = new List<CORRESPONDENCIAENVIADO>();
                        List<CORRESPONDENCIADEB> deb2 = new List<CORRESPONDENCIADEB>();

                        CorP.datCorres = e;                        

                        //inicio nuevo método
                        //marginado*/
                        List<CORRESPONDENCIAFULL2el> elemento_2 = listaCorres2.FindAll(x => x.CORRESID == e.CORRESID && x.TIPO == 1).ToList();
                        if (elemento_2.Count > 0)
                        {
                            foreach (var v in elemento_2)
                            {
                                if (v.DETALLE != null)
                                {
                                    CORRESPONDENCIAMARGINA mar2_t = new CORRESPONDENCIAMARGINA();
                                    string[] data = v.DETALLE.Split('~');
                                    mar2_t.MARGID = Convert.ToInt32(data[0].Split(':')[1]);
                                    mar2_t.CORRESID = v.CORRESID;
                                    mar2_t.MARGFEC = data[2].Split(':')[1];
                                    mar2_t.MARGTIEMPO = data[3].Split(':')[1];
                                    mar2_t.TIEMPO = Convert.ToInt32(data[4].Split(':')[1]);
                                    mar2_t.MARGMOTIVO = data[5].Split(':')[1];
                                    mar2_t.MARGINSTRUC = data[6].Split(':')[1];
                                    mar2_t.MARGINSTRUCDSC = data[7].Split(':')[1];
                                    mar2_t.MARGPENDIENTE = Convert.ToInt32(data[8].Split(':')[1]);
                                    mar2_t.INSERTUSRID = Convert.ToInt32(data[9].Split(':')[1]);
                                    mar2_t.INSERTUSRNOM = data[10].Split(':')[1];
                                    mar2_t.INSERTUSRAPE = data[11].Split(':')[1];
                                    mar2_t.MARGINADOPOR = data[12].Split(':')[1];

                                    mar2_t.MARGICONT = cx.sp_margiContGT(mar2_t.MARGID);

                                    mar2.Add(mar2_t);
                                }
                            }
                        }
                        //remitido
                        List<CORRESPONDENCIAFULL2el> elemento2_2 = listaCorres2.FindAll(x => x.CORRESID == e.CORRESID && x.TIPO == 2).ToList();
                        if (elemento2_2.Count > 0)
                        {
                            foreach (var v in elemento2_2)
                            {
                                if (v.DETALLE != null)
                                {
                                    CORRESPONDENCIAREMITIDO rem2_t = new CORRESPONDENCIAREMITIDO();
                                    string[] data = v.DETALLE.Split('~');
                                    rem2_t.REMID = Convert.ToInt32(data[0].Split(':')[1]);
                                    rem2_t.CLM_USRS_ID = Convert.ToInt32(data[1].Split(':')[1]);
                                    rem2_t.USRNOM = data[2].Split(':')[1];
                                    rem2_t.USRAPE = data[3].Split(':')[1];
                                    rem2_t.CORRESID = v.CORRESID;
                                    rem2_t.REMCFR_RCBD = Convert.ToInt32(data[5].Split(':')[1]);
                                    rem2_t.REMFEC = data[6].Split(':')[1];
                                    rem2_t.INSERTUSRID = Convert.ToInt32(data[7].Split(':')[1]);
                                    rem2_t.INSERTUSRNOM = data[8].Split(':')[1];
                                    rem2_t.INSERTUSRAPE = data[8].Split(':')[1];

                                    rem2.Add(rem2_t);
                                }
                            }

                        }
                        //archivo
                        List<CORRESPONDENCIAFULL2el> elemento3_2 = listaCorres2.FindAll(x => x.CORRESID == e.CORRESID && x.TIPO == 3).ToList();
                        if (elemento3_2.Count > 0)
                        {
                            foreach (var v in elemento3_2)
                            {
                                if (v.DETALLE != null)
                                {
                                    CORRESPONDENCIAARCHIVO arc2_t = new CORRESPONDENCIAARCHIVO();
                                    string[] data = v.DETALLE.Split('~');
                                    arc2_t.ARCHID = Convert.ToInt32(data[0].Split(':')[1]);
                                    arc2_t.CORRESID = v.CORRESID;
                                    arc2_t.ARCHIVO = Convert.ToInt32(data[2].Split(':')[1]);
                                    arc2_t.ARCHIVONOMBRE = data[3].Split(':')[1];
                                    arc2_t.ARCHVOCOD = data[4].Split(':')[1];
                                    arc2_t.ARCHVODSC = data[5].Split(':')[1];
                                    arc2_t.TIPOID = Convert.ToInt32(data[6].Split(':')[1]);
                                    arc2_t.TIPONOMBRE = data[7].Split(':')[1];

                                    arc2.Add(arc2_t);
                                }
                            }
                        }
                        //envio corresponencia
                        List<CORRESPONDENCIAFULL2el> elemento4_2 = listaCorres2.FindAll(x => x.CORRESID == e.CORRESID && x.TIPO == 4).ToList();
                        if (elemento4_2.Count > 0)
                        {
                            foreach (var v in elemento4_2)
                            {
                                if (v.DETALLE != null)
                                {
                                    CORRESPONDENCIAENVIADO env2_t = new CORRESPONDENCIAENVIADO();
                                    string[] data = v.DETALLE.Split('~');

                                    env2_t.ENVIAID = Convert.ToInt32(data[0].Split(':')[1]);
                                    env2_t.CONTID = Convert.ToInt32(data[1].Split(':')[1]);
                                    env2_t.CONTNOMBRE = data[2].Split(':')[1];
                                    env2_t.CONTINST = data[3].Split(':')[1];
                                    env2_t.CONTUNIDAD = data[4].Split(':')[1];
                                    env2_t.CORRESID = v.CORRESID;
                                    env2_t.ENVIOFEC = data[6].Split(':')[1];
                                    env2_t.ENVIORECIBFEC = data[7].Split(':')[1];
                                    env2_t.ENVIORECIBHORA = data[8].Substring(data[8].IndexOf(':') + 1); //data[8].Split(':')[1];
                                    env2_t.ENVIORECIBNOMBRE = data[9].Split(':')[1];
                                    env2_t.ENVIOINSTRUC = Convert.ToInt32(data[10].Split(':')[1]);
                                    env2_t.ENVIOINSTRUCDSC = data[11].Split(':')[1];
                                    env2_t.ENVIODIGITAL = Convert.ToInt32(data[12].Split(':')[1]);
                                    env2_t.ENVIOFISICO = Convert.ToInt32(data[13].Split(':')[1]);
                                    env2_t.INSERTUSRNOM = data[14].Split(':')[1];
                                    env2_t.INSERTUSRAPE = data[15].Split(':')[1];
                                    env2_t.INSERTUSRID = Convert.ToInt32(data[16].Split(':')[1]);

                                    env2.Add(env2_t);
                                }
                            }
                        }
                        //corres_deb
                        List<CORRESPONDENCIAFULL2el> elemento5_2 = listaCorres2.FindAll(x => x.CORRESID == e.CORRESID && x.TIPO == 5).ToList();
                        if (elemento5_2.Count > 0)
                        {
                            foreach (var v in elemento5_2)
                            {
                                if (v.DETALLE != null)
                                {
                                    CORRESPONDENCIADEB deb2_t = new CORRESPONDENCIADEB();
                                    string[] data = v.DETALLE.Split('~');
                                    deb2_t.CORRESDEBID = Convert.ToInt32(data[0].Split(':')[1]);
                                    deb2_t.CORRESID = v.CORRESID;
                                    deb2_t.CORRESDEBDSC = data[2].Split(':')[1];
                                    deb2_t.CORRESDEB_RECIBFEC = data[3].Split(':')[1];
                                    deb2_t.CORRESDEB_RECIBHORA = data[4].Substring(data[4].IndexOf(':') + 1); //data[4].Split(':')[1];
                                    deb2_t.CORRESDEBFEC = data[5].Split(':')[1];
                                    deb2_t.INSERTUSRID = Convert.ToInt32(data[6].Split(':')[1]);
                                    deb2_t.INSERTUSRNOMFULL = data[7].Split(':')[1];
                                    deb2_t.UPDATEUSRID = Convert.ToInt32(data[8].Split(':')[1]);
                                    deb2_t.UPDATEUSRNOMFULL = data[9].Split(':')[1];

                                    deb2.Add(deb2_t);
                                }
                            }
                        }

                        /*CorP.datmargi = m.sp_marginadoGTbl(e.CORRESID);
                        CorP.datremi = cx.sp_remitidoGT(e.CORRESID);
                        CorP.datarchi = cx.sp_archivoGT(e.CORRESID);
                        CorP.datenvia = cx.sp_enviadoGT(e.CORRESID);
                        CorP.datdev = cx.sp_corresDebByCorresIdGT(e.CORRESID);*/

                        CorP.datmargi = mar2;
                        CorP.datremi = rem2;
                        CorP.datarchi = arc2;
                        CorP.datenvia = env2;
                        CorP.datdev = deb2;
                        //fin nuevo método

                        listaCorres.Add(CorP);
                    }
                }
                else
                {

                    //Hijos
                    foreach (var d in cx.sp_detallefullByContestaIdGT(c.CORRESID,grupo).ToList())
                    {
                        CORRESPONDENCIAFULLel CorH = new CORRESPONDENCIAFULLel();

                        CorH.datCorres = d;

                        List<CORRESPONDENCIAMARGINA> mar2 = new List<CORRESPONDENCIAMARGINA>();
                        List<CORRESPONDENCIAREMITIDO> rem2 = new List<CORRESPONDENCIAREMITIDO>();
                        List<CORRESPONDENCIAARCHIVO> arc2 = new List<CORRESPONDENCIAARCHIVO>();
                        List<CORRESPONDENCIAENVIADO> env2 = new List<CORRESPONDENCIAENVIADO>();
                        List<CORRESPONDENCIADEB> deb2 = new List<CORRESPONDENCIADEB>();

                        //inicio nuevo método
                        //marginado*/
                        List<CORRESPONDENCIAFULL2el> elemento_2 = listaCorres2.FindAll(x => x.CORRESID == d.CORRESID && x.TIPO == 1).ToList();
                        if (elemento_2.Count > 0)
                        {
                            foreach (var v in elemento_2)
                            {
                                if (v.DETALLE != null)
                                {
                                    CORRESPONDENCIAMARGINA mar2_t = new CORRESPONDENCIAMARGINA();
                                    string[] data = v.DETALLE.Split('~');
                                    mar2_t.MARGID = Convert.ToInt32(data[0].Split(':')[1]);
                                    mar2_t.CORRESID = v.CORRESID;
                                    mar2_t.MARGFEC = data[2].Split(':')[1];
                                    mar2_t.MARGTIEMPO = data[3].Split(':')[1];
                                    mar2_t.TIEMPO = Convert.ToInt32(data[4].Split(':')[1]);
                                    mar2_t.MARGMOTIVO = data[5].Split(':')[1];
                                    mar2_t.MARGINSTRUC = data[6].Split(':')[1];
                                    mar2_t.MARGINSTRUCDSC = data[7].Split(':')[1];
                                    mar2_t.MARGPENDIENTE = Convert.ToInt32(data[8].Split(':')[1]);
                                    mar2_t.INSERTUSRID = Convert.ToInt32(data[9].Split(':')[1]);
                                    mar2_t.INSERTUSRNOM = data[10].Split(':')[1];
                                    mar2_t.INSERTUSRAPE = data[11].Split(':')[1];

                                    mar2_t.MARGICONT = cx.sp_margiContGT(mar2_t.MARGID);

                                    mar2.Add(mar2_t);
                                }
                            }
                        }
                        //remitido
                        List<CORRESPONDENCIAFULL2el> elemento2_2 = listaCorres2.FindAll(x => x.CORRESID == d.CORRESID && x.TIPO == 2).ToList();
                        if (elemento2_2.Count > 0)
                        {
                            foreach (var v in elemento2_2)
                            {
                                if (v.DETALLE != null)
                                {
                                    CORRESPONDENCIAREMITIDO rem2_t = new CORRESPONDENCIAREMITIDO();
                                    string[] data = v.DETALLE.Split('~');
                                    rem2_t.REMID = Convert.ToInt32(data[0].Split(':')[1]);
                                    rem2_t.CLM_USRS_ID = Convert.ToInt32(data[1].Split(':')[1]);
                                    rem2_t.USRNOM = data[2].Split(':')[1];
                                    rem2_t.USRAPE = data[3].Split(':')[1];
                                    rem2_t.CORRESID = v.CORRESID;
                                    rem2_t.REMCFR_RCBD = Convert.ToInt32(data[5].Split(':')[1]);
                                    rem2_t.REMFEC = data[6].Split(':')[1];
                                    rem2_t.INSERTUSRID = Convert.ToInt32(data[7].Split(':')[1]);
                                    rem2_t.INSERTUSRNOM = data[8].Split(':')[1];
                                    rem2_t.INSERTUSRAPE = data[8].Split(':')[1];

                                    rem2.Add(rem2_t);
                                }
                            }

                        }
                        //archivo
                        List<CORRESPONDENCIAFULL2el> elemento3_2 = listaCorres2.FindAll(x => x.CORRESID == d.CORRESID && x.TIPO == 3).ToList();
                        if (elemento3_2.Count > 0)
                        {
                            foreach (var v in elemento3_2)
                            {
                                if (v.DETALLE != null)
                                {
                                    CORRESPONDENCIAARCHIVO arc2_t = new CORRESPONDENCIAARCHIVO();
                                    string[] data = v.DETALLE.Split('~');
                                    arc2_t.ARCHID = Convert.ToInt32(data[0].Split(':')[1]);
                                    arc2_t.CORRESID = v.CORRESID;
                                    arc2_t.ARCHIVO = Convert.ToInt32(data[2].Split(':')[1]);
                                    arc2_t.ARCHIVONOMBRE = data[3].Split(':')[1];
                                    arc2_t.ARCHVOCOD = data[4].Split(':')[1];
                                    arc2_t.ARCHVODSC = data[5].Split(':')[1];
                                    arc2_t.TIPOID = Convert.ToInt32(data[6].Split(':')[1]);
                                    arc2_t.TIPONOMBRE = data[7].Split(':')[1];

                                    arc2.Add(arc2_t);
                                }
                            }
                        }
                        //envio corresponencia
                        List<CORRESPONDENCIAFULL2el> elemento4_2 = listaCorres2.FindAll(x => x.CORRESID == d.CORRESID && x.TIPO == 4).ToList();
                        if (elemento4_2.Count > 0)
                        {
                            foreach (var v in elemento4_2)
                            {
                                if (v.DETALLE != null)
                                {
                                    CORRESPONDENCIAENVIADO env2_t = new CORRESPONDENCIAENVIADO();
                                    string[] data = v.DETALLE.Split('~');

                                    env2_t.ENVIAID = Convert.ToInt32(data[0].Split(':')[1]);
                                    env2_t.CONTID = Convert.ToInt32(data[1].Split(':')[1]);
                                    env2_t.CONTNOMBRE = data[2].Split(':')[1];
                                    env2_t.CONTINST = data[3].Split(':')[1];
                                    env2_t.CONTUNIDAD = data[4].Split(':')[1];
                                    env2_t.CORRESID = v.CORRESID;
                                    env2_t.ENVIOFEC = data[6].Split(':')[1];
                                    env2_t.ENVIORECIBFEC = data[7].Split(':')[1];
                                    env2_t.ENVIORECIBHORA = data[8].Substring(data[8].IndexOf(':') + 1); //data[8].Split(':')[1];
                                    env2_t.ENVIORECIBNOMBRE = data[9].Split(':')[1];
                                    env2_t.ENVIOINSTRUC = Convert.ToInt32(data[10].Split(':')[1]);
                                    env2_t.ENVIOINSTRUCDSC = data[11].Split(':')[1];
                                    env2_t.ENVIODIGITAL = Convert.ToInt32(data[12].Split(':')[1]);
                                    env2_t.ENVIOFISICO = Convert.ToInt32(data[13].Split(':')[1]);
                                    env2_t.INSERTUSRNOM = data[14].Split(':')[1];
                                    env2_t.INSERTUSRAPE = data[15].Split(':')[1];
                                    env2_t.INSERTUSRID = Convert.ToInt32(data[16].Split(':')[1]);

                                    env2.Add(env2_t);
                                }
                            }
                        }
                        //corres_deb
                        List<CORRESPONDENCIAFULL2el> elemento5_2 = listaCorres2.FindAll(x => x.CORRESID == d.CORRESID && x.TIPO == 5).ToList();
                        if (elemento5_2.Count > 0)
                        {
                            foreach (var v in elemento5_2)
                            {
                                if (v.DETALLE != null)
                                {
                                    CORRESPONDENCIADEB deb2_t = new CORRESPONDENCIADEB();
                                    string[] data = v.DETALLE.Split('~');
                                    deb2_t.CORRESDEBID = Convert.ToInt32(data[0].Split(':')[1]);
                                    deb2_t.CORRESID = v.CORRESID;
                                    deb2_t.CORRESDEBDSC = data[2].Split(':')[1];
                                    deb2_t.CORRESDEB_RECIBFEC = data[3].Split(':')[1];
                                    deb2_t.CORRESDEB_RECIBHORA = data[4].Substring(data[4].IndexOf(':') + 1); //data[4].Split(':')[1];
                                    deb2_t.CORRESDEBFEC = data[5].Split(':')[1];
                                    deb2_t.INSERTUSRID = Convert.ToInt32(data[6].Split(':')[1]);
                                    deb2_t.INSERTUSRNOMFULL = data[7].Split(':')[1];
                                    deb2_t.UPDATEUSRID = Convert.ToInt32(data[8].Split(':')[1]);
                                    deb2_t.UPDATEUSRNOMFULL = data[9].Split(':')[1];

                                    deb2.Add(deb2_t);
                                }
                            }
                        }
                        /*CorH.datmargi = m.sp_marginadoGTbl(d.CORRESID);
                        CorH.datremi = cx.sp_remitidoGT(d.CORRESID);
                        CorH.datarchi = cx.sp_archivoGT(d.CORRESID);
                        CorH.datenvia = cx.sp_enviadoGT(d.CORRESID);
                        CorH.datdev = cx.sp_corresDebByCorresIdGT(d.CORRESID);*/

                        CorH.datmargi = mar2;
                        CorH.datremi = rem2;
                        CorH.datarchi = arc2;
                        CorH.datenvia = env2;
                        CorH.datdev = deb2;

                        listaCorres.Add(CorH);
                    }
                }
            }

            return listaCorres;
        }
        //Lista Correspondencia by CORRESID
        public Object corresByCorresIdGTbl(string corresid,int grupo)
        {
            List<CORRESPONDENCIAFULLel> listaCorres = new List<CORRESPONDENCIAFULLel>();
            List<int> listado = new List<int>();

            foreach (var c in cx.sp_detallefullByIdsGT(corresid,grupo).ToList())
            {
                bool containsItem = listado.Any(item => item.Equals(c.CORRESID));
                listado.Add(c.CORRESID);

                if (!containsItem)
                {
                    CORRESPONDENCIAFULLel Corres = new CORRESPONDENCIAFULLel();

                    Corres.datCorres = c;
                    Corres.datmargi = m.sp_marginadoGTbl(c.CORRESID);
                    Corres.datremi = cx.sp_remitidoGT(c.CORRESID);
                    Corres.datarchi = cx.sp_archivoGT(c.CORRESID);
                    Corres.datenvia = cx.sp_enviadoGT(c.CORRESID);
                    Corres.datdev = cx.sp_corresDebByCorresIdGT(c.CORRESID);
                    Corres.datfile = cx.sp_archivosGT(c.CORRESID); 

                    listaCorres.Add(Corres);
                }

                if (c.CORRESID_CONTESTA > 0)
                {
                    //Padre
                    foreach (var e in cx.sp_detallefullByIdGT(c.CORRESID_CONTESTA, grupo).ToList())
                    {
                        containsItem = listado.Any(item => item.Equals(e.CORRESID));
                        listado.Add(e.CORRESID);

                        if (!containsItem)
                        {
                            CORRESPONDENCIAFULLel CorP = new CORRESPONDENCIAFULLel();

                            CorP.datCorres = e;
                            CorP.datmargi = m.sp_marginadoGTbl(e.CORRESID);
                            CorP.datremi = cx.sp_remitidoGT(e.CORRESID);
                            CorP.datarchi = cx.sp_archivoGT(e.CORRESID);
                            CorP.datenvia = cx.sp_enviadoGT(e.CORRESID);
                            CorP.datdev = cx.sp_corresDebByCorresIdGT(e.CORRESID);
                            CorP.datfile = cx.sp_archivosGT(e.CORRESID);

                            listaCorres.Add(CorP);
                        }
                    }
                }

                foreach (var d in cx.sp_detallefullByContestaIdGT(c.CORRESID, grupo).ToList())
                {
                    containsItem = listado.Any(item => item.Equals(d.CORRESID));
                    listado.Add(d.CORRESID);

                    if (!containsItem)
                    {
                        CORRESPONDENCIAFULLel CorH = new CORRESPONDENCIAFULLel();

                        CorH.datCorres = d;
                        CorH.datmargi = m.sp_marginadoGTbl(d.CORRESID);
                        CorH.datremi = cx.sp_remitidoGT(d.CORRESID);
                        CorH.datarchi = cx.sp_archivoGT(d.CORRESID);
                        CorH.datenvia = cx.sp_enviadoGT(d.CORRESID);
                        CorH.datdev = cx.sp_corresDebByCorresIdGT(d.CORRESID);
                        CorH.datfile = cx.sp_archivosGT(d.CORRESID);

                        listaCorres.Add(CorH);
                    }
                }

            }

            return listaCorres;
        }
        
        
        //Lista Correspondencia by COD/REF
        public Object corresByCodRefGTbl(string cod, int grupo)
        {
            List<CORRESPONDENCIAFULLel> listaCorres = new List<CORRESPONDENCIAFULLel>();

            foreach (var c in cx.sp_detallefullByCodGT(cod,grupo).ToList())
            {
                CORRESPONDENCIAFULLel Corres = new CORRESPONDENCIAFULLel();

                Corres.datCorres = c;
                Corres.datmargi = m.sp_marginadoGTbl(c.CORRESID);
                Corres.datremi = cx.sp_remitidoGT(c.CORRESID);
                Corres.datarchi = cx.sp_archivoGT(c.CORRESID);
                Corres.datenvia = cx.sp_enviadoGT(c.CORRESID);
                Corres.datdev = cx.sp_corresDebByCorresIdGT(c.CORRESID);
                Corres.datfile = cx.sp_archivosGT(c.CORRESID);

                listaCorres.Add(Corres);

                if (c.CORRESID_CONTESTA > 0)
                {
                    //Padre
                    foreach (var e in cx.sp_detallefullByIdGT(c.CORRESID_CONTESTA,grupo).ToList())
                    {
                        CORRESPONDENCIAFULLel CorP = new CORRESPONDENCIAFULLel();

                        CorP.datCorres = e;
                        CorP.datmargi = m.sp_marginadoGTbl(e.CORRESID);
                        CorP.datremi = cx.sp_remitidoGT(e.CORRESID);
                        CorP.datarchi = cx.sp_archivoGT(e.CORRESID);
                        CorP.datenvia = cx.sp_enviadoGT(e.CORRESID);
                        CorP.datdev = cx.sp_corresDebByCorresIdGT(e.CORRESID);
                        CorP.datfile = cx.sp_archivosGT(e.CORRESID);

                        listaCorres.Add(CorP);
                    }
                }
                else
                {
                    //Hijos
                    foreach (var d in cx.sp_detallefullByContestaIdGT(c.CORRESID,grupo).ToList())
                    {
                        CORRESPONDENCIAFULLel CorH = new CORRESPONDENCIAFULLel();

                        CorH.datCorres = d;
                        CorH.datmargi = m.sp_marginadoGTbl(d.CORRESID);
                        CorH.datremi = cx.sp_remitidoGT(d.CORRESID);
                        CorH.datarchi = cx.sp_archivoGT(d.CORRESID);
                        CorH.datenvia = cx.sp_enviadoGT(d.CORRESID);
                        CorH.datdev = cx.sp_corresDebByCorresIdGT(d.CORRESID);
                        CorH.datfile = cx.sp_archivosGT(d.CORRESID);

                        listaCorres.Add(CorH);
                    }
                }
            }

            return listaCorres;
        }
    }
}
