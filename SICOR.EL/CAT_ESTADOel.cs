using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class CAT_ESTADOel
    {
        public Int32 estadoid { get; set; }
        public String estadonombre { get; set; }
        public String estadodsc { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }

        public CAT_ESTADOel()
        {
            this.estadoid = 0;
            this.estadonombre = "";
            this.estadodsc = "";
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
        }
    }




}
