/***************Carga Detalle de Correspondencia***********************/
/**********************************************************************/
function cargaDetCorres(li) {
    // Limpia Adjuntos
    $("#detalle-adjunto").css('display', 'none');
    
    var contenido = ""
    , datGen = $(li).data("datos").datCorres
    , datSta = $(li).data("datos").estado
    , datMargi = $(li).data("datos").datmargi
    , datRemi = $(li).data("datos").datremi
    , datArchi = $(li).data("datos").datarchi[0]
    , datEnviado = $(li).data("datos").datenvia
    , datDev = $(li).data("datos").datdev
    , estadoMargi = ""
    , estadoMargiDsc = ""
    , tiempoMargi = ""
    , firma = "No"
    , modFirma = ""
    , archiNom = "--"
    , archiAmpo = "--"
    , archiDsc = "--"
    , remite = "";

    if (datGen.REQFIRMA == 1 || datGen.REQFIRMA == 3) {
        firma = "Si";
    }

    if (verifPosCorres(datGen, datRemi) && datGen.REQFIRMA == 1 && datGen.CORRESDEB == 2) {
        modFirma = " <a href=\"javascript:actualizaFirma(" + datGen.CORRESID + ")\" class='button link'><span class='mif-spell-check'></span>Modificar estado firma</a>";
    }

    if (datArchi != null) {
        archiAmpo = datArchi.ARCHVOCOD;
        archiNom = datArchi.ARCHIVONOMBRE;
        archiDsc = datArchi.ARCHVODSC;
    }

    //remite
    remite = datGen.CONTNOMBRE_REMITE + " | " + datGen.CONTUNIDAD_REMITE;



    //Datos generales
    contenido += ""
        + "<div>"
        + "    <p class='place-left'><b>Estado:</b>" + getEstado(li) + "</p>"
        + "    <p class='place-right'><b>Institución:</b> " + datGen.CONTINST_REMITE + "</p>"
        + "</div>"
        + "<br class='limpiar' />" + modFirma + "<br />"

        + "<div class='place-center detalle-Contenedor'>"
        + "    <p class='place-left'><b>Id</b>: " + datGen.CORRESID + "</p>"
        + "    <p class='place-right'><b>Cod/Ref:</b> " + datGen.CORRESCOD + "</p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-left'><b>Remitente:</b> " + remite + " </p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-left'><b>Clase:</b> " + datGen.CLASENOMBRE + "<br /></p>"
        + "    <p class='place-right'><b>Tipo:</b> " + datGen.TIPONOMBRE + "<br /></p>"
        + "    <br class='limpiar' />"
        + "    <p style='width:100%;'><b>Asunto:</b> " + datGen.ASUNTO + "</p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-right'><b>Fecha de nota:</b> " + datGen.NOTAELABFEC + "</p>"
        + "    <p class='place-left'><b>Fecha de recibido:</b> " + datGen.NOTARECIBFEC + "</p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-right'><b>Requiere firma:</b> " + firma + "</p>"
        + "    <p class='place-left'><b>Hora recibido:</b> " + datGen.NOTARECIBHORA + " Horas</p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-right'><b>Cod ampo:</b> " + archiAmpo + "</p>"
        + "    <p class='place-left'><b>Achivado en:</b> " + archiNom + "</p>"
        + "    <p class='place-left'><b>Achivado observación:</b> " + archiDsc + "</p>"
        + "    <br class='limpiar' />"
        + "</div>"
        + "<p class='align-right'><b>Registrado por:</b> " + datGen.RESPONSABLE + " <span style='display:none;' class='txtDigito'>(<b>Digitado por:</b> " + datGen.INSERTUSRNOM + " " + datGen.INSERTUSRAPE + ")</span><button class='square-button mini-button' onclick='javascript:verDigita()'><span class='mif-notification'><span></button></p>";

    $("#detalle-item-corres").html(contenido);

    //Tablas de detalle
    contenido = genDetRemi(datRemi) + genDetMargi(datMargi) + genDetEnvio(datEnviado) + genDetDevCorrec(datDev);

    $(".detalle-margi-corres").html(contenido);

}


