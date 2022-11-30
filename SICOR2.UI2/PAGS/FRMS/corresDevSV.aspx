<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="corresDevSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.enviadoSV" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta charset="UTF-8" />
    <title></title>
    <script type="text/javascript">
        $(document).ready(function () {
            cambiaLogo("frm_corresDev");
        });
    </script>
</head>
<body>
	 <div id='frm_corresDev' class="panel">
		<div class="panel">
			<div class="content bg-white">
                <div class="grid condensed">
                    <div class="row cells4">
                        <div class="cell">Fecha devolución*</div>
                        <div class="cell colspan3">
                            <div class="input-control text">
                                <span class="mif-calendar prepend-icon"></span>
                                <input type='text' id='CORRESDEBFEC' class='notNull ' />
                            </div>                        
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell">Descripción / motivo*</div>
                        <div class="cell colspan3">
                            <div class="input-control textarea full-size">
                                <textarea id="CORRESDEBDSC" class="notNull"></textarea>
                            </div>                        
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan4" style="text-align:center;">
                            <button id="btn_corresDebSVAceptar" class="button primary"> 
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
