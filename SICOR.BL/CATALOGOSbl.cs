using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SICOR.DL;
using SICOR.EL;

namespace SICOR.BL
{
    public class CATALOGOSbl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();
        
        
        /***************sp_cat_categoriaGTbl********************/

        public List<CAT_CATEGORIAel> sp_cat_categoriaGTbl()
        {
            
            List<CAT_CATEGORIAel> lcat = new List<CAT_CATEGORIAel>();
            foreach (var c in cx.sp_cat_categoriaGT().ToList())
            {
                CAT_CATEGORIAel cat = new CAT_CATEGORIAel();
                cat.categoid = c.CATEGOID;
                cat.categonombre = c.CATEGONOMBRE;
                cat.categodsc = c.CATEGODSC;

                lcat.Add(cat);
            }
            return lcat;
        }

        /***************sp_cat_claseGTbl********************/

        public Object sp_cat_claseGTbl()
        {
            return cx.sp_cat_claseGT();
        }

        /***************sp_cat_estadoGTbl********************/

        public Object sp_cat_estadoGTbl()
        {
            return cx.sp_cat_estadoGT();
        }

        /***************sp_cat_tipoGTbl********************/

        public Object sp_cat_tipoGTbl(int grupo)
        {
            return cx.sp_cat_tipoGT(grupo);
        }
        
        public Object sp_catalogosGTbl(int grupo)
        {

            CATALOGOSel cats = new CATALOGOSel();

            cats.categorias = sp_cat_categoriaGTbl();
            cats.clases = sp_cat_claseGTbl();
            cats.estados = sp_cat_estadoGTbl();
            cats.tipos = sp_cat_tipoGTbl(grupo);

            return cats;
        }

    }
}
