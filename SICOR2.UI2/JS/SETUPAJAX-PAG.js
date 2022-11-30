/*************************************Ajax*************************************************/
$.ajaxSetup({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    beforeSend: function () {
        //$("#div_load").fadeIn();
    },
    complete: function () {
        $("#div_load").delay(200).fadeOut();
    },
    error: function (result) {
        var MensajeError = 'ERROR ' + result.status + ' ' + result.statusText;
        if (result.status == '500') {
            MensajeError = 'ERROR ' + result.status + ' ' + 'Asegurese de que los datos que ingreso son válidos';
        } else if (result.status == '404' || result.status == '401') {
            MensajeError = 'ERROR ' + result.status + ' ' + 'El tiempo de sesión finalizó';
            location.reload();
        }
        mError(MensajeError);
    }
});

function loadDelay() {
    $("#div_load").delay(200).fadeOut();
}

function ajaxLodGif() {
    var load = ""
        + "<div id = 'div_load' style='background:#000000; opacity:.7; z-index:10000; width:100%; height:100&; display:none;'>"
        + " <div style='background:url(\"IMAS/ajax-loader.gif\"); opacity:.7; z-index:10001;' class='center'>"
        + " </div>"
        + "</div>"
    return load;
}

function ir(pag, div) {

    $("#centro.divLoad").fadeIn();

    $(div).hide();
    $(div).load(pag, function () {
        $(this).fadeIn("fast");

        $("#centro.divLoad").ajaxStop(function () {
            $(this).delay(200).fadeOut();
            $("#derecha.divLoad").hide();
        });
    });
}

function log() {
    var html = "login.aspx";
    $.lightbox(html, {
        width: 400,
        height: 250,
        'onOpen': function () {
        }
    });
}