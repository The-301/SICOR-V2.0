<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="contactos2SV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.contactosSV" %>

<!DOCTYPE html>
<html lang="es">
<head id="Head1" runat="server">
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
        <input type="hidden" id="CONTID" value="-1" />
        <input type="hidden" value="-1" id="Hidden1" />
        <br /><div><label>Tipo*:</label></div>        
        <div><div class="input-control select">            
            <select id="TIPOID" class="notNull">
                <option value="-1">Seleccionar</option>
                <option value="6">Externo</option>
                <option value="5">Interno</option>
            </select>
        </div></div>
        <div><label>Nombre*:</label></div>        
        <div><div class="input-control text full-size">
            <span class="mif-user-plus prepend-icon"></span>
            <input type="text" id="CONTNOMBRE" class="notNull" />
        </div></div>        
        <div><label>Cargo:</label></div>        
        <div><div class="input-control text full-size">
            <span class="mif-user-md prepend-icon"></span>
            <input type="text" class="" id="CONTCARGO" />
        </div></div>
        <div><label>Unidad:</label></div>
        <div><div class="input-control text full-size">
            <span class="mif-cabinet prepend-icon"></span>
            <input type="text" id='CONTUNIDAD' name='CONTUNIDAD' />
        </div></div>
        <div><label>Institución:</label></div>
        <div><div class="input-control text full-size">
            <span class="mif-location-city prepend-icon"></span>
            <input type="text" id='CONTINST' name='CONTINST' />
        </div></div>
        <div><label>Email:</label></div>
        <div><div class="input-control text" style="width:50%">            
            <span class="mif-mail prepend-icon"></span>
            <input type="text" id='CONTEMAIL' name='CONTEMAIL' class='full-size' />
        </div></div>
        <div><label>Teléfonos:</label></div>
        <div><div class="input-control text" style="width:50%">            
            <span class="mif-phone prepend-icon"></span>
            <input type='text' id='CONTTELS' name='CONTTELS' class='full-size' />
        </div></div>
        <div>
            <button class="button primary" onclick="javascript:contactosSV()"> 
                <span class="mif-checkmark"></span> Aceptar</button>
            <button class="button danger" onclick="javascript:closeContactosSV()">
                <span class="mif-cross"></span> Cancelar </button>
        </div>
    </div>
</body>
</html>
