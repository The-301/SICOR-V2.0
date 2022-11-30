<%@ Page Title="" Language="C#" MasterPageFile="~/PAGS/Site1.Master" AutoEventWireup="true" CodeBehind="contactosv2.aspx.cs" Inherits="SICOR.UI2.PAGS.contactosv2" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../JS/CLASES/CONTACTOS2.js" type="text/javascript"></script>
    <script type="text/javascript">
        jQuery(document).ready(function () {
            INITcontactos();
            $("#contactos").css("background", "#16499a");
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="grid" style="margin:0;">
        <div class="row cells12  bg-white" style="margin: 0 0 0;border-bottom:#ddd solid 1px;">
            <div class="cell colspan4 auto-size">
                <ul class="h-menu">
                    <li class="no-hovered">
                        <span id='cant-items-list' style="padding:0 15px; width:150px !important;">Cargando...</span>
                        <div class="input-control text" style="margin-right: 10px; margin-top:5px;">
                            <input id="Text2" class="filtro" placeholder="Filtrar lista..." type="text" onkeyup="doSearch(this,event)" />
                            <button class="button warning" id="buttonBuscar"><span class="mif-search"></span></button>
                        </div>
                    </li>                    
                </ul>                	            
            </div>
        </div>
    </div>
    <div class="grid condensed" style="height:85% !important;">
        <div class="row cells12" style="height:100% !important;">
            <div class="cell colspan4 bg-white" style="height:100% !important;">
                <!--<div class="bd-black shadow" style="overflow-y:auto;">-->
                    <ul class="t-menu compact" id="menu-item-corres" style="height:100% !important;z-index:10;float:left;"><!--position:absolute !important;-->
                        <li class='' id="eliminar">
                            <a href="#" class="bg-hover-red"><span class="icon mif-blocked menu-item"></span></a>
                            <div class="popover popover-shadow bg-red fg-white marker-on-left" style="display: none; position: absolute;left:50px;top:-0px;"><div>Eliminar contacto</div></div>
                        </li>
					</ul>
                    <div class="" id="contenidoCorr" style="height:100%;overflow-y:auto;overflow-x:none;">
                        <div class="recuadro listview-outlook" data-role="listview" id="lista-item-corres" style=""></div><!--padding:0 0 0 45px;-->
                    </div>
	            <!--</div>-->
            </div>
            <div class="cell colspan8 bg-white cuadroDetalle">
                <div class="bg-grayLight submenudetalle" style="position:absolute;">
	                <ul class="t-menu horizontal bg-grayLight compact" id="submenuitem">
                        <li class='' id='nuevoContacto'><a href="#" class="fg-white bg-hover-amber"><span class="mif-plus"></span>&nbsp;Nuevo</a></li>
                        <li class='' id='eliminarContacto'><a href="#" class="fg-white bg-hover-red"><span class="mif-bin"></span>&nbsp;Eliminar</a></li>                      
				    </ul>
                </div>
                <div class="recuadro con-imprimir padding10" style="padding-top:40px;">
	            	<div id='detalle-item-corres'></div>
	            </div>                
            </div>
        </div>
    </div>
</asp:Content>
