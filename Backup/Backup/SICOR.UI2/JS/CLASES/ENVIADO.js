function cargaMotivos() {
    var concat = "";
    if ($.jCookies({ get: 'GRUPO' }) == "1") {
        concat += "<option value='19'>Para su conocimiento</option>"
				+ "<option value='24'>Para su atención</option>"
				+ "<option value='29'>Para su conocimiento y atención</option>"
				+ "<option value='25'>Para su divulgación</option>"
				+ "<option value='20'>Para gestiones pertinentes</option>"
				+ "<option value='22'>Devuelto con firma de Señor Ministro</option>"
				+ "<option value='23'>Devuelto con visto bueno de Señor Ministro</option>"
				+ "<option value='26'>Documento firmado</option>"
				+ "<option value='27'>Asistir a evento</option>"
				+ "<option value='28'>Señor Ministro atenderá audiencia</option>"
				+ "<option value='32'>Proyecto de respuesta</option>"
				+ "<option value='33'>Resguardar copia firmada</option>";
    } else {
        concat += "<option value='53'>Para su conocimiento</option>"
				+ "<option value='58'>Para su atención</option>"
				+ "<option value='63'>Para su conocimiento y atención</option>"
				+ "<option value='59'>Para su divulgación</option>"
				+ "<option value='54'>Para gestiones pertinentes</option>"
				+ "<option value='56'>Devuelto con firma de Viceministra</option>"
				+ "<option value='57'>Devuelto con visto bueno de Viceministra</option>"
				+ "<option value='60'>Documento firmado</option>"
				+ "<option value='61'>Asistir a evento</option>"
				+ "<option value='62'>Viceministra atenderá audiencia</option>"
				+ "<option value='66'>Proyecto de respuesta</option>"
				+ "<option value='67'>Resguardar copia firmada</option>";
    }

    $("#envio_motivo").html(concat);
}

/*======================ENVIADO======================*/
/*================================================================*/
function cargaFormEnviar(enviadoId) {
    var item = $("#lista-item-corres .list.active");
    if (item.length == 0) {
        mError("Debe seleccionar una pieza de correspondencia");
    } else {
        var html = "FRMS/enviadoSV.aspx";
        $("#dialog-modal").fadeIn(function () {
            $("#dialogWin").fadeIn(function () {
                //$("#logoTitulo").addClass("mif-file-text");
                $("#textoTitulo").html("Enviar correspondencia");
                $(".window-content").load(html, function () {
                    //Set CORRESID
                    $("#CORRESID").val($(item).data("datos").datCorres.CORRESID)

                    /*************Set Contactos**********/
                    cargaListaContactos("#CONTID");
                    //Set Dirigido a 
                    $("#CONTID").select2({
                        minimumInputLength: 1
                    }).on('change', function () {
                        verifMailCont(this);
                    });

                    //Bloquea casillas Segunda Fase
                    $("#ENVIORECIBFEC, #ENVIORECIBHORA, #ENVIORECIBNOMBRE ").attr("disabled", "disabled");

                    /*********Datepickers**********/
                    $(function () {
                        $("#ENVIOFEC").datepicker({ dateFormat: "dd/mm/yy" });
                    });
                    $(function () {
                        $("#ENVIORECIBFEC").datepicker({ dateFormat: "dd/mm/yy" });
                    });
                    /*********Timepickers**********/
                    $('#ENVIORECIBHORA').timepicker();

                    //modificar
                    if (enviadoId > -1) {
                        //desbloquea casillas Segunda Fase
                        $("#ENVIORECIBFEC, #ENVIORECIBHORA, #ENVIORECIBNOMBRE").removeAttr("disabled");
                        //Bloquea casillas Primera Fase
                        $("#ENVIOFEC").attr("disabled", "disabled");
                        $("#CONTID").select2("disable");

                        var datEnvia = $("#lista-item-corres .list.active").data("datos").datenvia[enviadoId];
                        cargaForm("#frm_enviado", datEnvia);

                        $("#ENVIORECIBFEC, #ENVIORECIBHORA, #ENVIORECIBNOMBRE").val("").addClass("notNull");

                        //Nose porque pero tube que cargar este dato despues
                        $("#CONTID").ajaxStop(function () { $(this).select2("val", datEnvia.CONTID) })
                    }
                    loadDelay();
                    fijarDivLoad();
                });
            });
        });
    }
}

