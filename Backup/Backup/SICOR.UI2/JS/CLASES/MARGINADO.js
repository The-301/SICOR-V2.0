//var PATHADJUNTOS = "E:/NUEVO DESARROLLO/SICORv2/SICOR/SICOR.UI2/PAGS/UPFILE/storage";
var PATHADJUNTOS = "";

/*****Carga formulario de marginación*****/
function cargaFrmMarginar(m) {
    permite = true;

    if (m === undefined) {
        //var lista = $("#lista-item-corres .list input:checked");
        var lista = $("#lista-item-corres .list label input:checked");
        if (lista.length == 0) {
            permite = false;
            mError("Seleccione una pieza de correspondencia.");
        } else {
            if (lista.length > 1) {
                permite = false;
                mError("Solo se permite marginar una pieza a la vez.");
            } else if ($(lista[0]).parent().parent().parent(".list").data("datos").datCorres.CATEGOID != 1) {
                permite = false;
                mError("Solo se permite marginar correspondencia");
            }
        }
    } else {
        var lista = $("#lista-item-corres .list.active input");
    }
    
    if (permite) {
        var html = "FRMS/marginadoSV.aspx";
        $("#dialog-modal").fadeIn(function () {
            $("#dialogWin").fadeIn(function () {
                $("#logoTitulo").addClass("icon mif-map");
                $("#textoTitulo").html("Marginar correspondencia");
                $(".window-content").load(html, function () {
                    /*Carga listado correspondencia*/
                    $("#frm_marginado div.detalle-margi-corres").html(cargaLista(lista)); //en REMITIR.js

                    //Set corresid
                    var datGen = $(lista[0]).parent().parent().parent(".list").data("datos").datCorres;
                    $("#frm_marginado #corresid").val(datGen.CORRESID)

                    //Set Contactos
                    cargaListaContactosInternos("#CONTID");
                    $("#CONTID").select2({
                        minimumInputLength: 1
                    });

                    /*********Datepickers**********/
                    $(function () {
                        $("#MARGFEC").datepicker({ dateFormat: "dd/mm/yy" });
                    });
                    $(function () {
                        $("#MARGTIEMPO").datepicker({ dateFormat: "dd/mm/yy" });
                    });

                    //activa SELECT "Adjuntar Archivos"
                    //                    $("#ENVIAEMAIL").change(function () {
                    //                        if ($("#ENVIAEMAIL").val() == "2") {
                    //                            $("#SL_ADJUNTAR").val("2")
                    //                            $("#SL_ADJUNTAR").attr("disabled", true);
                    //                            $("#listaAdjuntosMargi").slideUp();
                    //                        } else {
                    //                            $("#SL_ADJUNTAR").attr("disabled", false);
                    //                        }
                    //                    });

                    //Carga lista de adjuntos
                    $("#SL_ADJUNTAR").change(function () { cargaListAdjMargi(); });

                    //                    //Carga datos si es modificacion
                    //                    if (m != undefined) {
                    //                        cargaDatMargiMod(m);
                    //                    }

                    //cargaListaUsuarios();

                    loadDelay();
                    fijarDivLoad();
                });
            });
        });
    }
}

//cargadatos a modificar
//function cargaDatMargiMod(m) {
//    console.log(m)
//    $("#frm_marginado #margid").val(m.MARGID)
//    $("#frm_marginado #MARGFEC").val(m.MARGFEC)
//    $("#frm_marginado #MARGTIEMPO").val(m.MARGTIEMPO)
//    $("#frm_marginado #MARGMOTIVO").val(m.MARGMOTIVO)
//    $("#frm_marginado #margintruc").val(m.MARGINSTRUC)
//}

