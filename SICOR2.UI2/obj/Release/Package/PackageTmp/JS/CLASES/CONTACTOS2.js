/////////Hacer case insensitive
//NEW selector
jQuery.expr[':'].Contains = function (a, i, m) {
    return jQuery(a).text().toUpperCase()
                  .indexOf(m[3].toUpperCase()) >= 0;
};
// OVERWRITES old selector
jQuery.expr[':'].contains = function (a, i, m) {
    return jQuery(a).text().toUpperCase()
                  .indexOf(m[3].toUpperCase()) >= 0;
};
//Update to work for jQuery 1.8
//$.expr[":"].contains = $.expr.createPseudo(function (arg) {
//    return function (elem) {
//        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
//    };
//});

function INITcontactos() {
    cargaListaContactos();
    var todo = "";
    inifiltros();

    $("#menu-item-corres #eliminar").click(function () { elimContacto(); });
    $("#submenuitem #nuevoContacto").click(function () { nuevoContacto(); });
    $("#submenuitem #eliminarContacto").click(function () { elimContacto(); });

    $(".nav #salir").click(function () { cierraSecion(); });
    /*$(".nav #bandejaMensajes").click(function () { document.location = "bandejaMensajes_in.aspx" });*/
    $(".nav #contactos").click(function () { document.location = "contactos.aspx" });
    $(".nav #buscarCorres").click(function () { document.location = "busqueda.aspx" });
    $(".nav #imprimirReps").click(function () { document.location = "imprimir.aspx" });
    $(".nav #home").click(function () { document.location = "correspondencia.aspx" });


    //carga datos cuenta
    $("#dat_cuenta_nombre").html("" + $.jCookies({ get: 'USRNOM' }));
    $("#dat_cuenta_modContrasena").bind('click', function () { cargaFrmModContra() });

    /*$("#menu-item-corres li, #dat_cuenta_modContrasena").on("mouseenter", function () { $(this).find(".popover").fadeIn(); });
    $("#menu-item-corres li, #dat_cuenta_modContrasena").on("mouseleave", function () { $(this).find(".popover").fadeOut(); });*/
}

/* CIERRA FORMULARIO DE CONTACTOS */
function closeContactosSV() {
    //$("#lista-item-corres li").removeClass("active");
    $("#lista-item-corres .list").removeClass("active tile element-selected");
    $("#detalle-item-corres").html("");
}

function cargaListaContactos(input) {
    $("#lista-item-corres").html("");
    var grupo = $.jCookies({ get: 'GRUPO' });
    $.when(sp_contactosGTjs(grupo)).then(function (response) {
        var R = response.d;
        $.each(R, function (i, e) {
            contenido = ""
                    + "<div id=\"contacto_" + e.CONTID + "\" class='list'>"
					+ "	<span class='item-remitente mayusculas'>&nbsp;<b>" + e.CONTNOMBRE + "</b> <span class='item-asunto capitalize'>(" + e.TIPONOMBRE + ")</span></span>"
					+ "	<p class=''>&nbsp;<b>Cargo</b>:" + e.CONTCARGO + "</p>"
                    + "	<p class=''>&nbsp;<b>Institución</b>:" + e.CONTINST + "</p>"
                    + "	<p class=''>&nbsp;<b>Unidad</b>:" + e.CONTUNIDAD + "</p>"
                    + "	<p class='item-asunto'>&nbsp;Email: " + e.CONTEMAIL + " | Tel: " + e.CONTTELS + "</p>"
					+ "</div>";

            $("#lista-item-corres").append(contenido);
            cargaData(e);
        });
        $("#lista-item-corres").ajaxStop(function () { $("#buttonBuscar").delay(2000).click(); });
    });
}

/**************Carga DATA***************/
function cargaData(item) {
    /*Carga Datos al li y asigna Click*/
    $("#contacto_" + item.CONTID)
    .data("datos", item)
    .unbind('click').click(function () {
        cargaDetContacto(this); //Carga Detalle Contacto
        $("#lista-item-corres .list").removeClass("active tile element-selected");
        $(this).addClass("active tile element-selected");
    });
}


/**********************************/
/*CARGA FORMULARIO DE CONTACTOS   */
/**********************************/
function cargaDetContacto(li) {
    var contenido = "", datGen = $(li).data("datos");
    $("#detalle-item-corres").load("FRMS/contactos2SV.aspx", function () {
        cargaForm("#frm_contactos", datGen);
    });
}

/**********************************/
/*          NUEVO CONTACTO        */
/**********************************/
function nuevoContacto() {
    $("#lista-item-corres .list").removeClass("active tile element-selected");
    $("#Text2").val(""); 
    $("#buttonBuscar").click(); 
    $("#detalle-item-corres").html("");
    setTimeout(function () {
        $("#detalle-item-corres").load("FRMS/contactos2SV.aspx");
    }, 500);
}

