/*****************INI FILTROS***************/
$(document).ready(function () {
    /*$("#menu-item-corres li, #dat_cuenta_modContrasena").on("mouseenter", function () { $(this).find(".popover").fadeIn(); });
    $("#menu-item-corres li, #dat_cuenta_modContrasena").on("mouseleave", function () { $(this).find(".popover").fadeOut(); });*/
    $("#btnAdjuntar").on("click", function () {
        addAdjuntoProceso();
    });
});

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

var todo = "";
function inifiltros() {
    $('.filtro').keyup(function () {
        keyword = $(this).val();

        var div = "lista-item-corres";

        if (keyword == "") {
            if (todo != "") {
                $('#' + div + ' .list').css("display", "block");
            }
            $("#cant-items-list").html($('#' + div + ' .list').length + "/" + $('#' + div + ' .list').length);
        }
    });


    $("#buttonBuscar").click(function () {
        $("#detalle-item-corres").html("");
        $("#detalle-adjunto").html("").hide();
        $("#detalle-margi-corres").html("");
        var keyword = $('.filtro').val();
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
                var corresId = $(e).data("datos").datCorres.CORRESID;
                var corresCon = $(e).data("datos").datCorres.CORRESID_CONTESTA;

                //búsqueda versión 2
                $("#corres_" + corresId).show();
                tot++;
                //padre
                if ($("#corres_" + corresCon).length > 0) {
                    $("#corres_" + corresCon).show();
                    tot++; //= $("#corres_" + corresCon).length;
                }
                //hijos
                if ($(".idPadre_" + corresCon).length > 0) {
                    $(".idPadre_" + corresCon).show();
                    //tot += $(".idPadre_" + corresCon).length;
                }
                //hermanos
                if ($(".idPadre_" + corresId).length > 0) {
                    $(".idPadre_" + corresId).show();
                    tot += $(".idPadre_" + corresId).length;
                }
            });

            $("#cant-items-list").html(tot + "/" + $('#' + div + ' .list').length);
        }
    });
}

/*----------------------------------------------*/
/*      Carga Nuevo Modificar Correpondencia    */
/*----------------------------------------------*/
function cargaFormCorres(datGen) {
    var html = "FRMS/corresSV.aspx";
    $("#dialog-modal").fadeIn(function () {
        $("#dialogWin").fadeIn(function () {
            $("#logoTitulo").addClass("mif-file-text");
            $("#textoTitulo").html("Ingresar correspondencia");
            $(".window-content").load(html, function () {
                for (var i = 0; i < CATS.clases.length; i++) {
                    item = "<option value='" + CATS.clases[i].CLASEID + "'>" + CATS.clases[i].CLASENOMBRE + "</option>";
                    $("#CLASEID").append(item);
                }
                //Tipo
                for (var ii = 0; ii < CATS.tipos.length; ii++) {
                    if (CATS.tipos[ii].TIPODSC == " ") {
                        item = "<option value='" + CATS.tipos[ii].TIPOID + "'>" + CATS.tipos[ii].TIPONOMBRE + "</option>";
                        $("#TIPOID").append(item);
                    }
                }

                //Set Contactos
                cargaListaContactos("#CONTID_REMITE");
                cargaListaUsuarios();

                //Set REMITENTE
                $("#CONTID_REMITE").select2({
                    minimumInputLength: 1
                });

                //Datepickers
                $(function () {
                    $("#NOTAELABFEC").datepicker({ dateFormat: "dd/mm/yy" });
                });
                $(function () {
                    $("#NOTARECIBFEC").datepicker({ dateFormat: "dd/mm/yy" });
                });
                //Timepickers
                $('#NOTARECIBHORA').timepicker();

                //Editor texto
                //            var edit = $("#ASUNTO").cleditor({
                //            controls:     // controls to add to the toolbar
                //                        "bold italic underline strikethrough subscript superscript | " +
                //                        "color removeformat | undo redo "
                ////                        +"| print source"
                //            });

                //Carga listado Corresondencia a contestar
                var lista = $("#lista-item-corres .list .nota, #lista-item-corres .list .registrado");
                if (datGen != null) {
                    lista = $("#lista-item-corres .list .nota, #lista-item-corres .list:not(#corres_" + datGen.CORRESID + ") .registrado");
                    if ($(".idPadre_" + datGen.CORRESID).length > 0) { lista = ""; }
                }                

                $("#frm_correspondencia div.detalle-margi-corres").html(cargaListaCorresAContestar(lista))
                    .css({ 'overflow': 'auto', 'width': '100%' });
                //.css({ 'min-height': '100px', 'max-height': '300px', 'overflow': 'auto', 'width': '100%' });
                $('#frm_correspondencia div.detalle-margi-corres table').dataTable({
                    "bPaginate": false,
                    "sPaginationType": "full_numbers",
                    "bLengthChange": false,
                    "bFilter": true,
                    "bSort": true,
                    "bInfo": false,
                    "bAutoWidth": false,
                    "iDisplayLength": 5
                });                

                //=======Carga Datos para Edicion======
                if (datGen != null) {
                    //Titulo
                    $("p.titulo").html("Modificar correspondencia");
                    setTimeout(function () {
                        cargaForm("#frm_correspondencia", datGen);
                    }, 1000);

                    //carga ASUNTO
                    //edit[0].refresh();
                }
                loadDelay();
                fijarDivLoad();
            });
        });
    });
}

