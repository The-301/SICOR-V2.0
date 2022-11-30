<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="contactos.aspx.cs" Inherits="SICOR.UI2.PAGS.contactos" %>

<!DOCTYPE html>
<html lang="es">
<head id="Head1" runat="server">
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

    <link href="../CSS/sicorv2.css" rel="stylesheet" type="text/css" />

   <%-- JAVASCRIPT --%>
    <script src="../JS/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="../JS/jquery-ui-1.8.21.custom.min.js" type="text/javascript"></script>

    <script src="../JS/underscore-min.js" type="text/javascript"></script>
    <script src="../JS/jcookies.js" type="text/javascript"></script>

    <%--Editor de texto--%>
    <script src="../JS/SETUPAJAX-SIS.js" type="text/javascript"></script>
    <script src="../JS/SETUP.js" type="text/javascript"></script>
    <script src="../JS/CLASES/WS.js" type="text/javascript"></script>
    <!--<script src="../JS/CLASES/INIT.js" type="text/javascript"></script>-->
    
    <script type="text/javascript">
        jQuery(document).ready(function () {
            INITcontactos();

            $(".nav #manualAyuda").click(function () { window.open("../AYUDA/SICOR-ManualDeUsuario.pdf") });

            $(".nav #contactos").click(function () { document.location = "contactos.aspx" });
            $(".nav #buscarCorres").click(function () { document.location = "busqueda.aspx" });
            $(".nav #imprimirReps").click(function () { document.location = "imprimir.aspx" });
            $(".nav #home").click(function () { document.location = "correspondencia.aspx" });

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
            <!--<a class="dropdown-toggle fg-white">-->
            <span class="mif-user"></span>&nbsp;<span class="" id="dat_cuenta_nombre"></span>
            <!--<div class="popover popover-shadow bg-amber fg-white marker-on-top" style="display: none; position: absolute; z-index:1000;"><div>Cambiar contraseña</div></div>-->
        </div>
    </div>

    <div id="dialog-modal" title=""></div>

    <div class="mensajes"></div>


    <div class="grid" style="margin:0;">
        <div class="row cells11 shadow" style="margin: 0 0 0;">
            <div class="cell colspan4">
                <ul class="h-menu">
                    <li class="place-right no-hovered">
                        <div class="input-control text" style="width: 250px; margin-right: 10px">
                            <input id="Text2" class="filtro" placeholder="Filtrar lista..." type="text" />
                            <button class="button warning" id="buttonBuscar"><span class="mif-search"></span></button>
                        </div>
                    </li>
                    <li class="no-hovered"><a href="#"><div id='cant-items-list'>Cargando...</div></a></li>                    
                </ul>                	            
            </div>
        </div>
        <div class="row cells11">
            <div class="cell colspan4" style="margin:5px 5px 0px 10px;">
                <div class="bd-black shadow" style="height:600px !important;overflow-y:auto;">
                    <ul class="t-menu compact" id="menu-item-corres" style="height:600px !important;position:absolute !important;z-index:10;float:left;">
                        <li class='' id="eliminar">
                            <a href="#" class="bg-hover-red"><span class="icon mif-blocked menu-item"></span></a>
                            <div class="popover popover-shadow bg-red fg-white marker-on-left" style="display: none; position: absolute;left:50px;top:-0px;"><div>Eliminar contacto</div></div>
                        </li>
					</ul>
                    <div class="recuadro listview-outlook" data-role="listview" id="lista-item-corres" style="padding:0 0 0 45px;"></div>
	            </div>
            </div>
            <div class="cell colspan7 bg-grayLight shadow bd-black" style="margin:5px 10px 0px 0px;">
                <div class="">
	                <ul class="t-menu horizontal bg-grayLight compact" id="submenuitem">
                        <li class='' id='nuevoContacto'><a href="#" class="fg-white bg-hover-amber"><span class="mif-user-plus"></span>&nbsp;Nuevo</a></li>
                        <li class='' id='eliminarContacto'><a href="#" class="fg-white bg-hover-red"><span class="mif-bin"></span>&nbsp;Eliminar</a></li>                      
				    </ul>
                </div>
            </div>
            <div class="cell colspan7 bg-grayLighter bd-black" style="margin:0px 10px 0px 0px;overflow-y:auto;">
                <div class="recuadro con-imprimir padding10" style="height:560px;">
	            	<div id='detalle-item-corres'></div>
	            </div>
            </div>
        </div>
    </div>


    <!--<div class="contenido" style="margin: 0 auto; min-height:550px !important; display:block;">
        <div style="z-index:10000;height:68px !important;">
        </div>
	    <div class="limpiar"></div>
        <div style="">
	        <article class="container_12">
                <div class="panel_left" style="margin-top:-75px !important">
	                <section class="grid_4">
	                    <input id="Text2" class="filtro" placeholder="Filtrar contactos..." type="text" style="margin-top:15px;">
                        <button class="button button-green" id="buttonBuscar">Buscar</button>
	                    <div id='cant-items-list'>Cargando...</div>
                        
                        <div class="recuadro  center" style="height:600px !important;">
                            <ul id="menu-item-corres">
                                <li class='go-red' id="eliminar"><span class="pictogram eliminar menu-item"></span> <p>Eliminar</p></li>
					        </ul>

                            <ul id="lista-item-corres"></ul>
	                    </div>
	                </section > 
                </div>
                <div class="panel_right">
	                <section class="grid_8">
	                    <ul class="menu-top">
                            <li class='go-yellow left' id='nuevoContacto'><span class="pictogram contactos-menu menu-item"></span> <p>Nuevo contacto</p></li>
                            <li class='go-yellow left' id='eliminarContacto'><span class="pictogram eliminar menu-item"></span> <p>Eliminar contacto</p></li>
				        </ul>
                        <div class="recuadro center con-imprimir">
                            <div id="detalle-item-corres"></div>	            	
	                    </div>
	                </section > 
                </div>
	        </article>
        </div>
   </div>-->
   
    <script src="../JS/Notification/notify.js" type="text/javascript"></script>
    
    <script src="../JS/CLASES/CONTACTOS2.js" type="text/javascript"></script>
    <script src="../JS/CLASES/USUARIOS.js" type="text/javascript"></script>
    <script src="../JS/CLASES/ENVIADO.js" type="text/javascript"></script>
    <script src="../JS/CLASES/MENSAJE.js" type="text/javascript"></script>
    <script src="../JS/CLASES/NOTIFICACION.js" type="text/javascript"></script>

</body>
</html>
