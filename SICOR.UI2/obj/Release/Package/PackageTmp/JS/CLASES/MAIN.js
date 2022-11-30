function INITmain() {
    if ($.jCookies({ get: 'PRIMERAVEZ' }) == "1") { cargaNotificacion(); }

    $(document).keyup(function (e) {
        if (e.keyCode == 27) { closeWin(); }
    });

    $(".btn-close").click(function () { closeWin(); });

    $("#dialogWin").on("fadeIn", function () {
        $("body").addClass("modal-open");
    }).on("fadeOut", function () {
        $("body").removeClass("modal-open");
    });

    //Notif mensajes
    notNumMsj();

    /*Set Botones*/
    $("#cssmenu #salir").click(function () { cierraSecion(); });
    /*$(".nav #bandejaMensajes").click(function () { document.location = "bandejaMensajes_in.aspx" });*/
    $("#cssmenu #contactos").click(function () { document.location = "contactosv2.aspx"; });
    $("#cssmenu #buscarCorres").click(function () { document.location = "busquedav2.aspx"; });
    $("#cssmenu #imprimirReps").click(function () { document.location = "imprimirv2.aspx"; });
    $("#cssmenu #home").click(function () { document.location = "correspondenciav2.aspx"; });
    $("#cssmenu #manualAyuda").click(function () { window.open("../AYUDA/SICOR-ManualDeUsuario.pdf"); });

    //carga datos cuenta
    $("#dat_cuenta_nombre").html("" + $.jCookies({ get: 'USRNOM' }));
    $("#cssmenu #dat_cuenta_modContrasena").bind('click', function () { cargaFrmModContra(); });

    $("#menu-item-corres li, #dat_cuenta_modContrasena").on("mouseenter", function () { $(this).find(".popover").fadeIn(); });
    $("#menu-item-corres li, #dat_cuenta_modContrasena").on("mouseleave", function () { $(this).find(".popover").fadeOut(); });    
}

function doSearch(obj, event) {
    if (event) {
        var charCode = event.keyCode || event.which;
        if (parseInt(charCode) === 13) {
            $("#buttonBuscar").click();
        }
    }
}

function doSearch2(obj, event,tipo) {
    if (event) {
        var charCode = event.keyCode || event.which;
        if (parseInt(charCode) === 13) {
            switch (obj.id) {
                case "CORRESID":
                    if (tipo == 1) { cargaListCorresByIDv2(); } else { cargaListCorresByID();}                    
                    break;
                case "CODREF":
                    cargaListCorresByCodRef();
                break;
                case "ASUNTO":
                    cargaListCorresByAsunto();
                    break;
            }            
        }
    }
}

function verDigita() {
    $(".txtDigito").toggle();
}

(function ($) {

    $.fn.menumaker = function (options) {

        var cssmenu = $(this), settings = $.extend({
            title: "Menu",
            format: "dropdown",
            sticky: false
        }, options);

        return this.each(function () {
            cssmenu.prepend('<div id="menu-button" class="text-shadow"><span class="fg-white mif-mail mif-2x text-shadow"></span> ' + settings.title + '</div>');
            $(this).find("#menu-button").on('click', function () {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.hide().removeClass('open');
                }
                else {
                    mainmenu.show().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });

            cssmenu.find('li ul').parent().addClass('has-sub');

            multiTg = function () {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function () {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').hide();
                    }
                    else {
                        $(this).siblings('ul').addClass('open').show();
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');

            if (settings.sticky === true) cssmenu.css('position', 'fixed');

            resizeFix = function () {
                if ($(window).width() > 768) {
                    cssmenu.find('ul').show();
                }

                if ($(window).width() <= 768) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);

        });
    };
})(jQuery);

(function ($) {
    $(document).ready(function () {

        $(document).ready(function () {
            $("#cssmenu").menumaker({
                title: "Menu",
                format: "multitoggle"
            });

            /*$("#cssmenu").prepend("<div id='menu-line'></div>");*/

            var foundActive = false, activeElement, linePosition = 0, menuLine = $("#cssmenu #menu-line"), lineWidth, defaultPosition, defaultWidth;

            $("#cssmenu > ul > li").each(function () {
                if ($(this).hasClass('active')) {
                    activeElement = $(this);
                    foundActive = true;
                }
            });

            if (foundActive === false) {
                activeElement = $("#cssmenu > ul > li").first();
            }

            defaultWidth = lineWidth = activeElement.width();

            defaultPosition = linePosition = activeElement.position().left;

            menuLine.css("width", lineWidth);
            menuLine.css("left", linePosition);

            $("#cssmenu > ul > li").hover(function () {
                activeElement = $(this);
                lineWidth = activeElement.width();
                linePosition = activeElement.position().left;
                menuLine.css("width", lineWidth);
                menuLine.css("left", linePosition);
            },
            function () {
                menuLine.css("left", defaultPosition);
                menuLine.css("width", defaultWidth);
            });
        });
    });
})(jQuery);

function cambiaLogo(form) {
    var clase = ($("#lista-item-corres .list.active").find(".registrado").length > 0) ? "mif-file-text" : (($("#lista-item-corres .list.active").find(".nota").length > 0) ? "mif-file-empty" : "mif-map");
    //$("#" + form + " #logoTitulo").prepend("<span class='logoTitulo" + clase + "'></span>");
    //$("#" + form + " #logoTitulo").addClass(clase)
    $("#logoTitulo").addClass(clase)
}

function closeWin() {
    //$(".btn-close").click();
    $("#dialogWin").find(".window-content").html("");
    $("#dialogWin").fadeOut();
    $("#dialog-modal").fadeOut().hide();

    $("#logoTitulo").removeClass();
    $("#textTitulo").html("");
    $("body").removeClass("modal-open");
}

function fijarDivLoad() {
    $("body").addClass("modal-open");
}