/*----------------------------------------------*/
/*  Carga formulario Respuesta de Marginado     */
/*----------------------------------------------*/
function cargaFormResMargi(datGen) {
    var html = "FRMS/respuestaMargiSV.aspx";
    $("#dialog-modal").fadeIn(function () {
        $("#dialogWin").fadeIn(function () {
            $("#logoTitulo").removeClass("mif-file-text mif-file-empty").addClass("mif-map");
            $("#textoTitulo").html("Ingresar respuesta de marginado");
            $(".window-content").load(html, function () {
                //Set CATS
                //Clase
                for (var i = 0; i < CATS.clases.length; i++) {
                    item = "<option value='" + CATS.clases[i].CLASEID + "'>" + CATS.clases[i].CLASENOMBRE + "</option>";
                    $("#CLASEID").append(item);
                }

                //Datepickers
                $(function () {
                    $("#NOTAELABFEC").datepicker({ dateFormat: "dd/mm/yy" });
                });
                $(function () {
                    $("#NOTARECIBFEC").datepicker({ dateFormat: "dd/mm/yy" });
                });
                //Timepickers
                $('#NOTARECIBHORA').timepicker();

                cargaListaUsuarios();

                //Carga Datos para Edicion
                if (datGen != null) {
                    //Titulo
                    $("p.titulo").html("Modificar respuesta de marginado");
                    /*********Cargar Lista de Marginados para modificar******/
                    cargarListMargi("#frm_resmargi div.detalle-margi-corres", true); //MARGINODO.js

                    cargaForm("#frm_resmargi", datGen);
                    //carga ASUNTO
                    //edit[0].refresh();

                } else {
                    //Cargar Lista de Marginados
                    cargarListMargi("#frm_resmargi div.detalle-margi-corres", false); //MARGINODO.js
                }                

                try{
                    $('#frm_resmargi div.detalle-margi-corres table').dataTable({
                        "bPaginate": false,
                        "sPaginationType": "full_numbers",
                        "bLengthChange": false,
                        "bFilter": true,
                        "bSort": true,
                        "bInfo": false,
                        "bAutoWidth": false,
                        "iDisplayLength": 2
                    });
                }catch(er){
                    var errr = er;
                }

                loadDelay();
                fijarDivLoad();
            });
        });
    });
}

/*----------------------------------------------*/
/*      Carga formulario Nueva Nota             */
/*----------------------------------------------*/
function cargaFormNota(datGen) {
    var html = "FRMS/notasSV.aspx";
    $("#dialog-modal").fadeIn(function () {
        $("#dialogWin").fadeIn(function () {
            $("#logoTitulo").removeClass("mif-map mif-file-text").addClass("icon mif-file-empty");
            $("#textoTitulo").html("Ingresar nota");
            $(".window-content").load(html, function () {
                //Set CATS
                //Clase
                for (var i = 0; i < CATS.clases.length; i++) {
                    item = "<option value='" + CATS.clases[i].CLASEID + "'>" + CATS.clases[i].CLASENOMBRE + "</option>";

                    $("#CLASEID").append(item);
                }
                //Tipo
                for (var j = 0; j < CATS.tipos.length; j++) {
                    if (CATS.tipos[j].TIPODSC == " ") {
                        item = "<option value='" + CATS.tipos[j].TIPOID + "'>" + CATS.tipos[j].TIPONOMBRE + "</option>";

                        $("#TIPOID").append(item);
                    }
                }

                ///Set Contactos
                cargaListaContactos("#CONTID_DIRIGIDO, #CONTID_ELABORO");
                cargaListaUsuarios();

                //Set Dirigido a 
                $("#CONTID_DIRIGIDO").select2({
                    minimumInputLength: 1
                });
                //Set Elaborado por
                $("#CONTID_ELABORO").select2({
                    minimumInputLength: 1
                });

                //Datepickers
                $(function () {
                    $("#NOTAELABFEC").datepicker({ dateFormat: "dd/mm/yy" });
                });
                $(function () {
                    $("#NOTARECIBFEC").datepicker({ dateFormat: "dd/mm/yy" });
                });
                //Timepickers
                $('#NOTARECIBHORA').timepicker();

                //Carga listado Corresondencia a contestar
                var lista = $("#lista-item-corres .list .nota, #lista-item-corres .list .registrado");
                if (datGen != null) {
                    lista = $("#lista-item-corres .list:not(#corres_" + datGen.CORRESID + ") .nota, #lista-item-corres .list .registrado");
                    if ($(".idPadre_" + datGen.CORRESID).length > 0) { lista = ""; }
                }

                $("#frm_nota div.detalle-margi-corres").html(cargaListaCorresAContestar(lista))
                .css({ 'width': '100%' }); //'overflow': 'auto',
                //.css({ 'min-height': '100px', 'max-height': '300px', 'width': '100%' }); //'overflow': 'auto',

                $('#frm_nota div.detalle-margi-corres table').dataTable({
                    "bPaginate": false,
                    "sPaginationType": "full_numbers",
                    "bLengthChange": false,
                    "bFilter": true,
                    "bSort": true,
                    "bInfo": false,
                    "bAutoWidth": false,
                    "iDisplayLength": 5
                });                

                //=======Carga Datos para Edicion======
                if (datGen != null) {
                    //Titulo
                    $("p.titulo").html("Modificar nota");
                    cargaForm("#frm_nota", datGen);
                    //carga ASUNTO
                    //edit[0].refresh();
                }
                loadDelay();
                fijarDivLoad();
            });
        });
    });
}

