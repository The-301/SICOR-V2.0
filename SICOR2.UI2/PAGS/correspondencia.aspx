<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="correspondencia.aspx.cs" Inherits="SICOR.UI.FRMS.correspondencia" %>

<!DOCTYPE html>
<html lang="es">
<head id="Head1" runat="server">
    <meta charset="UTF-8" />
    <title>SICOR - Control de Correspondencia - MINEC</title>
    <link rel="icon" type="image/png" href="../images/favicon.ico" />

   <%-- CSS --%>
    <link href="../JS/Metro/build/css/metro.min.css" rel="stylesheet" type="text/css" />
    <link href="../JS/Metro/build/css/metro-icons.min.css" rel="stylesheet">
    <link href="../JS/Metro/build/css/metro.min.css" rel="stylesheet" type="text/css" />

    <link href="../CSS/ui-custom-theme/jquery-ui-1.8.21.custom.css" rel="stylesheet" type="text/css" />
    <link href="../JS/LightBox/evolution/jquery.lightbox.css" rel="stylesheet" type="text/css" />

    <link href="../JS/Select3.2/select2.css" rel="stylesheet" type="text/css" />
    
    <link href="../CSS/ui-custom-theme/jquery.ui.timepicker.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/dataTable/dataTable.css" rel="stylesheet" type="text/css" />

    <!--<link href="UPFILE/MultipleFileUploadControl/css/bootstrap-image-gallery.min.css" rel="stylesheet" type="text/css" />-->
    <link rel="stylesheet" href="UPFILE/MultipleFileUploadControl/css/jquery.fileupload-ui.css" />

    <link href="../CSS/sicorv2.css" rel="stylesheet" type="text/css" />
 
   <%-- JAVASCRIPT --%>
    <script src="../JS/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="../JS/jquery-ui-1.8.21.custom.min.js" type="text/javascript"></script>

    <script src="../JS/underscore-min.js" type="text/javascript"></script>
    <script src="../JS/jcookies.js" type="text/javascript"></script>
 
    <script src="../JS/SETUPAJAX-SIS.js" type="text/javascript"></script>
    <script src="../JS/SETUP.js" type="text/javascript"></script>
    <script src="../JS/CLASES/WS.js" type="text/javascript"></script>
    <script src="../JS/CLASES/INIT.js" type="text/javascript"></script>
    
    <script src="../JS/CLASES/CORRESPONDENCIA.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CORRESLISTA.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CORRESDETALLE.js" type="text/javascript"></script>
    <script src="../JS/CLASES/REMITIR.js" type="text/javascript"></script>
    <script src="../JS/CLASES/MARGINADO.js" type="text/javascript"></script>

    <script src="../JS/CLASES/CONTACTOS.js" type="text/javascript"></script>
    <script src="../JS/CLASES/USUARIOS.js" type="text/javascript"></script>
    <script src="../JS/CLASES/ENVIADO.js" type="text/javascript"></script>
    <script src="../JS/CLASES/MENSAJE.js" type="text/javascript"></script>
    <script src="../JS/CLASES/NOTIFICACION.js" type="text/javascript"></script>

    <!--<script src="../JS/Metro/build/js/metro.js" type="text/javascript"></script>-->

    <script type="text/javascript">
        $(document).ready(function () {
            INITcorrespondencia();            
        });
    </script>
