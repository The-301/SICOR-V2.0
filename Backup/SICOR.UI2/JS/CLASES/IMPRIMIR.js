jQuery(document).ready(function () {
    //Carga lista instituciones
    //            cargaListaInst();
    //Carga Contactos
    cargaListaContactos("#CONTID");

    $("#imprimirReps").css("background", "#16499a");

    $("#menutabb").tabControl();
    $("#menutabb .frames").show();

    /*********Selects**********/
    $("#CONTINST").select2({
        minimumInputLength: 1
    });
    $("#CONTID").select2({
        minimumInputLength: 1
    });

    /*********Datepickers**********/
    $(function () {
        $(".FECH").datepicker({ dateFormat: "dd/mm/yy" });
    });

    //ini Print
    $("#imprimir").click(function () {
	    // Print the DIV.
	    if ($("#con-imprimir").html() != "") {
	        $("#con-imprimir").print();
	    }
	    // Cancel click event.
	    return (false);
	});

    //BotnFiltrar
    $("#btn_filtrarImpre").button().click(function () { filtraImpre(); });

    $(".tabcontrol ul.tabs li a").on("click", function () {
        $("#FECH01, #FECH02, #FECHMARGI01, #FECHMARGI02, #FECHGEN01, #FECHGEN02, #FECHCOR01, #FECHCOR02").val("");
    });

    fijarScroll();
});

function fijarScroll() {
    var menu = $('#menuprt');
    var contenedor = $('#menu-contenedor');
    var menu_offset = menu.offset();
    // Cada vez que se haga scroll en la página
    // haremos un chequeo del estado del menú
    // y lo vamos a alternar entre 'fixed' y 'static'.
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > menu_offset.top) {
            menu.addClass('menu-fijo');
        } else {
            menu.removeClass('menu-fijo');
        }
    });
}

/************Genera Cuadro de control Envio***************/
function genCuadroControlEnvio() {
    if (valForm("#tabs-1")) {
        var fech01 = $("#FECH01").val();
        var fech02 = $("#FECH02").val();
        var grupo = $.jCookies({ get: 'GRUPO' });
        var TipoC = $("#s1T1").val();


        var tipoCTitulo = "";
        if (TipoC == 1) {
            tipoCTitulo = "Interno-Salida";
        }
        if (TipoC == 2) {
            tipoCTitulo = "Interno-Entrada";
        }
        if (TipoC == 3) {
            tipoCTitulo = "Externo-Salida";
        }
        if (TipoC == 4) {
            tipoCTitulo = "Externo-Entrada";
        }

        $.when(enviadosSinResByFechaGTjs(fech01, fech02,grupo,TipoC)).then(function (response) {
            var R = response.d;

            var contenido = "<div class='grid'>"
                    + "<div class='row cells12'>"
                        + "<div class='cell colspan2'>"
                            + "<div class='membrete logoMinec'><img src='../IMAS/logoMINEC.jpg' width='117px'></div>"
                        + "</div>"
                        + "<div class='cell colspan8 align-center align-center'>"
                        + "<h4>Cuadro de control de correspondencia enviada ("+tipoCTitulo+").</br> Desde: "+fech01+" Hasta: "+fech02+"</h4></center>"
                        + "</div>"
                        + "<div class='cell colspan2'>"
                            + "<div class='membrete escudo align-right'><img src='../IMAS/escudo.jpg'></div>"
                        + "</div>"
                    + "</div>"
                + "</div>"
                + "<table class='tb_02 center full-size' id='tb_controlEnvio'>"
                + "     <thead>"
                + "         <tr>"
                + "             <td style='width:20px;'>ID</td>"
                + "             <td>Datalle</td>"
                + "             <td style='width:250px;'></td>"
                + "         </tr>"
                + "     </thead>"
                + "     <tbody>";

            var datGen = "", datEnviado = "", nombre = "";
            
            for (var i = 0; i < R.length; i++) {
                datGen = R[i].datCorres; 
                datEnviado = R[i].datenvia; //console.log(datEnviado);

                //Nombre
                nombre = "";
                if (datEnviado.CONTNOMBRE != "") { nombre = datEnviado.CONTNOMBRE; }
                if (datEnviado.CONTUNIDAD != "" && datEnviado.CONTNOMBRE != "") { nombre += " | "; }
                if (datEnviado.CONTUNIDAD != "") { nombre += datEnviado.CONTUNIDAD; }
                if (datEnviado.CONTNOMBRE != "" && datEnviado.CONTINST != "" || datEnviado.CONTUNIDAD != "" && datEnviado.CONTINST != "") { nombre += " | "; }
                if (datEnviado.CONTINST != "") { nombre += datEnviado.CONTINST; }

                if (datGen.length>0) {
                    contenido += "<tr class='id_" + datGen[0].CORRESID + "'>"
                        + "<td class='td_id'>" + datGen[0].CORRESID + "</td>"
                        + "<td><b>Cod/Ref: </b>" + datGen[0].CORRESCOD

                        + "<br /><b>Destinatario: </b>" + nombre
                        + "<br /><b>Asunto del envío: </b>" + datEnviado.ENVIOINSTRUCDSC
                        + "<br /><b>Fecha de envío: </b>" + datEnviado.ENVIOFEC

                        + "<br /><br /><b>Remitente original: </b>" + datGen[0].CONTNOMBRE_REMITE
                        + " | " + datGen[0].CONTUNIDAD_REMITE
                        + " | " + datGen[0].CONTINST_REMITE
                        + "<br /><b>Asunto: </b>" + datGen[0].ASUNTO + "</td>"
                        + "<td>"
                        + "<b>Fecha recibido: </b>__________________________"
                        + "<br /><br /><b>Hora recibido: </b>___________________________"
                        + "<br /><br /><b>Recibido por: </b>____________________________"
                        + "<br /><br /><b>Firma: </b>___________________________________"

                        + "</td>"
                        + "</tr>";
                }
            }

            contenido += "  </tbody>"
                    + "</table>";

            $("#con-imprimir").html(contenido).ajaxStop(function () {
                if ($("#tb_controlEnvio_wrapper").length == 0) {
                    $("#tb_controlEnvio").dataTable({
                        "bPaginate": false,
                        "bLengthChange": false,
                        "bFilter": false,
                        "bSort": true,
                        "bInfo": false,
                        "bAutoWidth": false
                    })
                }
            });
        });
    }
}

