<%@ Page Title="" Language="C#" MasterPageFile="~/PAGS/Site1.Master" AutoEventWireup="true" CodeBehind="imprimirv2.aspx.cs" Inherits="SICOR.UI2.PAGS.imprimirv2" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../JS/CLASES/IMPRIMIR.js" type="text/javascript"></script>
    <script src="../JS/exportarExcel/tableexport-xls-bold-headers.js" type="text/javascript"></script>
    <script src="../JS/ToXlsx/xlsx.js" type="text/javascript"></script>
    <script src="../JS/ToXlsx/FileSaver.js" type="text/javascript"></script>
    <script src="../JS/ToXlsx/Blob.js" type="text/javascript"></script>
    <script src="../JS/ToXlsx/Export2Excel.js" type="text/javascript"></script>
    

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- CONTENEDOR PRINCIPAL -->
    <div class="grid" style="margin:0;">
        <!-- BARRA DE BUSQUEDA/FILTROS -->
        <div class="row cells11 shadow" style="margin: 0 0 0;">
            <div class="tabcontrol" id="menutabb">
                <ul class="tabs">
                    <li><a href="#tabs-1">Control envíos</a></li>
                    <li><a href="#tabs-2">Control marginados</a></li>
                    <li><a href="#tabs-3">Reportes</a></li>
                    <li><a href="#tabs-4">Correspondencia</a></li>
                </ul>
                <div class="frames" style="display:none">
                    <div class="frame" id="tabs-1">
                        Fecha de los envíos: del 
                        <div class="input-control text" style="width: 200px; margin-right: 10px">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECH01" class="notNull right FECH"/>
                        </div>
                        al 
                        <div class="input-control text" style="width: 200px; margin-right: 10px">                    
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECH02" class="notNull FECH"/>
                        </div>

                        Tipo correspondencia:
                         <div class="input-control select " style="margin-right: 10px">
                            <select id='s1T1'>   
                                <option value='1'>Interno-Salida</option>
                                <option value='2'>Interno-Entrada</option>
                                <option value='3'>Externo-Salida</option>
                                <option value='4'>Externo-Entrada</option>
                            </select>
                        </div>


                        <button class="button success" onclick="javascript:genCuadroControlEnvio()"><span class="mif-search"></span> Buscar</button>
                    </div>
                    <div class="frame" id="tabs-2">
                        Fecha de los marginados: del 
                        <div class="input-control text" style="width: 200px; margin-right: 10px">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECHMARGI01" class="notNull right FECH"/>
                        </div>
                        al 
                        <div class="input-control text" style="width: 200px; margin-right: 10px">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECHMARGI02" class="notNull FECH"/>
                        </div>

                        Tipo correspondencia:
                         <div class="input-control select" style="margin-right: 10px">
                            <select id='s2T2'>
                                <option value='1'>Interno-Salida</option>
                                <option value='2'>Interno-Entrada</option>
                                <option value='3'>Externo-Salida</option>
                                <option value='4'>Externo-Entrada</option>
                            </select>
                        </div>

                        <button class="button success" onclick="javascript:genCuadroControlMarginado()"><span class="mif-search"></span> Buscar</button>
                    </div>
                    <div class="frame" id="tabs-3">
                        Fecha: del 
                        <div class="input-control text" style="width: 200px; margin-right: 10px">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECHGEN01" class="notNull right FECH"/>
                        </div>
                        al 
                        <div class="input-control text" style="width: 200px; margin-right: 10px">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECHGEN02" class="notNull FECH"/>
                        </div>
                        Tipo rep.: 
                        <div class="input-control select" style="margin-right: 10px">
                            <select id='tipoRep_imprimir'>
                                <option value='1'>Reporte general de ingreso de correspondencia</option>
                                <option value='2'>Reporte general de marginaciones</option>
                                <option value='3'>Reporte general de marginaciones activos</option>
                            </select>
                        </div>

                         Tipo correspondencia:
                         <div class="input-control select" style="margin-right: 10px">
                            <select id='s3T3'>
                                <option value='1'>Interno-Salida</option>
                                <option value='2'>Interno-Entrada</option>
                                <option value='3'>Externo-Salida</option>
                                <option value='4'>Externo-Entrada</option>
                            </select>
                        </div>

                        <button class="button success" onclick="javascript:generaRep()"><span class="mif-search"></span> Buscar</button>
                    </div>
                    <div class="frame" id="tabs-4">
                        Remitente/destinatario
                        <div class="input-control select" style="width:300px;margin-right: 10px">
                            <select id='CONTID' class='notNull full-size'></select>
                        </div>
                        del 
                        <div class="input-control text" style="width: 150px; margin-right: 10px">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECHCOR01" class="notNull right FECH"/>
                        </div>
                        al 
                        <div class="input-control text" style="width: 150px; margin-right: 10px">
                            <span class="mif-calendar prepend-icon"></span>
                            <input type="text" id="FECHCOR02" class="notNull FECH"/>
                        </div>

                         Tipo correspondencia:
                         <div class="input-control select" style=" width:130px;margin-right: 10px">
                            <select id='s4T4'>
                                <option value='1'>Interno-Salida</option>
                                <option value='2'>Interno-Entrada</option>
                                <option value='3'>Externo-Salida</option>
                                <option value='4'>Externo-Entrada</option>
                            </select>
                        </div>

                        <button class="button success" onclick="javascript:genRepCorresByFechaContID()"><span class="mif-search"></span> Buscar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row cells11" style="overflow:hidden;">            
            <div style="border:1px solid #ccc;" id="menu-contenedor">
                <div class="shadow bg-white" id="menuprt" style="border-bottom:1px solid #ddd;">
                    <div class="input-control text" style="width:150px;">
                        <button class="button primary" id="imprimir"><span class="icon mif-printer"></span>&nbsp;Imprimir</button>
                    </div>
                    <div class="place-right" style="padding-right:10px">
                        <div class="input-control select" style="margin-right: 10px">
                            <select id="imprimir-tipoFiltro">
                                <option value='1'>Incluir</option>
                                <option value='2'>Excluir</option>
                            </select>
                        </div>
                        <div class="input-control text" style="margin-right: 10px">
                            <input type="text" placeholder="Ejemplo 2,3,45" id="txt_idsImpri" />
                        </div>                    
                        <button class="button warning" id="btn_filtrarImpre"><span class="mif-filter"></span> Filtrar</button>
                    </div>
                </div>
                <div id="con-imprimir" class="padding10 bg-white" style="min-height:400px;"></div>
            </div>            
        </div>
    </div>
</asp:Content>