//Enviado SV
function enviadoSV() {
    if ($("#frm_enviado button.envi-email.active").length > 0 || $("#frm_enviado button.envi-fis.active").length > 0) {
        if (valAdjMail()) {//MARGINADO.js
            if (valForm('#frm_enviado')) {
                $.msgbox("<br /><br /><h1 style='font-size:14px;'>¿Está seguro de querer realizar la acción?</h1>", {
                    type: "confirm",
                    buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
                }, function (result) {
                    if (result == "Si") {
                        var conts = $(".envio_cont");
                        var Datos = "'Datos':["
                        $.each(conts, function (i, e) {
                            Datos += "{"
                        + "'contid':'" + $(e).children("td").children("div.input-control").children("select.cont").val() + "'"
                        + ",'corresid':'" + $("#frm_enviado #CORRESID").val() + "'"
                        + ",'enviofec':'" + $("#frm_enviado #ENVIOFEC").val() + "'"
                        + ",'envioinstruc':'" + $(e).children("td").children("div").children(".envio_motivo").val() + "'"
                        + ",'enviodigital':'" + trueOrFalse($(e).children("td").children("span").children("button.envi-email").hasClass("active")) + "'"
                        + ",'enviofisico':'" + trueOrFalse($(e).children("td").children("span").children("button.envi-fis").hasClass("active")) + "'"
                        + ",'updateusrid':'" + $.jCookies({ get: 'USRID' }) + "'"
                        + "},"
                        });
                        Datos = Datos.substring(0, Datos.length - 1) + "]";

                        $.when(sp_enviadoSVjs(Datos)).then(function (response) {
                            var R = response.d;

                            if (R > 0) {
                                mOk('Datos guardados satisfactoriamente.');

                                //Manda Mensaje a Mail
                                if ($("#frm_enviado button.envi-email.active").length > 0) {
                                    mensajeEXEnvio();
                                } else {
                                    closeWin();
                                }
                                /*Refresca lista de correspndencia*/
                                cargaListCorres();
                                limpiaDet();
                                closeWin();
                            } else { mError(R); }
                        });

                    }
                });
            }
        }
    } else {
        mError("Debe hacer por lo menos un envío físico o por email.");
    }
}

/**********Agrega/Quitar CONTACTO *************/
function agreContEnvio() {
    var conts = $(".envio_cont");
    var contenido = "<tr class='envio_cont' id='envio_" + (conts.length + 1) + "'>"
        + "<td>"
        + "<div class='input-control select'>" + $('#frm_enviado #envio_1 .envio_motivo').parent().html()
        + "</div>"
        + "<input type='text' class='cont_email' style='display:none' placeholder='Email del contacto' />"
        + "</td>"
        + "<td colspan='3'>"
        + " <div class='input-control select' style='width:80%'><select class='cont notNull' id='cont_" + (conts.length + 1) + "' style='width:100%;'>"
        + "   <option value='-1'>Seleccionar</option>"
        + " </select></div>"
        + " <button class='btn_quitaContMargi square-button mini-button'><span class='mif-minus'></span></button>"
        + " <span><button title='Enviar email' class='customCeck envi-email square-button mini-button place-right'><span class='mif-mail'></span></button><span>"
        + " <span><button title='Enviar físico' class='customCeck envi-fis square-button mini-button place-right'><span class='mif-file-text'></span></button><span>"
        + "</td></tr>";

    $(conts[(conts.length - 1)]).after(contenido).end().cargaSelect2T("#cont_" + (conts.length + 1));

    $(".btn_quitaContMargi").click(function () {
        quitaContMargi(this);
    });

    $(".envi-email:not(#margi-envi-email-t), .envi-fis:not(#margi-envi-fis-t)").unbind().bind('click', function () {
        if ($(this).hasClass("active bg-green fg-white")) {
            $(this).removeClass("active bg-green fg-white");
        } else {
            $(this).addClass("active bg-green fg-white");
        }
        if ($(this).hasClass("envi-email")) {
            verifMailCont(this);
        }
    });
}