</head>
<body>
    <div id='div_load'>
        <div>
            <img src="../IMAS/ajax-loader.gif" alt="cargando" />
        </div>
    </div>

    <div class="app-bar nav" data-role="appbar">
        <a href="#" class="app-bar-element">
            <span class="mif-mail mif-2x">SICOR MINEC</span>
        </a>
        <span class="app-bar-divider"></span>
        <div class="app-bar-element" id="home">
            <a href="#" class="fg-white"><span class="mif-envelop"></span>&nbsp;Correspondencia</a>
        </div>
        <div class="app-bar-element" id="buscarCorres">
            <a href="#" class="fg-white"><span class="mif-search"></span>&nbsp;Buscar</a>
        </div>
        <div class="app-bar-element" id="contactos">
            <a href="#" class="fg-white"><span class="mif-users"></span>&nbsp;Contactos</a>
        </div>
        <!--<div class="app-bar-element">
            <a href="#" class="fg-white" id="bandejaMensajes"><span class="mif-drafts"></span>&nbsp;Mensajes</a>
        </div>-->
        <div class="app-bar-element" id="imprimirReps">
            <a href="#" class="fg-white"><span class="mif-printer"></span>&nbsp;Imprimir</a>
        </div>
        <div class="app-bar-element" id="manualAyuda">
            <a href="#" class="fg-white"><span class="mif-question"></span>&nbsp;Ayuda</a>
        </div>
        <div class="app-bar-element place-right" id="salir">
            <a href="#" class="fg-white"><span class="mif-exit"></span>&nbsp;Salir</a>
        </div>
        <span class="app-bar-divider place-right"></span>
        <div class="app-bar-element place-right" id="dat_cuenta_modContrasena">
            <span class="mif-user"></span>&nbsp;<span class="" id="dat_cuenta_nombre"></span>
        </div>
    </div>

    <div id="dialog-modal" title=""></div>

    <div class="grid" style="margin:0;">
        <div class="row cells11 shadow" style="margin: 0 0 0;">
            <div class="cell colspan4">
                <ul class="h-menu">
                    <!--<li class="no-hovered"><a href="#"></a></li>-->
                    <li class="no-hovered">
                        <span id='cant-items-list' style="padding:0 15px; width:150px !important;">Cargando...</span>
                        <div class="input-control text" style="margin-right: 10px">
                            <input id="Text2" class="filtro" placeholder="Filtrar lista..." type="text" />
                            <button class="button warning" id="buttonBuscar"><span class="mif-search"></span></button>
                        </div>
                    </li>                    
                </ul>                	            
            </div>
            <div class="cell colspan7">
                <ul class="t-menu horizontal place-right">
                    <li class="" id="corres-ingre"><a href="#"><span class="icon mif-file-text"></span>&nbsp;Ingresar</a></li>
                    <li class="" id="res-margi-engre"><a href="#"><span class="icon mif-map"></span>&nbsp;Marginado</a></li>
                    <li class="" id="nota-ingre"><a href="#"><span class="icon mif-file-empty"></span>&nbsp;Nota</a></li>
                </ul>
            </div>
        </div>
        <div class="row cells11">
            <div class="cell colspan4" style="margin:5px 5px 0px 10px;">
                <ul class="t-menu compact" id="menu-item-corres" style="height:600px !important;position:absolute !important;z-index:10;float:left;">
					<li class='' id="refrescar">
                        <a href="#" class="bg-hover-amber"><span class="icon mif-loop2 menu-item"></span></a>
                        <div class="popover popover-shadow bg-amber fg-white marker-on-left" style="display: none; position: absolute;left:50px;top:-0px;"><div>Refrescar</div></div>
                    </li>
                    <li class='' id="selec">
                        <a href="#" class="bg-hover-amber"><span class="icon mif-checkmark menu-item"></span></a>
                        <div class="popover popover-shadow bg-amber fg-white marker-on-left" style="display: none; position: absolute;left:50px;top:-0px;"><div>Seleccionar</div></div>
                    </li>
					<li class='' id="remitir">
                        <a href="#"><span class="icon mif-upload2 menu-item"></span></a>
                        <div class="popover popover-shadow bg-cyan fg-white marker-on-left" style="display: none; position: absolute;left:50px;top:-0px;"><div>Remitir</div></div>
                    </li>
					<li class='' id="confiRemi">
                        <a href="#"><span class="icon mif-notification menu-item"></span></a>
                        <div class="popover popover-shadow bg-cyan fg-white marker-on-left" style="display: none; position: absolute;left:50px;top:-0px;"><div>Confir. remisión</div></div>
                    </li>
					<li class='' id="marginar">
                        <a href="#"><span class="icon mif-map menu-item"></span></a>
                        <div class="popover popover-shadow bg-cyan fg-white marker-on-left" style="display: none; position: absolute;left:50px;top:-0px;"><div>Marginar</div></div>
                    </li>
                    <li class='' id="desactivar">
                        <a href="#" class="bg-hover-red"><span class="icon mif-blocked menu-item"></span></a>
                        <div class="popover popover-shadow bg-red fg-white marker-on-left" style="display: none; position: absolute;left:50px;top:-0px;"><div>Desactivar</div></div>
                    </li>
				</ul>
                <div class="bd-black shadow" style="height:600px !important;overflow-y:auto;">
                    <div class="recuadro listview-outlook" data-role="listview" id="lista-item-corres" style="padding:0 0 0 45px;"></div>
	            </div>
            </div>
            <div class="cell colspan7 bg-grayLight shadow bd-black" style="margin:5px 10px 0px 0px;">
                <div class="">
	                <ul class="t-menu horizontal bg-grayLight compact" id="submenuitem">
                        <li class='' id='adjunto'><a href="#" class="fg-white bg-hover-amber"><span class="mif-attachment"></span>&nbsp;Adjunto</a></li>
                        <li class='' id='enviar'><a href="#" class="fg-white"><span class="mif-upload"></span>&nbsp;Enviar</a></li>
					    <li class='' id='archivar'><a href="#" class="fg-white"><span class="mif-cabinet"></span>&nbsp;Archivado en</a></li>

                        <li class='' id='corresDev'><a href="#" class="fg-white bg-hover-amber"><span class="mif-undo corresDeb"></span>&nbsp;Dev. Correc.</a></li>
                        <li class='' id='editar'><a href="#" class="fg-white bg-hover-amber"><span class="mif-pencil"></span>&nbsp;Editar</a></li>  
                        <li class='' id='eliminar'><a href="#" class="fg-white bg-hover-red"><span class="mif-bin"></span>&nbsp;Eliminar</a></li>                      
                        <li class='' id="print"><a href="#" class="fg-white bg-hover-amber"><span class="mif-printer"></span>&nbsp;Imprimir</a></li>					    
				    </ul>
                </div>
            </div>
            <div class="cell colspan7 bg-grayLighter bd-black" style="margin:0px 10px 0px 0px;overflow-y:auto;height:560px;overflow-x:hidden;">
                <div class="recuadro con-imprimir padding10" style="">
	            	<div id="detalle-adjunto"></div>
                    <div id="detalle-item-corres"></div>
	            	<div class='detalle-margi-corres'></div>
	            </div>
            </div>
        </div>
    </div>
    <script src="../JS/LightBox/jquery.lightbox.js" type="text/javascript"></script>
    <script src="../JS/Select3.2/select2.js" type="text/javascript"></script>
    <script src="../JS/ui-minified/jquery.ui.timepicker.js" type="text/javascript"></script>
    <script src="../JS/Notification/notify.js" type="text/javascript"></script>
    <script src="../JS/Msgbox/jquery.msgbox.min.js" type="text/javascript"></script>
    <script src="../JS/DataTables/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../JS/jQuery.print.js" type="text/javascript"></script>

    <!-- The Templates plugin is included to render the upload/download listings -->
    <script src="UPFILE/MultipleFileUploadControl/js/tmpl.min.js" type="text/javascript"></script>
    <!-- The basic File Upload plugin -->
    <script src="UPFILE/MultipleFileUploadControl/js/jquery.fileupload.js" type="text/javascript"></script>
    <!-- The File Upload file processing plugin -->
    <script src="UPFILE/MultipleFileUploadControl/js/jquery.fileupload-fp.js" type="text/javascript"></script>
    <!-- The File Upload user interface plugin -->
    <script src="UPFILE/MultipleFileUploadControl/js/jquery.fileupload-ui.js" type="text/javascript"></script>
    <!-- The localization script -->
    <script src="UPFILE/MultipleFileUploadControl/js/locale.js" type="text/javascript"></script>

</body>
</html>
