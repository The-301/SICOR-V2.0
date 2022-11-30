using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class ADJUNTOel
    {
        public Int32 adjuntoid { get; set; }
        public Int32 corresid { get; set; }
        public String adjunto_name { get; set; }
        public String adjunto_size { get; set; }
        public String adjunto_type { get; set; }
        public String adjunto_urldown { get; set; }
        public String adjunto_urldel { get; set; }
        public byte adjunto_tipo { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }

        public ADJUNTOel()
        {
            this.adjuntoid = -1;
            this.corresid = -1;
            this.adjunto_name = "";
            this.adjunto_size = "";
            this.adjunto_type = "";
            this.adjunto_urldown = "";
            this.adjunto_urldel = "";
            this.adjunto_tipo = 2;
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
        }
    }




}
