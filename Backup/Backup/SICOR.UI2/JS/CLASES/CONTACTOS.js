
/*******Caraga lista de Contactos**********/
var CONT = "";
function cargaListaContactos(input) {
    var grupo = $.jCookies({ get: 'GRUPO' });
    if (CONT == "") {
        $.when(sp_contactosGTjs(grupo)).then(function (response) {
            CONT = response.d
            generaLiCont(CONT, input)
        });
    } else {
        generaLiCont(CONT, input)
    }
}



/*******Caraga lista de Contactos Internos**********/
var CONT_IN = "";
function cargaListaContactosInternos(input) {
    if (CONT_IN == "") {
        var grupo = $.jCookies({ get: 'GRUPO' });
        $.when(sp_contactosInternosGTjs(grupo)).then(function (response) {
            CONT_IN = response.d;
            generaLiCont(CONT_IN, input)
            $(input).data({ 'datos': CONT_IN });
        });
    } else {
        generaLiCont(CONT_IN, input)
        $(input).data({ 'datos': CONT_IN });
    }
}


//Genra lista de contactos
function generaLiCont(CONT, input) {
    var contenido = "<option value='-1'>Seleccionar</option>";    
    $(input).html(contenido);

    $.each(CONT, function (i, e) {
        //Personas
        var textomostrar = "";
        //textomostrar = e.CONTNOMBRE + ((e.CONTNOMBRE != "") ? " | " : "") + e.CONTINST + ((e.CONTNOMBRE != "" || e.CONTINST != "") ? " | " : "") + e.CONTUNIDAD;
        item = "<option value='" + e.CONTID + "'>" + e.CONTNOMBRE + " ("+e.TIPONOMBRE+")</option>";

        $(input).append(item);
    });
}


/******************Carga formulario contactoSV*************/
function cargaContactoSV(tipo, select) {
    $("#dialog-modal").attr('title', 'Nuevo contacto')
    ir("FRMS/contactosSV.aspx", "#dialog-modal2");
    $("#dialog-modal2").dialog({
        autoOpen: false,
        height: 'auto',
        width: '400px',
        modal: true,
        buttons: {
            "Aceptar": function () {
                contactoSV(tipo, select);
            },
            "Cancelar": function () {
                $(this).dialog("close").html("");
            }
        }
    });
    $("#dialog-modal2").dialog('open').removeClass('ui-dialog-content dialogoWindow ui-widget-content');
}


/********CONTACTOS SV**************/
function contactoSV(tipo, select) {
    var tipoCont = $("#frm_contactos #TIPOID").val()
    if (tipoCont == 6) {
        contExternoSV(tipo, select);
    } else if (tipoCont == 5) {
        contInternoSV(tipo, select);
    } else {
        mError("Seleccione un tipo");
        $("#TIPOID").select();
    }
}

function contExternoSV(tipo, select) {
    $("#frm_contactos #CONTNOMBRE"
        + ", #frm_contactos #CONTUNIDAD"
        + ", #frm_contactos #CONTINST"
        ).addClass("notNull");

    $("#frm_contactos #CONTEMAIL").removeClass("email");
    var grupo = $.jCookies({ get: 'GRUPO' });
    
    if (valForm("#frm_contactos")) {

        $.msgbox("<br /><br /><h1 style='font-size:14px;'>¿Está seguro de querer realizar la acción?</h1>", {
            type: "confirm",
            buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
        }, function (result) {
            if (result == "Si") {
                var Datos = getDatForm("#frm_contactos", "Datos");
                $.when(sp_contactosSVjs(Datos)).then(function (response) {
                    var R = response.d;

                    if (R > 0) {
                        mOk('Datos guardados satisfactoriamente.');
                        $("#dialog-modal").dialog("close").html("");
                        if (tipo == 1) {
                            //refrescar lista
                            $.when(sp_contactosGTjs(grupo)).then(function (response) {
                                CONT = response.d
                                generaLiCont(CONT, select)
                            });
                        } else {
                            //refrescar lista
                            $.when(sp_contactosInternosGTjs(grupo)).then(function (response) {
                                CONT_IN = response.d;
                                $("#CONTID").data({ 'datos': response.d });
                                generaLiCont(CONT_IN, select)
                                $(input).data({ 'datos': CONT_IN });
                            });
                        }
                        //Reinicia variable "CONT" para que se ejecute la solicitud de info al servidor web
                        CONT = "";
                    } else { mError(R); }
                });
            }
        });
        }
}

function contInternoSV(tipo, select) {
    $("#frm_contactos #CONTNOMBRE"
        + ", #frm_contactos #CONTUNIDAD"
        ).addClass("notNull");

    $("#frm_contactos #CONTEMAIL").removeClass("email");
    $("#frm_contactos #CONTINST").removeClass("notNull");
    var grupo = $.jCookies({ get: 'GRUPO' });

        if (valForm("#frm_contactos"))  {

            $.msgbox("<br /><br /><h1 style='font-size:14px;'>¿Está seguro de querer realizar la acción?</h1>", {
                type: "confirm",
                buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
            }, function (result) {
                if (result == "Si") {
                    var Datos = getDatForm("#frm_contactos", "Datos");
                    $.when(sp_contactosSVjs(Datos)).then(function (response) {
                        var R = response.d;

                        if (R > 0) {
                            mOk('Datos guardados satisfactoriamente.');
                            $("#dialog-modal").dialog("close").html("");
                            if (tipo == 1) {
                                //refrescar lista
                                $.when(sp_contactosGTjs(grupo)).then(function (response) {
                                    CONT = response.d
                                    generaLiCont(CONT, select)
                                });
                            } else {
                                //refrescar lista
                                $.when(sp_contactosGTjs(grupo)).then(function (response) {
                                    CONT = response.d
                                    $("#CONTID").data({ 'datos': response.d })
                                    generaLiCont(CONT, select)
                                });
                            }
                            //Reinicia variable "CONT_IN" para que se ejecute la solicitud de info al servidor web
                            CONT_IN = "";
                        } else { mError(R); }
                    });
                }
            });


        }
    }

    //Actualizar Email Contacto
    function contactoUpMail(contid, contemail) {
        $.ajax({
            url: "../WS/CONTACTOSws.asmx/sp_contactosUpMailSVws",
            data: "{"
                + "'contid':'" + contid + "'"
                + ",'contemail':'" + contemail + "'"
                + ",'updateusrid':'" + $.jCookies({ get: 'USRID' })+"'"
                +"}",
            success: function (R) {
                if (R.d > 0) {

                } else { mError("Email contacto id:" + contid+ " no pudo ser guardado. <br />"+R.d); }
            }
        });
    }