using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class ENVIADOel
    {
        public Int32 enviaid { get; set; }
        public Int32 contid { get; set; }
        public Int32 corresid { get; set; }
        public String enviofec { get; set; }
        public String enviorecibfec { get; set; }
        public String enviorecibhora { get; set; }
        public String enviorecibnombre { get; set; }
        public Int32 envioinstruc { get; set; }
        public Byte enviofisico { get; set; }
        public Byte enviodigital { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }

        public ENVIADOel()
        {
            this.enviaid = -1;
            this.contid = -1;
            this.corresid = -1;
            this.enviofec = "";
            this.enviorecibfec = "01/01/2000";
            this.enviorecibhora = "";
            this.enviorecibnombre = "";
            this.envioinstruc = -1;
            this.enviodigital = 2;
            this.enviofisico = 2;
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
        }
    }




}