/************Genera Cuadro de control marginado***************/
function genCuadroControlMarginado() {
    if (valForm("#tabs-2")) {
        var fech01 = $("#FECHMARGI01").val();
        var fech02 = $("#FECHMARGI02").val();
        var grupo = $.jCookies({ get: 'GRUPO' });
        var tipoC = $("#s2T2").val();

        var tipoCTitulo = "";
        if (tipoC == 1) {
            tipoCTitulo = "Interno-Salida";
        }
        if (tipoC == 2) {
            tipoCTitulo = "Interno-Entrada";
        }
        if (tipoC == 3) {
            tipoCTitulo = "Externo-Salida";
        }
        if (tipoC == 4) {
            tipoCTitulo = "Externo-Entrada";
        }


        $.when(marginadosSinResByFechaGTjs(fech01, fech02,grupo,tipoC)).then(function (response) {
            var R = response.d;

            var contenido = "<div class='grid'>"
                    + "<div class='row cells12'>"
                        + "<div class='cell colspan2'>"
                            + "<div class='membrete logoMinec'><img src='../IMAS/logoMINEC.jpg' width='117px'></div>"
                        + "</div>"
                        + "<div class='cell colspan8 align-center'>"
                        + "<center><h4>Cuadro de control de correspondencia enviada ("+tipoCTitulo+") </br> Desde: "+fech01+" Hasta: "+fech02+"</h4></center>"
//                            + "<center><h4>Cuadro de control de correspondencia enviada</h4></center>"
                        + "</div>"
                        + "<div class='cell colspan2'>"
                            + "<div class='membrete escudo align-right'><img src='../IMAS/escudo.jpg'></div>"
                        + "</div>"
                    + "</div>"
                + "</div>"
                + "<table class='tb_02 center full-size' id='tb_controlEnvio'>"
                + "     <thead>"
                + "         <tr>"
                + "             <td style='width:40px;'>ID</td>"
                + "             <td>Detalle</td>"
                + "             <td style='width:200px;'></td>"
                + "         </tr>"
                + "     </thead>"
                + "     <tbody>";

            var datGen = "", datEnviado = "", nombre = "";
            for (var i = 0; i < R.length; i++) {
                datGen = R[i].datCorres;
                datMargi = R[i].datmargi

                //Nombre
                //                var nombre
                //                for (var l = 0; l < datMargi.MARGICONT.length; l++) {
                //                    if (datMargi.MARGICONT[l].TIPOID == 14) {
                //                        nombre = datMargi.MARGICONT[l].CONTNOMBRE
                //                    + " | " + datMargi.MARGICONT[l].CONTUNIDAD;
                //                    }
                //                }

                //nombre de los conrtactos involucrados en la respuesta al marginado
                var nomContMarg = datMargi.CONTNOMBRE
                    + " | " + datMargi.CONTUNIDAD;

                if (datMargi.CONTTIPOROLID == 14) {
                    nomContMarg += " - <i><b>Responsable</b></i>" 
                }
                if (datMargi.CONTTIPOROLID == 15) {
                    nomContMarg += " - <i><b>Colaborador</b></i>" 
                }
                if (datMargi.CONTTIPOROLID == 16) {
                    nomContMarg += " - <i><b>Informado</b></i>" 
                }

                //Genera Contenido
                contenido += "<tr class='id_" + datGen[0].CORRESID + "'>"
                        + "<td class='td_id'>" + datGen[0].CORRESID + "</td>"
                        + "<td><b>Cod/Ref: </b>" + datGen[0].CORRESCOD
                        + "<br /><b>Marginado a: </b>" + nomContMarg
                        + "<br /><b>Fecha marginado: </b>" + datMargi.MARGFEC
                        + "<br /><b>Tiempo respuesta: </b>" + datMargi.MARGTIEMPO
                        + "<br /><b>Instrucciones: </b>" + datMargi.MARGINSTRUCDSC + "<br />" + datMargi.MARGMOTIVO
                        + "<br /><br /><b>Remitente: </b>" + datGen[0].CONTNOMBRE_REMITE
                        + " | " + datGen[0].CONTUNIDAD_REMITE
                        + " | " + datGen[0].CONTINST_REMITE
                        + "<br /><b>Asunto: </b>" + datGen[0].ASUNTO
                        + "<br /><b>Fecha recibido: </b>" + datGen[0].NOTARECIBFEC + "</td>"

                        + "<td>"
                        + "<b>Fecha recibido: </b>________________"
                        + "<br /><br /><b>Hora recibido: </b>_________________"
                        + "<br /><br /><b>Recibido por: </b>__________________"
                        + "<br /><br /><b>Firma: </b>_________________________"
                        + "</td>"
                        + "</tr>"
            }

            contenido += "  </tbody>"
                    + "</table>";

            $("#con-imprimir").html(contenido).ajaxStop(function () {
                if ($("#tb_controlEnvio_wrapper").length == 0) {
                    $("#tb_controlEnvio").dataTable({
                        "bPaginate": false,
                        "bLengthChange": false,
                        "bFilter": false,
                        "bSort": true,
                        "bInfo": false,
                        "bAutoWidth": false
                    })
                }
            });
        });
    }
}

