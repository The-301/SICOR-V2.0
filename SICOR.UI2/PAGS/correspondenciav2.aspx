<%@ Page Title="" Language="C#" MasterPageFile="~/PAGS/Site1.Master" AutoEventWireup="true" CodeBehind="correspondenciav2.aspx.cs" Inherits="SICOR.UI2.PAGS.correspondenciav2" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="../JS/CLASES/INIT.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CORRESPONDENCIA.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CORRESLISTA.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CORRESDETALLE.js" type="text/javascript"></script>
    <script src="../JS/CLASES/REMITIR.js" type="text/javascript"></script>
    <script src="../JS/CLASES/MARGINADO.js" type="text/javascript"></script>

    <!--Css de mensaje -->
    <link rel="stylesheet" href="../CSS/CSS1.css" type="text/css" />
    
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="grid" style="margin:0;top:0;">
        <div class="row cells12 shadow bg-white" style="margin: 0 0 0;border-bottom:#ddd solid 1px;">
            <div class="cell colspan4 auto-size">
                <div class="h-menu">
                    <div class="no-hovered">
                        <span id='cant-items-list' style="padding:0 15px; width:150px !important;">Cargando...</span>
                        <div class="input-control text" style="margin-right: 10px; margin-top:5px;width:75%">
                            <input id="CORRESID" class="filtro" placeholder="Filtrar (IDs separados por coma)" type="text" onkeyup="javascript:doSearch2(this,event,1)" />
                            <%--<button class="button warning" id="buttonBuscar"><span class="mif-search"></span></button>--%>
                            <button class="button warning" id="buttonBuscar2" onclick="javascript:cargaListCorresByIDv2()"><span class="mif-search"></span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cell colspan8 auto-size">
                <ul class="t-menu horizontal place-right">
                    <li class="" id="corres-ingre"><a href="#"><span class="icon mif-file-text"></span>&nbsp;Ingresar</a></li>
                    <li class="" id="res-margi-engre"><a href="#"><span class="icon mif-map"></span>&nbsp;Marginado</a></li>
                    <li class="" id="nota-ingre"><a href="#"><span class="icon mif-file-empty"></span>&nbsp;Nota</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="grid condensed" style="height:84% !important;">
        <div class="row cells12 cienxciento" style="">
            <!-- SECCION LATERAL IZQUIERDA -->
            <div class="cell colspan4 bg-white" style="height:100%;" id="menuLateral">
                <ul class="t-menu compact" id="menu-item-corres" style="height:100%;z-index:10;float:left;"><!--position:absolute !important;-->
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
                    <li class='' id="desactivar1">
                        <a href="javascript:cargaListDesactivar(1)" class="bg-hover-red"><span class="icon mif-blocked menu-item"></span></a>
                        <div class="popover popover-shadow bg-red fg-white marker-on-left" style="display: none; position: absolute;left:50px;top:-0px;"><div>Desactivar</div></div>
                    </li>
				</ul>
                <div class="" id="contenidoCorr" style="height:100%;overflow-y:auto;overflow-x:hidden;">
                    <div class="grid no-margin bg-grayLighter cuadroBusqueda" id="cuadroFiltro" style="border-bottom:1px solid #aaa;">
                        <div class="row cells5 no-margin">
                            <div class="cell colspan4 place-right" style="padding-top: 3px;">
                                &nbsp;Ordernar por:&nbsp;
                                <div class="input-control text no-margin">
                                    <select id="cbOrdenar">
                                        <option value="1">Fecha de ingreso en sistema</option>
                                        <option value="2">Fecha correspondencia recibida</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="recuadro listview-outlook" data-role="listview" id="lista-item-corres" style="overflow-x:hidden;overflow-y:auto;"></div><!--height:92%;-->
	            </div>
            </div>
            <!--container >
            <div class="cell colspan8 bg-white cuadroDetalle" >
                <div class="bg-grayLight submenudetalle"><!--style="position:fixed;"-->
                    <ul class="t-menu horizontal bg-grayLight compact" id="submenuitem">
                        <li class='' id='adjunto'><a href="#" class="fg-white bg-hover-amber"><span class="mif-attachment"></span>&nbsp;Adjunto</a></li>
                        <li class='' id='enviar'><a href="#" class="fg-white"><span class="mif-upload"></span>&nbsp;Enviar</a></li>
                  <!--      <li class='' id='archivar'><a href="#" class="fg-white"><span class="mif-cabinet"></span>&nbsp;Archivado en</a></li> -->
                        <li class='' id='corresDev'><a href="#" class="fg-white bg-hover-amber"><span class="mif-undo corresDeb"></span>&nbsp;Dev. Correc.</a></li>
                        <li class='' id='editar'><a href="#" class="fg-white bg-hover-amber"><span class="mif-pencil"></span>&nbsp;Editar</a></li>  
                        <li class='' id='eliminar'><a href="#" class="fg-white bg-hover-red"><span class="mif-bin"></span>&nbsp;Eliminar</a></li>                      
                        <li class='' id="print"><a href="#" class="fg-white bg-hover-amber"><span class="mif-printer"></span>&nbsp;Imprimir</a></li>                        
                        <li class='' id="firm"><a href="#" class="fg-white bg-hover-information"><span class="mif-cabinet"></span>&nbsp;Firmar</a></li>                        
                    </ul>
                </div>                
                <div class="recuadro con-imprimir padding10" style="padding-top:40px;">
	            	<div id="detalle-adjunto"></div>
                    <div id="detalle-item-corres"></div>
	            	<div class='detalle-margi-corres' id='detalle-margi-corres'></div>
	            </div>
            </div>
</asp:Content>