using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SICOR.EL
{
    public class ESTADOel
    {
        public Int32 estadocorresid { get; set; }
        public Int32 corresid { get; set;}
        public Int32 estadoid { get; set; }
        public Int32 estadoactivo { get; set; }

        public ESTADOel()
        {
            this.estadocorresid = -1;
            this.corresid = -1;
            this.estadoid = -1;
            this.estadoactivo = 1;
        }
    }
}