/******Marginar SV***************/
function marginarSV() {
    if ($("#frm_marginado button.envi-email.active").length > 0 || $("#frm_marginado button.envi-fis.active").length > 0) {
        if (valForm("#frm_marginado")) {
            if (valAdjMail()) {
                $.msgbox("<br /><br /><h1 style='font-size:14px;'>¿Está seguro de querer realizar la acción?</h1>", {
                    type: "confirm",
                    buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
                }, function (result) {
                    if (result == "Si") {
                        //========Genera lista datos generales del marginado=======
                        var Datos = "Datos:{"
                        + "'margid':'" + $("#frm_marginado #margid").val() + "'"
                        + ",'corresid':'" + $("#frm_marginado #corresid").val() + "'"
                        + ",'margfec':'" + $("#frm_marginado #MARGFEC").val() + "'"
                        + ",'margtiempo':'" + $("#frm_marginado #MARGTIEMPO").val() + "'"
                        + ",'margmotivo':'" + $("#frm_marginado #MARGMOTIVO").val() + "'"
                        + ",'margintruc':'" + $("#frm_marginado #margintruc").val() + "'"
                        + ",'marginadopor':'" + $("#frm_marginado #marginadopor").val() + "'"
                        + ",'updateusrid':'" + $.jCookies({ get: 'USRID' }) + "'"
                        + "}";

                        //========Genera lista de contactos parte del marginación=======
                        var margiCont = "margiCont:["//Valores concatenados a enviar
                            + "{'contid':'" + $("#CONTID").val() + "'"
                            + ",'tipoid':'14'"//TIPOID Responsable
                            + ",'enviofisico':" + trueOrFalse($("#tr_responsable button.envi-fis").hasClass("active")) + ""
                            + ",'enviodigital':" + trueOrFalse($("#tr_responsable button.envi-email").hasClass("active")) + ""
                            + ",'updateusrid':'" + $.jCookies({ get: 'USRID' }) + "'},";

                        var contMargi_Adicionales = $("#frm_marginado table .tr_contMargi"); //Lista de Contactos Adicionales "Colaboradores y Informados"
                        var idTr = "";
                        for (var j = 0; j < contMargi_Adicionales.length; j++) {
                            idTr = $(contMargi_Adicionales[j]).attr('id');
                            margiCont += "{"
                            + "'contid':'" + $("#" + idTr + " select.contMargi").val() + "'"
                            + ",'tipoid':'" + $("#" + idTr + " select.tip_contMargi").val() + "'"
                            + ",'enviofisico':" + trueOrFalse($("#" + idTr + " button.envi-fis").hasClass("active")) + ""
                            + ",'enviodigital':" + trueOrFalse($("#" + idTr + " button.envi-email").hasClass("active")) + ""
                            + ",'updateusrid':'" + $.jCookies({ get: 'USRID' }) + "'"
                            + "},";
                        }
                        margiCont = margiCont.substring(0, margiCont.length - 1) + "]";

                        $.ajax({
                            url: "../WS/MARGINADOws.asmx/marginadoSVws",
                            data: "{" + Datos + "," + margiCont + "}",
                            success: function (R) {
                                if (R.d > 0) {
                                    mOk('Datos guardados satisfactoriamente.');

                                    //Manda Mensaje a Mail
                                    if ($(".envi-email.active").length > 0) {
                                        mensajeEX();
                                    }
                                    /*Refresca lista de correspndencia*/
                                    cargaListCorres();
                                    limpiaDet();
                                    closeWin();
                                } else { mError(R.d); }
                            }
                        });
                    }
                });

            }
        }
    } else {
         mError("Debe hacer por lo menos un envío físico o por email.");
    }
}