/***************Carga Detalle de Respuesta de Marginado***********************/
/*****************************************************************************/
function cargaDetResMargi(li) {
    // Limpia Adjuntos
    $("#detalle-adjunto").css('display', 'none');

    var contenido = ""
    , datGen = $(li).data("datos").datCorres
    , datSta = $(li).data("datos").estado
    , datRemi = $(li).data("datos").datremi
    , datArchi = $(li).data("datos").datarchi[0]
    , datEnviado = $(li).data("datos").datenvia
    , datDev = $(li).data("datos").datdev
    , nomMargi = ""
    , archiNom = "--"
    , archiAmpo = "--"
    , archiDsc = "--"
    , modFirma = "";

    var datMargiRes = $("#corres_" + datGen.CORRESID_CONTESTA).data("datos").datmargi;
    for (var j = 0; j < datMargiRes.length; j++) {
        //nombre del responsable de la respuesta al marginado
        nomResponsable = "";
        for (var l = 0; l < datMargiRes[j].MARGICONT.length; l++) {
            if (datMargiRes[j].MARGICONT[l].TIPOID == 14) {
                nomResponsable = datMargiRes[j].MARGICONT[l].CONTNOMBRE
                + " | " + datMargiRes[j].MARGICONT[l].CONTUNIDAD;
            }
        }
    }

    if (datArchi != null) {
        archiAmpo = datArchi.ARCHVOCOD;
        archiNom = datArchi.ARCHIVONOMBRE;
        archiDsc = datArchi.ARCHVODSC;
    }

    if (verifPosCorres(datGen, datRemi) && datGen.REQFIRMA == 1 && datGen.CORRESDEB == 2) {
        modFirma = " <a href=\"javascript:actualizaFirma(" + datGen.CORRESID + ")\" class='button link'><span class='mif-spell-check'></span>Modificar Estado Firma</a>";
    }

    
    //Datos generales
    contenido += ""
        + "<div>"
        + "    <p class='place-left'><b>Estado:</b> " + getEstado(li) + "</p>"
    //        + "    <p class='right'><b>Institución:</b> " + datGen.CONTINST_REMITE + "</p>"
        + "</div>"
        + "<br class='limpiar' />" + modFirma + "<br />"

        + "<div class='place-center detalle-Contenedor'>"
        + "    <p class='place-left'><b>Id</b>: " + datGen.CORRESID + "</p>"
        + "    <p class='place-right'><b>Cod/Ref:</b> " + datGen.CORRESCOD + "</p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-right'><b>Clase:</b> " + datGen.CLASENOMBRE + "<br /></p>"
        + "    <p class='place-left'><b>Responsable:</b> " + nomResponsable + " </p>"
        + "    <br class='limpiar' />"
    //        + "    <p class='right'><b>Tipo:</b> " + datGen.TIPONOMBRE + "<br /></p>"
        + "    <p style='width:100%;'><b>Forma de respuesta:</b> " + datGen.MARGINAFORMARES + "</p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-right'><b>Fecha de nota:</b> " + datGen.NOTAELABFEC + "</p>"
        + "    <p class='place-left'><b>Fecha de recibido:</b> " + datGen.NOTARECIBFEC + "</p>"
    //        + "    <p class='right'><b>Requiere firma:</b> " + firma + "</p>"
        + "    <p class='place-left'><b>Hora recibido:</b> " + datGen.NOTARECIBHORA + " Horas</p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-right'><b>Cod ampo:</b> " + archiAmpo + "</p>"
        + "    <p class='place-left'><b>Achivado en:</b> " + archiNom + "</p>"
        + "    <p class='place-left'><b>Achivado observación:</b> " + archiDsc + "</p>"
        + "    <br class='limpiar' />"
        + "</div>"
        //+ "<p class='align-right'><b>Usuario que registró:</b> " + datGen.RESPONSABLE + " (<b>Digitado por:</b> " + datGen.INSERTUSRNOM + " " + datGen.INSERTUSRAPE + ")</p>";
        + "<p class='align-right'><b>Registrado por:</b> " + datGen.RESPONSABLE + " <span style='display:none;' class='txtDigito'>(<b>Digitado por:</b> " + datGen.INSERTUSRNOM + " " + datGen.INSERTUSRAPE + ")</span><button class='square-button mini-button' onclick='javascript:verDigita()'><span class='mif-notification'><span></button></p>";

    $("#detalle-item-corres").html(contenido);

    contenido = genDetRemi(datRemi) + genDetEnvio(datEnviado) + genDetDevCorrec(datDev);

    $(".detalle-margi-corres").html(contenido);

}

