$(document).ready(function () {
    INITcorrespondencia();
    $("#home").css("background", "#16499a");

    $("#cbOrdenar").change(function () {
        cargaListCorres();
    });
});

// Ejemplo
//        var CATS = $.jCookies({ get: 'CATS' });
//        alert(CATS.categorias[0].categonombre)
var CATS = "";

function INITcorrespondencia() {
    /*Lista Correspondencia*/
    cargaListCorres();
    /*Ini filtro*/
    inifiltros();

    $("#corres-ingre").click(function () { cargaFormCorres(); });
    $("#res-margi-engre").click(function () { cargaFormResMargi(); });
    $("#nota-ingre").click(function () { cargaFormNota(); });

    $("#menu-item-corres #remitir").click(function () { cargaFrmRemitir(); });
    $("#menu-item-corres #confiRemi").click(function () { cargaConfiRemi(); });
    $("#menu-item-corres #marginar").click(function () { cargaFrmMarginar(); });
    $("#menu-item-corres #refrescar").click(function () { cargaListCorres(); });
    $("#menu-item-corres #desactivar").click(function () { cargaListDesactivar(); });
    $("#menu-item-corres #selec").click(function () {
        selctTodo("#lista-item-corres .list");
    });       
    
    $("#submenuitem #archivar").click(function () { cargaFormArchivo(); });
    $("#submenuitem #enviar").click(function () { cargaFormEnviar(); });
    $("#submenuitem #adjunto").click(function () { cargaUpFile() });
    $("#submenuitem #imprimir").click(function () { });
    $("#submenuitem #eliminar").click(function () { elimCorres(); });
    $("#submenuitem #editar").click(function () { editaCorres(); });
    $("#submenuitem #corresDev").click(function () { cargaFormCorresDev(); });

    /*$("#dialogWin").click(function (event) {
        event.stopPropagation();
        $(".btn-close").click();
    });*/
    /*Set Cookies CATALOGOS*/
    if (CATS == "") {
        var grupo = $.jCookies({ get: 'GRUPO' });
        $.when(sp_catalogosGTjs(grupo)).then(function (response) {
            var R = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            CATS = response.d;
        });
    }


    //ini Print
    $("#print").attr("href", "javascript:void( 0 )")
	.click(function () {
		// Print the DIV.
		$(".con-imprimir").print();
		// Cancel click event.
		return (false);
	});

}

