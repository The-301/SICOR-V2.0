<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="imprimir.aspx.cs" Inherits="SICOR.UI2.PAGS.imprimir" %>

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

    <link href="../CSS/sicorv2.css" rel="stylesheet" type="text/css" />
   
   <%-- JAVASCRIPT --%>
    <script src="../JS/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="../JS/jquery-ui-1.8.21.custom.min.js" type="text/javascript"></script>

    <script src="../JS/Notification/notify.js" type="text/javascript"></script>
    <script src="../JS/underscore-min.js" type="text/javascript"></script>
    <script src="../JS/jcookies.js" type="text/javascript"></script>
 
    <script src="../JS/SETUPAJAX-SIS.js" type="text/javascript"></script>
    <script src="../JS/SETUP.js" type="text/javascript"></script>
    <script src="../JS/CLASES/WS.js" type="text/javascript"></script>
    
    <script src="../JS/CLASES/CORRESPONDENCIA.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CORRESLISTA.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CORRESDETALLE.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CONTACTOS.js" type="text/javascript"></script>
    <script src="../JS/CLASES/REMITIR.js" type="text/javascript"></script>
    <script src="../JS/CLASES/USUARIOS.js" type="text/javascript"></script>
    <script src="../JS/CLASES/MARGINADO.js" type="text/javascript"></script>
    <script src="../JS/CLASES/IMPRIMIR.js" type="text/javascript"></script>
    <script src="../JS/CLASES/MENSAJE.js" type="text/javascript"></script>
    <script src="../JS/CLASES/NOTIFICACION.js" type="text/javascript"></script>

    <script type="text/javascript">
        jQuery(document).ready(function () {

            //Carga lista instituciones
            //            cargaListaInst();
            //Carga Contactos
            cargaListaContactos("#CONTID");

            /*Set Botones*/
            $(".nav #salir").click(function () { cierraSecion(); });
            /*$(".nav #bandejaMensajes").click(function () { document.location = "bandejaMensajes_in.aspx" });*/
            $(".nav #contactos").click(function () { document.location = "contactos.aspx" });
            $(".nav #buscarCorres").click(function () { document.location = "busqueda.aspx" });
            $(".nav #home").click(function () { document.location = "correspondencia.aspx" });


            $("#menutabb").tabControl();
            $("#menutabb .frames").show();

            /*********Selects**********/
            $("#CONTINST").select2({
                minimumInputLength: 1
            });
            $("#CONTID").select2({
                minimumInputLength: 1
            });

            /*********Datepickers**********/
            $(function () {
                $(".FECH").datepicker({ dateFormat: "dd/mm/yy" });
            });

            //ini Print
            $("#imprimir").attr("href", "javascript:void( 0 )")
			.click(function () {
			    // Print the DIV.
			    if ($("#con-imprimir").html() != "") {
			        $("#con-imprimir").print();
			    }
			    // Cancel click event.
			    return (false);
			});

            //Notif mensajes
			notNumMsj();

			//Manual de Ayuda
			$(".nav #manualAyuda").click(function () { window.open("../AYUDA/SICOR-ManualDeUsuario.pdf") });

			//BotnFiltrar
			$("#btn_filtrarImpre").button().click(function () { filtraImpre(); });
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
    
    <div class="mensajes"></div>
    <div class="contenido">	    

    <!-- CONTENEDOR PRINCIPAL -->
    <div class="grid" style="margin:0;">
        <!-- BARRA DE BUSQUEDA/FILTROS -->
        <div class="row cells11 shadow" style="margin: 0 0 0;">            
            <div class="tabcontrol" id="menutabb">
                <ul class="tabs">
                    <li><a href="#tabs-1">Control envíos</a></li>
                    <li><a href="#tabs-2">Control marginados</a></li>
                    <li><a href="#tabs-3">Reportes</a></li>
                </ul>
                <div class="frames" style="display:none">
                    <div class="frame bg-grayLighter" id="tabs-1">
                        Fecha de los envíos: del 
                        <div class="input-control text" style="width: 250px; margin-right: 10px">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECH01" class="notNull right FECH"/>
                        </div>
                        al 
                        <div class="input-control text" style="width: 250px; margin-right: 10px">                    
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECH02" class="notNull FECH"/>
                        </div>
                        <button class="button success" onclick="javascript:genCuadroControlEnvio()"><span class="mif-search"></span> Buscar</button>
                    </div>
                    <div class="frame bg-grayLighter" id="tabs-2">
                        Fecha de los marginados: del 
                        <div class="input-control text" style="width: 250px; margin-right: 10px">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECHMARGI01" class="notNull right FECH"/>
                        </div>
                        al 
                        <div class="input-control text" style="width: 250px; margin-right: 10px">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECHMARGI02" class="notNull FECH"/>
                        </div>
                        <button class="button success" onclick="javascript:genCuadroControlMarginado()"><span class="mif-search"></span> Buscar</button>
                    </div>
                    <div class="frame bg-grayLighter" id="tabs-3">
                        Fecha: del 
                        <div class="input-control text" style="width: 250px; margin-right: 10px">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECHGEN01" class="notNull right FECH"/>
                        </div>
                        al 
                        <div class="input-control text" style="width: 250px; margin-right: 10px">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECHGEN02" class="notNull FECH"/>
                        </div>
                        Tipo: 
                        <div class="input-control select" style="margin-right: 10px">
                            <select id='tipoRep_imprimir'>
                                <option value='1'>Reporte General de Ingreso de Correspondencia</option>
                                <option value='2'>Reporte General de Marginaciones</option>
                                <option value='3'>Reporte General de Marginaciones Activos</option>
                            </select>
                        </div>
                        <button class="button success" onclick="javascript:generaRep()"><span class="mif-search"></span> Buscar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row cells11" style="padding:5px 10px; overflow:none;">            
            <div style="border:1px solid #ccc;">
                <div class="shadow">
                    <div class="input-control text" style="width:150px;">
                        <button class="button info" id="imprimir"><span class="icon mif-printer"></span>&nbsp;Imprimir</button>
                    </div>
                    <span class="place-right" style="padding-right:10px">
                        <div class="input-control select" style="margin-right: 10px">
                            <select id="imprimir-tipoFiltro">
                                <option value='1'>Inclusión</option>
                                <option value='2'>Exclusión</option>
                            </select>
                        </div>
                        <div class="input-control text" style="margin-right: 10px">
                            <input type="text" placeholder="Ejemplo '2,3,45'" id="txt_idsImpri" />
                        </div>                    
                        <button class="button warning" id="btn_filtrarImpre"><span class="mif-filter"></span> Filtrar</button>
                    </span>
                </div>
                <div id="con-imprimir" class="padding10" style="height:600px; overflow-y:auto; overflow-x:hidden;"></div>
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

</body>
</html>