/***************Carga Detalle Notas***********************/
/********************************************************/
function cargaDetNota(li) {
    // Limpia Adjuntos
    $("#detalle-adjunto").css('display', 'none');

    var contenido = ""
    , datGen = $(li).data("datos").datCorres
    , datSta = $(li).data("datos").estado
    , datMargi = $(li).data("datos").datmargi
    , datRemi = $(li).data("datos").datremi
    , datArchi = $(li).data("datos").datarchi[0]
    , datEnviado = $(li).data("datos").datenvia
    , datDev = $(li).data("datos").datdev
    , estadoMargi = ""
    , estadoMargiDsc = ""
    , tiempoMargi = ""
    , firma = "No"
    , modFirma = ""
    , archiNom = "--"
    , archiAmpo = "--"
    , archiDsc = "--"
    , dirigido = ""
    , elaborado = "";

    if (datGen.REQFIRMA == 1 || datGen.REQFIRMA == 3) {
        firma = "Si";
    }

    if (verifPosCorres(datGen, datRemi) && datGen.REQFIRMA == 1 && datGen.CORRESDEB == 2) {
        modFirma = " <a href=\"javascript:actualizaFirma(" + datGen.CORRESID + ")\" class='button link'><span class='mif-spell-check'></span>Modificar estado firma</a>";
    }

    if (datArchi != null) {
        archiAmpo = datArchi.ARCHVOCOD;
        archiNom = datArchi.ARCHIVONOMBRE;
        archiDsc = datArchi.ARCHVODSC;
    }

    //Dirigido
//    if (datGen.CONTNOMBRE_DIRIGIDO != "") { dirigido = datGen.CONTNOMBRE_DIRIGIDO }
//    else if (datGen.CONTUNIDAD_DIRIGIDO != "") { dirigido = datGen.CONTUNIDAD_DIRIGIDO }
//    else if (datGen.CONTINST_DIRIGIDO != "") { dirigido = datGen.CONTINST_DIRIGIDO }
    dirigido = datGen.CONTNOMBRE_DIRIGIDO + " | " + datGen.CONTUNIDAD_DIRIGIDO + " | " + datGen.CONTINST_DIRIGIDO;

    //Elaborado
//    if (datGen.CONTNOMBRE_ELABORO != "") { elaborado = datGen.CONTNOMBRE_ELABORO }
//    else if (datGen.CONTUNIDAD_ELABORO != "") { elaborado = datGen.CONTUNIDAD_ELABORO }
//    else if (datGen.CONTINST_ELABORO != "") { elaborado = datGen.CONTINST_ELABORO }
    elaborado = datGen.CONTNOMBRE_ELABORO + " | " + datGen.CONTUNIDAD_ELABORO;

    //Datos generales
    contenido += ""
        + "<div>"
        + "    <p class='place-left'><b>Estado:</b> " + getEstado(li) + "</p>"
        + "    <p class='place-right'><b>Institución:</b> MINEC</p>"
        + "</div>"
        + "<br class='limpiar' />" + modFirma + "<br />"
        + "<div class='center detalle-Contenedor'>"
        + "    <p class='place-left'><b>Id</b>: " + datGen.CORRESID + "</p>"
        + "    <p class='place-right'><b>Cod/Ref:</b> " + datGen.CORRESCOD + "</p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-left'><b>Clase:</b> " + datGen.CLASENOMBRE + "<br /></p>"
        + "    <p class='place-right'><b>Tipo:</b> " + datGen.TIPONOMBRE + "<br /></p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-right'><b>Institución:</b> " + datGen.CONTINST_DIRIGIDO + "<br /></p>"
        + "    <p class='place-left'><b>Dirigido a:</b> " + dirigido + " </p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-left'><b>Elaborado por:</b> " + elaborado + " </p>"
        + "    <p class='place-right'><b>Institución:</b> " + datGen.CONTINST_ELABORO + " </p>"
        + "    <br class='limpiar' />"
        + "    <p style='width:100%;'><b>Asunto:</b> " + datGen.ASUNTO + "</p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-left'><b>Fecha de nota:</b> " + datGen.NOTAELABFEC + "</p>"
        + "    <p class='place-right'><b>Requiere firma:</b> " + firma + "</p>"
        + "    <br class='limpiar' />"
        + "    <p class='place-right'><b>Cod ampo:</b> " + archiAmpo + "</p>"
        + "    <p class='place-left'><b>Achivado en:</b> " + archiNom + "</p>"
        + "    <p class='place-left'><b>Achivado observación:</b> " + archiDsc + "</p>"
        + "    <br class='limpiar' />"
        + "</div>"
        //+ "<p class='align-right'><b>Usuario que registró:</b> " + datGen.INSERTUSRNOM + " " + datGen.INSERTUSRAPE + "</p>";
        + "<p class='align-right'><b>Registrado por:</b> " + datGen.RESPONSABLE + " <span style='display:none;' class='txtDigito'>(<b>Digitado por:</b> " + datGen.INSERTUSRNOM + " " + datGen.INSERTUSRAPE + ")</span><button class='square-button mini-button' onclick='javascript:verDigita()'><span class='mif-notification'><span></button></p>";

    $("#detalle-item-corres").html(contenido);

    contenido = genDetRemi(datRemi) + genDetEnvio(datEnviado) + genDetDevCorrec(datDev);

    $(".detalle-margi-corres").html(contenido);

}

