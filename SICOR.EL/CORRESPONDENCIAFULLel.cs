using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class CORRESPONDENCIAFULLel
    {
        public Object datCorres { get; set; }
        public Object datmargi { get; set; }
        public Object datremi { get; set; }
        public Object datarchi { get; set; }
        public Object datenvia { get; set; }
        public Object datdev { get; set; }
        public Object datfile { get; set; }

    }

    public class CORRESPONDENCIAFULL2el
    {
        public Int32 TIPO { get; set; }
        public Int32 CORRESID { get; set; }
        public String DETALLE { get; set; }
        public String FECHA { get; set; }
    }

    public class CORRESPONDENCIAMARGINA
    {
        public Int32 MARGID { get; set; }
        public Int32 CORRESID { get; set; }
        public String MARGFEC { get; set; }
        public String MARGTIEMPO { get; set; }
        public Int32 TIEMPO { get; set; }
        public String MARGMOTIVO { get; set; }
        public Int32 MARGPENDIENTE { get; set; }
        public String MARGINSTRUC { get; set; }
        public String MARGINSTRUCDSC { get; set; }
        public Int32 INSERTUSRID { get; set; }
        public String INSERTUSRNOM { get; set; }
        public String INSERTUSRAPE { get; set; }
        public String MARGINADOPOR  { get; set; }
        public Object MARGICONT { get; set; } 
    }

    public class MARGINACONT2{
        public Int32 MARGICONTID { get; set; } 
        public Int32 MARGID { get; set; } 
        public Int32 TIPOID { get; set; } 
        public String TIPONOMBRE { get; set; } 
        public Int32 CONTID { get; set; } 
        public String CONTNOMBRE { get; set; } 
        public String CONTUNIDAD { get; set; } 
        public String CONTINST { get; set; }
        public String CONTEMAIL { get; set; } 
    }

    public class CORRESPONDENCIAREMITIDO
    {        
        public Int32 REMID { get; set; }
        public Int32 CLM_USRS_ID { get; set; }
        public String USRNOM { get; set; }
        public String USRAPE { get; set; }
        public Int32 CORRESID { get; set; }
        public Int32 REMCFR_RCBD { get; set; }
        public String REMFEC { get; set; }
        public Int32 INSERTUSRID { get; set; }
        public String INSERTUSRNOM { get; set; }
        public String INSERTUSRAPE { get; set; }
    }

    public class CORRESPONDENCIAARCHIVO
    {
        public Int32 ARCHID { get; set; }
        public Int32 CORRESID { get; set; }
        public Int32 ARCHIVO { get; set; }
        public String ARCHIVONOMBRE { get; set; }
        public String ARCHVOCOD { get; set; }
        public String ARCHVODSC { get; set; }
        public Int32 TIPOID { get; set; }
        public String TIPONOMBRE { get; set; }
    }

    public class CORRESPONDENCIAENVIADO
    {
        //public Int32 ESTCORRID { get; set; }
        //public Int32 CORRESID { get; set; }
        //public Int32 ESTADOID { get; set; }
        //public String ESTADONOMBRE { get; set; }
        //public Int32 ESTADOACTIVO { get; set; }
        public Int32 ENVIAID {get; set; }
        public Int32 CONTID {get; set; }
        public String CONTNOMBRE { get; set; }
        public String CONTINST {get; set; }
        public String CONTUNIDAD {get; set; }
        public Int32 CORRESID {get; set; }
        public String ENVIOFEC {get; set; }
        public String ENVIORECIBFEC {get; set; }
        public String ENVIORECIBHORA {get; set; }
        public String ENVIORECIBNOMBRE {get; set; }

        public Int32 ENVIOINSTRUC {get; set; }
        public String ENVIOINSTRUCDSC {get; set; }
        public Int32 ENVIODIGITAL {get; set; }
        public Int32 ENVIOFISICO {get; set; }

        public String INSERTUSRNOM {get; set; }
        public String INSERTUSRAPE {get; set; }
        public Int32 INSERTUSRID {get; set; }
    }

    public class CORRESPONDENCIADEB
    {
        public Int32 CORRESDEBID { get; set; }
		public Int32 CORRESID { get; set; }
		public String CORRESDEBDSC { get; set; }
		public String CORRESDEB_RECIBFEC { get; set; }
		public String CORRESDEB_RECIBHORA { get; set; }
		public String CORRESDEBFEC { get; set; }
		public Int32 INSERTUSRID { get; set; }
		public String INSERTUSRNOMFULL { get; set; }
		public Int32 UPDATEUSRID { get; set; }
        public String UPDATEUSRNOMFULL { get; set; }
    }

    public class CORRESPONDENCIAFILE
    {
        public Int32 ADJUNTOID { get; set; }
        public Int32 CORRESID { get; set; }
        public String ADJUNTO_NAME { get; set; }
        public String ADJUNTO_SIZE { get; set; }
    }
}
