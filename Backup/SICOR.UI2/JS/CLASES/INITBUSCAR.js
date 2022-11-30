$(document).ready(function () {
    $("#cuadroFiltro").css("padding-left", (parseInt($("#menu-item-corres").width()) + 1));

    $("#buscarCorres").css("background", "#16499a");

    $("#menutabb").tabControl();
    $("#menutabb .frames").show();
    resetForm(".container_12");
    inifiltros(); //CORRESPONDENCIA.js

    //Carga lista instituciones
    cargaListaInst();
    //Carga Contactos
    cargaListaContactos("#CONTID");
    //    $("#CONTID").select2({
    //    minimumInputLength: 1
    //    });

    //Set Botones
    $(".nav #salir").click(function () { cierraSecion(); });
    //$(".nav #bandejaMensajes").click(function () { document.location = "bandejaMensajes_in.aspx" });
    $(".nav #contactos").click(function () { document.location = "contactos.aspx" });
    $(".nav #buscarCorres").click(function () { document.location = "busqueda.aspx" });
    $(".nav #imprimirReps").click(function () { document.location = "imprimir.aspx" });
    $(".nav #home").click(function () { document.location = "correspondencia.aspx" });

    $("#submenuitem #adjunto").click(function () { cargaUpFile() });
    $("#submenuitem #imprimir").click(function () { });

    $("#menu-item-corres #desactivar").click(function () { cargaListDesactivar(); });

    $(".calendario").click(function () {
        $(this).parent().children("input").click();
    });

    $(function () {
        $("#tabs").tabs();
    });

    //Selects
    $("#CONTINST").select2({
        minimumInputLength: 1
    });
    $("#CONTID").select2({
        minimumInputLength: 1
    });

    //Datepickers
    $(function () {
        $("#FECH01").datepicker({ dateFormat: "dd/mm/yy" });
    });
    $(function () {
        $("#FECH02").datepicker({ dateFormat: "dd/mm/yy" });
    });

    //ini Print
    $("#print").attr("href", "javascript:void(0)")
	    .click(function () {
		// Print the DIV.
		$(".con-imprimir").print();
		// Cancel click event.
		return (false);
	});

    //Manual de Ayuda
    //$(".nav #manualAyuda").click(function () { window.open("../AYUDA/SICOR-ManualDeUsuario.pdf") });

    $("#menutabb ul.tabs li a").on("click", function () {
        $("#CORRESID, #CODREF,#FECH02,#FECH01,#oTexto,#ASUNTO").val("");
        $("#CONTID").val("-1");
    });
});