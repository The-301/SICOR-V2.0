<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="bandejaMensajes_in.aspx.cs" Inherits="SICOR.UI2.PAGS.bandejaMensajes_in" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>SICOR - Control de Correspondencia - MINEC</title>

   <%-- CSS --%>
    <link href="../CSS/reset.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/960.gs.fluid.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/buttons.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/demo.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/ui-custom-theme/jquery-ui-1.8.21.custom.css" rel="stylesheet" type="text/css" />
    
    <link href="../JS/LightBox/evolution/jquery.lightbox.css" rel="stylesheet" type="text/css" />
    <link href="../JS/Select3.2/select2.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/ui-custom-theme/jquery.ui.timepicker.css" rel="stylesheet" type="text/css" />
    <link href="../JS/Notification/style.css" rel="stylesheet" type="text/css" />
    <link href="../JS/Msgbox/jquery.msgbox.css" rel="stylesheet" type="text/css" />
    <link href="../CSS/dataTable/dataTable.css" rel="stylesheet" type="text/css" />

    <link href="../CSS/demo.css" rel="stylesheet" type="text/css" />
   
   <%-- JAVASCRIPT --%>
    <script src="../JS/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="../JS/jquery-ui-1.8.21.custom.min.js" type="text/javascript"></script>
    <script src="../JS/jcookies.js" type="text/javascript"></script>
    <script src="../JS/LightBox/jquery.lightbox.js" type="text/javascript"></script>
    <script src="../JS/Select3.2/select2.min.js" type="text/javascript"></script>
    <script src="../JS/ui-minified/jquery.ui.timepicker.js" type="text/javascript"></script>
    <script src="../JS/Notification/script.js" type="text/javascript"></script>
    <script src="../JS/Msgbox/jquery.msgbox.min.js" type="text/javascript"></script>
    <script src="../JS/DataTables/jquery.dataTables.js" type="text/javascript"></script>
    <script src="../JS/jQuery.print.js" type="text/javascript"></script>
 
    <script src="../JS/SETUPAJAX-SIS.js" type="text/javascript"></script>
    <script src="../JS/SETUP.js" type="text/javascript"></script>
    <script src="../JS/CLASES/WS.js" type="text/javascript"></script>

    <script src="../JS/CLASES/MENSAJE.js" type="text/javascript"></script>
    <script src="../JS/CLASES/USUARIOS.js" type="text/javascript"></script>
    <script src="../JS/exportarExcel/tableexport-xls-bold-headers.js" type="text/javascript"></script>
    <script src="../JS/ToXlsx/FileSaver.js" type="text/javascript"></script>
    <script src="../JS/ToXlsx/Export2Excel.js" type="text/javascript"></script>
    <script src="../JS/ToXlsx/Blob.js" type="text/javascript"></script>

    <script type="text/javascript">
        jQuery(document).ready(function () {

            cargaMsjRecSinLeer();

            //Actualiza estado
            upMsjEstado();

            /*Set Botones*/
            $(".nav #salir").click(function () { cierraSecion(); });
            $(".nav #bandejaMensajes").click(function () { });
            $(".nav #imprimirReps").click(function () { document.location = "imprimir.aspx" });
            $(".nav #home").click(function () { document.location = "correspondencia.aspx" });
            $(".nav #buscarCorres").click(function () { document.location = "busqueda.aspx" });

            $(function () {
                $("#tabs").tabs();
            });

            /*********Datepickers**********/
            $(function () {
                $(".fech").datepicker({ dateFormat: "dd/mm/yy" });
            });

            //Manual de Ayuda
            $(".nav #manualAyuda").click(function () { window.open("../AYUDA/SICOR-ManualDeUsuario.pdf") });

        });
    </script>
</head>
<body>
    
        <div id='div_load' style="z-index:1000; width:100%; height:100%; position:fixed; display:none; background:#FFFFFF; opacity:.35;">
           <div style='position:relative; top:35%;'>    
                <img src="../IMAS/ajax-loader.gif"/ alt="">
            </div>
        </div>
    
    <div class="mensajes"></div>
    <div id="container" style="position:absolute; z-index:2">
        <div class="headline" style="float:left;">
            <span class="pictogram email_big" style="color:#ffffff"></span> 
            <span class="text-headline-big " style="color:#BBD9EA">SICOR MINEC</span>
            <p>Control de Correspondencia</p>
        </div>
        <ul class="nav">
			<li class='go-blue' id="home" style="width:130px;"><span class="pictogram menu mail-menu"></span> <br/><p>Correspondencia</p></li>
			<li class='go-yellow active' id="bandejaMensajes"><span class="pictogram menu mesaje-menu"></span> <br/><p>Mensajes</p></li>
			<%--<li class='go-yellow' id="bandejaMensajes"><span class="pictogram menu contactos-menu"></span> <br/>Contactos</li>--%>
			<li class='go-blue' id="buscarCorres"><span class="pictogram menu report-menu"></span> <br/><p>Buscar</p> </li>
			<li class='go-black' id="imprimirReps"><span class="pictogram menu imprimir-menu"></span> <br/><p>Imprimir</p> </li>
            <li class='go-blue' id="manualAyuda"><span class="pictogram menu ayuda-menu"></span> <br/><p>Ayuda</p> </li>
			<li class='go-red right' id="salir"><span class="pictogram menu salir-menu"></span> <br/><p>Salir</p> </li>
		</ul>
		 
    </div>
    <div class="contenido">
        <article class="container_12" style="top:55px; position:relative;">
            <div id="tabs">
                <ul>
                    <li id="li-tabs-1"><a href="#tabs-1">Nuevos Mensajes Recibidos</a></li>
                    <li id="li-tabs-2"><a href="#tabs-2">Buscar Mensajes</a></li>
                </ul>
                <div id="tabs-1"></div>
                <div id="tabs-2">
                    <table class="tb_01 center" style="width:50%;">
                        <tr>
                            <td>Feha</td>
                            <td>
                                Del
                                <input type="text" id="FECH01" class="notNull right fech"/>
                            </td>
                            <td>
                                Al
                                <input type="text" id="FECH02" class="notNull fech"/>
                            </td>
                            <td>
                                <a href="javascript:cargaMsjResBusqueda()" class="button button-cyan"> 
                                <span class="pictogram ok"></span> Aceptar</a>
                            </td>
                        </tr>
                    </table>
                    <br /><br /><br />
                    <div id="res_busqueda"></div>
                </div>
            </div>
        </article>        
   </div>
</body>
</html>
