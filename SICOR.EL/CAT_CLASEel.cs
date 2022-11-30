using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class CAT_CLASEel
    {
        public Int32 claseid { get; set; }
        public String clasenombre { get; set; }
        public String clasedsc { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }

        public CAT_CLASEel()
        {
            this.claseid = 0;
            this.clasenombre = "";
            this.clasedsc = "";
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
        }
    }




}
