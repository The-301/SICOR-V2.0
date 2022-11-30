<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="remitirSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.remitirSV" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta charset="UTF-8" />
    <title></title>
</head>
<body>
	 <div id='frm_remitir' class="panel">
		<div class="content bg-white" style="overflow-y:auto;overflow-x:hidden;max-height:450px;">
            <div class="grid condensed">
                <div class="row cells4">
                    <div class="cell">Nombre usuario*</div>
                    <div class="cell colspan3">
                        <div class="input-control select full-size">
                            <select id='CLM_USRS_ID' name='CLM_USRS_ID' class='notNull' style="width:100%">
                                <option value="-1">Seleccionar</option>
		                    </select>
                        </div>                    
                    </div>
                </div>
                <div class="row cells4">
                    <div class="cell">Fecha*</div>
                    <div class="cell colspan3">
                        <div class="input-control text">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type='text' id='REMFEC' name='REMFEC' class='notNull' />
                        </div>
                    </div>
                </div>
                <div class="row cells4">
                    <div class="cell colspan4" style="text-align:center;">
                        <button onclick="javascript:remitidosSV()" class="button primary"> 
	                            <span class="mif-checkmark"></span> Aceptar</button>
	                    <button onclick="javascript:closeWin()" class="button danger">
	                        <span class="mif-cross"></span> Cancelar </button>                    
                    </div>
                </div>
                <div class="row cells4">
                    <div class="cell colspan4">
                        <div class="detalle-margi-corres"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
