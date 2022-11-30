/***************Carga Lista de toda la Correspondencia***********************/
function cargaListCorres() {
    limpiaDet();
    var tipo = $("#cbOrdenar").val();
    var grupo = $.jCookies({ get: 'GRUPO' });
    $.when(sp_corresFullGTjs(tipo, grupo)).then(function (response) {
        var R = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
        generaListCorresFULL(R, 1);
    });
}

/***************************GENERA LISTA*********************************/
function generaListCorresFULL(R, Tip) {
    
    $("#detalle-adjunto").html("");
    $("#detalle-item-corres").html("");
    $("#detalle-margi-corres").html("");

    var ico = "", keys = "", posee = "", nombre = "", tip = "";
    var contenido = "";
    //var ultimoActivo = $("#lista-item-corres li.active").attr('id');
    var ultimoActivo = $("#lista-item-corres .list.active").attr('id');
    tip = Tip;
    $("#lista-item-corres").html("");

    /*===========================Sin dependencia============================*/
    /*======================================================================*/
    var i = 0;
    var tieneAdjunto = "";
    for (i = 0; i < R.length; i++) {
        
        //console.info(R[i].datCorres.CORRESID, R[i].datCorres.CORRESID_CONTESTA, R[i].datCorres.CATEGOID);
        if ((R[i].datCorres.ACTIVO == 1 && tip == 1) || (tip == 2)) {
            ico = "", posee = "";

            ico = "", posee = "", nombre = "";
            //get key,ico,posee..
            keys = getIcoKeyPosee(R[i]);
            //get poseción
            posee = definirPosecion(R[i], Tip);
            //get ico
            ico = getIco(R[i]);

            //ad class inactivo
            clases = "";
            if (R[i].datCorres.ACTIVO == 2) { clases += "inactivo" }

            if (R[i].datCorres.CORRESID_CONTESTA == -1) {
                
                //get key,ico,posee..
                /*keys = getIcoKeyPosee(R[i]);
                //get poseción
                posee = definirPosecion(R[i], Tip);
                //get ico
                ico = getIco(R[i]);
    
                //ad class inactivo
                clases = "";
                if (R[i].datCorres.ACTIVO == 2) { clases += "inactivo" }*/

                //Limita longitud de caracteres del Asunto
                var asunto = R[i].datCorres.ASUNTO;
                if (asunto.length > 100) {
                    asunto = asunto.substring(0, 100) + "...";
                }

                if (R[i].datCorres.CATEGOID == 1) {
                    /*****************CORRESPONDENCIA sin dependencia**************/
                    //Nombre remite
                    if (R[i].datCorres.CONTNOMBRE_REMITE == "") { nombre = R[i].datCorres.CONTUNIDAD_REMITE }
                    else { nombre = R[i].datCorres.CONTNOMBRE_REMITE }

                    //Si tiene Adjuntos
                    tieneAdjunto = ["none", "block", "none"];
                    //if (R[i].datCorres.ADJUNTO == 1){ tieneAdjunto = "block"; }

                    //Notificacion de Estado Marginado
                    var notiMargi = "";
                    if (R[i].datmargi.length > 0) {
                        var nKey = "";
                        $.each(R[i].datmargi, function (i, e) {
                            var d = new Date();
                            var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

                            if (e.MARGPENDIENTE == 1) {
                                if (numDias(e.MARGTIEMPO) - (numDias(date)) <= 2) {
                                    notiMargi = "<div class='icoEsdadoMargi margYellow' title='Marginación a punto de expirar'>*</div>";
                                    nKey = " key:margiYellow";
                                }
                                if (numDias(e.MARGTIEMPO) - (numDias(date)) <= 0) {
                                    notiMargi = "<div class='icoEsdadoMargi margRed' title='Marginación expirada'>*</div>";
                                    nKey = " key:margiRed";
                                }
                            }
                        });
                        keys += nKey;
                    }

                    contenido = ""
                        + "<div id='corres_" + R[i].datCorres.CORRESID + "' class='list " + clases + "' data-adjunto='" + JSON.stringify(R[i].datfile).replace(/"/g, "\"") +"'>"
                        + notiMargi
                        + "<b class='place-right' style='font-size:10px;'>Id:" + R[i].datCorres.CORRESID + "</b><br />"
                        + "<span id='icoAdjun' class='mif-attachment place-right fg-darkBlue' style='display:" + tieneAdjunto[R[i].datCorres.ADJUNTO] + ";'></span>"
                        + " <p class='place-right'>" + posee + "</p>"
                        + "	<span class='icon " + ico + "'></span><p style='display:none;'>" + keys + "</p> "
                        + "	<b class='item-remitente'>" + R[i].datCorres.CONTINST_REMITE + "</b>"
                        + "	<p class=''>" + nombre + "</p>"
                        + "	<p class='item-asunto'>" + asunto + "</p>"
                        + "	<p class='item-fecha'>" + (($("#cbOrdenar").val() == 1) ? R[i].datCorres.NOTAINSERT : R[i].datCorres.NOTARECIBFEC) + "</p>"
                        + "	<p class='item-estado'>Estado: " + getEstadoList(R[i]) + "</p>"//CORRESDETALLE.js
                        + "</div>";

                    $("#lista-item-corres").append(contenido);


                } else if (R[i].datCorres.CATEGOID == 3) {
                    /*****************NOTAS sin dependencia**************/
                    //Nombre dirigido
                    if (R[i].datCorres.CONTNOMBRE_DIRIGIDO == "") { nombre = R[i].datCorres.CONTUNIDAD_DIRIGIDO; }
                    else { nombre = R[i].datCorres.CONTNOMBRE_DIRIGIDO; }

                    //Si tiene Adjuntos
                    tieneAdjunto = "";
                    if (R[i].datCorres.ADJUNTO == 1)
                        tieneAdjunto = "<span class='mif-attachment place-right fg-darkBlue'></span><p style='display:none;'>" + keys + "</p> "

                    contenido = ""
                        + "<div id='corres_" + R[i].datCorres.CORRESID + "' class='list " + clases + "' data-adjunto='" + JSON.stringify(R[i].datfile).replace(/"/g, "\"")+"'>"
                        + "<b class='place-right' style='font-size:10px;'>Id:" + R[i].datCorres.CORRESID + "</b><br />"
                        + tieneAdjunto
                        + " <p class='place-right'>" + posee + "</p>"
                        + "	<span class='icon " + ico + "'></span><p style='display:none;'>" + keys + "</p> "
                        + "	<b class='item-remitente'>" + R[i].datCorres.CONTINST_DIRIGIDO + "</b>"
                        + "	<p class=''>" + nombre + "</p>"

                        + "	<p class='item-asunto'>" + asunto + "</p>"
                        + "	<p class='item-fecha'>" + (($("#cbOrdenar").val() == 1) ? R[i].datCorres.NOTAINSERT : R[i].datCorres.NOTAELABFEC) + "</p>"
                        + "	<p class='item-estado'>Estado: " + getEstadoList(R[i]) + "</p>"//CORRESDETALLE.js
                        + "</div>";

                    $("#lista-item-corres").append(contenido);

                }
                //Carga data
                cargaData(R[i]);
            }
            //else if (R[i].datCorres.CATEGOID == 1 && R[i].datCorres.CORRESID_CONTESTA != -1) {
            //    /*ico = "", posee = "", nombre = "";
            //    //get key,ico,posee..
            //    keys = getIcoKeyPosee(R[i]);
            //    //get poseción
            //    posee = definirPosecion(R[i], Tip);
            //    //get ico
            //    ico = getIco(R[i]);
    
            //    //ad class inactivo
            //    clases = "";
            //    if (R[i].datCorres.ACTIVO == 2) { clases += "inactivo" }*/
                
            //    /*****************RESPUESTA DE MARGINADO**************/
            //    if (R[i].datCorres.CONTNOMBRE_REMITE == "") { nombre = R[i].datCorres.CONTUNIDAD_REMITE }
            //    else { nombre = R[i].datCorres.CONTNOMBRE_REMITE }

            //    //Si tiene Adjuntos
            //    var tieneAdjunto = "";
            //    if (R[i].datCorres.ADJUNTO == 1) {
            //        tieneAdjunto = "<span class='mif-attachment place-right fg-darkBlue'></span><p style='display:none;'>" + keys + "</p> "
            //    }

            //    contenido = ""
            //        + "<div id=\"corres_" + R[i].datCorres.CORRESID + "\" class='list margi idPadre_" + R[i].datCorres.CORRESID_CONTESTA + " " + clases + "'>"
            //        + "<b class='place-right' style='font-size:10px;'>Id:" + R[i].datCorres.CORRESID + "</b><br />"
            //        + tieneAdjunto
            //        + " <p class='place-right'>" + posee + "</p>"
            //        + "	<span class='icon " + ico + "'></span><p style='display:none;'>" + keys + "</p> "
            //        + "	<b class='item-remitente'>" + R[i].datCorres.CONTINST_REMITE + "</b>"
            //        + "	<p class=''>" + nombre + "</p>"

            //        + "	<p class='item-asunto'>" + asunto + "</p>"
            //        + "	<p class='item-fecha'>" + (($("#cbOrdenar").val() == 1) ? R[i].datCorres.NOTAINSERT : R[i].datCorres.NOTARECIBFEC) + "</p>"
            //        + "	<p class='item-estado'>Estado: " + getEstadoList(R[i]) + "</p>"//CORRESDETALLE.js
            //        + "</div>";

            //    $("#corres_" + R[i].datCorres.CORRESID_CONTESTA).after(contenido);
            //    console.info("contenido=", contenido);
            //    //Carga data
            //    cargaData(R[i]);
            //    //Carga data
            //    //cargaData(R[i]);
            //} else if (R[i].datCorres.CATEGOID == 2 && R[i].datCorres.CORRESID_CONTESTA != -1) {
            //    //ad class inactivo
            //    clases = "";
            //    if (R[i].datCorres.ACTIVO == 2) { clases += "inactivo" }

            //    //RESPUESTA DE MARGINADO
            //    var datMargiRes = R[i].datmargi;
            //    if (datMargiRes.length > 0) {
            //        var j = 0;
            //        if (datMargiRes[j].MARGID == e.datCorres.MARGINAID) {

            //            //nombre del responsable de la respuesta al marginado
            //            nomResponsable = "";
            //            unidadReponsable = "";
            //            for (var l = 0; l < datMargiRes[j].MARGICONT.length; l++) {
            //                if (datMargiRes[j].MARGICONT[l].TIPOID == 14) {
            //                    nomResponsable = datMargiRes[j].MARGICONT[l].CONTNOMBRE;
            //                    unidadReponsable = datMargiRes[j].MARGICONT[l].CONTUNIDAD;
            //                }
            //            }

            //            //Limita longitud de caracteres del Asunto
            //            var forma = R[i].datCorres.MARGINAFORMARES;
            //            if (forma.length > 100) {
            //                forma = forma.substring(0, 100) + "...";
            //            }

            //            //Si tiene Adjuntos
            //            var tieneAdjunto = "";
            //            if (R[i].datCorres.ADJUNTO == 1) {
            //                tieneAdjunto = "<span class='mif-attachment place-right fg-darkBlue'></span><p style='display:none;'>" + keys + "</p>";
            //            }
                            

            //            contenido = ""
            //                + "<div id=\"corres_" + R[i].datCorres.CORRESID + "\" class='list margi idPadre_" + R[i].datCorres.CORRESID_CONTESTA + " " + clases + "'>"
            //                + "<b class='place-right' style='font-size:10px;'>Id:" + R[i].datCorres.CORRESID + "</b><br />"
            //                + tieneAdjunto
            //                + " <p class='place-right'>" + posee + "</p>"
            //                + "	<span class='icon " + ico + "'></span><p style='display:none;'>" + keys + "</p> "
            //                + "	<b class='item-remitente'>" + nomResponsable + "</b>"
            //                + "	<p class=''>" + unidadReponsable + "</p>"
            //                + "	<p class='item-asunto'>Forma respuesta: " + forma + "</p>"
            //                + "	<p class='item-fecha'>" + (($("#cbOrdenar").val() == 1) ? R[i].datCorres.NOTAINSERT : R[i].datCorres.NOTARECIBFEC) + "</p>"
            //                + "	<p class='item-estado'>Estado: " + getEstadoList(R[i]) + "</p>"//CORRESDETALLE.js
            //                + "</div>";

            //            $("#corres_" + R[i].datCorres.CORRESID_CONTESTA).after(contenido);
            //        }

            //    }
            //    //Carga data
            //    cargaData(R[i]);
            //} else if (R[i].datCorres.CATEGOID == 3 && R[i].datCorres.CORRESID_CONTESTA != -1) {
            //    if (R[i].datCorres.CONTNOMBRE_DIRIGIDO == "") {
            //        nombre = R[i].datCorres.CONTUNIDAD_DIRIGIDO;
            //    }
            //    else {
            //        nombre = R[i].datCorres.CONTNOMBRE_DIRIGIDO;
            //    }
            //    //Si tiene Adjuntos
            //    var tieneAdjunto = "";
            //    if (R[i].datCorres.ADJUNTO == 1)
            //        tieneAdjunto = "<span class='mif-attachment place-right fg-darkBlue'></span><p style='display:none;'>" + keys + "</p> "

            //    contenido = ""
            //        + "<div id=\"corres_" + R[i].datCorres.CORRESID + "\" class='list margi idPadre_" + R[i].datCorres.CORRESID_CONTESTA + " " + clases + "'>"
            //        + "<b class='place-right' style='font-size:10px;'>Id:" + R[i].datCorres.CORRESID + "</b><br />"
            //        + tieneAdjunto
            //        + " <p class='place-right'>" + posee + "</p>"
            //        + "	<span class='icon " + ico + "'></span><p style='display:none;'>" + keys + "</p> "
            //        + "	<b class='item-remitente'>" + R[i].datCorres.CONTINST_DIRIGIDO + "</b>"
            //        + "	<p class=''>" + nombre + "</p>"

            //        + "	<p class='item-asunto'>" + asunto + "</p>"
            //        + "	<p class='item-fecha'>" + (($("#cbOrdenar").val() == 1) ? R[i].datCorres.NOTAINSERT : R[i].datCorres.NOTAELABFEC) + "</p>"
            //        + "	<p class='item-estado'>Estado: " + getEstadoList(R[i]) + "</p>"//CORRESDETALLE.js
            //        + "</div>";

            //    $("#corres_" + R[i].datCorres.CORRESID_CONTESTA).after(contenido);
            //    //Carga data
            //    cargaData(R[i]);
            //}

            if (i == (R.length - 1)) {
                //Ejecuta filtro
                $("#lista-item-corres").ajaxStop(function () { $('.filtro').delay(2000).keyup(); });
            }
        }
    }



    /*********************************
        CON DEPENDENCIA
    **********************************/
    var i = 0;
    for (i = 0; i < R.length; i++) {
        //console.info(R[i].datCorres.CORRESID, R[i].datCorres.CORRESID_CONTESTA, R[i].datCorres.CATEGOID);
        if ((R[i].datCorres.ACTIVO == 1 && tip == 1) || (tip == 2)) {
            ico = "", posee = "";

            ico = "", posee = "", nombre = "";
            //get key,ico,posee..
            keys = getIcoKeyPosee(R[i]);
            //get poseción
            posee = definirPosecion(R[i], Tip);
            //get ico
            ico = getIco(R[i]);

            //ad class inactivo
            clases = "";
            if (R[i].datCorres.ACTIVO == 2) { clases += "inactivo"; }

            //if (R[i].datCorres.CORRESID_CONTESTA == -1) {

            //    //get key,ico,posee..
            //    /*keys = getIcoKeyPosee(R[i]);
            //    //get poseción
            //    posee = definirPosecion(R[i], Tip);
            //    //get ico
            //    ico = getIco(R[i]);
    
            //    //ad class inactivo
            //    clases = "";
            //    if (R[i].datCorres.ACTIVO == 2) { clases += "inactivo" }*/

            //    //Limita longitud de caracteres del Asunto
            //    var asunto = R[i].datCorres.ASUNTO;
            //    if (asunto.length > 100) {
            //        asunto = asunto.substring(0, 100) + "...";
            //    }

            //    if (R[i].datCorres.CATEGOID == 1) {
            //        /*****************CORRESPONDENCIA sin dependencia**************/
            //        //Nombre remite
            //        if (R[i].datCorres.CONTNOMBRE_REMITE == "") { nombre = R[i].datCorres.CONTUNIDAD_REMITE }
            //        else { nombre = R[i].datCorres.CONTNOMBRE_REMITE }

            //        //Si tiene Adjuntos
            //        var tieneAdjunto = ["none", "block", "none"];
            //        //if (R[i].datCorres.ADJUNTO == 1){ tieneAdjunto = "block"; }

            //        //Notificacion de Estado Marginado
            //        var notiMargi = "";
            //        if (R[i].datmargi.length > 0) {
            //            var nKey = "";
            //            $.each(R[i].datmargi, function (i, e) {
            //                var d = new Date();
            //                var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

            //                if (e.MARGPENDIENTE == 1) {
            //                    if (numDias(e.MARGTIEMPO) - (numDias(date)) <= 2) {
            //                        notiMargi = "<div class='icoEsdadoMargi margYellow' title='Marginación a punto de expirar'>*</div>";
            //                        nKey = " key:margiYellow"
            //                    }
            //                    if (numDias(e.MARGTIEMPO) - (numDias(date)) <= 0) {
            //                        notiMargi = "<div class='icoEsdadoMargi margRed' title='Marginación expirada'>*</div>";
            //                        nKey = " key:margiRed"
            //                    }
            //                }
            //            });
            //            keys += nKey;
            //        }

            //        contenido = ""
            //            + "<div id=\"corres_" + R[i].datCorres.CORRESID + "\" class='list " + clases + "'>"
            //            + notiMargi
            //            + "<b class='place-right' style='font-size:10px;'>Id:" + R[i].datCorres.CORRESID + "</b><br />"
            //            + "<span id='icoAdjun' class='mif-attachment place-right fg-darkBlue' style='display:" + tieneAdjunto[R[i].datCorres.ADJUNTO] + ";'></span>"
            //            + " <p class='place-right'>" + posee + "</p>"
            //            + "	<span class='icon " + ico + "'></span><p style='display:none;'>" + keys + "</p> "
            //            + "	<b class='item-remitente'>" + R[i].datCorres.CONTINST_REMITE + "</b>"
            //            + "	<p class=''>" + nombre + "</p>"
            //            + "	<p class='item-asunto'>" + asunto + "</p>"
            //            + "	<p class='item-fecha'>" + (($("#cbOrdenar").val() == 1) ? R[i].datCorres.NOTAINSERT : R[i].datCorres.NOTARECIBFEC) + "</p>"
            //            + "	<p class='item-estado'>Estado: " + getEstadoList(R[i]) + "</p>"//CORRESDETALLE.js
            //            + "</div>";

            //        $("#lista-item-corres").append(contenido);


            //    } else if (R[i].datCorres.CATEGOID == 3) {
            //        /*****************NOTAS sin dependencia**************/
            //        //Nombre dirigido
            //        if (R[i].datCorres.CONTNOMBRE_DIRIGIDO == "") { nombre = R[i].datCorres.CONTUNIDAD_DIRIGIDO }
            //        else { nombre = R[i].datCorres.CONTNOMBRE_DIRIGIDO }

            //        //Si tiene Adjuntos
            //        var tieneAdjunto = "";
            //        if (R[i].datCorres.ADJUNTO == 1)
            //            tieneAdjunto = "<span class='mif-attachment place-right fg-darkBlue'></span><p style='display:none;'>" + keys + "</p> "

            //        contenido = ""
            //            + "<div id=\"corres_" + R[i].datCorres.CORRESID + "\" class='list " + clases + "'>"
            //            + "<b class='place-right' style='font-size:10px;'>Id:" + R[i].datCorres.CORRESID + "</b><br />"
            //            + tieneAdjunto
            //            + " <p class='place-right'>" + posee + "</p>"
            //            + "	<span class='icon " + ico + "'></span><p style='display:none;'>" + keys + "</p> "
            //            + "	<b class='item-remitente'>" + R[i].datCorres.CONTINST_DIRIGIDO + "</b>"
            //            + "	<p class=''>" + nombre + "</p>"

            //            + "	<p class='item-asunto'>" + asunto + "</p>"
            //            + "	<p class='item-fecha'>" + (($("#cbOrdenar").val() == 1) ? R[i].datCorres.NOTAINSERT : R[i].datCorres.NOTAELABFEC) + "</p>"
            //            + "	<p class='item-estado'>Estado: " + getEstadoList(R[i]) + "</p>"//CORRESDETALLE.js
            //            + "</div>";

            //        $("#lista-item-corres").append(contenido);

            //    }
            //    //Carga data
            //    cargaData(R[i]);
            //} else
                if (R[i].datCorres.CATEGOID == 1 && R[i].datCorres.CORRESID_CONTESTA != -1) {
                /*ico = "", posee = "", nombre = "";
                //get key,ico,posee..
                keys = getIcoKeyPosee(R[i]);
                //get poseción
                posee = definirPosecion(R[i], Tip);
                //get ico
                ico = getIco(R[i]);
    
                //ad class inactivo
                clases = "";
                if (R[i].datCorres.ACTIVO == 2) { clases += "inactivo" }*/

                /*****************RESPUESTA DE MARGINADO**************/
                if (R[i].datCorres.CONTNOMBRE_REMITE == "") { nombre = R[i].datCorres.CONTUNIDAD_REMITE }
                else { nombre = R[i].datCorres.CONTNOMBRE_REMITE }

                //Si tiene Adjuntos
                tieneAdjunto = "";
                if (R[i].datCorres.ADJUNTO == 1) {
                    tieneAdjunto = "<span class='mif-attachment place-right fg-darkBlue'></span><p style='display:none;'>" + keys + "</p> ";
                }

                contenido = ""
                    + "<div id='corres_" + R[i].datCorres.CORRESID + "' class='list margi idPadre_" + R[i].datCorres.CORRESID_CONTESTA + " " + clases + "' data-adjunto='" + JSON.stringify(R[i].datfile).replace(/"/g, "\"") +"'>"
                    + "<b class='place-right' style='font-size:10px;'>Id:" + R[i].datCorres.CORRESID + "</b><br />"
                    + tieneAdjunto
                    + " <p class='place-right'>" + posee + "</p>"
                    + "	<span class='icon " + ico + "'></span><p style='display:none;'>" + keys + "</p> "
                    + "	<b class='item-remitente'>" + R[i].datCorres.CONTINST_REMITE + "</b>"
                    + "	<p class=''>" + nombre + "</p>"

                    + "	<p class='item-asunto'>" + asunto + "</p>"
                    + "	<p class='item-fecha'>" + (($("#cbOrdenar").val() == 1) ? R[i].datCorres.NOTAINSERT : R[i].datCorres.NOTARECIBFEC) + "</p>"
                    + "	<p class='item-estado'>Estado: " + getEstadoList(R[i]) + "</p>"//CORRESDETALLE.js
                    + "</div>";

                $("#corres_" + R[i].datCorres.CORRESID_CONTESTA).after(contenido);

                //console.info("contenido=", contenido);
                //Carga data
                cargaData(R[i]);
                //Carga data
                //cargaData(R[i]);
            } else if (R[i].datCorres.CATEGOID == 2 && R[i].datCorres.CORRESID_CONTESTA != -1) {
                //ad class inactivo
                clases = "";
                if (R[i].datCorres.ACTIVO == 2) { clases += "inactivo" }

                //RESPUESTA DE MARGINADO
                var datMargiRes = R[i].datmargi;
                if (datMargiRes.length > 0) {
                    var j = 0;
                    if (datMargiRes[j].MARGID == e.datCorres.MARGINAID) {

                        //nombre del responsable de la respuesta al marginado
                        nomResponsable = "";
                        unidadReponsable = "";
                        for (var l = 0; l < datMargiRes[j].MARGICONT.length; l++) {
                            if (datMargiRes[j].MARGICONT[l].TIPOID == 14) {
                                nomResponsable = datMargiRes[j].MARGICONT[l].CONTNOMBRE;
                                unidadReponsable = datMargiRes[j].MARGICONT[l].CONTUNIDAD;
                            }
                        }

                        //Limita longitud de caracteres del Asunto
                        var forma = R[i].datCorres.MARGINAFORMARES;
                        if (forma.length > 100) {
                            forma = forma.substring(0, 100) + "...";
                        }

                        //Si tiene Adjuntos
                        tieneAdjunto = "";
                        if (R[i].datCorres.ADJUNTO == 1) {
                            tieneAdjunto = "<span class='mif-attachment place-right fg-darkBlue'></span><p style='display:none;'>" + keys + "</p>";
                        }


                        contenido = ""
                            + "<div id='corres_" + R[i].datCorres.CORRESID + "' class='list margi idPadre_" + R[i].datCorres.CORRESID_CONTESTA + " " + clases + "'data-adjunto='" + JSON.stringify(R[i].datfile).replace(/"/g, "\"") +"'>"
                            + "<b class='place-right' style='font-size:10px;'>Id:" + R[i].datCorres.CORRESID + "</b><br />"
                            + tieneAdjunto
                            + " <p class='place-right'>" + posee + "</p>"
                            + "	<span class='icon " + ico + "'></span><p style='display:none;'>" + keys + "</p> "
                            + "	<b class='item-remitente'>" + nomResponsable + "</b>"
                            + "	<p class=''>" + unidadReponsable + "</p>"
                            + "	<p class='item-asunto'>Forma respuesta: " + forma + "</p>"
                            + "	<p class='item-fecha'>" + (($("#cbOrdenar").val() == 1) ? R[i].datCorres.NOTAINSERT : R[i].datCorres.NOTARECIBFEC) + "</p>"
                            + "	<p class='item-estado'>Estado: " + getEstadoList(R[i]) + "</p>"//CORRESDETALLE.js
                            + "</div>";

                        $("#corres_" + R[i].datCorres.CORRESID_CONTESTA).after(contenido);
                    }

                }
                //Carga data
                cargaData(R[i]);
            } else if (R[i].datCorres.CATEGOID == 3 && R[i].datCorres.CORRESID_CONTESTA != -1) {
                if (R[i].datCorres.CONTNOMBRE_DIRIGIDO == "") {
                    nombre = R[i].datCorres.CONTUNIDAD_DIRIGIDO;
                }
                else {
                    nombre = R[i].datCorres.CONTNOMBRE_DIRIGIDO;
                }
                //Si tiene Adjuntos
                tieneAdjunto = "";
                    if (R[i].datCorres.ADJUNTO == 1)
                        tieneAdjunto = "<span class='mif-attachment place-right fg-darkBlue'></span><p style='display:none;'>" + keys + "</p> ";

                contenido = ""
                    + "<div id='corres_" + R[i].datCorres.CORRESID + "' class='list margi idPadre_" + R[i].datCorres.CORRESID_CONTESTA + " " + clases + "'data-adjunto='" + JSON.stringify(R[i].datfile).replace(/"/g, "\"") +"'>"
                    + "<b class='place-right' style='font-size:10px;'>Id:" + R[i].datCorres.CORRESID + "</b><br />"
                    + tieneAdjunto
                    + " <p class='place-right'>" + posee + "</p>"
                    + "	<span class='icon " + ico + "'></span><p style='display:none;'>" + keys + "</p> "
                    + "	<b class='item-remitente'>" + R[i].datCorres.CONTINST_DIRIGIDO + "</b>"
                    + "	<p class=''>" + nombre + "</p>"

                    + "	<p class='item-asunto'>" + asunto + "</p>"
                    + "	<p class='item-fecha'>" + (($("#cbOrdenar").val() == 1) ? R[i].datCorres.NOTAINSERT : R[i].datCorres.NOTAELABFEC) + "</p>"
                    + "	<p class='item-estado'>Estado: " + getEstadoList(R[i]) + "</p>"//CORRESDETALLE.js
                    + "</div>";

                $("#corres_" + R[i].datCorres.CORRESID_CONTESTA).after(contenido);
                //Carga data
                cargaData(R[i]);
            }

            if (i == (R.length - 1)) {
                //Ejecuta filtro
                $("#lista-item-corres").ajaxStop(function () { $('.filtro').delay(2000).keyup(); });
            }
        }
    }



    setTimeout(function () {
        $("#buttonBuscar").click();
        if (ultimoActivo != "" && typeof ultimoActivo != "undefined") {
            //Ejecutar ultimo activo
            $("#" + ultimoActivo).addClass("active").click();
        }
    }, 1000);
}


