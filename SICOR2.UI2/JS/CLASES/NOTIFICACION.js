//busca notificaciones para mostrar por usuario
function cargaNotificacion() {
    var usrs_id = $.jCookies({ get: 'USRID' });

    $.when(sp_notificacionGTjs(usrs_id)).then(function (response) {
        var R = response.d;
        var contenido = "";//<div style='text-align:left !important;'>";
        $.each(R, function (i, e) {
            contenido += "<div class='row' id='tr_" + e.MENSAJEID + "'><button class='button warning place-right' onclick='borraNotificacion(" + e.MENSAJEID + ")'><span class='mif-chevron-thin-up'></span> Ocultar</button><b>Fecha</b>:" + e.UPDATEFECHA + "<br />"
                        + e.MENSAJE + "<br />"
                        + "<hr class='thin' /></div>";
        });
        contenido += "";//</div>";

        if (R.length > 0) {
            var html = "FRMS/notificacionUp.aspx";
            /*$.lightbox(html, {
                'onOpen': function () {
                    $("#frm_notifica").html(contenido)
                },
                width: 700,
                height: 450
            });*/
            $("#dialog-modal").fadeIn(function () {
                $("#dialogWin").fadeIn(function () {
                    $("#logoTitulo").addClass("mif-bubble");
                    $("#textoTitulo").html("Notificaciones");
                    $(".window-content").load(html, function () {
                        $("#frm_notifica").html(contenido); 
                        loadDelay();
                        fijarDivLoad();
                    });
                });
            });

        }
    });
}

function borraNotificacion(mensajeid) {
    var usrs_id = $.jCookies({ get: 'USRID' });

    $.when(sp_notificacionUPjs(mensajeid, usrs_id)).then(function (response) {
        var R = response.d;

        if (R == "") {
            $.jCookies({ name: 'PRIMERAVEZ', value: "2" });
            $("#tr_" + mensajeid).slideUp(500, 'swing', function () {
                var conti = $("#frm_notifica div");
                var tot = 0;
                $.each(conti, function (i, e) {
                    if ($(e).css("display") == "inline" || $(e).css("display") == "block") {
                        tot++;
                    }
                });
                
                if (tot == 0) {
                    closeWin();
                }
            });
        } else {
            mError("Error interno, inténtelo nuevamente.");
        }
    });

}