/************Genera Cuadro General***************/
function genCuadroRegisGeneral() {
    if (valForm("#tabs-3")) {
        var fech01 = $("#FECHGEN01").val();
        var fech02 = $("#FECHGEN02").val();
        var grupo = $.jCookies({ get: 'GRUPO' });

        var tipoC = $("#s3T3").val();

        var tipoCTitulo = "";
        if (tipoC == 1) {
            tipoCTitulo = "Interno-Salida";
        }
        if (tipoC == 2) {
            tipoCTitulo = "Interno-Entrada";
        }
        if (tipoC == 3) {
            tipoCTitulo = "Externo-Salida";
        }
        if (tipoC == 4) {
            tipoCTitulo = "Externo-Entrada";
        }



        var f1 = fech01.replace("/", "_");
        var f2 = fech02.replace("/", "_");
        var nombreExport = "Reporte de correspondencia("+tipoCTitulo+") del_"+f1+" al_"+f2;

        $.ajax({
            url: "../WS/IMPRIMIRws.asmx/corresRepByFechaGTws",
            data: "{'fech01':'" + fech01 + "','fech02':'" + fech02 + "','grupo':'" + grupo + "','TipoC':'" + tipoC + "'}",
            success: function (r) {
                var R = r.d;

                var contenido = "<div class='grid'>"
                    + "<div class='row cells12'>"
                    + "<button class='button warning' type='button' onclick=\"javascript:export_table_to_excel('tb_controlEnvio','" + nombreExport + "')\"><i class='icon-file icon-large'></i>Exportar</button>"
                        + "<div class='cell colspan2'>"
                            + "<div class='membrete logoMinec'><img src='../IMAS/logoMINEC.jpg' width='117px'></div>"
                        + "</div>"
                        + "<div class='cell colspan8 align-center'>"
                        + "<center><h4>Cuadro de control de correspondencia enviada (" + tipoCTitulo + ") </br> Desde: " + fech01 + " Hasta: " + fech02 + "</h4></center>"
//                            + "<center><h4>Cuadro de control de correspondencia enviada</h4></center>"
                        + "</div>"
                        + "<div class='cell colspan2'>"
                            + "<div class='membrete escudo align-right'><img src='../IMAS/escudo.jpg'></div>"
                        + "</div>"
                    + "</div>"
                + "</div>"
                + "<table class='tb_02 center full-size' id='tb_controlEnvio'>"
                + "     <thead>"
                + "         <tr>"
                + "             <td style='width:40px;'>ID</td>"
                + "             <td>Detalle</td>"
                + "         </tr>"
                + "     </thead>"
                + "     <tbody>";

                var datGen = "", datEnviado = "", nombre = "";
                for (var i = 0; i < R.length; i++) {
                    datGen = R[i];


                   


                    //Remite o Elabora
                    var remiteElabora = "<br /><br /><b>Remitente: </b>" + datGen.CONTNOMBRE_REMITE + " | " + datGen.CONTUNIDAD_REMITE + " | " + datGen.CONTINST_REMITE;
                    if (datGen.CATEGOID == 3) {
                        remiteElabora = "<br /><br /><b>Elaborado por: </b>" + datGen.CONTNOMBRE_ELABORO + " | " + datGen.CONTUNIDAD_ELABORO
                        + "<br /><b>Dirigido a: </b>" + datGen.CONTNOMBRE_DIRIGIDO + " | " + datGen.CONTUNIDAD_DIRIGIDO + " | " + datGen.CONTINST_DIRIGIDO;
                    }

                    //Genera Contenido
                    contenido += "<tr class='id_" + datGen.CORRESID + "'>"
                        + "<td class='td_id'>" + datGen.CORRESID + "</td>"
                        + "<td><b>Cod/Ref: </b>" + datGen.CORRESCOD

                        + remiteElabora + "\r\n"

                        + "<br/><b>Asunto: </b>" + datGen.ASUNTO + "\r\n"
                        + "<br/><b>Clase: </b>" + datGen.CLASENOMBRE + "\r\n"
                        + "<b>Tipo: </b>" + datGen.TIPONOMBRE + "\r\n"
                        + "<br/><b>Fecha recibido: </b>" + datGen.NOTARECIBFEC + "\r\n"
                        + "<b>Hora recibido: </b>" + datGen.NOTARECIBHORA + "\r\n"
                        + "<b>Fecha nota: </b>" + datGen.NOTAELABFEC + "\r\n"
                        + "<br/><b>Categoria: </b>" + datGen.CATEGONOMBRE + "\r\n"
                        + "</td>"
                }

                contenido += "  </tbody>"
                    + "</table>";

                $("#con-imprimir").html(contenido).ajaxStop(function () {
                    if ($("#tb_controlEnvio_wrapper").length == 0) {
                        $("#tb_controlEnvio").dataTable({
                            "bPaginate": false,
                            "bLengthChange": false,
                            "bFilter": false,
                            "bSort": true,
                            "bInfo": false,
                            "bAutoWidth": false
                        })
                    }
                });
            }
        });
    }
}