/**************Carga DATA***************/

function cargaData(item) {
    /*Carga Datos al li y asigna Click*/
    $("#corres_" + item.datCorres.CORRESID)
        .data("datos", item)
        .unbind('click').click(function () {
            if ($(this).data("datos").datCorres.CATEGOID == 1) {
                cargaDetCorres(this); //Carga Detalle Correspondencia
            } else if ($(this).data("datos").datCorres.CATEGOID == 2) {
                cargaDetResMargi(this); //Carga Detalle Respuesta de Marginado
            } else if ($(this).data("datos").datCorres.CATEGOID == 3) {
                cargaDetNota(this); //Carga Detalle Nota
            }
            restricMenu(
                $(this).data("datos").datCorres
                , $(this).data("datos").datremi
                , $(this).data("datos").datmargi
            ); //restringe menú
            $("#lista-item-corres .list").removeClass("active tile element-selected"); // label input:checkbox:not(#.list label input:checkbox:checked)").removeClass("active tile element-selected");
            $(this).addClass("active tile element-selected");
        });
}




/********************Get key, ico, posee..************/
function getIcoKeyPosee(R) {
    //key - Agrega id
    var keys = "key:id" + R.datCorres.CORRESID + "#";

    //key - Activo/Inactivo
    if (R.datCorres.ACTIVO == 1) {
        keys += " key:activo";
    } else {
        keys += " key:inactivo";
    }
    //key - Requiere firma
    if (R.datCorres.REQFIRMA == 1 || R.datCorres.REQFIRMA == 3) {
        keys += " key:firma"
    }

    //key - Tiene adjuntos
    if (R.datCorres.ADJUNTO == 1) {
        keys += " key:adjunto"
    }

    //key - usuario en poseción
    if (typeof (R.datremi.length) == "undefined" || R.datremi.length == 0) {//typeof(R.datremi.length) == "undefined" || 
        keys += " key:" + R.datCorres.INSERTUSRNOM;
    } else {
        keys += " key:" + R.datremi[0].USRNOM;
    }

    return keys;
}

