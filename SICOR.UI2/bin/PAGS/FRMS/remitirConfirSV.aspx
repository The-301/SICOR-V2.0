<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="remitirConfirSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.remitirSV" %>

<!DOCTYPE html>
<html lang="es">
<head id="Head1" runat="server">
    <meta charset="UTF-8" />
    <title></title>
</head>
<body>
	 <div id='frm_confiRemi' class="panel">
		<div class="panel">
			<div class="content bg-white" style="overflow-y:auto;overflow-x:hidden;height:480px;">                
                <div class="grid condensed">
                    <div class="row">
                        <div class="">
                            <div class="detalle-margi-corres"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="" style="text-align:center;">
                            <button onclick="javascript:confirRemiSV()" class="button primary"> 
	                                <span class="mif-checkmark"></span> Aceptar</button>
	                        <button onclick="javascript:closeWin()" class="button danger">
	                            <span class="mif-cross"></span> Cancelar </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