//---------- reporte de correspondencia por fecha y contacto -----------------
function genRepCorresByFechaContID() {
    if (valForm("#tabs-4")) {
        var fech01 = $("#FECHCOR01").val();
        var fech02 = $("#FECHCOR02").val();
        var contID = $("#CONTID").val();
        var grupo = $.jCookies({ get: 'GRUPO' });

        var tipoC = $("#s4T4").val();

        var tipoCTitulo = "";
        if(tipoC==1){
            tipoCTitulo = "Interno-Salida";
        }
        if (tipoC == 2) {
            tipoCTitulo = "Interno-Entrada";
        }
        if (tipoC == 3) {
            tipoCTitulo = "Externo-Salida";
        }
        if (tipoC == 4) {
            tipoCTitulo = "Externo-Entrada";
        }


        $.ajax({
            url: "../WS/IMPRIMIRws.asmx/corresRepByFechaContIDGTws",
            data: "{'fech01':'" + fech01 + "','fech02':'" + fech02 + "','contID':" + contID + ",'grupo':'" + grupo + "','TipoC':'" + tipoC + "'}",
            success: function (r) {
                var R = r.d;

                var contenido = "<div class='grid'>"
                    + "<div class='row cells12'>"
                        + "<div class='cell colspan2'>"
                            + "<div class='membrete logoMinec'><img src='../IMAS/logoMINEC.jpg' width='117px'></div>"
                        + "</div>"
                        + "<div class='cell colspan8 align-center'>"
                            + "<center><h4>Cuadro de control de correspondencia("+ tipoCTitulo+").</br> Desde: "+fech01+" hasta: "+fech02+"</h4></center>"
                        + "</div>"
                        + "<div class='cell colspan2'>"
                            + "<div class='membrete escudo align-right'><img src='../IMAS/escudo.jpg'></div>"
                        + "</div>"

                    + "</div>"
                + "</div>"
                + "<table class='tb_02 center full-size' id='tb_controlEnvio'>"
                + "     <thead>"
                + "         <tr>"
                + "             <td style='width:40px;'>ID</td>"
                + "             <td>Detalle</td>"
                + "         </tr>"
                + "     </thead>"
                + "     <tbody>";

                var datGen = "", datEnviado = "", nombre = "";
                for (var i = 0; i < R.length; i++) {
                    datGen = R[i];


                    //Remite o Elabora
                    var remiteElabora = "<br /><br /><b>Remitente: </b>" + datGen.CONTNOMBRE_REMITE + " | " + datGen.CONTUNIDAD_REMITE + " | " + datGen.CONTINST_REMITE;
                    if (datGen.CATEGOID == 3) {
                        remiteElabora = "<br /><br /><b>Elaborado por: </b>" + datGen.CONTNOMBRE_ELABORO + " | " + datGen.CONTUNIDAD_ELABORO
                        + "<br /><b>Dirigido a: </b>" + datGen.CONTNOMBRE_DIRIGIDO + " | " + datGen.CONTUNIDAD_DIRIGIDO + " | " + datGen.CONTINST_DIRIGIDO;
                    }

                    //Genera Contenido
                    contenido += "<tr class='id_" + datGen.CORRESID + "'>"
                        + "<td class='td_id'>" + datGen.CORRESID + "</td>"
                        + "<td><b>Cod/Ref: </b>" + datGen.CORRESCOD

                        + remiteElabora

                        + "<br /><b>Asunto: </b>" + datGen.ASUNTO
                        + "<br /><b>Clase: </b>" + datGen.CLASENOMBRE
                        + " <b>Tipo: </b>" + datGen.TIPONOMBRE
                        + "<br /><b>Fecha recibido: </b>" + datGen.NOTARECIBFEC
                        + " <b>Hora recibido: </b>" + datGen.NOTARECIBHORA
                        + " <b>Fecha nota: </b>" + datGen.NOTAELABFEC
                        + "<br /><b>Categoria: </b>" + datGen.CATEGONOMBRE
                        + "</td>"
                }

                contenido += "  </tbody>"
                    + "</table>";

                $("#con-imprimir").html(contenido).ajaxStop(function () {
                    if ($("#tb_controlEnvio_wrapper").length == 0) {
                        $("#tb_controlEnvio").dataTable({
                            "bPaginate": false,
                            "bLengthChange": false,
                            "bFilter": false,
                            "bSort": true,
                            "bInfo": false,
                            "bAutoWidth": false
                        })
                    }
                });
            }
        });
    }
}


