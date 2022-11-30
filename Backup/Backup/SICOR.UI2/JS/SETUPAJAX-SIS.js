/*************************************Ajax*************************************************/
$.ajaxSetup({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    beforeSend: function () {
        if ($.jCookies({ get: 'USRID' }) == false) {
            window.location = "../index.aspx";
        } else {
            //            $.jCookies({ name: 'USRID', value: $.jCookies({ get: 'USRID' }), minutes: 60 })
            $("#div_load").fadeIn();
        }
        
    },
    complete: function () {
        $("#div_load").delay(200).fadeOut();
    },
    error: function (result) {
    }
});

function ir(pag, div) {
    if ($.jCookies({ get: 'USRID' }) == false) {
        window.location = "../index.aspx";
    } else {
        $("#div_load").fadeIn();

        $(div).hide();
        $(div).load(pag, function () {
            if ($.jCookies({ get: 'USRID' }) == false) {
                window.location = "../index.aspx";
            } else {
                $(this).fadeIn("fast");

                $("#div_load").ajaxStop(function () {
                    $(this).delay(200).fadeOut();
                });
            }
        });
    }
}