//MENSAJE EXTERNO (a email)
function mensajeEX() {
    var remitir = $("#lista-item-corres .list label input:checked");
    //Involucrados
    var involucrados = $("#frm_marginado table .tr_contMargi");

    var contactos = $("#CONTID").data("datos");
    var contacto;
    for (var i = 0; i < contactos.length; i++) { 
        if(
            $("#CONTID").val() == contactos[i].CONTID
        ) {
            contacto = contactos[i];
        }
    }
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
        + "<h2>Notificación de marginación</h2><br />"
        + "Atentamente se le informa que se ha marginado una pieza de correspondencia con el siguiente detalle:<br /><br />"
        + "<table style=\"width:100%;\">"
        + " <tr><td style=\"border-top:solid 1px #76AFCC;\"><b>Detalle de correspondencia</b></td></tr>"
        + " <tr>"
        + "     <td style=\"background:#BBD9EA;\">"
        + "         <br /><b>Id: </b>" + datCorres.CORRESID
        + "         <br /><b>Remitente: </b>" + nombreRemite
        + "         <br /><b>Asunto: </b>" + datCorres.ASUNTO
        + "         <br /><b>Fecha de recibido:</b>" + datCorres.NOTARECIBFEC
        + "         <br /><b>Fecha marginado: </b>" + $("#MARGFEC").val() + "<br />"
        + "     </td>"
        + " </tr>"
        + " <tr><td style=\"\"><b>Instrucciones</b></td></tr>"
        + " <tr>"
        + "     <td style=\"background:#BBD9EA;\"><br />"
        +           $("#MARGMOTIVO").val()
        + "         <br /><p class=\"right\"><b>Se espera su respuesta a más tardar:  </b>" + $("#MARGTIEMPO").val() + "</p><br />"
        + "     </td>"
        + " </tr>"
        + " <tr><td style=\"\"><b>Involucrados - Roles</b></td></tr>"
        + " <tr>"
        + "     <td style=\"background:#BBD9EA; border-bottom:solid 1px #76AFCC;\">";

    var colaboradores = ""
    , informados = "";
    $.each(involucrados, function (i, e) {
        var idTr = $(e).attr('id')
        , contNom = $("#" + idTr + " select.contMargi :selected").text()
        , contTip = $("#" + idTr + " select.tip_contMargi").val();

        if (contTip == 15) {
            colaboradores += contNom + " - Colaborador<br />";
        } else if (contTip == 16) {
            informados += contNom + " - Informado<br />";
        }
    });

    mensaje += "<br />" + contacto.CONTNOMBRE + " - Responsable<br />"
        + colaboradores
        + informados
        + "<br /></td>"
        + " </tr>"
        + "</table>"
        + "Buen día."
        + "<br />Atentamente,<br />"
        + $.jCookies({ get: 'USRNOM' })
        +""
        ;

    //=======================================
    //Genera Datos para tabla MENSAJE_EX
    var DatosMensajeEX = "Datos:{"
    + "'MSJEXID':'-1'"
    + ",'CORRESID':'" + datCorres.CORRESID + "'"
    + ",'CONTID':'" + contacto.CONTID + "'"
    + ",'TIPOID':'13'"
    + ",'MSJEXMENSAJE':'" + mensaje + "'"
    + ",'UPDATEUSRID':'" + $.jCookies({ get: 'USRID' }) + "'"
    + "}";

    //Genera datos para email
    var mailTo = "[", mailCC = "[";
    //---Extrae     responsable
    mailTo += "'" + contacto.CONTEMAIL + "']";
    //--Genera CC del correo
    $.each(contactos, function (i, con) {
        $.each(involucrados, function (j, invo) {
           
            var idTr = $(invo).attr('id')
            , contId = $("#" + idTr + " select.contMargi").val()
            , contTip = $("#" + idTr + " select.tip_contMargi").val()
            , enviEmail = $("#" + idTr + " button.envi-email").hasClass("active");

            if (contId == con.CONTID && enviEmail) {
                mailCC += "'" + con.CONTEMAIL + "',";
            }
        });
    });
    if (mailCC != "[") mailCC = mailCC.substring(0, (mailCC.length - 1));
    mailCC += "]"; 
    
    var DatosMensajeMail = "mail:{"
    + "'mailFrom':'" + $.jCookies({ get: 'USREMAIL' }) + "'"
    + ",'mailTo':" + mailTo
    + ",'mailCC':" + mailCC 
    + ",'mailSubject':'Notificación de marginación'"
    + ",'mailBody':'" + mensaje + "'"
    + "}";

    //Genera Paths de documento adjuntos
    var filesPath = "adjuntos:["
    , ajdCheck = $("#frm_marginado #listaAdjuntosMargi .itemAdj input:checked");
    //, ajdCheck = $("#frm_marginado #listaAdjuntosMargi .itemAdj label input:checked");

    $.each(ajdCheck, function (i, e) {
        PATHADJUNTOS = folder.replace("FRMS","UPFILE");
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

/**************************************************************************/
/**********************Cargar Lista de Marginados*************************/
/*************************************************************************/
function cargarListMargi(div, edit) {
    var items = $("#lista-item-corres .list")
    , datGen = ""
    , datMargi = ""
    , cuentaMargi = 0
    , contenido = ""
    , nomRemitente = ""
    , nomResponsable = "";

    contenido = ""
            + "<table class='center'><thead><tr>"
            + "        <td>ID</td>"
            + "        <td>Detalle de marginado</td>"
            + "        <td></td>"
            + "    </tr></thead>"
            + "    <tbody>";

    for (var i = 0; i < items.length; i++) {
        datMargi = $(items[i]).data("datos").datmargi;
        if (datMargi.length > 0) {
            datGen = $(items[i]).data("datos").datCorres;
            console.log(datGen);
            for (var j = 0; j < datMargi.length; j++) {
                
                if (datMargi[j].MARGPENDIENTE == 1) {

                    //Nombre Remitente de la Carrespondencia
                    var nomRemitente = "";
                    if (datGen.CONTNOMBRE_REMITE != "") { nomRemitente = datGen.CONTNOMBRE_REMITE; }
                    if (datGen.CONTNOMBRE_REMITE != "" && datGen.CONTUNIDAD_REMITE != "") { nomRemitente += " | "; }
                    if (datGen.CONTUNIDAD_REMITE != "") { nomRemitente += datGen.CONTUNIDAD_REMITE; }

                    //nombre del responsable de la respuesta al marginado
                    var nomResponsable = "";
                    for (var l = 0; l < datMargi[j].MARGICONT.length; l++) {
                        if (datMargi[j].MARGICONT[l].TIPOID == 14) {
                            nomResponsable = datMargi[j].MARGICONT[l].CONTNOMBRE
                            + " | " + datMargi[j].MARGICONT[l].CONTUNIDAD
                            + " | " + datMargi[j].MARGICONT[l].CONTINST
                        }
                    }

                    contenido += ""
                            + "<tr>"
                            + "<td>"+datGen.CORRESID+"</td>"
                            + "<td>"
                            + "<b>Marginado a: </b>" + nomResponsable
                    //+ "<br /><b>Marginado por: </b>" +datMargi[j].MARGINADOPOR+ " (<b>Digitado por: </b>"+ datMargi[j].INSERTUSRNOM + " " + datMargi[j].INSERTUSRAPE+")"
                            + "<br /><b>Marginado por: </b>" + datMargi[j].MARGINADOPOR + " (<b>Digitado por: </b>" + datMargi[j].INSERTUSRNOM + " " + datMargi[j].INSERTUSRAPE + ")"
                            + "<br /><b>Marginado el: </b>" + datMargi[j].MARGFEC
                            + "<br /><b>Tiempo respuesta: </b>" + datMargi[j].MARGTIEMPO
                            + "<br /><b>Instrucciones: </b>" + datMargi[j].MARGINSTRUCDSC + "<br />" + datMargi[j].MARGMOTIVO
                            + "<br /><br /><u><b>Remitente: </b>" + datGen.CONTNOMBRE_REMITE
                            + " | " + datGen.CONTUNIDAD_REMITE
                            + " | " + datGen.CONTINST_REMITE + "</u>"
                            + "<br /><b>Asunto: </b>" + datGen.ASUNTO
                            + "</td>"
                            + "     <td>"
                            + "        <input type='radio' name='MARGINAID' id='MARGINAID' value='" + datMargi[j].MARGID + "' class='notNull'>"
                            + "        <input type='hidden' id='CONTESTA_" + datMargi[j].MARGID + "' class='' value='" + datGen.CORRESID + "'>"
                            + "     </td>"
                            + "</tr>";

                    cuentaMargi++;
                   
                }
            }
        }
        
    }

    /*****SI ES MODIFICACIÓN**********/
    if (edit) {
        var margiMod = $("#lista-item-corres .list.active");
        var datGenM = $(margiMod).data("datos").datCorres;
        var datMargi = $("#corres_" + datGenM.CORRESID_CONTESTA).data("datos").datmargi;
        var datGen = $("#corres_" + datGenM.CORRESID_CONTESTA).data("datos").datCorres;
        for (var k = 0; k < datMargi.length; k++) {

            if (datGenM.MARGINAID == datMargi[k].MARGID) {

                //Nombre Remitente de la Carrespondencia
                nomRemitente = "";
                if (datGen.CONTNOMBRE_REMITE != "") { nomRemitente = datGen.CONTNOMBRE_REMITE; }
                if (datGen.CONTNOMBRE_REMITE != "" && datGen.CONTUNIDAD_REMITE != "") { nomRemitente += " | "; }
                if (datGen.CONTUNIDAD_REMITE != "") { nomRemitente += datGen.CONTUNIDAD_REMITE; }

                //nombre del responsable de la respuesta al marginado
                nomResponsable = "";
                for (var l = 0; l < datMargi[k].MARGICONT.length; l++) {
                    if (datMargi[k].MARGICONT[l].TIPOID == 14) {
                        nomResponsable = datMargi[k].MARGICONT[l].CONTNOMBRE
                            + " | " + datMargi[k].MARGICONT[l].CONTUNIDAD
                            + " | " + datMargi[k].MARGICONT[l].CONTINST
                    }
                }

                contenido += ""
                            + "<tr>"
                            + "<td>" + datGen.CORRESID + "</td>"
                            + "<td>"
                            + "<b>Marginado a: </b>" + nomResponsable
                            //+ "<br /><b>Marginado por: </b>" + datMargi[k].INSERTUSRNOM + " " + datMargi[k].INSERTUSRAPE
                            //+ "<br /><b>Marginado por: </b>" + datMargi[j].MARGINADOPOR + " (<b>Digitado por: </b>" + datMargi[j].INSERTUSRNOM + " " + datMargi[j].INSERTUSRAPE + ")"
                            + "<br /><b>Marginado por: </b>" + datMargi.MARGINADOPOR + " <span style='display:none;' class='txtDigito'>(<b>Digitado por:</b> " + datMargi.INSERTUSRNOM + " " + datMargi.INSERTUSRAPE + ")</span><button class='square-button mini-button' onclick='javascript:verDigita()'><span class='mif-notification'><span></button>"
                            + "<br /><b>Marginado el: </b>" + datMargi[k].MARGFEC
                            + "<br /><b>Tiempo respuesta: </b>" + datMargi[k].MARGTIEMPO
                            + "<br /><b>Instrucciones: </b>" + datMargi[k].MARGINSTRUCDSC + "<br />" + datMargi[k].MARGMOTIVO
                            + "<br /><br /><u><b>Remitente: </b>" + datGen.CONTNOMBRE_REMITE
                            + " | " + datGen.CONTUNIDAD_REMITE
                            + " | " + datGen.CONTINST_REMITE + "</u>"
                            + "<br /><b>Asunto: </b>" + datGen.ASUNTO
                            + "</td>"
                            + "     <td>"
                            + "        <input type='radio' name='MARGINAID' id='MARGINAID' value='" + datMargi[k].MARGID + "' class='notNull'>"
                            + "        <input type='hidden' id='CONTESTA_" + datMargi[k].MARGID + "' class='' value='" + datGen.CORRESID + "'>"
                            + "     </td>"
                            + "</tr>";

                cuentaMargi++;
            }
        }
    }

    /**************Final**********/
    if (cuentaMargi > 0) {
        contenido += ""
            + "    </tbody>"
            + "</table>";
        $(div).html(contenido);
    } else {
        contenido += "<tr><td>No se encontró marginaciones pendientes en el sistema.</td><td></td><td></td></tr>"
            + "    </tbody>"
            + "</table>";
        $(div).html(contenido);
    }
}

/**********Agrega/Quitar CONTACTO a Form de marginación*************/
function agreContMargi() {
    var contMargi = $(".tr_contMargi");
    var cont = "<tr class='tr_contMargi' id='tr_contMargi_" + (contMargi.length + 1) + "'>"
        + " <td>"
        + " <div class='input-control select'><select class='tip_contMargi'>"
        + "     <option value='15'>Colaborador</option>"
        + "     <option value='16'>Informado</option>"
        + " </select></div>"
        + " </td>"
        + " <td colspan='3'>"
        + " <div class='input-control select' style='width:75%'><select class='contMargi notNull' id='contMargi_" + (contMargi.length + 1) + "' style='width:100%;'>"
        + " </select></div>"        
        + " <button class='btn_quitaContMargi square-button mini-button'><span class='mif-minus'></span></button>"
        + " <span><button title='Enviar email' class='customCeck envi-email square-button mini-button place-right'><span class='mif-mail'></span></button></span>"
        + " <span><button title='Enviar físico' class='customCeck envi-fis square-button mini-button place-right'><span class='mif-file-text'></span></button></span>"
        + " </td></tr>";

    $("#tr_responsable").after(cont).end().cargaSelect2("#contMargi_" + (contMargi.length + 1))

    $(".btn_quitaContMargi").button({
        icons: {
            primary: "ui-icon-minusthick"
        },
        text: false
    }).click(function () {
        quitaContMargi(this);
    });

    $(".envi-email:not(#margi-envi-email-t), .envi-fis:not(#margi-envi-fis-t)").unbind().bind('click', function () {
        if ($(this).hasClass("active fg-white bg-green")) {
            $(this).removeClass("active fg-white bg-green");
        } else {
            $(this).addClass("active fg-white bg-green");
        }

    });
}
//Quitar Contacto
function quitaContMargi(c) {
    $(c).parent().parent().remove();
}

//Set select 2
jQuery.fn.cargaSelect2 = function (n) {
    // "n" es el numero identificativo del control
    cargaListaContactosInternos(n)
    $(n).select2({
        minimumInputLength: 1
    });
    return this;
};

/*********************MARGINAD RECIBE UPDATE****************/
//Cargar formulario
function cargaFrmMargRecibUp(e) {
    var html = "FRMS/margRecibUpSV.aspx";
    $("#dialog-modal").fadeIn(function () {
        $("#dialogWin").fadeIn(function () {
            //$("#logoTitulo").addClass("icon mif-file-empty");
            $("#textoTitulo").html("Recepción de correspondencia devuelta");
            $(".window-content").load(html, function () {
                /*********Datepickers**********/
                $(function () {
                    $("#MARGRECIBFEC").datepicker({ dateFormat: "dd/mm/yy" });
                });
                /*********Timepickers**********/
                $('#MARGRECIBHORA').timepicker();

                //set MARGID
                $("#frm_margRecibUp button.#btn_margRecibAceptar").on("click", function(){ margiRecibUpdate(e.MARGICONTID) })

                //Carga datos al formulario
                if (e.MARGRECIBHORA == "---") {
                    e.MARGRECIBFEC = "";
                    e.MARGRECIBHORA = "";
                    e.MARGRECIBNOMBRE = "";
                }
                $("#frm_margRecibUp #MARGRECIBFEC").val(e.MARGRECIBFEC);
                $("#frm_margRecibUp #MARGRECIBHORA").val(e.MARGRECIBHORA);
                $("#frm_margRecibUp #MARGRECIBNOMBRE").val(e.MARGRECIBNOMBRE);
                loadDelay();
                fijarDivLoad();                
            });    
        });
    });
}

function margiRecibUpdate(margcontid) {
    if (valForm("#frm_margRecibUp")) {
        $.msgbox("<br /><br /><h1 style='font-size:14px;'>¿Está seguro de querer realizar la acción?</h1>", {
            type: "confirm",
            buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
        }, function (result) {
            if (result == "Si") {
                var recibfec = $("#frm_margRecibUp #MARGRECIBFEC").val()
                , recibhora = $("#frm_margRecibUp #MARGRECIBHORA").val()
                , recibnombre = $("#frm_margRecibUp #MARGRECIBNOMBRE").val()
                , updateusrid = $.jCookies({ get: 'USRID' });
                
                $.ajax({
                    url: "../WS/MARGINADOws.asmx/sp_marginaRecibeUpdateSVws",
                    data: "{'margcontid':'" + margcontid
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

//Catga Lista de los adjunto al documento que se margina
function cargaListAdjMargi() {
    if ($("#SL_ADJUNTAR").val() == "1") {
        if ($("#listaAdjuntosMargi").html() == "") {
            var tieneAdjunto = $("#lista-item-corres .list.active input").parent().parent().parent().find("span.mif-attachment").length;
            if (tieneAdjunto > 0) {
                var idoc = "IDOC_" + $("#lista-item-corres .list.active input").parent().parent().parent().data("datos").datCorres.CORRESID
                , cont = ""
                        + "<table style='width:100%;'>"
                        /*+ " <tr>"
                        + "     <td colspan='2'><b>Archivos a adjuntar 1</b></td>"
                        + "</tr>"*/
                    , hay = false;

                    //Genera lista de archivo adjuntos
                    var R = $("#lista-item-corres .list.active input").parent().parent().parent().data("datos").datfile;
                    $.each(R, function (i, e) {
                        if (e.ADJUNTO_NAME.indexOf(idoc + "-") > -1) {
                            hay = true;
                            cont += " <tr class='itemAdj'>"
                                + "<td class='fileName'>" + e.ADJUNTO_NAME + "</td>"
                                + "<td><input type='checkbox' style='width:16px; height:16px;' /></td>"
                                + "</tr>"
                        }
                    });

                    //Si no hay adjuntos presenta el siguiente mensaje
                    if (hay == false) {
                        cont += " <tr>"
                            + "<td colspan='2'><b>No existen archivos adjuntos</b></td>"
                            + "</tr>"
                    }
                    cont += "</table>"

                    $("#listaAdjuntosMargi").html(cont);
            }
            /*$.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                
                url: "Upload.axd?"
		        	+ "storageFolder="+PATHADJUNTOS
		        	+ "&maxChunkSize=30000000"
		        	+ "&resume=false",
                
                success: function (R) {
                    //extrae identificador de correspondencia para filtrar los archivos adjuntos
                    var idoc = "IDOC_" + $("#lista-item-corres .list.active input").parent().parent().parent().data("datos").datCorres.CORRESID
                    , cont = ""
                        + "<table style='width:100%;'>"
                        + " <tr>"
                        + "     <td colspan='2'><b>Archivos a adjuntar</b></td>"
                        + "</tr>"
                    , hay = false;

                    //Genera lista de archivo adjuntos
                    $.each(R, function (i, e) {
                        if (e.name.indexOf(idoc + "-") > -1) {
                            hay = true;
                            cont += " <tr class='itemAdj'>"
                                + "<td class='fileName'>" + e.name + "</td>"
                                + "<td><input type='checkbox' /></td>"
                                + "</tr>"
                        }
                    });

                    //Si no hay adjuntos presenta el siguiente mensaje
                    if (hay == false) {
                        cont += " <tr>"
                            + "<td colspan='2'><b>No existen archivos adjuntos</b></td>"
                            + "</tr>"
                    }
                    cont += "</table>"

                    $("#listaAdjuntosMargi").html(cont);
                }
            });*/
        } else {
            $("#listaAdjuntosMargi").slideDown();
        }
    } else {
        $("#listaAdjuntosMargi").slideUp();
    }
}

function valAdjMail() {
    var bien = false
    , adjuntos = "";
    if ($("#SL_ADJUNTAR").val() == "1") {
        adjuntos = $("#listaAdjuntosMargi .itemAdj");
        if (adjuntos.length > 0) {
            ajdCheck = $("#listaAdjuntosMargi .itemAdj input:checked");
            if (ajdCheck.length <= 0) {
                mError("Debe seleccionar un archivo para adjuntar.");
            } else { bien = true; }
        }
    } else {bien = true;}
    return bien;
}

//CustomChec functions*/
function customChecT_m() {    
    if ($("#margi-envi-email-t").hasClass("active bg-green fg-white")) {
        $("#margi-envi-email-t, .envi-email").removeClass("active bg-green fg-white");
    } else {
        $("#margi-envi-email-t, .envi-email").addClass("active bg-green fg-white");
    }
}

function customChecT_f() {
    if ($("#margi-envi-fis-t").hasClass("active bg-green fg-white")) {
        $("#margi-envi-fis-t, .envi-fis").removeClass("active bg-green fg-white");
    } else {
        $("#margi-envi-fis-t, .envi-fis").addClass("active bg-green fg-white");
    }
}

//Margidaso MDelete
function margiMDL(margid) {
    $.msgbox("<br /><br /><h1 style='font-size:14px;'>Los datos del marginado serán eliminados."
            +"<br />Esta seguro de querer continuar?</h1>", {
        type: "alert",
        buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
    }, function (result) {
        if (result == "Si") {

            $.ajax({
                url: "../WS/MARGINADOws.asmx/sp_marginadoMDLws",
                data: "{'margid':'" + margid+ "'"
                    + ", 'updateusrid' : '" + $.jCookies({ get: 'USRID' })+ "'"
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

//Posponer Marginado
function cargaFrmMargiPos(margid) {
    var html = "FRMS/marginadoPosSV.aspx";
    $("#dialog-modal").fadeIn(function () {
        $("#dialogWin").fadeIn(function () {
            //$("#logoTitulo").addClass("icon mif-file-empty");
            $("#textoTitulo").html("Posponer marginado");
            $(".window-content").load(html, function () {
                //Datepickers
                $(function () {
                    $("#frm_marginadoPos #MARGIPOSNUEVAFECH").datepicker({ dateFormat: "dd/mm/yy" });
                });
                $("#MARGID").val(margid);
                loadDelay();
                fijarDivLoad();
            });
        });
    });
}