//Genera Reporte
function generaRep() {
    if (valForm("#tabs-3")) {
        var f1 = $("#FECHGEN01").val();
        var f2 = $("#FECHGEN02").val();

        switch ($("#tipoRep_imprimir").val()) {
            case '1':
                genCuadroRegisGeneral(f1, f2);
                break;
            case '2':
            case '3':
                genRepMargiByFecha(f1, f2, $("#tipoRep_imprimir").val());
                break;
        }
    }
}

//================Reporte de Marginados==================/
//=======================================================/
function genRepMargiByFecha(f1, f2, tipo) {
    var url = "../WS/IMPRIMIRws.asmx/margiRepActiveByFechaGTws"
    , titulo = "Reporte marginados activos";
    if(tipo == '2'){
        url = "../WS/IMPRIMIRws.asmx/margiRepByFechaGTws"
        , titulo = "Reporte marginados";
    }
    var grupo = $.jCookies({ get: 'GRUPO' });
    $.ajax({
        url: url,
        data: "{'fech01':'" + f1 + "','fech02':'" + f2 + "','grupo':" + grupo + "}",
        success: function (r) {
            var R = r.d;
            var cont = "<div class='grid'>"
                + "<div class='row cells12'>"
                    + "<div class='cell colspan2'>"
                        + "<div class='membrete logoMinec'><img src='../IMAS/logoMINEC.jpg'></div>"
                    + "</div>"
                    + "<div class='cell colspan8'>"
                        + "<center><h4>" + titulo + " <br />del " + f1 + " al " + f2
                        + "<br />" + R.length + " marginados </h4></center>"
                    + "</div>"
                    + "<div class='cell colspan2'>"
                        + "<div class='membrete escudo align-right'><img src='../IMAS/escudo.jpg'></div>"
                    + "</div>"
                + "</div>"
            + "</div>"
            + "<table id='tb_controlEnvio' class='tb_02 full-size'>"
            + "<thead>"
            + "<tr>"
            + "<td style='font-size:14px; width:30px;'><b>Id</b></td>"
            + "<td><b style='font-size:14px;'>Detalle</b></td>"
            + "</tr>"
            + "</thead>"
            + "<tbody>";

            $.each(R, function (i, e) {
                var firma = "<br /><b>Requiere Firma:  </b>No";
                if (e.datcorres[0].REQFIRMA == 1 || e.datcorres[0].REQFIRMA == 3) {
                    firma = "<br /><b>Requiere Firma:  </b> Si"
                    + "<br /><b>Firmado:</b>";
                    if (e.datcorres[0].REQFIRMA == 3) {
                        firma += " Si";
                    } else {
                        firma += " No";
                    }
                }


                cont += "<tr class='id_" + e.datcorres[0].CORRESID + "'>"
                + "<td style='width:10px;'>"
                + "     " + e.datcorres[0].CORRESID
                + "</td>"
                + "<td>"
                + "<table class='tb_02 full-size'>"

                //*******************
                //Datos del Correo
                //****************
                + "     <tr>"
                + "         <td rowspan='2' style='width:20px;'><b>Correspondencia</b>"
                + "             <br /><br /><b>Registrado por: </b>" + e.datcorres[0].INSERTUSRNOM + " " + e.datcorres[0].INSERTUSRAPE
                + "         </td>"
                + "         <td>"
                + "             <b>Remitente: </b>"
                                + e.datcorres[0].CONTNOMBRE_REMITE
                                + " | " + e.datcorres[0].CONTINST_REMITE
                                + " | " + e.datcorres[0].CONTUNIDAD_REMITE
                + "         </td>"
                + "         <td style='width:150px;'>"
                + "             <b>Cod/Ref: </b>" + e.datcorres[0].CORRESCOD
                + "             <br /><b>Clase: </b>" + e.datcorres[0].CLASENOMBRE
                + "             <br /><b>Tipo:  </b>" + e.datcorres[0].TIPONOMBRE
                                + firma
                + "         </td>"
                + "         <td style='width:150px;'>"
                + "             <b>Fecha de nota:</b> " + e.datcorres[0].NOTAELABFEC
                + "             <br /><b>Fecha de recibido:   </b>" + e.datcorres[0].NOTARECIBFEC
                + "             <br /><b>Hora recibido:    </b>" + e.datcorres[0].NOTARECIBHORA
                + "         </td>"
                + "     </tr>"
                + "<tr><td colspan='3'><b>Asunto: </b>" + e.datcorres[0].ASUNTO + "</td></tr>";

                //*******************
                //Datos del Marginado
                //*******************

                var estadoMargi = "<br /><br />Estado: </b> sin res.";
                if (e.datmargi[0].MARGPENDIENTE == 2) {
                    estadoMargi = "<br /><br />Estado: </b> contestado"
                }

                //determina si ha sido recivido por el marginado "Contrl de recepcion"
                if (e.datmargi[0].MARGRECIBHORA == "") {
                    e.datmargi[0].MARGRECIBFEC = "---";
                    e.datmargi[0].MARGRECIBHORA = "---"
                    e.datmargi[0].MARGRECIBNOMBRE = "---"
                }

                //Estado de marginado
                if (e.datmargi[0].MARGPENDIENTE == 1) {
                    var d = new Date(),
                    date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                    if (numDias(e.datmargi[0].MARGTIEMPO) - (numDias(date)) <= 0) {
                        estadoMargi += "<br /><br /><b style='color:red; font-size:14px;'>Expirado</b>"
                    }
                }

                cont += ""
                + "     <tr>"
                + "         <td rowspan='2' style='width:20px;'><b>Marginado" + estadoMargi + "</td>"
                + "         <td colspan='2'>"
                + " <b>Involucrados: </b><br />";

                //Lista involucrados
                for (var l = 0; l < e.datmargi[0].MARGICONT.length; l++) {
                    if (e.datmargi[0].MARGICONT[l].TIPOID == 14) {
                        cont += e.datmargi[0].MARGICONT[l].CONTNOMBRE
                        + " | " + e.datmargi[0].MARGICONT[l].CONTUNIDAD
                        + " - <b><i>Responsable</i></b><br />"
                    }
                    if (e.datmargi[0].MARGICONT[l].TIPOID == 15) {
                        cont += ""
                        + e.datmargi[0].MARGICONT[l].CONTNOMBRE
                        + " | " + e.datmargi[0].MARGICONT[l].CONTUNIDAD
                        + " - <b><i>Colaborador</i></b><br />"
                    }
                    if (e.datmargi[0].MARGICONT[l].TIPOID == 16) {
                        cont += ""
                        + e.datmargi[0].MARGICONT[l].CONTNOMBRE
                        + " | " + e.datmargi[0].MARGICONT[l].CONTUNIDAD
                        + " - <b><i>Informado</i></b><br />"
                    }

                    if (e.datmargi[0].MARGICONT[l].MARGRECIBHORA == "") {
                        e.datmargi[0].MARGICONT[l].MARGRECIBFEC = "---";
                        e.datmargi[0].MARGICONT[l].MARGRECIBHORA = "---";
                        e.datmargi[0].MARGICONT[l].MARGRECIBNOMBRE = "---";
                    }
                    cont += ""
                        + "   <b>Fecha recibido: </b> " + e.datmargi[0].MARGICONT[l].MARGRECIBFEC
                        + "   <br /><b>Hora recibido:    </b>" + e.datmargi[0].MARGICONT[l].MARGRECIBHORA
                        + "   <br /><b>Recibido por:     </b>" + e.datmargi[0].MARGICONT[l].MARGRECIBNOMBRE
                        + "<br /><br />"
                };

                cont += "         </td>"
                + "         <td style='width:150px;' >"
                //+ "             <b>Marginado por: </b>" + e.datmargi[0].INSERTUSRNOM + " " + e.datmargi[0].INSERTUSRAPE
                + "               <b>Marginado por: </b>" + e.datmargi[0].MARGINADOPOR + " <span style='display:none;' class='txtDigito'>(<b>Digitado por:</b> " + e.datmargi[0].INSERTUSRNOM + " " + e.datmargi[0].INSERTUSRAPE + ")</span><button class='square-button mini-button' onclick='javascript:verDigita()'><span class='mif-notification'><span></button>"
                + "             <br /><b>Marginado el:  </b>" + e.datmargi[0].MARGFEC
                + "             <br /><b>Tiempo respuesta:   </b>" + e.datmargi[0].MARGTIEMPO
                + "         </td>"
                //                + "         <td style='width:150px;'>"
                //                + "             <b>Fecha recibido: </b> " + e.datmargi[0].MARGRECIBFEC
                //                + "             <br /><b>Hora recibido:    </b>" + e.datmargi[0].MARGRECIBHORA
                //                + "             <br /><b>Recibido por:     </b>" + e.datmargi[0].MARGRECIBNOMBRE
                //                + "         </td>"
                + "     </tr>"
                + "<tr><td colspan='3'><b>Instrucciones: </b>" + e.datmargi[0].MARGMOTIVO + "</td></tr>";

                //*******************
                //Respuesta del Marginado
                //*******************
                if (e.datrespuesta.length > 0) {
                    var respuesta = _.filter(e.datrespuesta, function (c) { return c.CATEGOID == 2 })[0]                    
                    var firmaM = "<br /><b>Requiere firma:  </b>No";
                    if (respuesta.REQFIRMA == 1 || respuesta.REQFIRMA == 3) {
                        firmaM = "<br /><b>Requiere firma:  </b> Si"
                            + "<br /><b>Firmado:</b>";
                        if (respuesta.REQFIRMA == 3) {
                            firmaM += " Si";
                        } else {
                            firmaM += " No";
                        }
                    }
                    cont += "     <tr>"
                    + "         <td style='width:20px;'><b>Respuesta"
                    + "             <br /><br />Id: </b>" + respuesta.CORRESID
                    + "             <br /><b>Registrado por: </b>" + respuesta.INSERTUSRNOM + " " + respuesta.INSERTUSRAPE
                    + "         </td>"
                    + "         <td>"
                    + "             <b>Forma de respuesta: </b>" + respuesta.MARGINAFORMARES
                    + "         </td>"
                    + "         <td style='width:150px;'>"
                    + "             <b>Cod/Ref: </b>" + respuesta.CORRESCOD
                    + "             <br /><b>Clase: </b>" + respuesta.CLASENOMBRE
                    + "             <br /><b>Tipo:  </b>" + respuesta.TIPONOMBRE
                                    + firmaM
                    + "         </td>"
                    + "         <td style='width:150px;'>"
                    + "             <b>Fecha de nota:</b> " + respuesta.NOTAELABFEC
                    + "             <br /><b>Fecha de recibido:   </b>" + respuesta.NOTARECIBFEC
                    + "             <br /><b>Hora recibido:    </b>" + respuesta.NOTARECIBHORA
                    + "         </td>"
                    + "     </tr>"
                }

                cont += "</table><br /><br />"
                + "</td>"
                + "</tr>";

            });
            cont += "</tbody></table>"

            $("#con-imprimir").html(cont)
            .ajaxStop(function () {
                if ($("#tb_controlEnvio_wrapper").length == 0) {
                    $("#tb_controlEnvio").dataTable({
                        "bPaginate": false,
                        "bLengthChange": false,
                        "bFilter": true,
                        "bSort": true,
                        "bInfo": false,
                        "bAutoWidth": false
                    })
                }
            });
        }
    });
}

//Filtra los items de la tabla a imprimir por medio de id (2,36,22)
function filtraImpre() {
    var id = "";
    if ($("#txt_idsImpri").val() != "") {
        var ids = $("#txt_idsImpri").val().split(",");
        for (var i = 0; i < ids.length; i++) {
            id += ".id_" + ids[i] + ", ";
        }
        
        if ($("#imprimir-tipoFiltro").val() === "1") {
            $(".td_id").parent().show();
            $("#tb_controlEnvio tbody tr:not(" + id + ")").hide();
        } else {
            $(".td_id").parent().hide();
            $("#tb_controlEnvio tbody tr:not(" + id + ")").show();
        }
    } else {
        $(".td_id").parent().show();
    }
}

