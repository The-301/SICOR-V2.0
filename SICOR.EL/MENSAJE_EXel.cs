using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class MENSAJE_EXel
    {
        public Int32 msjexid { get; set; }
        public Int32 corresid { get; set; }
        public Int32 contid { get; set; }
        public Int32 tipoid { get; set; }
        public String msjexmensaje { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }

        public MENSAJE_EXel()
        {
            this.msjexid = -1;
            this.corresid = -1;
            this.contid = -1;
            this.tipoid = -1;
            this.msjexmensaje = "";
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
        }
    }




}
