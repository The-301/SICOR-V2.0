using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class REMITIDOel
    {
        public Int32 remid { get; set; }
        public Int32 clm_usrs_id { get; set; }
        public String clm_usrs_nmb { get; set; }
        public String clm_usrs_apd { get; set; }
        public Int32 corresid { get; set; }
        public String remfec { get; set; }
        public int remcfr_rcbd {get; set;}
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }

        public REMITIDOel()
        {
            this.remid = -1;
            this.clm_usrs_id = 0;
            this.clm_usrs_nmb = "";
            this.clm_usrs_apd = "";
            this.corresid = 0;
            this.remfec = "";
            this.remcfr_rcbd = 2;
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
        }
    }


    public class REMICONFIRLISTel 
    {
        public Object datRemi { get; set; }
        public Object datCorres { get; set; }
        public Object datMargi { get; set; }
        public Object datCorresContesta { get;set; }
    }

}
