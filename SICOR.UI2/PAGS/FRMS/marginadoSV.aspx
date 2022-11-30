<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="marginadoSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.marginadoSV" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta charset="utf-8" />
    <title></title>
    <script type="text/javascript">
        var folder = '<%= MapPath(ConfigurationManager.AppSettings["StorageFolder"]).ToString().Replace("\\","/") %>' + 'gpo' + $.jCookies({ get: 'GRUPO' });
        $(document).ready(function () {
            $(".btn_nuevo-contacto").click(function () {
                cargaContactoSV(2, "#CONTID");
            });
            $(".btn_mas").button().click(function () { agreContMargi(); });
            $(".envi-email:not(#margi-envi-email-t), .envi-fis:not(#margi-envi-fis-t)").on('click', function () {
                if ($(this).hasClass("active bg-green fg-white")) {
                    $(this).removeClass("active bg-green fg-white");
                } else {
                    $(this).addClass("active bg-green fg-white");
                }
            });

            //Quita notNull de la instrucción escrita si selecciona una estandar
            $("#frm_marginado #margintruc").on('change', function () {
                if ($(this).val() != '-1') { $("#frm_marginado #MARGMOTIVO").removeClass('notNull') }
                else { $("#frm_marginado #MARGMOTIVO").addClass('notNull') }
            });
        });
    </script>
</head>
<body>
    <div id='frm_marginado' class="panel">
        <input type="hidden" id="corresid" value='-1' />
        <input type="hidden" id="margid" value='-1' />
        <div class="panel">
            <div class="content bg-white" style="overflow-y:auto;overflow-x:hidden;height:530px;">
                 <div class="detalle-margi-corres"></div>
                <div class="grid condensed">
                    <div class="row cells12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Motivo</th>
                                    <th>Enviar a</th>
                                    <th>
						                <!--<button title='Enviar email a todos' class='square-button mini-button place-right' id='Button1' onclick='javascript:customChecT_m_Envi()'><span class="mif-mail"></span></button>
						                <button title='Enviar físico a todos' class='square-button mini-button place-right' id='Button2' onclick='javascript:customChecT_f()'><span class="mif-file-text"></span></button>-->
                                        <button title='Enviar Email a Todos' class='square-button mini-button place-right' id='margi-envi-email-t' onclick='javascript:customChecT_m()'><span class="mif-mail"></span></button>
				                        <button title='Enviar Físico a Todos' class='square-button mini-button place-right' id='margi-envi-fis-t' onclick='javascript:customChecT_f()'><span class="mif-file-text"></span></button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                  <tr id="tr_responsable">
                                       <td>Responsable*</td>
                                       <td colspan="3" style='width:80%;'>
                                            <div class="input-control" style='width:75%;' data-role="select">                        
                                                <select id='CONTID' name='CONTID' class='notNull ' style="width:100%;">
                                                    <option value="-1">Seleccionar</option>
                                                </select>
                                            </div>
                                            <button class="btn_nuevo-contacto square-button mini-button"><span class="mif-plus"></span></button>
						                    <span><button title='Enviar email' class='customCeck envi-email square-button mini-button place-right'><span class="mif-mail"></span></button></span>
                                            <span><button title='Enviar físico' class='customCeck envi-fis square-button mini-button place-right'><span class="mif-file-text"></span></button></span>
						                    <button id="btn_mas" class="btn_mas button info" title="Agregar Involucrado">Mas...</button>
                                        </td>
                                  </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row cells12">
                        <%--<div class="cell colspan3">Fecha marginado*</div>--%>
                        <div class="cell colspan6">
                            Fecha marginado*
                            <div class="input-control text place-right">
                                <span class="mif-calendar prepend-icon"></span>
                                <input type='text' id='MARGFEC' name='MARGFEC' class='notNull' readonly="readonly" />
                            </div>
                        </div>
                        <%--<div class="cell colspan3">Tiempo respuesta*</div>--%>
                        <div class="cell colspan6">
                            &nbsp;Tiempo respuesta*
                            <div class="input-control text place-right">
                                <span class="mif-history prepend-icon"></span>
                                <input type='text' id='MARGTIEMPO' name='MARGTIEMPO' class='notNull' readonly="readonly" />
                            </div>
                        </div>
                    </div>
                    <div class="row cells12">
                        <%--<div class="cell colspan3">Instrucciones*</div>--%>
                        <div class="cell colspan6">
                            Instrucciones*
                            <div class="input-control select place-right">
                                <select id='margintruc'>
                                    <option value='-1'>Seleccionar</option>
                                    <option value='17'>Elaborar proyecto de respuesta.</option>
                                    <option value='18'>Asistir al evento y elaborar informe de los resultados.</option>
                                    <option value='30'>Responder directamente y enviar copia de respuesta a despacho</option>
                                </select>
                            </div>
                        </div>
                        <div class="cell colspan6">
                            &nbsp;Marginado por*
                            <div class="input-control select place-right">
                                <input type="text" id='marginadopor' class='notNull' />
                            </div>
                        </div>
                    </div>
                    <div class="row cells12">
                        <div class="input-control textarea full-size">
                            <textarea id='MARGMOTIVO' name='MARGMOTIVO' class='notNull'></textarea>
                        </div>
                    </div>
                    <div class="row cells12">
                        <div class="cell full-size">
                            Adjuntar archivo(s)
                            <div class="input-control select">
                                <select id="SL_ADJUNTAR">
                                    <option value="2">No</option>
                                    <option value="1">Si</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row cells12">
                        <div id="listaAdjuntosMargi"></div>
                    </div>
                    <div class="row cells12" style="text-align:center;">
                        <%--<input type='hidden' id='Hidden1' name='CORRESID' class=''>--%>
	                    <button type="button" onclick="javascript:marginarSV()" class="button primary"> 
	                        <span class="mif-checkmark"></span> Aceptar</button>
	                    <button type="button" onclick="javascript:closeWin()" class="button danger">
	                        <span class="mif-cross"></span> Cancelar </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
