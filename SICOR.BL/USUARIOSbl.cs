using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.DL;
using SICOR.EL;

namespace SICOR.BL
{
    public class USUARIOSbl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();

        public Object sp_usuariosGT(Int32 grupo)
        {
            return cx.sp_usuariosGT(grupo);
        }

        public Object sp_usuariosVerifGT(String cuenta, String pass)
        {
            return cx.sp_usuariosVerifGT(
                    cuenta
                    ,pass
                );
        }

        public Object sp_usuariosUpPassSVbl(int id, string pass, string npass)
        {
            return cx.sp_usuariosUpPassSV(id,pass,npass);
        }
    }
}
