using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.DL;
using SICOR.EL;

namespace SICOR.BL
{
    public class IMPRIMIRbl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();
        
        //Lista Enviados sin respuesta por fecha
        public Object enviadosSinResByFechaGTbl(string fech01, string fech02, int grupo,int TipoC)
        {
            DateTime f1;
            f1 = new DateTime();
            f1 = DateTime.ParseExact(fech01, "dd/MM/yyyy", null);

            DateTime f2;
            f2 = new DateTime();
            f2 = DateTime.ParseExact(fech02, "dd/MM/yyyy", null);


            List<CORRESPONDENCIAFULLel> listaCorres = new List<CORRESPONDENCIAFULLel>();

            foreach (var c in cx.sp_enviadoSinResByFechaGTV2(f1, f2, grupo, TipoC).ToList())
            {
                CORRESPONDENCIAFULLel Corres = new CORRESPONDENCIAFULLel();

                Corres.datCorres = cx.sp_detallefullByIdGT(c.CORRESID,grupo);
                //Corres.datmargi = cx.sp_marginadoGT(c.CORRESID);
                //Corres.datremi = cx.sp_remitidoGT(c.CORRESID);
                //Corres.datarchi = cx.sp_archivoGT(c.CORRESID);
                Corres.datenvia = c;

                listaCorres.Add(Corres);
            }

            return listaCorres;
        }

        
        
        
        
        MARGINADObl m = new MARGINADObl();
        //Lista Marginados sin respuesta por fecha
        public Object marginadosSinResByFechaGTbl(string fech01, string fech02,int grupo, int TipoC)
        {
            DateTime f1;
            f1 = new DateTime();
            f1 = DateTime.ParseExact(fech01, "dd/MM/yyyy", null);

            DateTime f2;
            f2 = new DateTime();
            f2 = DateTime.ParseExact(fech02, "dd/MM/yyyy", null);


            List<CORRESPONDENCIAFULLel> listaCorres = new List<CORRESPONDENCIAFULLel>();

            foreach (var c in cx.sp_marginadoPendientesByFechaGTV2(f1, f2,grupo,TipoC).ToList())
            {
                CORRESPONDENCIAFULLel Corres = new CORRESPONDENCIAFULLel();

                Corres.datCorres = cx.sp_detallefullByIdGT(c.CORRESID,grupo);
                Corres.datmargi = c;
                //Corres.datremi = cx.sp_remitidoGT(c.CORRESID);
                //Corres.datarchi = cx.sp_archivoGT(c.CORRESID);
                //Corres.datenvia = c;

                listaCorres.Add(Corres);
            }

            return listaCorres;
        }
        
        
        
        
        
        //Lista Marginados con detalle full
        public Object margiRepByFechaGTbl(string fech01, string fech02,int grupo)
        {
            DateTime f1;
            f1 = new DateTime();
            f1 = DateTime.ParseExact(fech01, "dd/MM/yyyy", null);

            DateTime f2;
            f2 = new DateTime();
            f2 = DateTime.ParseExact(fech02, "dd/MM/yyyy", null);


            List<MARGIREPel> listaMargiRep = new List<MARGIREPel>();

            foreach (var c in cx.sp_margiRepGT(f1, f2,grupo).ToList())
            {
                MARGIREPel margiRep = new MARGIREPel();

                margiRep.datmargi = m.sp_marginadoGTbl(c.CORRESID);
                margiRep.datcorres = cx.sp_detallefullByIdGT(c.CORRESID,grupo);
                margiRep.datrespuesta = cx.sp_margiResByContestaIdGT(c.CORRESID);

                listaMargiRep.Add(margiRep);
            }

            return listaMargiRep;
        }

        
        
        
        
        //Lista Marginados Activos con detalle full
        public Object margiRepActiveByFechaGTbl(string fech01, string fech02,int grupo)
        {
            DateTime f1;
            f1 = new DateTime();
            f1 = DateTime.ParseExact(fech01, "dd/MM/yyyy", null);

            DateTime f2;
            f2 = new DateTime();
            f2 = DateTime.ParseExact(fech02, "dd/MM/yyyy", null);


            List<MARGIREPel> listaMargiRep = new List<MARGIREPel>();

            foreach (var c in cx.sp_margiActiveRepGT(f1, f2, grupo).ToList())
            {
                MARGIREPel margiRep = new MARGIREPel();

                margiRep.datmargi = m.sp_marginadoGTbl(c.CORRESID);
                margiRep.datcorres = cx.sp_detallefullByIdGT(c.CORRESID,grupo);
                margiRep.datrespuesta = cx.sp_margiResByContestaIdGT(c.CORRESID);

                listaMargiRep.Add(margiRep);
            }

            return listaMargiRep;
        }



        //Reporte de corespondencia por fecha
        BUSCARbl BuscarBL = new BUSCARbl();
        public Object corresRepByFechaGTbl(string fech01, string fech02,int grupo,int TipoC)
        {
            DateTime f1;
            f1 = new DateTime();
            f1 = DateTime.ParseExact(fech01, "dd/MM/yyyy", null);

            DateTime f2;
            f2 = new DateTime();
            f2 = DateTime.ParseExact(fech02, "dd/MM/yyyy", null);

            
            CORRESPONDENCIAFULLel corres = new CORRESPONDENCIAFULLel();

            return corres.datCorres = cx.sp_detallefullByFechaGTV2(f1, f2,grupo,TipoC).ToList();
        }


        //Reporte de corespondencia por fecha y contacto
        public Object corresRepByFechaContIDGTbl(string fech01, string fech02, Int32 contID,int grupo,int TipoC)
        {
            DateTime f1;
            f1 = new DateTime();
            f1 = DateTime.ParseExact(fech01, "dd/MM/yyyy", null);

            DateTime f2;
            f2 = new DateTime();
            f2 = DateTime.ParseExact(fech02, "dd/MM/yyyy", null);


            CORRESPONDENCIAFULLel corres = new CORRESPONDENCIAFULLel();

            return corres.datCorres = cx.sp_detallefullByFechaContIDGTV2(f1, f2, contID,grupo,TipoC).ToList();
        }
    }
}
