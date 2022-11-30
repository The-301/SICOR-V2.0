<%@ Page Title="" Language="C#" MasterPageFile="~/PAGS/Site1.Master" AutoEventWireup="true" CodeBehind="busquedav2.aspx.cs" Inherits="SICOR.UI2.PAGS.busquedav2" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../JS/CLASES/INITBUSCAR.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CORRESPONDENCIA.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CORRESLISTA.js" type="text/javascript"></script>
    <script src="../JS/CLASES/CORRESDETALLE.js" type="text/javascript"></script>
    <script src="../JS/CLASES/REMITIR.js" type="text/javascript"></script>
    <script src="../JS/CLASES/MARGINADO.js" type="text/javascript"></script>
    <script src="../JS/CLASES/BUSCAR.js" type="text/javascript"></script>

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
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- CONTENEDOR PRINCIPAL -->
    <div class="grid" style="margin:0;">
        <!-- BARRA DE BUSQUEDA/FILTROS -->
        <div class="row cells12" style="margin: 0 0 0;border-bottom:#ddd solid 1px;">
            <div class="tabcontrol" id="menutabb">
                <ul class="tabs">
                    <li><a href="#tabs-1">ID</a></li>
                    <li><a href="#tabs-2">Código Referencia</a></li>
                    <li><a href="#tabs-3">Remitente/Destinatario</a></li>
                    <li><a href="#tabs-4">Asunto</a></li>
                    <li><a href="#tabs-5">Fecha</a></li>
                </ul>
                <div class="frames bg-white" style="display:none">
                    <div class="frame" id="tabs-1">
                        ID: 
                        <div class="input-control text" style="width: 350px; margin-right: 10px">
                            <input id="CORRESID" placeholder="Digite el ID" type="text" onkeyup="doSearch2(this,event)"/>
                            <button class="button success" onclick="javascript:cargaListCorresByID()"><span class="mif-search"></span> Buscar</button>
                        </div>
                    </div>
                    <div class="frame" id="tabs-2">
                        Cod/Ref: 
                        <div class="input-control text" style="width: 350px; margin-right: 10px">                    
                            <input type="text" id="CODREF" class="notNull" placeholder="Código" onkeyup="doSearch2(this,event)"/>
                            <button class="button success" onclick="javascript:cargaListCorresByCodRef()"><span class="mif-search"></span> Buscar</button>
                        </div>
                    </div>
                    <div class="frame" id="tabs-3">
                        Remitente/Destinatario
                        <div class="input-control select" style="margin-right: 10px">                    
                            <select id='TIPOBUSQUEDA'>
                                <option value="1">Correspondencia Principal</option>
                                <option value="2">Correspondencia Secundaria</option>
                            </select>                            
                        </div>
                        <div class="input-control select" style="margin-right: 10px; width:25%;">
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
                    <div class="frame" id="tabs-4">
                        Asunto: 
                        <div class="input-control text" style="width: 350px; margin-right: 10px">                    
                            <input type="text" id="ASUNTO" class="notNull" placeholder="Escriba su texto" onkeyup="doSearch2(this,event)"/>
                            <button class="button success" onclick="javascript:cargaListCorresByAsunto()"><span class="mif-search"></span> Buscar</button>
                        </div>
                    </div>
                    <div class="frame" id="tabs-5">
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
    </div>
    <div class="grid condensed" style="height:76% !important;">
        <!-- DETALLE CORRESPONDENCIA -->
        <div class="row cells12 cienxciento" style="height:100% !important;">
            <!-- SECCION LATERAL IZQUIERDA -->
            <div class="cell colspan4 bg-white" style="height: 100% !important;">
                <ul class="t-menu compact" id="menu-item-corres" style="height: 100% !important;z-index:10;float:left;"><!--position:absolute !important;-->
					<li class='' id="desactivar">
                        <a href="#"><span class="icon mif-power menu-item"></span></a>
                        <div class="popover popover-shadow bg-cyan fg-white marker-on-left" style="display: none; position: absolute;left:50px;top:-0px;"><div>Activar</div></div>
                    </li>                        
				</ul>
                <div class="" style="height:100%;overflow-y:auto;overflow-x:hidden;">
                    <div class="grid no-margin bg-grayLighter" id="cuadroFiltro" style="border-bottom:1px solid #aaa;">
                        <div class="row cells5 no-margin">
                            <div class="cell colspan1 padding10">
                                <span id='cant-items-list'>0/0</span>
                            </div>
                            <div class="cell colspan4" style="padding-top: 3px;">
                                <div class="input-control text full-size no-margin">
                                    <input id="Text2" class="filtro" placeholder="Filtrar lista" type="text" onkeyup="doSearch(this,event)" />
                                    <button class="button warning" id="buttonBuscar"><span class="mif-search"></span></button>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="recuadro listview-outlook" data-role="listview" id="lista-item-corres" style="overflow-x:hidden;overflow-y:auto;"></div><!--padding:5px 0 0 45px; height:92%;-->
                </div>
            </div>
            <!-- SUBMENU -->
            <div class="cell colspan8 bg-white cuadroDetalle"><!--style="margin:5px 10px 0px 0px;"-->
                <div class="bg-grayLight submenudetalle"><!--style="position:fixed;"-->
	                <ul class="t-menu horizontal bg-grayLight compact" id="submenuitem">
                        <li class='' id='adjunto'><a href="#" class="fg-white bg-hover-amber"><span class="mif-attachment"></span>&nbsp;Adjunto</a></li>
                        <li class='' id="print"><a href="#" class="fg-white bg-hover-amber"><span class="mif-printer"></span>&nbsp;Imprimir</a></li>					    
				    </ul>
                </div>
            <!--</div>-->
            <!-- DETALLE -->
            <!--<div class="cell colspan8 bg-grayLighter bd-black" style="margin:0px 10px 0px 0px;overflow-y:auto;height:90%;">-->
                <div class="recuadro con-imprimir padding10" style="padding-top:40px;">
	            	<div id="detalle-adjunto"></div>
                    <div id="detalle-item-corres"></div>
	            	<div class='detalle-margi-corres'></div>
	            </div>
            </div>
        </div>
    </div>
</asp:Content>
