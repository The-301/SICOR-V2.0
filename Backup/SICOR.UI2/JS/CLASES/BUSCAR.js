function limpiaDetalle(){
    $(".recuadro div#detalle-adjunto").empty();
    $(".recuadro div#detalle-item-corres").empty();
    $(".recuadro div.detalle-margi-corres").empty();
}

//cargar lista instituciones
function cargaListaInst() {
    var grupo = $.jCookies({ get: 'GRUPO' });
    $.when(contInstGTjs(grupo)).then(function (response) {
        var R = response.d;

        var contenido = "";
        for (var i = 0; i < R.length; i++) {
            contenido += "<option value='" + R[i].CONTINST + "'>" + R[i].CONTINST + "</option>";
        }

        $("#CONTINST").append(contenido);
    });
}

/*******************CARAGA LISTA RESULTADO DE BUSQUEDA POR INSTITUCION*****************************/

//function cargaListCorresByInst() {
//    if (valForm("#tabs-1")) {
//        var inst = $("#CONTINST").val();
//        $.when(corresFullByInstGTwsjs(inst)).then(function (response) {
//            var R = response.d;

//            generaListCorresFULL(R,2);
//        });
//    }
//}

/*******************CARAGA LISTA RESULTADO DE BUSQUEDA POR CONTACTO*****************************/

function cargaListCorresByContid() {
    //if (valForm("#tabs-3")) {
    if ($("#CONTID").val() != "" || $("#oTexto").val() != "") {
        limpiaDetalle();
        var contacto = $("#CONTID option:selected").text().split(" ");
        var longi = $("#CONTID option:selected").text().split(" ").length; 
        var cont = (contacto.splice(0, longi - 1).join(" "));
        var tipo = $("#TIPOBUSQUEDA").val();
        var texto = $("#oTexto").val();
        var grupo = $.jCookies({ get: 'GRUPO' });
        $.when(corresByContGTjs(tipo, cont, texto,grupo)).then(function (response) {
            var R = response.d;
            generaListCorresFULL(R, 2);
            $("#oTexto").val("");
        });
    }
}

/*******************CARAGA LISTA RESULTADO DE BUSQUEDA POR ASUNTO*****************************/

function cargaListCorresByAsunto() {
    if (valForm("#tabs-4")) {
        limpiaDetalle();
        var asunto = $("#ASUNTO").val();
        var grupo = $.jCookies({ get: 'GRUPO' });
        $.when(corresByAsuntoGTjs(asunto,grupo)).then(function (response) {
            var R = response.d;

            generaListCorresFULL(R,2);
        });
    }
}

/*******************CARAGA LISTA RESULTADO DE BUSQUEDA POR FECHA*****************************/

function cargaListCorresByFeha() {
    if (valForm("#tabs-5")) {
        limpiaDetalle();
        var fech01 = $("#FECH01").val();
        var fech02 = $("#FECH02").val();
        var grupo = $.jCookies({ get: 'GRUPO' });
        $.when(corresByFechajs(fech01, fech02,grupo)).then(function (response) {
            var R = response.d;

            generaListCorresFULL(R,2);
        });
    }
}

/*******************CARAGA LISTA RESULTADO DE BUSQUEDA POR CORREID*****************************/

function cargaListCorresByID() {
    if (valForm("#tabs-1")) {
        limpiaDetalle();
        var corresid = $("#CORRESID").val();
        var grupo = $.jCookies({ get: 'GRUPO' });
        $.when(corresByCorresIdGTjs(corresid,grupo)).then(function (response) {
            var R = response.d;

            generaListCorresFULL(R, 2);
        });
    }
}

/*******************CARAGA LISTA RESULTADO DE BUSQUEDA POR COD/REF*****************************/

function cargaListCorresByCodRef() {
    if (valForm("#tabs-2")) {
        limpiaDetalle();
        var cod = $("#CODREF").val();
        var grupo = $.jCookies({ get: 'GRUPO' });
        $.when(corresByCodRefGTjs(cod,grupo)).then(function (response) {
            var R = response.d;

            generaListCorresFULL(R, 2);
        });
    }
}

/*** VERIFICA SI HAY UNA CORRESPONDENCIA ***/
function repetirBusqueda() {
    /* $("#CORRESID").val($.jCookies({ get: 'USRNOM' })); */
}

