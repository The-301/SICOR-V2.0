using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class CAT_TIPOel
    {
        public Int32 tipoid { get; set; }
        public String tiponombre { get; set; }
        public String tipodsc { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }

        public CAT_TIPOel()
        {
            this.tipoid = 0;
            this.tiponombre = "";
            this.tipodsc = "";
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
        }
    }




}
