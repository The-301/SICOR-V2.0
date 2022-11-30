<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="busqueda.aspx.cs" Inherits="SICOR.UI.FRMS.busqueda" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta charset="UTF-8" />
    <title>SICOR - Control de Correspondencia - MINEC</title>
    <link rel="icon" type="image/png" href="../images/favicon.ico" />
    
   <%-- CSS --%>
    <link href="../JS/Metro/build/css/metro.min.css" rel="stylesheet" type="text/css" />
    <link href="../JS/Metro/build/css/metro-icons.min.css" rel="stylesheet">    

    <link href="../CSS/ui-custom-theme/jquery-ui-1.8.21.custom.css" rel="stylesheet" type="text/css" />
    <link href="../JS/LightBox/evolution/jquery.lightbox.css" rel="stylesheet" type="text/css" />

    <link href="../JS/Select3.2/select2.css" rel="stylesheet" type="text/css" />
    
    <link href="../CSS/ui-custom-theme/jquery.ui.timepicker.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/dataTable/dataTable.css" rel="stylesheet" type="text/css" />

    <!--<link href="UPFILE/MultipleFileUploadControl/css/bootstrap-image-gallery.min.css" rel="stylesheet" type="text/css" />-->
    <link rel="stylesheet" href="UPFILE/MultipleFileUploadControl/css/jquery.fileupload-ui.css" />    

   <%-- JAVASCRIPT --%>
    <script src="../JS/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="../JS/jquery-ui-1.8.21.custom.min.js" type="text/javascript"></script>
    
    <script src="../JS/Notification/notify.js" type="text/javascript"></script>
    <script src="../JS/underscore-min.js" type="text/javascript"></script>
    <script src="../JS/jcookies.js" type="text/javascript"></script>

    <script src="../JS/SETUPAJAX-SIS.js" type="text/javascript"></script>
    <script src="../JS/SETUP.js" type="text/javascript"></script>
    <script src="../JS/CLASES/WS.js" type="text/javascript"></script>
    <script src="../JS/CLASES/INITBUSCAR.js" type="text/javascript"></script>
    
    <script src="../JS/CLASES/CORRESPONDENCIA.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CORRESLISTA.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CORRESDETALLE.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CONTACTOS.js" type="text/javascript"></script>
    <script src="../JS/CLASES/REMITIR.js" type="text/javascript"></script>
    <script src="../JS/CLASES/USUARIOS.js" type="text/javascript"></script>
    <script src="../JS/CLASES/MARGINADO.js" type="text/javascript"></script>
    <script src="../JS/CLASES/BUSCAR.js" type="text/javascript"></script>
    <script src="../JS/CLASES/MENSAJE.js" type="text/javascript"></script>
    <script src="../JS/CLASES/NOTIFICACION.js" type="text/javascript"></script>

    <link href="../CSS/sicorv2.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript">
        jQuery(document).ready(function () {
            INITbusqueda();
            $("#cuadroFiltro").css("padding-left", (parseInt($("#menu-item-corres").width()) + 1));
        });
    </script>