/**************************************/
/*       GUARDAR NUEVO CONTACTO       */
/**************************************/
function contactosSV() {
    var tipoCont = $("#frm_contactos #TIPOID").val();
    if (tipoCont == 6) {
        contExternoSV();
    } else if (tipoCont == 5) {
        contInternoSV();
    } else {
        mError("Seleccione un tipo");
        $("#TIPOID").select();
    }    
}

function contExternoSV() {
    $("#frm_contactos #CONTNOMBRE"
        + ", #frm_contactos #CONTUNIDAD"
        + ", #frm_contactos #CONTINST"
        ).addClass("notNull");

    $("#frm_contactos #CONTEMAIL").removeClass("email");
    var grupo = $.jCookies({ get: 'GRUPO' });

    if (valForm("#frm_contactos")) {

        $.msgbox("<br /><br /><h1 style='font-size:14px;'>Confirmar solicitud</h1>", {
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
                        //refrescar lista
                        $.when(sp_contactosGTjs(grupo)).then(function (response) {
                            cargaListaContactos();
                            $("#detalle-item-corres").html("");
                            $("#buttonBuscar").click();
                        });                        
                    } else { mError("No se pudo completar la solicitud."); }
                });
            }
        });
    }
}

function contInternoSV() {
    $("#frm_contactos #CONTNOMBRE"
        + ", #frm_contactos #CONTUNIDAD"
        ).addClass("notNull");

    $("#frm_contactos #CONTEMAIL").removeClass("email");
    $("#frm_contactos #CONTINST").removeClass("notNull");
    var grupo = $.jCookies({ get: 'GRUPO' });

    if (valForm("#frm_contactos")) {

        $.msgbox("<br /><br /><h1 style='font-size:14px;'>Confirmar solicitud</h1>", {
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
                            //refrescar lista
                            $.when(sp_contactosGTjs(grupo)).then(function (response) {
                                cargaListaContactos();
                                $("#detalle-item-corres").html("");
                                $("#buttonBuscar").click();
                            });                        
                    } else { mError("No se pudo completar la solicitud."); }
                });
            }
        });


    }
}

/*======================ELIMINAR======================*/
/*====================================================*/
function elimContacto() {
    var item = $("#lista-item-corres .list.active");
    if (item.length == 0) {
        mError("Debe seleccionar un contacto.");
    } else {
    $.msgbox("<br /><br /><h1 style='font-size:14px;'>¿Confirmar eliminación?</h1>", {
        type: "confirm",
        buttons: [
                    { type: "submit", value: "Si" },
                    { type: "submit", value: "No" }
                  ]
    }, function (result) {
        if (result == "Si") {
            var contactoid = $(item).data("datos").CONTID
                , updateusrid = $.jCookies({ get: 'USRID' });

            $.when(sp_contactoElimSVjs(contactoid, updateusrid)).then(function (response) {
                var R = response.d;

                if (R[0].msg > 0) {
                    mOk('Contacto eliminado satisfactoriamente.');
                    //quitamos el contacto del listado
                    $("#lista-item-corres .list.active").remove();
                    $("#detalle-item-corres").html("");
                    /*$("#Text2").val("");
                    $("#buttonBuscar").click();*/
                } else if (R[0].msg == 0) {
                    mError("La solicitud no se pudo completar.");
                } else {
                    mError("El contacto tiene correspondencia asociada, no se permite eliminar.");
                }
            });
        }
    });
    }
}


var todo = "";
function inifiltros() {    
    $('.filtro').keyup(function () {
        keyword = $(this).val();

        var div = "lista-item-corres";

        if (keyword == "") {
            if (todo != "") {
                $('#' + div + ' .list').css("display", "block");
            }
            $("#cant-items-list").html($('#' + div + ' .list').length + "/" + $('#' + div + ' .list').length)
        }
    });

    //function initFiltros(){
    $("#buttonBuscar").click(function () {
        keyword = $('.filtro').val();
        var div = "lista-item-corres";

        if (keyword == "") {
            if (todo != "") {
                $('#' + div + ' .list').css("display", "block");
            }
            $("#cant-items-list").html($('#' + div + ' .list').length + "/" + $('#' + div + ' .list').length);
        } else if (keyword.length > 0) {
            if (todo == "") { todo = $('#lista-item-corres').html(); }

            $('#' + div + ' .list').css("display", "none");


            var show = "";
            var tot = 0;
            $('#' + div + ' .list:contains(' + keyword + ')').each(function (i, e) {
                var contactoId = $(e).data("datos").CONTID;

                $("#contacto_" + contactoId).show();
                tot++;
            });

            $("#cant-items-list").html(tot + "/" + $('#' + div + ' .list').length);
        }
    });
}