/*================================================================*/
/*=======================CorrespondenciaSV========================*/
/*================================================================*/
function corresSV() {
    if (valForm('#frm_correspondencia')) {

        var contesta = -1;
        if ($("#CORRESID_CONTESTA:checked").length != 0) {
            contesta = $("#CORRESID_CONTESTA:checked").val();
        }
        var Datos = getDatForm('#frm_correspondencia', 'Datos');
        Datos = Datos.substring(0, Datos.length - 1);
        Datos += ",'CORRESID_CONTESTA':'" + contesta + "'}";

        $.msgbox("<br /><br /><h1 style='font-size:14px;'>Confirmar solicitud</h1>", {
            type: "confirm",
            buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
        }, function (result) {
            if (result == "Si") {
                $.when(sp_correspondenciaSVjs(Datos)).then(function (response) {
                    var R = response.d;

                    if (parseInt(R) > 0) {
                        mOk('Datos guardados satisfactoriamente.');
                        closeWin();
                        //$(".btn-close").click();
                        /*Refresca lista de correspndencia*/
                        cargaListCorres();
                        limpiaDet();
                    } else if (parseInt(R) == -1) {
                        mError("Ya existe una correspondencia con ese código/referencia.");
                    } else { mError(R); }
                });
            }
        });
        
    }
}

