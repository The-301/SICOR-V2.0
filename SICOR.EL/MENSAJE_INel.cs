using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class MENSAJE_INel
    {
        public Int32 msjinid { get; set; }
        public Int32 corresid { get; set; }
        public Int32 clm_usrs_id { get; set; }
        public Int32 tipoid { get; set; }
        public String msjinmensaje { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }

        public MENSAJE_INel()
        {
            this.msjinid = -1;
            this.corresid = -1;
            this.clm_usrs_id = -1;
            this.tipoid = -1;
            this.msjinmensaje = "";
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
        }
    }




}