</head>
<body>
    <div id='div_load'>
        <div>
            <img src="../IMAS/ajax-loader.gif" alt="cargando" />
        </div>
    </div>
    <!-- MENU SUPERIOR -->
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
            <!--<a class="dropdown-toggle fg-white">-->
            <span class="mif-user"></span>&nbsp;<span class="" id="dat_cuenta_nombre"></span>
            <!--<div class="popover popover-shadow bg-amber fg-white marker-on-top" style="display: none; position: absolute; z-index:1000;"><div>Cambiar contraseña</div></div>-->
        </div>
    </div>

    <div id="dialog-modal" title=""></div>    
    <div class="mensajes"></div>

    <!-- CONTENEDOR PRINCIPAL -->
    <div class="grid" style="margin:0;">
        <!-- BARRA DE BUSQUEDA/FILTROS -->
        <div class="row cells11 shadow" style="margin: 0 0 0;">            
            <div class="tabcontrol" id="menutabb">
                <ul class="tabs">
                    <li><a href="#tabs-1">ID</a></li>
                    <li><a href="#tabs-2">Código Referencia</a></li>
                    <li><a href="#tabs-3">Remitente/Destinatario</a></li>
                    <li><a href="#tabs-4">Asunto</a></li>
                    <li><a href="#tabs-5">Fecha</a></li>
                </ul>
                <div class="frames" style="display:none">
                    <div class="frame bg-grayLighter" id="tabs-1">
                        ID: 
                        <div class="input-control text" style="width: 350px; margin-right: 10px">
                            <input id="CORRESID" class="filtro" placeholder="Digite el ID" type="text" />
                            <button class="button success" onclick="javascript:cargaListCorresByID()"><span class="mif-search"></span> Buscar</button>
                        </div>
                    </div>
                    <div class="frame bg-grayLighter" id="tabs-2">
                        Cod/Ref: 
                        <div class="input-control text" style="width: 350px; margin-right: 10px">                    
                            <input type="text" id="CODREF" class="notNull" placeholder="Código" />
                            <button class="button success" onclick="javascript:cargaListCorresByCodRef()"><span class="mif-search"></span> Buscar</button>
                        </div>
                    </div>
                    <div class="frame bg-grayLighter" id="tabs-3">
                        Remitente/Destinatario
                        <div class="input-control select" style="margin-right: 10px">                    
                            <select id='TIPOBUSQUEDA'>
                                <option value="1">Correspondencia Principal</option>
                                <option value="2">Correspondencia Secundaria</option>
                            </select>                            
                        </div>
                        <div class="input-control select" style="margin-right: 10px; width:30%;">
                            <select id="CONTID" class="select2 full-size">
                                <option value="-1">Seleccionar</option>
                            </select>
                        </div>
                        &nbsp; Contenga: 
                        <div class="input-control text" style="margin-right: 10px">                    
                            <input type="text" id="oTexto" placeholder="Escriba su texto" />
                        </div>
                        <button class="button success" onclick="javascript:cargaListCorresByContid()"><span class="mif-search"></span> Buscar</button>
                    </div>
                    <div class="frame bg-grayLighter" id="tabs-4">
                        Asunto: 
                        <div class="input-control text" style="width: 350px; margin-right: 10px">                    
                            <input type="text" id="ASUNTO" class="notNull" placeholder="Escriba su texto" />
                            <button class="button success" onclick="javascript:cargaListCorresByAsunto()"><span class="mif-search"></span> Buscar</button>
                        </div>
                    </div>
                    <div class="frame bg-grayLighter" id="tabs-5">
                        Fecha:
                        <div class="input-control text" style="width: 250px; margin-right: 10px">                    
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECH01" class="notNull right" />                            
                        </div>
                        <div class="input-control text" style="width: 250px; margin-right: 10px">                    
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECH02" class="notNull"/>                            
                        </div>
                        <button class="button success" onclick="javascript:cargaListCorresByFeha()"><span class="mif-search"></span> Buscar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- DETALLE CORRESPONDENCIA -->
        <div class="row cells11">
            <!-- SECCION LATERAL IZQUIERDA -->
            <div class="cell colspan4" style="margin:5px 5px 0px 10px;">
                <div class="bd-black shadow" style="height:600px !important;overflow:none;">
                    <ul class="t-menu compact" id="menu-item-corres" style="height:600px !important;position:absolute !important;z-index:10;float:left;">
					    <li class='' id="desactivar">
                            <a href="#"><span class="icon mif-power menu-item"></span></a>
                            <div class="popover popover-shadow bg-cyan fg-white marker-on-left" style="display: none; position: absolute;left:50px;top:-0px;"><div>Activar</div></div>
                        </li>                        
				    </ul>                    

                    <div class="grid no-margin" id="cuadroFiltro">
                        <div class="row cells5 no-margin">
                            <div class="cell colspan1 padding10">
                                <span id='cant-items-list'>0/0</span>
                            </div>
                            <div class="cell colspan4">
                                <div class="input-control text full-size no-margin">
                                    <input id="Text2" class="filtro" placeholder="Filtrar lista" type="text">
                                    <button class="button warning" id="buttonBuscar"><span class="mif-search"></span></button>                                    
                                </div>
                            </div>
                        </div>
                    </div>                    

                    <div class="recuadro listview-outlook" data-role="listview" id="lista-item-corres" style="padding:5px 0 0 45px;overflow-y:auto;height:563px;"></div>                
                </div>
            </div>
            <!-- SUBMENU -->
            <div class="cell colspan7 bg-grayLight shadow bd-black" style="margin:5px 10px 0px 0px;">
                <div class="">
	                <ul class="t-menu horizontal bg-grayLight compact" id="submenuitem">
                        <li class='' id='adjunto'><a href="#" class="fg-white bg-hover-amber"><span class="mif-attachment"></span>&nbsp;Adjunto</a></li>
                        <li class='' id="print"><a href="#" class="fg-white bg-hover-amber"><span class="mif-printer"></span>&nbsp;Imprimir</a></li>					    
				    </ul>
                </div>
            </div>
            <!-- DETALLE -->
            <div class="cell colspan7 bg-grayLighter bd-black" style="margin:0px 10px 0px 0px;overflow-y:auto;">
                <div class="recuadro con-imprimir padding10" style="height:560px;">
	            	<div id="detalle-adjunto"></div>
                    <div id="detalle-item-corres"></div>
	            	<div class='detalle-margi-corres'></div>
	            </div>
            </div>
        </div>
    </div>

    <!--<div class="contenido">
        <div>
            <article class="container_12" style="top:50px;">
                <div class="panel_left" style="">
	                <section class="grid_4">
	                    <input id="Text2" class="filtro" placeholder="Filtrar lista..." type="text" style="margin-top:15px;">
                        <button class="button button-green" id="buttonBuscar">Buscar</button>
	                    <div id='cant-items-list'>0/0</div>
                        <div class="recuadro  center" style="height:540px;">
	            	
	            	        <ul id="menu-item-corres" style="height:540px;top:259px;">
                                <li class='go-blue' id="desactivar"><span class="pictogram activo menu-item"></span> <p>Activar</p></li>
					        </ul>
					
					        <ul id="lista-item-corres" style="height:500px !important;"></ul>
	            
	                    </div>
	                </section > 
                </div>
                <div class="panel_right" style="padding-top:15px;">
	                <section class="grid_8">	        	        
	                    <ul class="menu-top">
                            <li class='go-yellow left' id='adjunto'><span class="pictogram adjunto menu-item"></span> <p>Adjunto</p></li>
                            <li class='go-yellow right' id="print"><span class="pictogram imprimir menu-item"></span> <p>Imprimir</p></li>
				        </ul>
                        <div class="recuadro center con-imprimir">
	            	        <div id="detalle-adjunto"></div>
                            <div id="detalle-item-corres"></div>
	            	
	            	        <div class='detalle-margi-corres'></div>
	                    </div>
	                </section > 
                </div>
	        </article>
        </div>
   </div>-->

    <script src="../JS/LightBox/jquery.lightbox.js" type="text/javascript"></script>
    <script src="../JS/Select3.2/select2.js" type="text/javascript"></script>
    <script src="../JS/ui-minified/jquery.ui.timepicker.js" type="text/javascript"></script>    
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