/*================================================================*/
/*=====================Respuesta Marginado SV=====================*/
/*================================================================*/
function resMargiSV() {
    if (valForm('#frm_resmargi')) {
        if ($("#frm_resmargi #MARGINAID:checked").length > 0) {

            $.msgbox("<br /><br /><h1 style='font-size:14px;'>Confirmar solicitud</h1>", {
                type: "confirm",
                buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
            }, function (result) {
                if (result == "Si") {
                    var replaceComilla = /"/g;
                    Datos = '"Datos":{'
                    + '"corresid":"' + $("#frm_resmargi #CORRESID").val() + '"'
                    + ',"correscod":"' + $("#frm_resmargi #CORRESCOD").val().replace(/"/g, '\"') + '"'
                    + ',"reqfirma":"' + $("#frm_resmargi #REQFIRMA").val() + '"'
                    + ',"marginaid":"' + $("#frm_resmargi #MARGINAID:checked").val() + '"'
                    + ',"claseid":"' + $("#frm_resmargi #CLASEID").val() + '"'
                    + ',"categoid":"' + $("#frm_resmargi #CATEGOID").val() + '"'
                    + ',"marginaformares":"' + $("#frm_resmargi #MARGINAFORMARES").val().replace(replaceComilla, "'") + '"'
                    + ',"CORRESID_CONTESTA":"' + $("#frm_resmargi #CONTESTA_" + $("#frm_resmargi #MARGINAID:checked").val()).val() + '"'
                    + ',"notaelabfec":"' + $("#frm_resmargi #NOTAELABFEC").val() + '"'
                    + ',"notarecibfec":"' + $("#frm_resmargi #NOTARECIBFEC").val() + '"'
                    + ',"notarecibhora":"' + $("#frm_resmargi #NOTARECIBHORA").val() + '"'
                    + ',"adjunto":2'
                    + ',"updateusrid":"' + $.jCookies({ get: 'USRID' }) + '"'
                    + ',"responsableid":"' + $("#frm_resmargi #RESPONSABLEID").val() + '"'
                    + '}';

                    $.when(sp_correspondenciaSVjs(Datos)).then(function (response) {
                        var R = response.d;
                        if (R > 0) {
                            mOk('Datos guardados satisfactoriamente.');
                            closeWin();
                            //$(".btn-close").click();
                            /*Refresca lista de correspndencia*/
                            cargaListCorres();
                            limpiaDet();
                        } else { mError(R); }
                    });
                }
            });        
        } else {mError("Seleccione el marginado al que se responde.");}    
    }
}

/*================================================================*/
/*==========================NotaSV================================*/
/*================================================================*/
function notaSV() {
    if (valForm('#frm_nota')) {

        var contesta = -1;
        if ($("#CORRESID_CONTESTA:checked").length != 0) {
            contesta = $("#CORRESID_CONTESTA:checked").val();
        }
        var Datos = getDatForm('#frm_nota', 'Datos');
        Datos = Datos.substring(0, Datos.length - 1);
        Datos += ",'CORRESID_CONTESTA':'" + contesta
            + "','NOTARECIBFEC':'" + $("#NOTAELABFEC").val()
            + "'}";

        $.msgbox("<br /><br /><h1 style='font-size:14px;'>Confirmar solicitud</h1>", {
            type: "confirm",
            buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
        }, function (result) {
            if (result == "Si") {
                $.when(sp_correspondenciaSVjs(Datos)).then(function (response) {
                    var R = response.d;

                    if (R > 0) {
                        mOk('Datos guardados satisfactoriamente.');
                        closeWin();
                        /*Refresca lista de correspndencia*/
                        cargaListCorres();
                        limpiaDet();
                    } else if (parseInt(R) == -1) {
                        mError("Ya existe una nota con ese código/referencia.");
                    } else { mError(R); }
                });
            }
        });

    }
}

/*==============================EDITAR============================*/
/*================================================================*/
function editaCorres() {
    var item = $("#lista-item-corres .list.active");

    if (item.length == 0) {
        mError("Debe seleccionar una pieza de correspondencia");
    } else {
        var datGen = $("#lista-item-corres .list.active").data("datos").datCorres
        , datMargi = $("#lista-item-corres .list.active").data("datos").datmargi
        , datRemi = $("#lista-item-corres .list.active").data("datos").datremi;

//        if (datMargi.length > 0 || datRemi.length > 0) {
//            mError("No se permite la edición");
        //        } else {
            if (datGen.CATEGOID == 1) {
                cargaFormCorres(datGen);
            } else if (datGen.CATEGOID == 2) {
                cargaFormResMargi(datGen);
            } else if (datGen.CATEGOID == 3) {
                cargaFormNota(datGen);
            }
//        }
    }
}
/*===========================ELIMINAR=============================*/
/*================================================================*/
function elimCorres() {
    var item = $("#lista-item-corres .list.active");

    if (item.length == 0) {
        mError("Debe seleccionar una pieza de correspondencia");
    } else {
    $.msgbox("<br /><br /><h1 style='font-size:14px;'>Confirmar solicitud</h1>", {
        type: "confirm",
        buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
    }, function (result) {
        if (result == "Si") {

            var corresid = $(item).data("datos").datCorres.CORRESID
                , marginaid = $(item).data("datos").datCorres.MARGINAID
                , updateusrid = $.jCookies({ get: 'USRID' });

            $.when(sp_corresElimSVjs(corresid,marginaid, updateusrid)).then(function (response) {
                var R = response.d;

                if (R > 0) {
                    mOk('Datos eliminados satisfactoriamente.');
                    /*Refresca lista de correspndencia*/
                    cargaListCorres();
                    limpiaDet();
                } else { mError(R); }
            });
        }
    });
    }
}

/*============================ARCHIVAR============================*/
/*================================================================*/
function cargaFormArchivo(){
    var item = $("#lista-item-corres .list.active");

    if (item.length == 0) {
        mError("Debe seleccionar una pieza de correspondencia");
    } else {
        var html = "FRMS/archivoSV.aspx";
        $("#dialog-modal").fadeIn(function () {
            $("#dialogWin").fadeIn(function () {
                //$("#logoTitulo").addClass("icon mif-file-empty");
                $("#textoTitulo").html("Archivado en");
                $(".window-content").load(html, function () {
                    /**************Set CATS*****************/
                    //Tipo                    
                    for (var i = 0; i < CATS.tipos.length; i++) {
                        if (CATS.tipos[i].TIPODSC == "Tipo Archivo") {
                            item = "<option value='" + CATS.tipos[i].TIPOID + "'>"
                                + CATS.tipos[i].TIPONOMBRE
                                + "</option>";

                            $("#TIPOID").append(item);
                        } else if (CATS.tipos[i].TIPODSC == "Archivo") {
                            item = "<option value='" + CATS.tipos[i].TIPOID + "'>"
                                + CATS.tipos[i].TIPONOMBRE
                                + "</option>";

                            $("#ARCHIVO").append(item);
                        }
                    }

                    /*=======Carga Datos para Edicion======*/
                    var datArchi = $("#lista-item-corres .list.active").data("datos").datarchi;
                    if (datArchi != null && datArchi.length > 0) {
                        /*********Cargar Lista de Marginados para modificar******/
                        //                cargarListMargi("#frm_resmargi div.detalle-margi-corres", true); //MARGINODO.js
                        cargaForm("#frm_archivo", datArchi[0]);
                    }

                    loadDelay();
                    fijarDivLoad();
                });
            });
        });
    }
}

//Archivo SV
function archivoSV() {
    if (valForm('#frm_archivo')) {
        var grupo = $.jCookies({ get: 'GRUPO' });
        $.msgbox("<br /><br /><h1 style='font-size:14px;'>Confirmar solicitud</h1>", {
            type: "confirm",
            buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
        }, function (result) {
            if (result == "Si") {
                var padre = $("#lista-item-corres .list.active").data("datos").datCorres
                , lista = $("#lista-item-corres .list")
                , datGen = ""
                , Datos = "";

                Datos += 'Datos:['
                    + '{'
                    + '"ARCHID":"-1"'
                    + ',"ARCHIVO":"' + $("#frm_archivo #ARCHIVO").val() + '"'
                    + ',"CORRESID":"' + padre.CORRESID + '"'
                    + ',"ARCHVOCOD":"' + $("#frm_archivo #ARCHVOCOD").val() + '"'
                    + ',"ARCHVODSC":"' + $("#frm_archivo #ARCHVODSC").val() + '"'
                    + ',"TIPOID":"' + $("#frm_archivo #TIPOID").val() + '"'
                    + ',"updateusrid":"' + $.jCookies({ get: 'USRID' }) + '"'
                    + '},';

                for (var i = 0; i < lista.length; i++) {
                    datGen = $(lista[i]).data("datos").datCorres;

                    if (padre.CORRESID == datGen.CORRESID_CONTESTA) {
                        Datos += '{'
                            + '"ARCHID":"-1"'
                            + ',"ARCHIVO":"' + $("#frm_archivo #ARCHIVO").val() + '"'
                            + ',"CORRESID":"' + datGen.CORRESID + '"'
                            + ',"ARCHVOCOD":"' + $("#frm_archivo #ARCHVOCOD").val() + '"'
                            + ',"ARCHVODSC":"' + $("#frm_archivo #ARCHVODSC").val() + '"'
                            + ',"TIPOID":"' + $("#frm_archivo #TIPOID").val() + '"'
                            + ',"updateusrid":"' + $.jCookies({ get: 'USRID' }) + '"'
                            + '},';
                    }
                }
                Datos = Datos.substring(0, Datos.length - 1);
                Datos += ']';

                $.when(archivarSVjs(Datos,grupo)).then(function (response) {
                    var R = response.d;
                    if (R > 0) {
                        mOk('Datos guardados satisfactoriamente.');
                        closeWin();
                        /*Refresca lista de correspndencia*/
                        cargaListCorres();
                        limpiaDet();
                    } else { mError(R); }
                });
            }
        });
    }
}

/*===============================ADJUNTOS=========================*/
/*================================================================*/
function cargaUpFile() {
    var item = $("#lista-item-corres .list.active");
    
    if (item.length == 0) {
        mError("Debe seleccionar una pieza de correspondencia");
    } else {
        if ($("#detalle-adjunto").css('display') == "none") {
            $("#detalle-adjunto").html("");
            $("#detalle-adjunto").load("UPFILE/Default.html", function () {
                mostrarAdjuntos();
            }).fadeIn(500);
        } else {
            $("#detalle-adjunto").fadeOut(100);
            $("#detalle-adjunto").html("");
        }
    }
}

function mostrarAdjuntos() {
    var CORRESID = $("#lista-item-corres .list.active").data("datos").datCorres.CORRESID;
    var grupo = $.jCookies({ get: 'GRUPO' });
    var temporal = $("#corres_" + CORRESID).attr("data-adjunto").replace("[\"", "[");

    var adjuntosfile = $.parseJSON(temporal);
    var tabla = "<table class='table table-border cell-border' id='tablaadjuntos'>" +
        "<thead>" +
        "<th>Nombre</th>" +        
        //"<th>Tamaño</th>" +
        //"<th></th>" +
        "<th></th>" +
        "</thead>" +
        "<tbody>";

    if (adjuntosfile.length > 0) {
        $.each(adjuntosfile, function (i, e) {
            if (e.ADJUNTO_NAME != "") {
                tabla += "<tr id='trfile_" + i + "'>" +
                    "<td>" + e.ADJUNTO_NAME + "</td>" +
                    //"<td>" + e.ADJUNTO_SIZE + "</td>" +
                    "<td><button class='button warning' onclick='javascript:adjuntoDL_previo(\"" + e.ADJUNTO_NAME + "\"," + i + ")'>Eliminar</button>" +
                    "&nbsp;<a target='_blank' class='button info' href='UPFILE/storagegpo" + grupo + "/" + e.ADJUNTO_NAME + "'>Descargar</a></td>" +
                    "</tr>";
            }
        });
    }

    tabla += "</tbody></table>";

    $("#listaArchivos").html(tabla);
}

function adjuntoDL_previo(nombre,numero) {
    $.msgbox("<br /><br /><h1 style='font-size:14px;'>Confirma que desea borrar el archivo " + nombre + "?</h1>", {
        type: "confirm",
        buttons: [
            { type: "submit", value: "Si" },
            { type: "submit", value: "No" }
        ]
    },
        function (result) {
            if (result == "Si") {
                adjuntoDL(nombre,numero);
            }
        });
}

function addAdjuntoProceso() {
    var CORRESID = $("#lista-item-corres .list.active").data("datos").datCorres.CORRESID;
    var fechap = Date.now().toString();
    var url = 'UPFILE/FileUpload.ashx?CORRESID=' + CORRESID + '&grupo=' + $.jCookies({ get: 'GRUPO' });

    var data = new FormData();
    var files = $("#fileupload").get(0).files;
    // Add the uploaded image content to the form data collection
    if (files.length > 0) {
        data.append("UploadedImage", files[0]);

        var ajaxRequest = $.ajax({
            type: "POST",
            url: url,
            contentType: false,
            processData: false,
            data: data
        });

        ajaxRequest.complete(function (xhr, textStatus) {
            // Do other operation
            var tipoarc = files[0].name.split(".");
            var extension = tipoarc[tipoarc.length - 1];
            adjuntoSV(CORRESID, files[0].name, files[0].size, extension, fechap);
            
        });
    } else {
        mError("Debe seleccionar un archivo.");
    }
    // Make Ajax request with the contentType = false, and procesDate = false
}

/* GUARDAR LOS DATOS DEL ARCHIVO ADJUNTO */
function adjuntoSV(CORRESID, filesname, filessize, extension, fechap) {
    /*var itemId = $("#lista-item-corres .list.active").data("datos").datCorres.CORRESID;*/
    var nombreArchivo = "IDOC_" + CORRESID + "-" + filesname
        , name = nombreArchivo
        , Datos = "Datos:{"
            + "'adjuntoid':'-1'"
            + ",'corresid':'" + CORRESID + "'"
            + ",'adjunto_name':'" + name + "'"
            + ",'adjunto_size':'" + filessize + "'"
            + ",'adjunto_type':'" + extension + "'"
            + ",'adjunto_urldown':''"
            + ",'adjunto_urldel':''"
            + ',"updateusrid":"' + $.jCookies({ get: 'USRID' }) + '"'
            + "}";
    var grupo = $.jCookies({ get: 'GRUPO' });
    
    $.when(sp_adjuntoSVjs(Datos,grupo)).then(function (response) {
        var R = response.d;

        if (R > 0) {
            //Muestra icono de Adjunto
            $("#corres_" + CORRESID + " #icoAdjun").css("display", "block");
            $("#corres_" + CORRESID + " .mif-attachment").css("display", "block");
            $("#lista-item-corres .list.active").data("datos").datCorres.ADJUNTO = 1;
            //agregamos el nombre del archivo para la lista
            var tamanioArch = ((parseFloat(filessize) / 1024) < 1024) ? (parseFloat(filessize) / 1024).toFixed(2) + " KB" : ((parseFloat(filessize) / 1024) / 1024).toFixed(2) + " MB";
            $("#lista-item-corres .list.active").data("datos").datfile.push({ 'ADJUNTOID': R, 'CORRESID': CORRESID, 'ADJUNTO_SIZE': tamanioArch, 'ADJUNTO_NAME': nombreArchivo })

            $("#lista-item-corres .list.active").attr("data-adjunto",JSON.stringify($("#lista-item-corres .list.active").data("datos").datfile).replace(/"/g, "\""));

            setTimeout(function () {
                mostrarAdjuntos();
            }, 1000);
        } else { mError(R); }
    });
}

/*-----------------------------------------------------------------*/
/*                           Eliminar Adjunto                      */
/*-----------------------------------------------------------------*/
function adjuntoDL(adjuntoName,numero) {//folder,
    var usrs_id = $.jCookies({ get: 'USRID' });
    var CorresId = $("#lista-item-corres .list.active").data("datos").datCorres.CORRESID
    $.when(sp_adjuntoDLjs(adjuntoName, usrs_id, CorresId)).then(function (response) {
        var R = response.d;
        if (!isNaN(R)) {

            if (R == "0") {
                var itemId = $("#lista-item-corres .list.active").data("datos").datCorres.CORRESID
                $("#corres_" + itemId + " #icoAdjun").css("display", "none");
                $("#corres_" + itemId + " .mif-attachment").css("display", "none");
                $("#lista-item-corres .list.active").data("datos").datCorres.ADJUNTO = 2;
            }

            var objArchivos = $("#lista-item-corres .list.active").data("datos").datfile;
            for (var i = 0; i < objArchivos.length; i++) {
                if (objArchivos[i].ADJUNTO_NAME == adjuntoName) {                    
                    $("#lista-item-corres .list.active").data("datos").datfile[i].ADJUNTO_NAME = "";
                    $("#lista-item-corres .list.active").data("datos").datfile[i].ADJUNTOID = -1;
                    $("#lista-item-corres .list.active").data("datos").datfile[i].ADJUNTO_SIZE = 0;
                    $("#lista-item-corres .list.active").data("datos").datfile[i].CORRESID = -1;
                }
            }

            $("#lista-item-corres .list.active").attr("data-adjunto", JSON.stringify($("#lista-item-corres .list.active").data("datos").datfile).replace(/"/g, "\""));


            mostrarAdjuntos();
            $("#trfile_" + numero).remove();
            mOk('Archivo eliminado satisfactoriamente.');
        } else { mError(R); }
    });
}

/*===================DEVUELTO POR CORRECCIONES====================*/
/*================================================================*/
//Carga Form Devuelto por correscciones
function cargaFormCorresDev() {
    var item = $("#lista-item-corres .list.active");

    if (item.length == 0) {
        mError("Debe seleccionar una pieza de correspondencia");
    } else {
        var html = "FRMS/corresDevSV.aspx";
        $("#dialog-modal").fadeIn(function () {
            $("#dialogWin").fadeIn(function () {
                //$("#logoTitulo").addClass("icon mif-file-empty");
                $("#textoTitulo").html("Devolución por correcciones");
                $(".window-content").load(html, function () {
                    //Datepickers
                    $(function () {
                        $("#CORRESDEBFEC").datepicker({ dateFormat: "dd/mm/yy" });
                    });

                    //Set Botón Aceptar
                    var corresId = $("#lista-item-corres .list.active").data("datos").datCorres.CORRESID;
                    $("#btn_corresDebSVAceptar").attr("onclick", "javascript:corresDevSV(" + corresId + ")");

                    loadDelay();
                    fijarDivLoad();
                });
            });
        });
    }
}

//Guardar Devuelto por correcciones
function corresDevSV(id) {
    if (valForm("#frm_corresDev")) {
        $.msgbox("<br /><br /><h1 style='font-size:14px;'>Confirmar solicitud</h1>", {
            type: "confirm",
            buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
        }, function (result) {
            if (result == "Si") {

                //Declara variables y asigna valores
                var corresdebid = -1
                , corresid = id
                , corredebdsc = $("#CORRESDEBDSC").val()
                , corresdebfec = $("#CORRESDEBFEC").val()
                , updateusrid = $.jCookies({ get: 'USRID' });
                
                //Envia deatos
                $.ajax({
                    url: "../WS/CORRESPONDENCIAws.asmx/sp_corresDebSVws",
                    data: "{"
                    + "'corresdebid':" + corresdebid
                    + ",'corresid':" + corresid
                    + ",'corredebdsc':'" + corredebdsc + "'"
                    + ",'corresdebfec':'" + corresdebfec + "'"
                    + ",'updateusrid':'" + updateusrid + "'"
                    + "}",
                    success: function (R) {
                        if (R.d > 0) {
                            mOk("Datos actualizados satisfactoriamente.");
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

//Carga Form recepcion de devuelto por correcciones
function cargaFormCorresDevUp(id1,id2) {
    var item = $("#lista-item-corres .list.active"); //extrae item seleccionade de la lista de corrspondencia

    if (item.length == 0) {//comprueba que se haya seleccionado un itme de la lista
        mError("Debe seleccionar una pieza de correspondencia");
    } else {
        var html = "FRMS/corresDevUpSV.aspx";
        $("#dialog-modal").fadeIn(function () {
            $("#dialogWin").fadeIn(function () {
                //$("#logoTitulo").addClass("mif-bubble");
                $("#textoTitulo").html("Recepción de correspondencia devuelta");
                $(".window-content").load(html, function () {
                    //Datepickers
                    $(function () {
                        $("#CORRESDEB_RECIBFEC").datepicker({ dateFormat: "dd/mm/yy" });
                    });
                    //Timepickers
                    $('#CORRESDEB_RECIBHORA').timepicker();

                    //Set Botón Aceptar
                    $("#btn_corresDevUpSV").on("click", function(){ corresDevUpSV(id1,id2) });
                    loadDelay();
                    fijarDivLoad();
                });
            });
        });

    }
}

//Guarda recibido corregido
function corresDevUpSV(id1,id2) {
    if (valForm("#frm_corresDevUp")) {
        $.msgbox("<br /><br /><h1 style='font-size:14px;'>Confirmar solicitud</h1>", {
            type: "confirm",
            buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
        }, function (result) {
            if (result == "Si") {

                //Declara variables y asigna valores
                var corresdebid = id1
                , corresid = id2
                , corresdeb_recibfec = $("#CORRESDEB_RECIBFEC").val()
                , corresdeb_recibhora = $("#CORRESDEB_RECIBHORA").val()
                , updateusrid = $.jCookies({ get: 'USRID' });

                //Envia deatos
                $.ajax({
                    url: "../WS/CORRESPONDENCIAws.asmx/sp_corresDebUpSVws",
                    data: "{"
                    + "'corresdebid':" + corresdebid
                    + ",'corresid':" + corresid
                    + ",'corresdeb_recibfec':'" + corresdeb_recibfec + "'"
                    + ",'corresdeb_recibhora':'" + corresdeb_recibhora + "'"
                    + ",'updateusrid':'" + updateusrid + "'"
                    + "}",
                    success: function (R) {
                        if (R.d > 0) {
                            mOk("Datos actualizados satisfactoriamente.");
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

/*======================ACTUALIZA FIRMA======================*/
/*================================================================*/
function actualizaFirma(corresId) {
    $.msgbox("<br /><br /><h1 style='font-size:14px;'>El documento ya ha sido firmado?</h1>", {
        type: "confirm",
        buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
    }, function (result) {
        if (result == "Si") {

            var corresid = corresId
            ,updateusrid = $.jCookies({ get: 'USRID' });
            $.when(sp_corresFirmaSVjs(corresid, updateusrid)).then(function (response) {
                var R = response.d;

                if (R > 0) {
                    mOk('Datos guardados satisfactoriamente.');
                    /*Refresca lista de correspndencia*/
                    cargaListCorres();
                    limpiaDet();
                } else { mError(R); }
            });
        }
    });
}

/*======================DESACTIVAR / ACTIVAR PIEZAS DE CORRESPONDENCIA======================*/
/*=========================================================================================*/
function cargaListDesactivar(tipo) {
    //var lista = $("#lista-item-corres li input:checked")
    var lista = $("#lista-item-corres .list input:checked")
    , bien = true
    , corresCont ="";

    if (lista.length == 0) {
        mError("Seleccione al menos una pieza de correspondencia.");
    } else {
        //hijo checkeado y padre no
        for (var i = 0; i < lista.length; i++) {
            corresCont = $(lista[i]).parent().parent().parent().data("datos").datCorres.CORRESID_CONTESTA
            if (corresCont != -1) {
                if ($("#corres_" + corresCont).is(':checked') == false) {
                    mError("Seleccione registros padre.");
                    bien = false;
                    return false;
                }
            }
        }

        if (bien) {
            $.msgbox("<br /><br /><h1 style='font-size:14px;'>¿Está seguro de querer Activar/Desactivar los items seleccionados?</h1>", {
                type: "confirm",
                buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
            }, function (result) {
                if (result == "Si") {

                    var listaT = $(lista[0]).parent().parent().parent().data("datos");
                    var activo = 1;
                    if (listaT.datCorres.ACTIVO == 1) {
                        activo = 2;
                    }

                    $.when(sp_corresActivoSVjs(listaT.datCorres.CORRESID, activo, $.jCookies({ get: 'USRID' }))).then(function (response) {
                        var R = response.d;

                        if (R > 0) {
                            mOk('Datos actualizados satisfactoriamente.');
                            /*Refresca lista de correspndencia*/
                            if (document.location.pathname.indexOf("correspondencia.aspx") >= 0) {
                                cargaListCorres();
                            } else {
                                if ($("#tabs-1").css('display') == "block") {
                                    cargaListCorresByID();
                                } else if ($("#tabs-2").css('display') == "block") {
                                    cargaListCorresByCodRef();
                                } else if ($("#tabs-3").css('display') == "block") {
                                    cargaListCorresByContid();
                                } else if ($("#tabs-4").css('display') == "block") {
                                    cargaListCorresByAsunto();
                                } else if ($("#tabs-5").css('display') == "block") {
                                    cargaListCorresByFeha();
                                }
                            }
                            limpiaDet();
                            if (tipo == 1) { cargaListCorres();}                            
                        } else { mError(R); }
                    });
                }
            });
        }
    }
}

//crea Datos corresActivoSV
function creaDatActivo(item) {
    var datGen = $(item).data("datos").datCorres
    , updateusrid = $.jCookies({ get: 'USRID' })
    , activo = 1
    , res = "";
    if (datGen.ACTIVO == 1) {
        activo = 2;
    }

    res = "{"
        + "'corresid':'"+datGen.CORRESID+"'"
        + ",'activo':'"+activo+"'"
        + ",'updateusrid':'"+updateusrid+"'"
        +"}";

    return res;
}

/************Verificar Posesión de la(s) Piezas de Correspondencia**************/
function verifPosCorres(datGen, datRemi) {
    var res = true;
    if (datRemi.length > 0) {
        if (
        (datRemi[0].CLM_USRS_ID != $.jCookies({ get: 'USRID' })//Si es el mismo usuario que digitó
        && datRemi[0].RESPONSABLEID != $.jCookies({ get: 'USRID' }))//Si esta en poseción del usuario actual
        || datRemi[0].REMCFR_RCBD == 2//si esta confirmada la remision
        ) 
        { res = false; }
    } else {
        if (datGen.INSERTUSRID != $.jCookies({ get: 'USRID' }) && datGen.RESPONSABLEID != $.jCookies({ get: 'USRID' })) { res = false; }
    }

    return res;
}

/***********Restriciones de Menú************/
function restricMenu(datGen, datRemi, datMargi) {
    /*******Si esta en posesión*****/
    if (verifPosCorres(datGen, datRemi) && datGen.CORRESDEB == 2) {
        $("#submenuitem #archivar").css('display', 'block');
        $("#submenuitem #enviar").css('display', 'block');
        $("#submenuitem #eliminar").css('display', 'block');
        $("#submenuitem #editar").css('display', 'block');
        $("#submenuitem #corresDeb").css('display', 'block');
    } else {
        $("#submenuitem #archivar").css('display', 'none');
        $("#submenuitem #enviar").css('display', 'none');
        $("#submenuitem #corresDev").css('display', 'none');
        $("#submenuitem #eliminar").css('display', 'none');
        $("#submenuitem #editar").css('display', 'none');
    }

    /****Si tiene marginaciones o remisiones***/
    if ((datRemi!=null && datRemi.length > 0) || datMargi.length > 0 || datGen.CORRESDEB == 1) {
        $("#submenuitem #eliminar").css('display', 'none');        
        
    } else if (datGen.CATEGOID != 2) {
        /********Si Tiene hijos*************/
        var items = $("#lista-item-corres .list");
        for (var i = 0; i < items.length; i++) {
            var dGenItem = $(items[i]).data("datos").datCorres;

            if (dGenItem.CORRESID_CONTESTA == datGen.CORRESID) {
                $("#submenuitem #eliminar").css('display', 'none');        
                $("#submenuitem #editar").css('display', 'none');        
            }
        }
    }
    /*****Si tiene padre****/
    //Si esta PEndiente de Firma
    if (datGen.REQFIRMA == 1) {
        $("#submenuitem #adjunto").css('display', 'none');        
    } else {
        $("#submenuitem #adjunto").css('display', 'block');        
    }

}

/*************Limpia detalle*******/
function limpiaDet() {
    $("#detalle-item-corres").html("");
    $(".detalle-margi-corres").html("");
}

/****Carga lista****/
function cargaListaCorresAContestar(lista) {
    var datGen = "", nombre = "";
    var contenido = ""
                + "<b>Lista correspondencia</b>"
                + "<table class='center' style='width:100%; clear:both;'>"
                + "    <thead><tr>"
                + "        <td></td>"
                + "        <td>ID</td>"
                + "        <td>Detalle</td>"
                + "        <td><input type='radio' name='CORRESID_CONTESTA' id='CORRESID_CONTESTA' value='-1' checked></td>"
                + "    </tr></thead>"
                + "    <tbody>";

    for (var i = 0; i < lista.length; i++) {
        datGen = $(lista[i]).parent(".list").data("datos").datCorres;
        if (datGen.CORRESID_CONTESTA == -1) {
            if (datGen.CATEGOID == 1) {
                //Nombre remite
                nombre = "<b>Remitente: </b>"
                + datGen.CONTNOMBRE_REMITE + " | "
                + datGen.CONTUNIDAD_REMITE + " | "
                + datGen.CONTINST_REMITE;
                
                contenido += ""
                + "<tr>"
                + "	<td><span class='pictogram registrado item-logo' style='font-size:30px;'></span></td> "
                + "	<td>" + datGen.CORRESID + "</td> "
                + "    <td>" + nombre
                + "    <br /><b>Fecha recibido: </b>" + datGen.NOTARECIBFEC
                + "    <b>Fecha elaborado: </b>" + datGen.NOTAELABFEC
                + "    <br /><b>Asunto: </b>" + datGen.ASUNTO + "</td>"
                + "    <td><input type='radio' name='CORRESID_CONTESTA' id='CORRESID_CONTESTA' value='" + datGen.CORRESID + "'></td>"
                + "</tr>";
            } else if (datGen.CATEGOID == 3) {
                //Nombre dirigido
                nombre = "<b>Destinatario: </b>"
                + datGen.CONTNOMBRE_DIRIGIDO + " | "
                + datGen.CONTUNIDAD_DIRIGIDO + " | "
                + datGen.CONTINST_DIRIGIDO;
                
                contenido += ""
                + "<tr>"
                + "	<td><span class='pictogram nota item-logo' style='font-size:30px;'></span></td> "
                + "	<td>" + datGen.CORRESID + "</td> "
                + "    <td>" + nombre
                + "    <br /><b>Fecha elaborado: </b>" + datGen.NOTAELABFEC
                + "    <br /><b>Asunto: </b>" + datGen.ASUNTO + "</td>"
                + "    <td><input type='radio' name='CORRESID_CONTESTA' id='CORRESID_CONTESTA' value='" + datGen.CORRESID + "'></td>"
                + "</tr>";
            }
        }
    }
    contenido += ""
            + "    </tbody>"
            + "</table>";

    return contenido;
}

/*******Ver lista correspondencia a contestar******/
function verListCorres() {
    if ($("div.list-aContes").css('display') == "none") {
        $("div.list-aContes").fadeIn(500);
        $(".corres-ver").html("<a class='button link'><span class='mif-expand-less'></span> Ocultar...</a>");
    } else {
        $("div.list-aContes").fadeOut(500);
        $(".corres-ver").html("<a class='button link'><span class='mif-expand-more'></span> Respuesta de...</a>");
    }
}

function verList(div,btn) {
    if ($(div).css('display') == "none") {
        $(div).fadeIn(500);
        $(btn).html("<a class='button link place-right'><span class='mif-expand-less'></span> Ocultar...</a>");
    } else {
        $(div).fadeOut(500);
        $(btn).html("<a class='button link place-right'><span class='mif-expand-more'></span> Mostrar...</a>");
    }
}

