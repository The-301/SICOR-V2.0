using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class MARGINADOel
    {
        public Int32 margid { get; set; }
        public Int32 corresid { get; set; }
        public String margfec { get; set; }
        public String margtiempo { get; set; }
        public String margmotivo { get; set; }
        public byte margpendiente { get; set; }
        public byte margidel { get; set; }
        public Int32 margintruc { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }
        public String marginadopor { get; set; }

        public MARGINADOel()
        {
            this.margid = -1;
            this.corresid = 0;
            this.margfec = "";
            this.margtiempo = "";
            this.margmotivo = "";
            this.margpendiente = 1;
            this.margidel = 2;
            this.margintruc = -1;
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
            this.marginadopor = "";
        }
    }

    public class MARGI_CONTel
    {
        public Int32 margicontid { get; set; }
        public Int32 margid { get; set; }
        public Int32 contid{ get; set; }
        public Int32 tipoid { get; set; }
        public String margrecibfec { get; set; }
        public String margrecibhora { get; set; }
        public String margrecibnombre { get; set; }
        public Byte enviofisico { get; set; }
        public Byte enviodigital { get; set; }
        public DateTime insertfec { get; set; }
        public Int32 insertusrid { get; set; }
        public DateTime updatefec { get; set; }
        public Int32 updateusrid { get; set; }

        public MARGI_CONTel()
        {
            this.margicontid = -1;
            this.margid = 0;
            this.contid = 0;
            this.tipoid = 0;
            this.margrecibfec = "01/01/2000";
            this.margrecibhora = "";
            this.margrecibnombre = "";
            this.enviofisico = 2;
            this.enviodigital = 2;
            this.insertfec = new DateTime(1950, 1, 1);
            this.insertusrid = 0;
            this.updatefec = new DateTime(1950, 1, 1);
            this.updateusrid = 0;
        }
    }

    public class MARGI_GT
    {
        public Int32 MARGID { get; set; }
        public Int32 CORRESID { get; set; }
        public String MARGFEC { get; set; }
        public String MARGTIEMPO { get; set; }
        public int TIEMPO { get; set; }
        public String MARGMOTIVO { get; set; }
        public Int32 MARGPENDIENTE { get; set; }
        public Int32 MARGINSTRUC { get; set; }
        public String MARGINSTRUCDSC { get; set; }
        public Int32 INSERTUSRID { get; set; }
        public String INSERTUSRNOM { get; set; }
        public String INSERTUSRAPE { get; set; }
        public Object MARGICONT { get; set; }
        public String MARGINADOPOR { get; set; }
    }
}