/****************Genera Detalle de remision*************/
/*=====================================================*/
function genDetRemi(datRemi) {
    //Remitido
    var contenido = ""
            + "<div class='align-center'>"
            + "<div id='ver-lista-remi' class='corres-ver' onclick=\"javascript:verList('#tb_remisiones','#ver-lista-remi');\"><a class='button link place-right'><span class='mif-expand-more'></span> Mostrar...</a></div>" 
            + "<b>Detalle de remisión</b>"
            +"</div>"
            + "<table class='center' id='tb_remisiones' style='display:none;'>"
            + "    <thead><tr>"
            + "        <td>Remitido por</td>"
            + "        <td>Remitido a</td>"
            + "        <td style='width:40px;'>Fecha</td>"
            + "        <td style='width:40px;'>Confir. recib.</td>"
//            + "        <td style='width:40px;'></td>"
            + "    </tr></thead>"
            + "    <tbody>";

    if (datRemi == null || datRemi.length == 0) {
        contenido += "<tr><td colspan='5'>No se ha remitido esta pieza de correspondencia</td></tr>"
    } else {
        for (var i = 0; i < datRemi.length; i++) {

//            //Mensaje a usuario remitido
//            var mensaRemi = "";
//            if (i == 0) { mensaRemi = "<a href=\"javascript:cargaFrmMensajeInt(1)\">Mensaje</a>" }
            //Confimado de Recibido
            var REMCFR = "";
            if (datRemi[i].REMCFR_RCBD == 1) { REMCFR = "Si"; } else { REMCFR = "No"; }

            contenido += ""
                    + "<tr>"
                    + "    <td>" + datRemi[i].INSERTUSRNOM + " " + datRemi[i].INSERTUSRAPE + "</td>"
                    + "    <td>" + datRemi[i].USRNOM + " " + datRemi[i].USRAPE + "</td>"
                    + "    <td>" + datRemi[i].REMFEC + "</td>"
                    + "    <td>" + REMCFR + "</td>"
//                    + "    <td>" + mensaRemi + "</td>"
//                    + "    <td><span class='pictogram mensaje menu-item'></span><p class='det-menu-item'>Mandar Mensaje</p></td>"
                    + "</tr>";
        };
    }
    contenido += ""
            + "    </tbody>"
            + "</table>";
    return contenido;
}

