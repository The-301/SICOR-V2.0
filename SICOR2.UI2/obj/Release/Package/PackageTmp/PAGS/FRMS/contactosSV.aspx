<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="contactosSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.contactosSV" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta charset="UTF-8" />
    <title></title>
    <script type="text/javascript">
        $(document).ready(function () {
            var grupo = $.jCookies({ get: 'GRUPO' });
            //Unidades
            $.when(sp_contUnidadGTjs(grupo)).then(function (response) {
                var R = response.d;

                var contenido = [];
                for (var i = 0; i < R.length; i++) {
                    contenido.push(R[i].CONTUNIDAD);
                }
                $("#CONTUNIDAD").autocomplete({
                    source: contenido
                });
            });

            //instituciones            
            $.when(contInstGTjs(grupo)).then(function (response) {
                var R = response.d;

                var contenido = [];
                for (var i = 0; i < R.length; i++) {
                    contenido.push(R[i].CONTINST);
                }
                $("#CONTINST").autocomplete({
                    source: contenido
                });
            });
        });
    </script>
</head>
<body>
    <div id='frm_contactos'>
        <table class="tb_01 center full-size">
            <tr>
                <td>Tipo*</td>
                <td>
                    <div class="input-control select full-size">
                        <select id="TIPOID" class="notNull">
                            <option value="-1">Seleccionar</option>
                            <option value="6">Externo</option>
                            <option value="5">Interno</option>
                        </select>
                    </div>
                    <input type="hidden" value="-1" id="CONTID" />
                </td>
            </tr>
            <tr>
                <td>Nombre*</td>
                <td>
                    <div class="input-control text full-size">
                        <input type="text" id="CONTNOMBRE" class="notNull" style="" />
                    </div>
                </td>
            </tr>
            <tr>
                <td>Cargo</td>
                <td>
                    <div class="input-control text full-size">
                        <input type="text" class="" id="CONTCARGO" style="" />
                    </div>
                </td>
            </tr>
            <tr>
                <td>Unidad</td>
                <td>
                    <div class="input-control text full-size">
                        <input type="text" id='CONTUNIDAD' name='CONTUNIDAD'  style="" />
                    </div>
                </td>
            </tr>
            <tr>
                <td>Institución</td>
                <td>
                    <div class="input-control text full-size">
                        <input type="text" id='CONTINST' name='CONTINST' style="" />
                    </div>
                </td>
            </tr>
            <tr>
                <td>Email</td>
                <td>
                    <div class="input-control text full-size">
                        <span class="mif-mail prepend-icon"></span>
                        <input type="text" id='CONTEMAIL' name='CONTEMAIL' class='' style="" />
                    </div>
                </td>
            </tr> 
            <tr>
                <td>Teléfonos</td>
                <td>
                    <div class="input-control text full-size">
                        <span class="mif-phone prepend-icon"></span>
                        <input type='text' id='CONTTELS' name='CONTTELS' class='' style="" />
                    </div>
                </td>
            </tr>

        </table>
    </div>
</body>
</html>
