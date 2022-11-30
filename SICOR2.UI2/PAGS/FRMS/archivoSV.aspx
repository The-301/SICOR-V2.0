<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="archivoSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.archivoSV" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta charset="UTF-8" />
    <title></title>
    <script type="text/javascript">
        $(document).ready(function () {
            cambiaLogo("frm_archivo");
        });
    </script>
</head>
<body>
	 <div id='frm_archivo' class="panel">
		<div class="panel">
			<div class="content bg-white">
                <div class="grid condensed">
                    <div class="row cells4">
                        <div class="cell">Ubicación*</div>
                        <div class="cell colspan3">
                            <div class="input-control select">
                                <select id='ARCHIVO' name='ARCHIVO' class='notNull '>
                                </select>
                            </div>
                            <input type='hidden' id='ARCHID' name='ARCHID' class='' value='-1'>
                            <input type='hidden' id='CORRESID' name='CORRESID' class='' value='-1'>                        
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell">Código de Archivo*</div>
                        <div class="cell colspan3">
                           <div class="input-control text">
                                <input type='text' id='ARCHVOCOD' name='ARCHVOCOD' class='notNull' />
                            </div>                        
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell">Observación</div>
                        <div class="cell colspan3">
                            <div class="input-control textarea full-size">
                                <textarea id='ARCHVODSC' name='ARCHVODSC' class=''></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell">Tipo Doc*</div>
                        <div class="cell colspan3">
                            <div class="input-control select">
                                <select id='TIPOID' name='TIPOID' class='notNull '>
                                </select>
                            </div>                        
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan4" style="text-align:center;">
	                        <button onclick="javascript:archivoSV()" class="button primary"> 
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