////Quitar Contacto
//function quitaContMargi(c) {
//    $(c).parent().parent().remove();
//}

//Set select 2
jQuery.fn.cargaSelect2T = function (n) {
    // "n" es el numero identificativo del control
    cargaListaContactos(n)
    $(n).select2({
        minimumInputLength: 1
    }).on('change', function () {
        verifMailCont(this);
    });
    return this;
};

function verifMailCont(t) {
    var select = $(t).parent().parent().parent().find("div select.cont")//$(t).parent().children("div").children("select#CONTID")
    , envioDigital = $(t).parent().parent().parent().children("td").find("button.envi-email");

    if ($(select).val() != "-1") {
        contEmail = _.filter(CONT, function (c) { return c.CONTID == $(select).val() })[0].CONTEMAIL;

        if (contEmail == "" && $(envioDigital).hasClass("active fg-white bg-green")) {
            $(select).parent().parent().parent().children("td").find(".cont_email").addClass('notNull').addClass('email').show();
        } else {
            $(select).parent().parent().parent().children("td").find(".cont_email").removeClass('notNull').removeClass('email').hide();
        }
    }
}

function customChecT_m_Envi() {
    if ($("#margi-envi-email-t").hasClass("active bg-green fg-white")) {
        $("#margi-envi-email-t, .envi-email").removeClass("active bg-green fg-white");
    } else {
        $("#margi-envi-email-t, .envi-email").addClass("active bg-green fg-white");
    }

    $.each($(".envi-email:not(#margi-envi-email-t)"), function (i, e) {
        verifMailCont(e);
    })
}

