/***********Carga form mensaje interno*******/
function cargaFrmMensajeInt(tipo) {
    var html = "FRMS/mensajesInternosSV.aspx";

    $.lightbox(html, {
        'onOpen': function () {

            if (tipo == 1) {
                var contenido = "";
                var datGen = $("#lista-item-corres li.active").data("datos").datCorres;
                var datRemi = $("#lista-item-corres li.active").data("datos").datremi;

                //remite
                var remite = "";
                if (datGen.CONTNOMBRE_REMITE != "") { remite = datGen.CONTNOMBRE_REMITE; }
                else if (datGen.CONTUNIDAD_REMITE != "") { remite = datGen.CONTUNIDAD_REMITE; }
                else if (datGen.CONTINST_REMITE != "") { remite = datGen.CONTINST_REMITE; }

                contenido = "<b>Solicitud de información de pieza remitida el " + datRemi[0].REMFEC + "</b>"
                + "<br /><br /><b>Id:</b> " + datGen.CORRESID
                + "<br /><b>Remitente:</b> " + remite
                + "<br /><b>Fecha Recibido:</b> " + datGen.NOTARECIBFEC
                + "<br /><b>Asunto:</b> " + datGen.ASUNTO;

                $("#msj_asunto").css('display', 'none');
                $("#p_asunto").html(contenido);

                if (tipo == 1) {
                    $("#msj_mensaje").addClass("notNull");
                    $("#btn_ok").attr('href', 'javascript:mensajeInternoSV(1)');
                } else {
                    $("#msj_asunto").addClass("notNull");
                    $("#msj_mensaje").addClass("notNull");
                    $("#btn_ok").attr('href', 'javascript:mensajeInternoSV(2)');
                }
            }
        },
        width: 500,
        height: 350
    });
}

/******MENSAJE INTERNO SV************/
function mensajeInternoSV(tipo) {
    if (valForm("#frm_mensajesInternos")) {
        $.msgbox("<br /><br /><h1 style='font-size:14px;'>Confirmar solicitud</h1>", {
            type: "confirm",
            buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
        }, function (result) {
            var datGen = $("#lista-item-corres li.active").data("datos").datCorres
            , usrDirijidoId = $("#lista-item-corres li.active").data("datos").datremi[0].CLM_USRS_ID;

            var mensaje = "";
            if (tipo == 1) {
                mensaje = "<b>Asunto: </b><br />"
                    + $("#p_asunto").html()
                    + "<br /><br /><b>Mensaje: </b><br />"
                    + $("#msj_mensaje").val();
            } else {
                mensaje = "<b>Asunto: </b><br />"
                    + $("#msj_asunto").val()
                    + "<br /><br /><b>Mensaje: </b><br />"
                    + $("#msj_mensaje").val();
            }
            
            var Datos = "Datos:{"
                    + "'MSJINID':'-1'"
                    + ",'CORRESID':'"+datGen.CORRESID+"'"
                    + ",'CLM_USRS_ID':'"+usrDirijidoId+"'"
                    + ",'TIPOID':'11'"
                    + ",'MSJINMENSAJE':'" + mensaje + "'"
                    + ",'UPDATEUSRID':'" + $.jCookies({ get: 'USRID' }) + "'"
                    + "}";

            $.when(sp_mensaje_inSVjs(Datos)).then(function (response) {
                var R = response.d;

                if (R > 0) {
                    mOk('Mensaje Enviado Satisfactoriamente.');
                    closeWin();
                } else { mError(R); }
            });  
        });
    }
}

/**************Carga mensajes resiBidos no leidos**********/
function cargaMsjRecSinLeer() {
    var clm_usrs_id = $.jCookies({ get: 'USRID' });
    $.when(sp_mensajeRecib_inGTjs(clm_usrs_id)).then(function (response) {
        var R = response.d;

        $("#tabs-1").html("");
        $("#tabs-1").html(cargaListMensajeIn(R, "tb_recibSinLeer"));
        if (R.length > 0) {
            $("#tabs-2").ajaxStop(function () {
                $("#tb_recibSinLeer").dataTable({
                    "bPaginate": true,
                    "bLengthChange": false,
                    "bFilter": true,
                    "bSort": true,
                    "bInfo": false,
                    "bAutoWidth": false
                });
            });
        }
    });
}

