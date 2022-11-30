using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class CONTACTOSel
    {
        public Int32 contid { get; set; }
        public String contnombre { get; set; }
        public String contcargo { get; set; }
        public String continst { get; set; }
        public String contunidad { get; set; }
        public String contdsc { get; set; }
        public Int32 tipoid { get; set; }
        public String tiponombre { get; set; }
        public String contemail { get; set; }
        public String conttels { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }

        public CONTACTOSel()
        {
            this.contid = 0;
            this.contnombre = "";
            this.contcargo = "";
            this.continst = "";
            this.contunidad = "";
            this.contdsc = "";
            this.tipoid = 0;
            this.tiponombre = "";
            this.contemail = "";
            this.conttels = "";
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
        }
    }




}
