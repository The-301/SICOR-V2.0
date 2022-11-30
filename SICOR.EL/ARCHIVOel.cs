using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class ARCHIVOel
    {
        public Int32 archid { get; set; }
        public Int32 corresid { get; set; }
        public Int32 archivo { get; set; }
        public String archvocod { get; set; }
        public String archvodsc { get; set; }
        public Int32 tipoid { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }

        public ARCHIVOel()
        {
            this.archid = -1;
            this.corresid = -1;
            this.archivo = -1;
            this.archvocod = "";
            this.archvodsc = "";
            this.tipoid = -1;
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
        }
    }




}
