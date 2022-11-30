using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class CORRESPONDENCIAel
    {
        public Int32 corresid { get; set; }
        public String correscod { get; set; }
        public Int32 claseid { get; set; }
        public Int32 tipoid { get; set; }
        public Int32 prioid { get; set; }
        public Int32 contid_remite { get; set; }
        public Int32 categoid { get; set; }
        public String asunto { get; set; }
        public String notaelabfec { get; set; }
        public String notarecibfec { get; set; }
        public String notarecibhora { get; set; }
        public byte reqfirma { get; set; }
        //public byte adjunto { get; set; }
        public Int32 contid_dirigido { get; set; }
        public Int32 contid_elaboro { get; set; }
        public Int32 corresid_contesta { get; set; }
        public Int32 marginaid { get; set; }
        public String marginaformares { get; set; }
        public byte activo { get; set; }
        public byte eliminado { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }
        public Int32 responsableid { get; set; }

        public CORRESPONDENCIAel()
        {
            this.corresid = -1;
            this.correscod = "";
            this.claseid = -1;
            this.tipoid = -1;
            this.prioid = -1;
            this.contid_remite = -1;
            this.categoid = -1;
            this.asunto = "";
            this.notaelabfec = "16/06/1986";
            this.notarecibfec = "16/06/1986";
            this.notarecibhora = "";
            this.reqfirma = 2;
            //this.adjunto = 2;
            this.contid_dirigido = -1;
            this.contid_elaboro = -1;
            this.corresid_contesta = -1;
            this.marginaid = -1;
            this.marginaformares = "";
            this.activo = 1;
            this.eliminado = 2;
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = -1;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = -1;
            this.responsableid = -1;
        }
    }
}