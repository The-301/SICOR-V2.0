using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class CAT_CATEGORIAel
    {
        public Int32 categoid { get; set; }
        public String categonombre { get; set; }
        public String categodsc { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }

        public CAT_CATEGORIAel()
        {
            this.categoid = 0;
            this.categonombre = "";
            this.categodsc = "";
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
        }
    }
}
