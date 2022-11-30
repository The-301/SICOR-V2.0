<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="notasSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.notasSV" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
	<title></title>
	<meta charset="UTF-8" />	
	<script type="text/javascript">
		$(document).ready(function () {
		    $(".btn_nuevo-contacto").click(function () {
				cargaContactoSV(1, "#CONTID_DIRIGIDO, #CONTID_ELABORO");
			});
		});
	</script>
</head>
<body>



	 <div id='frm_nota' class="panel">
		<div class="panel">
			<div class="content bg-white" style="overflow-y:auto;overflow-x:hidden;height:480px;">
                <div class="grid condensed">
                    <div class="row cells4">
                        <div class="cell colspan2">
                            Cod/Ref
						    <div class="input-control text place-right">
							    <input type='text' id='CORRESCOD' name='CORRESCOD' class='' />
						    </div>
						    <input type='hidden' id='CORRESID' name='CORRESID' class='' value="-1" />
						    <input type='hidden' id='CATEGOID' name='CATEGOID' class='' value="3" />
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan2">
                            Clase*
					       <div class="input-control select place-right">
						        <select id='CLASEID' name='CLASEID' class='notNull '>
							        <option value="-1">Seleccionar</option>
						        </select>
						    </div>
                        </div>
                        <div class="cell colspan2">
                            &nbsp;Tipo*
                            <div class="input-control select place-right">
						        <select id='TIPOID' name='TIPOID' class='notNull '>
							        <option value="-1">Seleccionar</option>
						        </select>
                            </div>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan2">
                            Prioridad*
					       <div class="input-control select place-right">
						        <select id='PRIOID' name='PRIOID' class='notNull '>
							        <option value="1">Ordinario</option>
							        <option value="2">Urgente</option>
						        </select>
						    </div>
                        </div>
                        <div class="cell colspan2">
                            &nbsp;Requiere firma*
					        <div class="input-control select place-right">
						        <select id='REQFIRMA'  class='notNull '>
							        <option value="2">No</option>
							        <option value="1">Si</option>
						        </select>
						    </div>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell">
                            Dirigido a*
                        </div>
                        <div class="cell colspan3">
							<div class="input-control" style="width:90%;">
								<select id='CONTID_DIRIGIDO' name='CONTID_DIRIGIDO' class='notNull select2' style="width:100%">
									<option value="-1">Seleccionar</option>
								</select>
							</div>
							<button class="btn_nuevo-contacto square-button mini-button"><span class="mif-plus"></span></button>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell">
                            Elaborado por*
                        </div>
                        <div class="cell colspan3">
							<div class="input-control" style="width:90%;">
								<select id='CONTID_ELABORO' name='CONTID_ELABORO' class='notNull select2' style="width:100%">
									<option value="-1">Seleccionar</option>
								</select>
							</div>
							<button class="btn_nuevo-contacto square-button mini-button"><span class="mif-plus"></span></button>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell">
                            Asunto*
                        </div>
                        <div class="cell colspan3">
					       <div class="input-control textarea full-size">
							    <textarea id='ASUNTO' name='ASUNTO' class='notNull '></textarea>
						    </div>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan2">
                            Fecha documento*
					       <div class="input-control text place-right">
                                <span class="mif-calendar prepend-icon"></span>
							    <input type='text' id='NOTAELABFEC' name='NOTAELABFEC' class='notNull' readonly="readonly" />
						    </div>
                        </div>
                        <div class="cell colspan2">
                            &nbsp;Registró*
                            <div class="input-control select place-right">
                                <select id='RESPONSABLEID' name='RESPONSABLEID' class='notNull'>
                                    <option value="-1">Seleccionar</option>
		                        </select>
                            </div>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan4">
                            <div class="bg-grayLighter"><span class='corres-ver text-bold' id='ver-lista-corres' onclick='javascript:verListCorres();'><a class='button link'><span class="mif-expand-more"></span> Respuesta de...</a></span></div>
                            <div class="detalle-margi-corres list-aContes"></div>
                        </div>
                    </div>
                    <div class="row cells4">
                        <div class="cell colspan4" style="text-align:center;">
							<button onclick="javascript:notaSV()" class="button primary"> 
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