/**************Genera Detalle marginado*****************/
/*=====================================================*/
function genDetMargi(datMargi) {
    //Marginado
    var contenido = ""
            + "<div class='align-center'>"
            +"<br /><br />"
            + "<div id='ver-lista-margi' class='corres-ver' onclick=\"javascript:verList('#tb_marginados','#ver-lista-margi');\"><a class='button link place-right'><span class='mif-expand-less'></span> Ocultar...</a></div>" 
            + "<b>Detalle de marginación</b>"
            +"</div>"
            + "<table class='center' id='tb_marginados'><thead><tr>"
            + "        <td>Detalle</td>"
//            + "        <th style='width:150px;'>Det. envio</th>"
            + "    </tr></thead>"
            + "    <tbody>";

    if (datMargi.length == 0) {
        contenido += "<tr><td colspan='7'>No se ha marginado esta pieza de correspondencia</td></tr>"
    } else {
        for (var i = 0; i < datMargi.length; i++) {

            if (datMargi[i].TIEMPO >= 3) { tiempoMargi = "margi-estado-1"; }
            else if (datMargi[i].TIEMPO > 0 && datMargi[i].TIEMPO < 3) { tiempoMargi = "margi-estado-2"; }
            else if (datMargi[i].TIEMPO <= 0) { tiempoMargi = "margi-estado-3"; }

            switch (datMargi[i].MARGPENDIENTE) {
                case 1:
                    estadoMargi = "margi-estado-0";
                    estadoMargiDsc = "Sin respuesta";
                    break;
                case 2:
                    estadoMargi = "margi-estado-1";
                    estadoMargiDsc = "Contestado";
                    tiempoMargi = "margi-estado-0";
                    break;
            }

            //Boton Eliminar
            var btnsMargi = "";
            if (datMargi[i].INSERTUSRID === $.jCookies({ get: 'USRID' })) {
                btnsMargi = "<button class='btn_borrar square-button mini-button danger place-right' id='margi-delete_" + datMargi[i].MARGID + "' title='Eliminar Marginado' onclick=\"javascript:margiMDL(" + datMargi[i].MARGID + ")\"><span class='mif-cross'></span></button>"
//                    + "<div title='Posponer Marginado' onclick=\"javascript:cargaFrmMargiPos('" + datMargi[i].MARGID + "')\">$</div>"
            }
            
            contenido += ""
                + "<tr>"
                + "<td>"
                //Barra de controles
                + "<div class='bar-control-tabla-det'>"
                + btnsMargi
//                + "     <div title='Modificar Marginado' onclick=\"javascript:cargaFrmMarginar(" + JSON.stringify(datMargi[i]).replace(/"/gi, "\'") + ")\">&</div>"
//                + "     <div title='Reenviar Email'>%</div>"
                + "</div>"
            //***end Barra de controles            
            contenido += ""//<br /><b>Digitadado por: </b>" + datMargi[i].INSERTUSRNOM + " " + datMargi[i].INSERTUSRAPE
                //+ "<br /><b>Marginado por: </b>" + datMargi[i].MARGINADOPOR//INSERTUSRNOM + " " + datMargi[i].INSERTUSRAPE
                + "<br /><b>Marginado por: </b>" + datMargi[i].MARGINADOPOR + " <span style='display:none;' class='txtDigito'>(<b>Digitado por:</b> " + datMargi[i].INSERTUSRNOM + " " + datMargi[i].INSERTUSRAPE + ")</span><button class='square-button mini-button' onclick='javascript:verDigita()'><span class='mif-notification'><span></button>"
                + "<br /><b>Marginado el: </b>" + datMargi[i].MARGFEC
                + "<br /><b>Tiempo respuesta: </b>" + datMargi[i].MARGTIEMPO
                + "<br /><b>Instrucciones: </b>" + datMargi[i].MARGINSTRUCDSC + "<br />" + datMargi[i].MARGMOTIVO

                + "<br /><br /><b class='left'>Estado: " + estadoMargiDsc + "</b>"

            //**Contacos
            contenido += "<br /><br /><table class='tb_involucrados'>"
            + "<tr><td colspan='5'><b>INVOLUCRADOS</b></td></tr>";
            //Lista involucrados
            $.each(datMargi[i].MARGICONT, function (i, e) {
                //determina si ha sido recibido por el marginado "Control de recepcion"
                if (e.MARGRECIBHORA == "") {
                    e.MARGRECIBFEC = "---";
                    e.MARGRECIBHORA = "---";
                    e.MARGRECIBNOMBRE = "---";
                }

                var envioD = "<td></td>";
                if (e.ENVIODIGITAL == 1) { envioD = "<td style='width:50px'><span class='mif-arrow-up-right place-right'></span><span class='mif-mail place-right'></span></td>"; }

                var envioF = "<td colspan='3'><b>Sin envío físico</b></td><td></td>";
                if (e.ENVIOFISICO == 1) {
                    envioF = "<td><b>Fecha recibido: </b>" + e.MARGRECIBFEC + "</td>"
                        + "<td><b>Hora recibido: </b>" + e.MARGRECIBHORA + "</td>"
                        + "<td><b>Recibido por: </b>" + e.MARGRECIBNOMBRE + "</td>"
                        + "<td style='width:10px'>"
                        + "     <div class='bar-control-tabla-det'>"
                        + "         <button class='square-button mini-button info' title='Modificar datos de envío físico' onclick=\"javascript:cargaFrmMargRecibUp(" + JSON.stringify(e).replace(/"/gi, "\'") + ")\"><span class='icon mif-pencil'></span></button>"
                        + "     </div>"
                        + "</td>";
                }

                contenido += "<tr><td colspan='5'><hr>"
                    + e.CONTNOMBRE;
                if (e.TIPOID == 14) {
                    contenido += " | " + e.CONTUNIDAD
                        + " - <b><i>Responsable</i></b><br /></td>"
                        + "</tr>"
                        + "<tr>" + envioF + envioD + "<tr>";
                }
                if (e.TIPOID == 15) {
                    contenido += " | " + e.CONTUNIDAD
                        + " - <b><i>Colaborador</i></b><br /></td>"
                        + "</tr>"
                        + "<tr>" + envioF + envioD + "<tr>";
                }
                if (e.TIPOID == 16) {
                    contenido += " | " + e.CONTUNIDAD
                        + " - <b><i>Informado</i></b><br /></td>"
                        + "</tr>"
                        + "<tr>" + envioF + envioD + "<tr>";
                }
            });
            contenido += "</table>"
                + "</td>"
//                + "    <td><span class='pictogram " + tiempoMargi + " menu-item'></span><p class='det-menu-item'>" + datMargi[i].MARGTIEMPO + "</p></td>"
//                + "    <td><span class='pictogram " + estadoMargi + " menu-item'></span><p class='det-menu-item'>" + estadoMargiDsc + "</p></td>"
//                + "    <td><span class='pictogram mensaje menu-item'></span><p class='det-menu-item'>Mandar Mensaje</p></td>"
                + "</tr>";
        }
    }

    contenido += "</tbody></table>";

    return contenido;
}

/******************Genera Detalle de envio**************/
/*=====================================================*/
function genDetEnvio(datEnviado) {
    //Remitido
    var contenido = ""
            + "<div class='align-center'>"
            +"<br /><br />"
            + "<div id='ver-lista-envi' class='corres-ver' onclick=\"javascript:verList('#tb_envios','#ver-lista-envi');\"><a class='button link place-right'><span class='mif-expand-less'></span> Ocultar...</a></div>" 
            + "<b>Detalle de envío</b>"
            +"</div>"
            + "<table class='center' id='tb_envios'>"
            + "    <thead><tr>"
            + "        <td>Detalle</td>"
            + "    </tr></thead>"
            + "    <tbody>";

    if (datEnviado.length == 0) {
        contenido += "<tr><td>No se ha enviado esta pieza de Correspondencia</td></tr>"
    } else {
        var fechaRec = ""
            , horaRec = ""
            , nomRec = "";
        for (var i = 0; i < datEnviado.length; i++) {
            switch (datEnviado[i].ENVIORECIBFEC) {
                case "01/01/2000":
//                    var //estadoMargi = "margi-estado-0"
//                    , estadoMargiDsc = "Sin Res."
//                    , modificar = "<a href=\"javascript:cargaFormEnviar(" + i + ")\">Modificar</a>" //En CORRESPONDENCIA.js
                    fechaRec = "-----";
                    horaRec = "-----";
                    nomRec = "-----";
                    break;
                default:
//                    var //estadoMargi = "margi-estado-1"
//                    , estadoMargiDsc = "Recibido"
//                    , modificar = ""
                    fechaRec = datEnviado[i].ENVIORECIBFEC;
                    horaRec = datEnviado[i].ENVIORECIBHORA;
                    nomRec = datEnviado[i].ENVIORECIBNOMBRE;
                    break;
            }

            // nombre de Contacto enviado
            var nombre = datEnviado[i].CONTNOMBRE + " | " + datEnviado[i].CONTUNIDAD + " | " + datEnviado[i].CONTINST;

            var envioD = "<td></td>";
            if (datEnviado[i].ENVIODIGITAL == 1) { envioD = "<td style='width:25px'><span class='indicador_mail mif-mail mif-lg'></span></td>"; }

            var envioF = "<td colspan='3'><b>Sin envío Físico</b></td><td></td>";
            if (datEnviado[i].ENVIOFISICO == 1) {
                envioF = "<td><b>Fecha recibido: </b>" + fechaRec + "</td>"
                    + "<td><b>Hora recibido: </b>" + horaRec + "</td>"
                    + "<td><b>Recibido por: </b>" + nomRec + "</td>"
                    + "<td style='width:10px'>"
                    + "     <div class='bar-control-tabla-det'>"
                    + "         <button class='square-button mini-button info' title='Modificar Datos de Envio Físico' onclick=\"javascript:cargaFrmEnvioRecibUp(" + JSON.stringify(datEnviado[i]).replace(/"/gi, "\'") + ")\"><span class='mif-pencil'></span></button>"
                    + "     </div>"
                    + "</td>";
            }

            //Boton Eliminar
            var btnElimEnvi = "";
            if (datEnviado[i].INSERTUSRID === $.jCookies({ get: 'USRID' })) {
                btnElimEnvi = "<button class='btn_borrar square-button mini-button danger fg-white' id='envio-delete_" + datEnviado[i].ENVIAID + "' title='Eliminar Envio' onclick=\"javascript:envioMDL(" + datEnviado[i].ENVIAID + ")\"><span class='mif-cross'></span></button>";
            }

            contenido += "<tr><td>"
                + "<table class='tb_involucrados'>"
                + " <tr>"
                + "     <td><b>Enviado a: </b>" + nombre + "</td>"
                + "     <td><b>Enviado el:  </b>" + datEnviado[i].ENVIOFEC + "</td>"
                + "     <td>"
                + "         <div class='bar-control-tabla-det'>"
                + btnElimEnvi
                + "         </div>"
                + "      </td>"
                + " </tr>"
                + " <tr>"
                + "     <td><b>Motivo: </b>" + datEnviado[i].ENVIOINSTRUCDSC + "</td>"
                + "     <td><b>Enviado por: </b> " + datEnviado[i].INSERTUSRNOM + " " + datEnviado[i].INSERTUSRAPE + "</td>"
                + "     <td></td>"
                + " </tr>"
                + "</table>"
                + "<table class='tb_involucrados'>"
                + " <tr>"
                + envioF + envioD
                + " </tr>"
                + "</table>"
                + "</td></tr>";
        }
    }

    contenido += "</tbody></table>";
    return contenido;
}

/*****************Genera Detalle de Devolución por correcciones*************/
/*=========================================================================*/
function genDetDevCorrec(datDev) {
    var contenido = ""
            + "<div class='align-center'>"
            +"<br /><br />"
            + "<div id='ver-lista-dev' class='corres-ver' onclick=\"javascript:verList('#tb_devoluciones','#ver-lista-dev');\"><a class='button link place-right'><span class='mif-expand-more'></span> Mostrar...</a></div>" 
            +"<b>Detalle de devolución</b>"
            +"</div>"
            + "<table class='center' id='tb_devoluciones' style='display:none;'>"
            + "    <thead><tr>"
            + "        <td>Detalle</td>"
            + "        <td style='width:150px;'></td>"
            + "    </tr></thead>"
            + "    <tbody>";
    if (datDev.length == 0) {
        contenido += "<tr><td colspan='2'>No se ha Devuelto esta pieza de Correspondencia</td></tr>"
    } else {
        for (var i = 0; i < datDev.length; i++) {
            //Datos recibido
            if (datDev[i].CORRESDEB_RECIBHORA == "") {
                datDev[i].CORRESDEB_RECIBFEC = "---";
                datDev[i].CORRESDEB_RECIBHORA = "---";
                datDev[i].UPDATEUSRNOMFULL = "---"
                + "<br /><br /><a href=\"javascript:cargaFormCorresDevUp(" + datDev[i].CORRESDEBID + "," + datDev[i].CORRESID + ")\" class='place-right square-button mini-button info'><span class='mif-pencil'></span></a>";
            }
            
            contenido += "<tr>"
                + "<td>"
                + " <b>Devuelto por: </b>" + datDev[i].INSERTUSRNOMFULL
                + " <br /><b>Fecha Devolución para Corrección: </b>" + datDev[i].CORRESDEBFEC
                + " <br /><b>Descripción/Motivo de la devolución: </b>" + datDev[i].CORRESDEBDSC
                + "</td>"
                + "<td>"
                + " <b>Fecha Recibido: </b>" + datDev[i].CORRESDEB_RECIBFEC
                + " <br /><b>Hora Recibido: </b>" + datDev[i].CORRESDEB_RECIBHORA
                + " <br /><b>Recibido por: </b>" + datDev[i].UPDATEUSRNOMFULL
                + "</td>"
                + "</tr>";
        }
    }
    contenido += "</tbody></table>";

    return contenido;
}

/************ Determina El Estado de la pieza de Correspondencia *************/
function getEstado(item) {
    var datGen = $(item).data("datos").datCorres
    , datMargi = $(item).data("datos").datmargi
    , datRemi = $(item).data("datos").datremi
    , datArchi = $(item).data("datos").datarchi
    , datEnviado = $(item).data("datos").datenvia
    , res = "Registrado";

    if (datMargi.length > 0) {
        res = "Marginado con respuesta";
        for (var i = 0; i < datMargi.length; i++) {
            if (datMargi[i].MARGPENDIENTE == 1) {
                res = "Marginado sin respuesta";
            }
        }
    }

    if (datArchi!=null && datArchi.length > 0) {
        res += " | Archivado";
    }

    if (datGen.REQFIRMA == 1) {
        res += " | Pendiente de Firma";
    } else if (datGen.REQFIRMA == 3) {
        res += " | Firmado";
    }

    if (datEnviado.length > 0) {
        res += " | Enviado"
    }
    return res;
}

function getEstadoList(item){
    var datGen = item.datCorres
    , datMargi = item.datmargi
    , datRemi = item.datremi
    , datArchi = item.datarchi
    , datEnviado = item.datenvia
    , res = "Registrado";

    if (datMargi.length > 0) {
        res = "Marginado con respuesta";
        for (var i = 0; i < datMargi.length; i++) {
            if (datMargi[i].MARGPENDIENTE == 1) {
                res = "Marginado sin respuesta";
            }
        }
    }

    if (datGen.REQFIRMA == 1) {
        res += " | Pendiente de Firma";
    } else if (datGen.REQFIRMA == 3) {
        res += " | Firmado";
    }

    if (datEnviado.length > 0) {
        res += " | Enviado"
    }

    if (datArchi != null && datArchi.length > 0) {
        res += " | Archivado";
    }
    
    //Devuelto por Correcciones
    if (datGen.CORRESDEB == 1) {
        res = "<b>Devuelto por Correcciones</b>";
    }

    return res;
}