//MENSAJE EXTERNO (a email)
function mensajeEXEnvio() {
    var remitir = $("#lista-item-corres .list.active input");
    //Involucrados
    var involucrados = $("#frm_enviado table .envio_cont");

    //    var contactos = $("#CONTID").data("datos");
    //    var contacto;
    //    for (var i = 0; i < contactos.length; i++) {
    //        if (
    //            $("#CONTID").val() == contactos[i].CONTID
    //        ) {
    //            contacto = contactos[i];
    //        }
    //    }
    var datCorres = $(remitir[0]).parent().parent().parent(".list").data("datos").datCorres;

    //=======Generea Body del Mensaje==========
    //Nombre remite
    var nombreRemite = "";
    if (datCorres.CONTNOMBRE_REMITE != "") { nombreRemite = datCorres.CONTNOMBRE_REMITE }
    if (datCorres.CONTNOMBRE_REMITE != "" && datCorres.CONTUNIDAD_REMITE != "") { nombreRemite += " | " }
    if (datCorres.CONTUNIDAD_REMITE != "") { nombreRemite += datCorres.CONTUNIDAD_REMITE }
    if (
        datCorres.CONTNOMBRE_REMITE != "" && datCorres.CONTINST_REMITE != ""
        || datCorres.CONTUNIDAD_REMITE != "" && datCorres.CONTINST_REMITE != ""
    ) { nombreRemite += " | " }
    if (datCorres.CONTINST_REMITE != "") { nombreRemite += datCorres.CONTINST_REMITE }

    //Body
    var mensaje = ""
        + "<h2>Notificación de envío</h2><br />"
        + "Atentamente se le informa que se ha enviado una pieza de correspondencia con el siguiente detalle:<br /><br />"
        + "<table style=\"width:100%;\">"
        + " <tr><td style=\"border-top:solid 1px #76AFCC;\"><b>Detalle de correspondencia</b></td></tr>"
        + " <tr>"
        + "     <td style=\"background:#BBD9EA;\">"
        + "         <br /><b>Id: </b>" + datCorres.CORRESID
        + "         <br /><b>Remitente: </b>" + nombreRemite
        + "         <br /><b>Asunto: </b>" + datCorres.ASUNTO
        + "         <br /><b>Fecha de recibido:</b>" + datCorres.NOTARECIBFEC
    //        + "         <br /><b>Fecha Marginado: </b>" + $("#MARGFEC").val() + "<br />"
        + "     </td>"
        + " </tr>"
    //        + " <tr><td style=\"\"><b>Instrucciones</b></td></tr>"
    //        + " <tr>"
    //        + "     <td style=\"background:#BBD9EA;\"><br />"
    //        + $("#MARGMOTIVO").val()
    //        + "         <br /><p class=\"right\"><b>Se espera su respuesta a más tardar:  </b>" + $("#MARGTIEMPO").val() + "</p><br />"
    //        + "     </td>"
    //        + " </tr>"
        + " <tr><td style=\"\"><b>Enviado a</b></td></tr>"
        + " <tr>"
        + "     <td style=\"background:#BBD9EA; border-bottom:solid 1px #76AFCC;\">";

    var colaboradores = ""
    , informados = "";
    $.each(involucrados, function (i, e) {
        var idTr = $(e).attr('id')
        , contNom = $("#" + idTr + " select.cont :selected").text()
        , contMot = $("#" + idTr + " select.envio_motivo :selected").text();


        colaboradores += contNom + " - " + contMot + "<br />";

    });

    mensaje += colaboradores
        + "<br /></td>"
        + " </tr>"
        + "</table>"
        + "Buen día."
        + "<br />Atentamente,<br />"
        + $.jCookies({ get: 'USRNOM' })
        + ""
        ;

    //    $("body").append("<br /><br /><br /><br /><div>"+mensaje+"</div>")
    //=======================================
    //Genera Datos para tabla MENSAJE_EX
    var DatosMensajeEX = "Datos:{"
    + "'MSJEXID':'-1'"
    + ",'CORRESID':'" + datCorres.CORRESID + "'"
    + ",'CONTID':'-1'"
    + ",'TIPOID':'21'"
    + ",'MSJEXMENSAJE':'" + mensaje + "'"
    + ",'UPDATEUSRID':'" + $.jCookies({ get: 'USRID' }) + "'"
    + "}";

    //Genera datos para email
    var mailTo = "[", mailCC = "[]";

    //--Genera CC del correo
    $.each(involucrados, function (j, invo) {

        var idTr = $(invo).attr('id')
            , datCont = _.filter(CONT, function (c) { return c.CONTID == $("#" + idTr + " select.cont").val() })
            , enviEmail = $("#" + idTr + " button.envi-email").hasClass("active");

        if (enviEmail) {
            if (datCont[0].CONTEMAIL == "") {
                var newContEmail = $("#" + idTr + " td input.cont_email").val();
                mailTo += "'" + newContEmail + "',";
                //Actualiza email del contacto
                contactoUpMail(datCont[0].CONTID, newContEmail);
            } else {
                mailTo += "'" + datCont[0].CONTEMAIL + "',";
            }
        }

    });
    if (mailTo != "[") mailTo = mailTo.substring(0, (mailTo.length - 1));
    mailTo += "]";

    var DatosMensajeMail = "mail:{"
    + "'mailFrom':'" + $.jCookies({ get: 'USREMAIL' }) + "'"
    + ",'mailTo':" + mailTo
    + ",'mailCC':" + mailCC
    + ",'mailSubject':'Notificación de envío'"
    + ",'mailBody':'" + mensaje + "'"
    + "}";

    //Genera Paths de documento adjuntos
    var filesPath = "adjuntos:["
    , ajdCheck = $("#frm_enviado #listaAdjuntosMargi .itemAdj input:checked");

    $.each(ajdCheck, function (i, e) {
        PATHADJUNTOS = folder.replace("FRMS", "UPFILE");
        filesPath += "'" + PATHADJUNTOS + "/"
                + $(e).parent().parent().children(".fileName").html()
                + "|"//punto de split - Caracter especia ASCII 127
                + $(e).parent().parent().children(".fileName").html()
                + "',"
    });
    if (filesPath != "adjuntos:[") filesPath = filesPath.substring(0, (filesPath.length - 1));
    filesPath += "]";
    //Envia datos de correo
    $.when(mensaje_exMasMailjs(DatosMensajeEX, DatosMensajeMail, filesPath)).then(function (response) {
        var R = response.d;
        if (R > 0) {
            mOk('Email enviado satisfactoriamente.');
            closeWin();
        } else { mError(R); }
    });
}

