<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="mensajesInternosSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.mensajesInternosSV" %>

<!DOCTYPE html>

<html lang="es">
<head runat="server">
    <title></title>
</head>
<body>
    <div id="frm_mensajesInternos">
    <p class="titulo">Nuevo mensaje</p>
    <table class="tb_01 center">
        <tr>
            <td>Asunto</td>
            <td><textarea id="msj_asunto"></textarea><p id="p_asunto"></p></td>
        </tr>
        <tr>
            <td>Mensaje</td>
            <td><textarea id="msj_mensaje"></textarea></td>
        </tr>
        <tr>
            <td colspan="2" style="text-align:center;">
	                <button class="button primary" id="btn_ok"> 
	                    <span class="mif-checkmark"></span> Aceptar</button>

	                <button onclick="javascript:$.lightbox().close()" class="button danger">
	                    <span class="mif-cross"></span> Cancelar </button>
	            </td>
        </tr>
    </table>
    </div>
</body>
</html>
