<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="enviadoSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.enviadoSV" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta charset="UTF-8" />
    <title></title>
    <script type="text/javascript">
        //var folder = '<%= MapPath(ConfigurationManager.AppSettings["StorageFolder"].ToString()) %>';
        var folder = '<%= MapPath(ConfigurationManager.AppSettings["StorageFolder"]).ToString().Replace("\\","/") %>' +'gpo'+$.jCookies({ get: 'GRUPO' });
        $(document).ready(function () {
            cargaMotivos();
            $(".btn_nuevo-contacto").click(function () {
                cargaContactoSV(1, "#CONTID");
            });

            $("#btn_mas").button().click(function () { agreContEnvio(); });

            $(".envi-email:not(#margi-envi-email-t), .envi-fis:not(#margi-envi-fis-t)").on('click', function () {
                if ($(this).hasClass("active fg-white bg-green")) {
                    $(this).removeClass("active fg-white bg-green");
                } else {
                    $(this).addClass("active fg-white bg-green");
                }
                if ($(this).hasClass("envi-email")) {
                    verifMailCont(this);
                }
            });

            cambiaLogo("frm_enviado");

            //Carga lista de adjuntos
            $("#SL_ADJUNTAR").change(function () { cargaListAdjMargi(); });
        });
    </script>
</head>
<body>
	 <div id='frm_enviado' class="panel" style="overflow:hidden">
		<div class="panel" style="overflow:hidden">
			<div class="content bg-white" style="overflow-y:auto;overflow-x:hidden;height:350px;">
				<input type="hidden" id="CORRESID" value='-1'/>
                <div class="grid condensed">
                    <div class="row cells4">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Motivo</th>
                                    <th>Enviar a</th>
                                    <th>
						                <button title='Enviar email a todos' class='square-button mini-button place-right' id='margi-envi-email-t' onclick='javascript:customChecT_m_Envi()'><span class="mif-mail"></span></button>
						                <button title='Enviar físico a todos' class='square-button mini-button place-right' id='margi-envi-fis-t' onclick='javascript:customChecT_f()'><span class="mif-file-text"></span></button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="envio_1" class="envio_cont">
                                    <td style="width:20%" valign="top">
							            <div class="input-control select">
                                            <select class='envio_motivo' id='envio_motivo'></select>
                                            <input type='text' class='cont_email' style='display:none' placeholder='Email del contacto' />
                                        </div>                                    
                                    </td>
                                    <td>
							            <div class="input-control" style='width:92%;' data-role="select">
							                <select id='CONTID' name='CONTID' class='cont notNull ' style="width:100%">
								                <option value="-1">Seleccionar</option>
							                </select>
                                        </div>
                                        <button class="btn_nuevo-contacto square-button mini-button"><span class="mif-plus"></span></button>
							            <button id="btn_mas" class="btn_mas button info" title="Agregar involucrado">Mas...</button>
                                    </td>
                                    <td style="width:10%" valign="top">
							            <span><button title='Enviar email' class='customCeck envi-email square-button mini-button place-right'><span class="mif-mail"></span></button></span>
                                        <span><button title='Enviar físico' class='customCeck envi-fis square-button mini-button place-right'><span class="mif-file-text"></span></button></span>                                    
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan2">
                            Fecha envío*
                            <div class="input-control text">
                                <span class="mif-calendar prepend-icon"></span>
								<input type='text' id='ENVIOFEC' name='ENVIOFEC' class='notNull ' />
                            </div>
                        </div>
                        <div class="cell colspan2">
                            Adjuntar archivo(s)
                            <div class="input-control select" style="width:100px">
								<select id="SL_ADJUNTAR">
									<option value="2">No</option>
									<option value="1">Si</option>
								</select>
                            </div>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan4">
                            <div id="listaAdjuntosMargi"></div>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan4" style="text-align:center;">
							<button onclick="javascript:enviadoSV()" class="button primary"> 
								<span class="mif-checkmark"></span> Aceptar</button>
							<button onclick="javascript:closeWin()" class="button danger">
								<span class="mif-cross"></span> Cancelar </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
