using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.DL;
using SICOR.EL;

namespace SICOR.BL
{
    public class NOTIFICACIONbl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();

        public Object sp_notificacionGT(int userid)
        {
            NOTIFICACIONel res = new NOTIFICACIONel();
            try
            {
                return res.RESPUESTA = cx.sp_notificacionGT(userid);
            }
            catch
            {
                return res;
            }
        }

        public String sp_notificacionUP(int mensajeid, int userid)
        {
            String res = "";
            try
            {
                cx.sp_notificacionUP(mensajeid,userid);
            }
            catch
            {
                return res="Error interno, inténtelo nuevamente.";
            }

            return res;
        }
    }
}