//function cargaMsjEnviSinLeer() {
//    var clm_usrs_id = $.jCookies({ get: 'USRID' });
//    $.when(sp_mensajeEnvi_inGTjs(clm_usrs_id)).then(function (response) {
//        var R = response.d;

//        $("#tabs-2").html(cargaListMensajeIn(R, "tb_enviSinLeer"));
//        if (R.length > 0) {
//            $("#tabs-2").ajaxStop(function () {
//                $("#tb_enviSinLeer").dataTable({
//                    "bPaginate": true,
//                    "bLengthChange": false,
//                    "bFilter": true,
//                    "bSort": true,
//                    "bInfo": false,
//                    "bAutoWidth": false
//                });
//            });
//        }
//    });
//}

// Búsqueda por fecha
function cargaMsjResBusqueda() {
    if (valForm("#tabs-2")) {

        var clm_usrs_id = $.jCookies({ get: 'USRID' })
        , FECH01 = $("#FECH01").val()
        , FECH02 = $("#FECH02").val();
        $.when(sp_mensajeByIdFech_inGTjs(clm_usrs_id, FECH01, FECH02)).then(function (response) {
            var R = response.d;
            $("#res_busqueda").html("");
            $("#res_busqueda").html(cargaListMensajeIn(R, "tb_busqueda"));
            if (R.length > 0) {
                $("#res_busqueda").ajaxStop(function () {
                    if ($("#tb_busqueda_wrapper").length == 0) {
                        $("#tb_busqueda").dataTable({
                            "bPaginate": true,
                            "bLengthChange": false,
                            "bFilter": true,
                            "bSort": true,
                            "bInfo": false,
                            "bAutoWidth": false
                        });
                    }
                });
            }
        });
    }
}

function cargaListMensajeIn(R, table) {
    var contenido = "";
    if (R.length > 0) {
        contenido = "<table class='center tb_01' id='"+table+"'>"
        + "<thead>"
        + "     <tr>"
        + "         <td><b>De</b></td>"
        + "         <td><b>Para</b></td>"
        + "         <td><b>Contenido</b></td>"
        + "         <td><b>Fecha Mensaje</b></td>"
        + "         <td><b>Estado</b></td>"
        + "     </tr>"
        + "</thead>"
        + "<tbody>";

        for (var i = 0; i < R.length; i++) {

            if (R[i].MSJINLEIDO == 1) { leido = "Leido"; }
            else if (R[i].MSJINLEIDO == 2) { leido = "No Leido"; }

            contenido += "<tr>"
            + "     <td>" + R[i].USRENVIA_NOM + " " + R[i].USRENVIA_APE + "</td>"
            + "     <td>" + R[i].USRRECIBE_NOM + " " + R[i].USRRECIBE_APE + "</td>"
            + "     <td>" + R[i].MSJINMENSAJE + "</td>"
            + "     <td>" + R[i].INSERTFEC + "</td>"
            + "     <td>" + leido + "</td>"
            + "</tr>";
        }

        contenido += "</tbody>"
        + "</table>";
    } else {
        contenido = "<h3>No hay resultado para la consulta.</h3>";
    }

    return contenido;
}

// Actualiza estado Leido
function upMsjEstado() {
    var clm_usrs_id = $.jCookies({ get: 'USRID' });
    $.when(sp_mensajeUpLeido_inGTjs(clm_usrs_id)).then(function (response) {
        var R = response.d;
    });
}

//Notificacion cantidad nuevos mensajes
function notNumMsj() {
    var clm_usrs_id = $.jCookies({ get: 'USRID' });
    $.when(sp_mensajeRecibNum_inGTjs(clm_usrs_id)).then(function (response) {
        var R = response.d;

        var numMen = "";
        if (R[0].MSJNOLEIDO_NUM > 0) { numMen = "Mensajes " + R[0].MSJNOLEIDO_NUM; }
        else { numMen = "Mensajes"; }

        $("#bandejaMensajes p").html(numMen);
    });
}