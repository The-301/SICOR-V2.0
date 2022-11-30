/*****Carga formulario de remiión*****/
function cargaFrmRemitir() {
    var listaRemitir = $("#lista-item-corres .list label input:checked");
    
    if (listaRemitir.length == 0) {
        mError("Seleccione al menos una pieza de correspondencia.");
    } else {
        var html = "FRMS/remitirSV.aspx";
        $("#dialog-modal").fadeIn(function () {
            $("#dialogWin").fadeIn(function () {
                $("#logoTitulo").addClass("icon mif-file");
                $("#textoTitulo").html("Remitir correspondencia");
                $(".window-content").load(html, function () {
                    /*Carga listado remitir*/
                    $("#frm_remitir div.detalle-margi-corres").html(cargaLista(listaRemitir));

                    /*************Set Usuarios**********/
                    cargaListaUsuarios();
                    //Set REMITENTE
                    $("#CLM_USRS_ID").select2();

                    /*********Datepickers**********/
                    $(function () {
                        $("#REMFEC").datepicker({ dateFormat: "dd/mm/yy" });
                    });
                    loadDelay();
                    fijarDivLoad();
                 });
            });
        });
    }
}

/**********Carga Fomr Confirmación de Remisión***************/
function cargaConfiRemi() {
    var contenido = ""
        + "<b>Lista correspondencia</b>"
        + "<table class='center full-size' id='tb_confirRemi' style='clear:both'>"
        + "    <thead><tr>"
        + "        <td></td>"
        + "        <td>ID</td>"
        + "        <td>Detalle</td>"
        + "        <td><input id='checT' type='checkbox' style='width:16px;height:16px;' onClick='javascript:selctTodo(\"#tb_confirRemi tbody\")' /></td>"
        + "    </tr></thead>"
        + "    <tbody>";
    var usrid = $.jCookies({ get: 'USRID' });
    var grupo = $.jCookies({ get: 'GRUPO' });

    $.when(sp_remiConfirByUsridGTjs(usrid,grupo)).then(function (response) {
        var R = response.d;

        //Cara Lista
        var ico = ""
            , remiDesti = ""
            , asunInstruc = "";
        for (var i = 0; i < R.length; i++) {
            ico = "<span class='mif-file-text registrado item-logo'></span>";

            remiDesti = "<b>Remitente de la correspondencia: </b>"
            + R[i].datCorres[0].CONTNOMBRE_REMITE + " | "
            + R[i].datCorres[0].CONTUNIDAD_REMITE + " | "
            + R[i].datCorres[0].CONTINST_REMITE;

            asunInstruc = "<b>Asunto: </b> " + R[i].datCorres[0].ASUNTO;

            //sustituye valores si es Respueta de marginado
            if (R[i].datCorres[0].CATEGOID == 2) {
                remiDesti = "<b>Remitente de la respuesta de marginado: </b>" + R[i].datMargi[0].CONTNOMBRE;
                asunInstruc = "<b>Instrucciones: </b>" + R[i].datMargi[0].MARGMOTIVO
                    + " <br /><b>Forma Respuesta: </b>" + R[i].datCorres[0].MARGINAFORMARES;

                ico = "<span class='mif-map marginar item-logo'></span>";
            } else if (R[i].datCorres[0].CATEGOID == 3) {
                ico = "<span class='mif-file-empty nota item-logo'></span>";
                remiDesti = "<b>Destinatario de la nota: </b>"
                + R[i].datCorres[0].CONTNOMBRE_DIRIGIDO + " | "
                + R[i].datCorres[0].CONTUNIDAD_DIRIGIDO + " | "
                + R[i].datCorres[0].CONTINST_DIRIGIDO;
            }

            //Concatena contenido de tabla detalle
            contenido += ""
            + "<tr id='remit_" + R[i].datRemi.REMID + "'>"
            + "     <td>" + ico + "</td>"
            + "     <td>" + R[i].datCorres[0].CORRESID + "</td>"
            + "     <td>"
            + "     <b>Remitido por: </b>" + R[i].datRemi.INSERTUSRNOM + " " + R[i].datRemi.INSERTUSRAPE + "</br>"
            + "     <b>Remitido el: </b>" + R[i].datRemi.REMFEC + "</br></br>"
            + "     " + remiDesti + "</br>"
            + "     " + asunInstruc + "</br>"
            + "     <b>Fecha de recibido: </b>" + R[i].datCorres[0].NOTARECIBFEC + "</td>"
            + "     <td><center><input type='checkbox' style='width:16px;height:16px;' class='remiCheck' /></center></td>"
            + "</tr>"
        }
        contenido += "</tbody></table>";

        var html = "FRMS/remitirConfirSV.aspx";
        $("#dialog-modal").fadeIn(function () {
            $("#dialogWin").fadeIn(function () {
                $("#logoTitulo").addClass("icon mif-file");
                $("#textoTitulo").html("Confirmar remisión de correspondencia");
                $(".window-content").load(html, function () {
                    /*Carga listado remitir*/
                    $("#frm_confiRemi div.detalle-margi-corres").html(contenido);

                    //Set tabla
                    $('#frm_confiRemi div.detalle-margi-corres table').dataTable({
                        "bPaginate": false,
                        "sPaginationType": "full_numbers",
                        "bLengthChange": false,
                        "bFilter": true,
                        "bSort": true,
                        "bInfo": false,
                        "bAutoWidth": false//,
                        //"iDisplayLength": 5
                    });
                    loadDelay();
                    fijarDivLoad();
                });
            });
        });
    });
}