function definirPosecion(R, tip) {
    var posee = "";
    if (tip == 1) {
        if (verifPosCorres(R.datCorres, R.datremi) && R.datCorres.CORRESDEB == 2) {
            //posee = "<input type='checkbox' />";
            posee = "<label class='input-control checkbox small-check'><input type='checkbox'><span class='check'></span></label>";
        }
    } else {
        if (R.datCorres.ACTIVO == 2) {
            //posee = "<input type='checkbox' />";
            posee = "<label class='input-control checkbox small-check'><input type='checkbox'><span class='check'></span></label>";
        }
    }

    return posee;
}

function getIco(R) {
    var ico = "";
    switch (R.datCorres.CATEGOID) {
        case 1:
            ico = "fg-darkBlue registrado mif-file-text"; //registrado
            break;
        case 2:
            ico = "fg-darkMagenta marginar mif-map"; //marginar
            break;
        case 3:
            ico = "fg-darkGreen nota mif-file-empty"; //nota
            break;
    }

    return ico;
}

/*******************CARAGA LISTA RESULTADO DE BUSQUEDA POR CORREID*****************************/
function cargaListCorresByIDv2() {
    if ($("#CORRESID").val()!="") {
        $("#lista-item-corres").empty();
        var corresid = $("#CORRESID").val();
        var grupo = $.jCookies({ get: 'GRUPO' });
        $.when(corresByCorresIdGTjs(corresid, grupo)).then(function (response) {
            var R = response.d;
            generaListCorresFULL(R, 1);
        });
    }
}