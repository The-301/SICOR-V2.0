/* USUARIOS */


$(document).ready(function () {
    $("#cuenta").focus();
});

function OnKeyUp(obj, event) {
    if (event) {
        var charCode = event.keyCode || event.which;
        if (parseInt(charCode) === 13) {
            verifUsuario();
        }
    }
}

/*******Caraga Cookies lista de Contactos**********/
function cargaListaUsuarios() {
    var grupo = $.jCookies({ get: 'GRUPO' });
    $.when(sp_usuariosGTjs(grupo)).then(function (response) {
        var R = (typeof response.d == 'string') ? eval('(' + response.d + ')') : response.d;
        var USU = response.d;
        var item = "";
        for (var i = 0; i < USU.length; i++) {
        //for (var i = USU.length; i > 0; i--) {
            item += "<option value='" + USU[i].ID + "'>" + USU[i].NOM + " " + USU[i].APE + "</option>";
        }
        $("#CLM_USRS_ID").append(item);

        if ($("#RESPONSABLEID") != "undefined") {
            var id = $.jCookies({ get: 'USRID' });
            $("#RESPONSABLEID").append(item);
            $("#RESPONSABLEID").val(id);
        }
    });
}

/*********Verificar Cuenta*************/
function verifUsuario() {
    if (valForm('#frm_log')) {
        var cuenta = $("#cuenta").val()
        , pass = $("#pass").val();

        $.when(sp_usuariosVerifGTjs(cuenta, pass)).then(function (response) {
            var R = (typeof response.d == 'string') ? eval('(' + response.d + ')') : response.d;

            if (response.d == "") {
                mError("Usuario o contraseña incorrectos.");
            } else {
                $.jCookies({ name: 'USRID', value: R[0].ID });
                $.jCookies({ name: 'USRNOM', value: (R[0].NOM + " " + R[0].APE) });
                $.jCookies({ name: 'USREMAIL', value: R[0].EMAIL });
                $.jCookies({ name: 'PRIMERAVEZ', value: "1" });
                $.jCookies({ name: 'GRUPO', value: R[0].GRUPO });
                document.cookie = "CLASE=" + R[0].GRUPO;
                window.location = "PAGS/correspondenciav2.aspx";
            }
        });
    }
}

/*****  *Cerrar Secion*******/
function cierraSecion() {
    $.msgbox("<br /><br /><h1 style='font-size:14px;'>¿Está seguro de querer salir del sistema?</h1>", {
        type: "confirm",
        buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
    }, function (result) {
        if (result == "Si") {
            $.jCookies({ erase: 'USRID' });
            $.jCookies({ erase: 'USRNOM' });
            $.jCookies({ erase: 'USREMAIL' });
            $.jCookies({ erase: 'PRIMERAVEZ' });
            $.jCookies({ erase: 'GRUPO' });
            window.location = "../index.aspx";
        }
    });
}

function cargaFrmModContra() {
    var html = "FRMS/usuariosUpPassSV.aspx";
    $("#dialog-modal").fadeIn(function () {
        $("#dialogWin").fadeIn(function () {
            $("#logoTitulo").addClass("mif-key");
            $("#textoTitulo").html("Modificar contraseña");
            $(".window-content").load(html,function () {  
                //Set boton aceptar
                $("#btn_usrUpPassOK").bind('click', function () { modContra(); });              
                
                loadDelay();
                fijarDivLoad();
            });
        });
    });
}

function modContra() {
    var id = $.jCookies({ get: 'USRID' })
    , pass =   $("#frm_usuariosUpPass #pass").val()
    , npass =  $("#frm_usuariosUpPass #npass").val()
    , cnpass = $("#frm_usuariosUpPass #cnpass").val();

        if (valForm("#frm_usuariosUpPass")) {
            $.msgbox("<br /><br /><h1 style='font-size:14px;'>Confirmar solicitud</h1>", {
                type: "confirm",
                buttons: [
                { type: "submit", value: "Si" },
                { type: "submit", value: "No" }
              ]
            }, function (result) {
                if (result == "Si") {

                    $.when(sp_usuariosUpPassSVjs(id, pass, npass)).then(function (response) {
                        var R = response.d;

                        if (R[0].ID === -1) {
                            mError("La contraseña actual es incorrecta");
                            $("#frm_usuariosUpPass #pass").select();
                        } else {
                            mOk("Contraseña actualizada.");
                            closeWin();
                        }
                    });
                }
            });
        }
}