/*********Confirmacion de Recepción de Remisión SV***************/
function confirRemiSV() {
    var itemCheked = $("#frm_confiRemi div.detalle-margi-corres table td input.remiCheck:checked");

    if (itemCheked.length == 0) { mError("Debe seleccionar al menos una pieza de Correspondencia.") }
    else {
        $.msgbox("<br /><br /><h1 style='font-size:14px;'>¿Está seguro de querer realizar la acción?</h1>", {
            type: "confirm",
            buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
        }, function (result) {
            if (result == "Si") {
                var remid = "[";
                for (var i = 0; i < itemCheked.length; i++) {
                    remid += "" + $(itemCheked[i]).parent().parent().parent().attr('id').substring(6) + ",";
                }
                remid = remid.substring(0, (remid.length - 1)) + "]";

                $.ajax({
                    url: "../WS/REMITIDOws.asmx/sp_remiConfirSVws",
                    data: "{'remid':" + remid + "}",
                    success: function (R) {
                        if (R.d > 0) {
                            mOk("Datos actualizados satisfactoriamente.");
                            closeWin();

                            /*Refresca lista de correspndencia*/
                            cargaListCorres();
                            limpiaDet();
                        } else { mError(R.d); }
                    }
                })
            }
        });
    }
}

/****Carga lista****/
function cargaLista(listaRemitir) {
    var datGen = "", nombre = "";
    var contenido = ""
                + "<b>Lista Correspondencia</b>"
                + "<table class='center full-size'>"
                + "    <thead><tr>"
                + "        <td></td>"
                + "        <td>Remi/Diri</td>"
                + "        <td>Institución</td>"
                + "        <td>Asunto</td>"
                + "        <td>Fecha</td>"
                + "    </tr></thead>"
                + "    <tbody>";

    for (var i = 0; i < listaRemitir.length; i++) {
        datGen = $(listaRemitir[i]).parent().parent().parent(".list").data("datos").datCorres;
        if (datGen.CATEGOID == 1) {
            //Nombre remite
            if (datGen.CONTNOMBRE_REMITE == "") { nombre = datGen.CONTUNIDAD_REMITE }
            else { nombre = datGen.CONTNOMBRE_REMITE }
            
            contenido += ""
                + "<tr>"
                + "	<td><span class='mif-file-text registrado item-logo'></span></td> "
                + "    <td>" + nombre + "</td>"
                + "    <td>" + datGen.CONTINST_REMITE + "</td>"
                + "    <td>" + datGen.ASUNTO + "</td>"
                + "    <td>" + datGen.NOTARECIBFEC + "</td>"
                + "</tr>";
        } else if (datGen.CATEGOID == 2) {

            var datMargiRes = $("#corres_" + datGen.CORRESID_CONTESTA).data("datos").datmargi
            , nomMargi = ""
            , motivoMargi = "";
            for (var j = 0; j < datMargiRes.length; j++) {
                if (datMargiRes[j].MARGID == datGen.MARGINAID) {
                    nomMargi = datMargiRes[j].CONTNOMBRE
                    motivoMargi = datMargiRes[j].MARGMOTIVO
                }
            }

            contenido += ""
                + "<tr>"
                + "	    <td><span class='mif-map marginar item-logo'></span></td> "
                + "    <td>" + nomMargi + "</td>"
                + "    <td>MINEC</td>"
                + "    <td>" + motivoMargi + "</td>"
                + "    <td>" + datGen.NOTARECIBFEC + "</td>"
                + "</tr>";
        } else if (datGen.CATEGOID == 3) {
            //Nombre dirigido
            if (datGen.CONTNOMBRE_DIRIGIDO == "") { nombre = datGen.CONTUNIDAD_DIRIGIDO }
            else { nombre = datGen.CONTNOMBRE_DIRIGIDO }

            contenido += ""
                + "<tr>"
                + "	<td><span class='mif-file-empty nota item-logo'></span></td> "
                + "    <td>" + nombre + "</td>"
                + "    <td>" + datGen.CONTINST_DIRIGIDO + "</td>"
                + "    <td>" + datGen.ASUNTO + "</td>"
                + "    <td>" + datGen.NOTARECIBFEC + "</td>"
                + "</tr>";
        }
    }
    contenido += ""
            + "    </tbody>"
            + "</table>";

    return contenido;
}

/******Remitidos SV***************/
function remitidosSV() {
    if (valForm('#frm_remitir')) {
        $.msgbox("<br /><br /><h1 style='font-size:14px;'>¿Está seguro de querer realizar la acción?</h1>", {
            type: "confirm",
            buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
        }, function (result) {
            if (result == "Si") {

                var listaRemitir = $("#lista-item-corres .list label input:checked");

                var Datos = "Datos:[";
                for (var i = 0; i < listaRemitir.length; i++) {
                    datGen = $(listaRemitir[i]).parent().parent().parent(".list").data("datos").datCorres;
                    Datos += '{'
                    + '"remid":"-1"'
                    + ',"clm_usrs_id":"' + $("#frm_remitir #CLM_USRS_ID").val() + '"'
                    + ',"corresid":"' + datGen.CORRESID + '"'
                    + ',"remfec":"' + $("#frm_remitir #REMFEC").val() + '"'
                    + ',"updateusrid":"' + $.jCookies({ get: 'USRID' }) + '"'
                    + '},';
                }
                Datos = Datos.substring(0, Datos.length - 1)
                Datos += "]";

                $.when(sp_remitidosSVjs(Datos)).then(function (response) {
                    var R = (typeof response.d) == 'string' ?
                    eval('(' + response.d + ')') :
                    response.d;

                    if (R > 0) {
                        mOk('Datos Guardados Satisfactoriamente.');
                        closeWin();

                        /*Refresca lista de correspndencia*/
                        cargaListCorres();
                        limpiaDet();
                    } else { mError(response); }
                });
            }
        });

    }
}

