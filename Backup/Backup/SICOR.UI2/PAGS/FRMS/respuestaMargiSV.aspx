<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="respuestaMargiSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.respuestaMargiSV" %>

<!DOCTYPE html>

<html lang="es">
<head runat="server">
	<title></title>
	<meta charset="UTF-8" />
</head>
<body>
	 <div id='frm_resmargi' class="panel">
		<div class="panel">
			<div class="content bg-white" style="overflow-y:auto;overflow-x:hidden;height:480px;">
                <div class="detalle-margi-corres"></div>
                <div class="grid condensed">
                    <div class="row cells4">
                        <div class="cell colspan2">
                            Cod/Ref
							<div class="input-control select place-right">
								<input type="text" id="CORRESCOD" />
							</div>
                        </div>
                        <div class="cell colspan2">
                            &nbsp;Requiere firma
							<div class="input-control select place-right">
								<select id="REQFIRMA">
									<option value="2">No</option>
									<option value="1">Si</option>
								</select>
							</div>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan2">
                            Clase*
							<div class="input-control select place-right">
								<select id='CLASEID' name='CLASEID' class='notNull'>
									<option value="-1">Seleccionar</option>
								</select>
							</div>
					
							<input type='hidden' id='CATEGOID' name='CATEGOID' class='' value="2" />
							<input type='hidden' id='CORRESID' name='CORRESID' class='' value="-1" />

                        </div>
                        <div class="cell colspan2"></div>
                    </div>
                    <div class="row cells4">
                        <div class="cell">
                            Forma de respuesta*
                        </div>
                        <div class="cell colspan3">
							<div class="input-control textarea full-size">
								<textarea id='MARGINAFORMARES' name='MARGINAFORMARES' class='notNull'></textarea>
							</div>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan2">
                            Fecha documento*
					        <div class="input-control text place-right">
                                <span class="mif-calendar prepend-icon"></span>
						        <input type='text' id='NOTAELABFEC' name='NOTAELABFEC' class='notNull' />
					        </div>                        
                        </div>
                        <div class="cell colspan2">
                            &nbsp;Fecha recibido*
					        <div class="input-control text place-right">
                                <span class="mif-calendar prepend-icon"></span>
						        <input type='text' id='NOTARECIBFEC' name='NOTARECIBFEC' class='notNull' />
					        </div>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan2">
                            &nbsp;Registró*
                            <div class="input-control select place-right">
                                <select id='RESPONSABLEID' name='RESPONSABLEID' class='notNull'>
                                    <option value="-1">Seleccionar</option>
		                        </select>
                            </div>                        
                        </div>
                        <div class="cell colspan2">
                            &nbsp;Hora recibido*
					        <div class="input-control text place-right">
                                <span class="mif-history prepend-icon"></span>
						        <input type='text' id='NOTARECIBHORA' name='NOTARECIBHORA' class='notNull' />
					        </div>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan4" style="text-align:center;">
                            <button onclick="javascript:resMargiSV()" class="button primary"><span class="mif-checkmark"></span> Aceptar</button>
					        <button onclick="javascript:closeWin()" class="button danger"><span class="mif-cross"></span> Cancelar</button>
                        </div>
                    </div>
			    </div>            
		    </div>
	    </div>
    </div>
</body>
</html>