/*********************ENVIADO RECIBE UPDATE****************/
//Cargar formulario
function cargaFrmEnvioRecibUp(e) {
    var html = "FRMS/enviadoRecibUpSV.aspx";
    $("#dialog-modal").fadeIn(function () {
        $("#dialogWin").fadeIn(function () {
            //$("#logoTitulo").addClass("mif-file-text");
            subir();
            $("#textoTitulo").html("Enviar correspondencia");
            $(".window-content").load(html, function () {
                /*********Datepickers**********/
                $(function () {
                    $("#ENVIORECIBFEC").datepicker({ dateFormat: "dd/mm/yy" });
                });
                /*********Timepickers**********/
                $('#ENVIORECIBHORA').timepicker();

                //set MARGID
                $("#frm_envioRecibUp button.#btn_margRecibAceptar").on("click",
                    function () {
                        envioRecibUpdate(e.ENVIAID);
                    });

                //Carga datos al formulario
                if (e.ENVIORECIBHORA == "---" || e.ENVIORECIBHORA == "") {
                    e.ENVIORECIBFEC = "";
                    e.ENVIORECIBHORA = "";
                    e.ENVIORECIBNOMBRE = "";
                }
                $("#frm_envioRecibUp #ENVIORECIBFEC").val(e.ENVIORECIBFEC);
                $("#frm_envioRecibUp #ENVIORECIBHORA").val(e.ENVIORECIBHORA);
                $("#frm_envioRecibUp #ENVIORECIBNOMBRE").val(e.ENVIORECIBNOMBRE);
                loadDelay();
                fijarDivLoad();
            });
        });
    });
}

function envioRecibUpdate(enviaid) {
    if (valForm("#frm_envioRecibUp")) {
        $.msgbox("<br /><br /><h1 style='font-size:14px;'>¿Está seguro de querer realizar la acción?</h1>", {
            type: "confirm",
            buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
        }, function (result) {
            if (result == "Si") {
                var recibfec = $("#frm_envioRecibUp #ENVIORECIBFEC").val()
                , recibhora = $("#frm_envioRecibUp #ENVIORECIBHORA").val()
                , recibnombre = $("#frm_envioRecibUp #ENVIORECIBNOMBRE").val()
                , updateusrid = $.jCookies({ get: 'USRID' });

                $.ajax({
                    url: "../WS/ENVIADOws.asmx/sp_enviadoRecibeUpdateSVws",
                    data: "{'enviaid':'" + enviaid
                    + "','recibfec':'" + recibfec
                    + "','recibhora':'" + recibhora
                    + "','recibnombre':'" + recibnombre
                    + "','updateusrid':'" + updateusrid
                    + "'}",
                    success: function (R) {
                        if (R.d > 0) {
                            mOk('Datos guardados satisfactoriamente.');
                            closeWin();
                            /*Refresca lista de correspndencia*/
                            cargaListCorres();
                            limpiaDet();
                        } else { mError(R.d); }
                    }
                });
            }
        });
    }
}

//Envio MDelete
function envioMDL(enviaid) {
    $.msgbox("<br /><br /><h1 style='font-size:14px;'>Los datos del marginado serán eliminados."
        + "<br />Esta seguro de querer continuar?</h1>", {
            type: "alert",
            buttons: [
            { type: "submit", value: "Si" },
            { type: "submit", value: "No" }
            ]
        }, function (result) {
            if (result == "Si") {

                $.ajax({
                    url: "../WS/ENVIADOws.asmx/sp_enviadoMDLws",
                    data: "{'enviaid':'" + enviaid + "'"
                + ", 'updateusrid' : '" + $.jCookies({ get: 'USRID' }) + "'"
                + "}",
                    success: function (R) {
                        if (R.d > 0) {
                            mOk('Dato eliminado satisfactoriamente.');

                            /*Refresca lista de correspndencia*/
                            cargaListCorres();
                            limpiaDet();
                        } else { mError(R.d); }
                    }
                });
            }
        });
}