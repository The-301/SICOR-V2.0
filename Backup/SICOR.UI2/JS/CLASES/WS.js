/***************************************************************************************************/
/*****************************************NOTIFICACIONES*********************************************/
/***************************************************************************************************/
function sp_notificacionGTjs(userid) {
    return $.ajax({
        type: "POST",
        url: "../WS/NOTIFICACIONws.asmx/sp_notificacionGTws",
        data: "{'userid':"+userid+"}"
    })
}

function sp_notificacionUPjs(mensajeid,userid) {
    return $.ajax({
        type: "POST",
        url: "../WS/NOTIFICACIONws.asmx/sp_notificacionUPws",
        data: "{'mensajeid':" + mensajeid + ",'userid':" + userid + "}"
    })
}

/***************************************************************************************************/
/*******************************************************CORRESPONDENCIA******************************/
/***************************************************************************************************/
function sp_corresFullGTjs(tipo, grupo) {
    tipo = (typeof tipo == "undefined" || tipo == null || tipo=="") ? 1 : tipo;
    return $.ajax({
        type: "POST",
        url: "../WS/CORRESPONDENCIAws.asmx/sp_corresFullGTws",
        data: "{'tipo':"+parseInt(tipo)+",'grupo':"+grupo+"}"
    })
}

function sp_corresFullByIdGTjs(corresId) {
    return $.ajax({
        type: "POST",
        url: "../WS/CORRESPONDENCIAws.asmx/sp_corresFullByIdGTws",
        data: "{'corresId':'" + corresId + "'}"
    })
}

/***************sp_correspondenciaSVjs********************/
function sp_correspondenciaSVjs(Datos) {
    return $.ajax({
        type: "POST",
        url: "../WS/CORRESPONDENCIAws.asmx/sp_correspondenciaSVws",
        data: "{" + Datos + "}"
    })
}

/************Eliminar************/
function sp_corresElimSVjs(corresid,marginaid, updateusrid) {
    return $.ajax({
        url: "../WS/CORRESPONDENCIAws.asmx/sp_corresElimSVws",
        data: "{'corresid':'" + corresid + "', 'marginaid':'"+marginaid+"', 'updateusrid':'" + updateusrid + "'}"
    })
}

/************Activar / Desactivar Individual************/
function sp_corresActivoSVjs(corresid, activo, updateusrid) {
    return $.ajax({
        url: "../WS/CORRESPONDENCIAws.asmx/sp_corresActivoSVws",
        data: "{'Datos':{'corresid':'" + corresid + "', 'activo':'" + activo + "', 'updateusrid':'" + updateusrid + "'}}"
    })
}

/************Activar / Desactivar Individual************/
function activaSVjs(Datos) {
    return $.ajax({
        url: "../WS/CORRESPONDENCIAws.asmx/activaSVws",
        data: "{" + Datos + "}"
    })
}

/*********Actualizar firma************/
function sp_corresFirmaSVjs(corresid, updateusrid) {
    return $.ajax({
        url: "../WS/CORRESPONDENCIAws.asmx/sp_corresFirmaSVws",
        data: "{'corresid':'" + corresid + "', 'updateusrid':'" + updateusrid + "'}"
    })
}

/***************************************************************************************************/
/********************************************************CATALOGOS**********************************/
/***************************************************************************************************/
/***************sp_cat_tipoGTjs********************/
function sp_catalogosGTjs(grupo)
{
 return $.ajax({
     url: "../WS/CATALOGOSws.asmx/sp_catalogosGTws",
     data: "{'grupo':"+grupo+"}"
 })
}

/***************************************************************************************************/
/*******************************************************CONTACTOS***********************************/
/***************************************************************************************************/
/***************sp_contactosGTjs********************/
function sp_contactosGTjs(grupo) {
    return $.ajax({
        url: "../WS/CONTACTOSws.asmx/sp_contactosGTws",
        data: "{'grupo':"+grupo+"}"
    })
}

/***************sp_contactosGTjs********************/
function sp_contactosInternosGTjs(grupo) {
    return $.ajax({
        url: "../WS/CONTACTOSws.asmx/sp_contactosInternosGTws",
        data: "{'grupo':"+grupo+"}"
    })
}

/***************sp_contUnidadGTjs********************/
function sp_contUnidadGTjs(grupo) {
    return $.ajax({
        url: "../WS/CONTACTOSws.asmx/sp_contUnidadGTws",
        data: "{'grupo':"+grupo+"}"
    })
}

/***************sp_contactosSVjs********************/
function sp_contactosSVjs(Datos) {
    return $.ajax({
        url: "../WS/CONTACTOSws.asmx/sp_contactosSVws",
        data: "{" + Datos + ",'grupo':"+$.jCookies({ get: 'GRUPO' })+"}"
    })
}

/***************************************************************************************************/
/***********************************MARGINADO Y REMITIDO *********************************************/
/***************************************************************************************************/
/***************sp_marginadoSVjs********************/
function sp_marginadoSVjs(Datos) {
    return $.ajax({
        url: "../WS/MARGINADOws.asmx/marginadosSVws",
        data: "{" + Datos + "}"
    })
}

/***************sp_marginadoGTjs********************/
function sp_marginadoGTjs(corresid) {
    return $.ajax({
        url: "../WS/MARGINADOws.asmx/sp_marginadoGTws",
        data: "{'corresid':'" + corresid + " '}"
    })
}

/***************sp_remitidoGTjs********************/
function sp_remitidoGTjs(corresid) {
    return $.ajax({
        url: "../WS/REMITIDOws.asmx/sp_remitidoGTws",
        data: "{'corresid':'" + corresid + " '}"
    })
}

/***************sp_remitidoSVjs********************/
function sp_remitidosSVjs(Datos) {
    return $.ajax({
        url: "../WS/REMITIDOws.asmx/remitidosSVws",
        data: "{" + Datos + "}"
    })
}

/***************sp_remitidoGTjs********************/
function sp_remiConfirByUsridGTjs(usrid,grupo) {
    return $.ajax({
        url: "../WS/REMITIDOws.asmx/sp_remiConfirByUsridGTws",
        data: "{'usrid':'" + usrid + "','grupo':"+grupo+"}"
    })
}

/***************sp_remitidoGTjs********************/
function sp_remiConfirSVjs(corresid) {
    return $.ajax({
        url: "../WS/REMITIDOws.asmx/sp_remiConfirSVws",
        data: "{'corresid':'" + corresid + " '}"
    })
}

/***************************************************************************************************/
/***********************************USUARIOS********************************************************/
/***************************************************************************************************/
/***************sp_usuariosGTjs********************/
function sp_usuariosGTjs(grupo) {
    return $.ajax({
        url: "../WS/USUARIOSws.asmx/sp_usuariosGTws",
        data: "{'grupo':'"+grupo+"'}"
    })
}

/***************sp_usuariosVerifGTjs********************/
function sp_usuariosVerifGTjs(cuenta, pass) {
    return $.ajax({
        url: "WS/USUARIOSws.asmx/sp_usuariosVerifGTws",
        data: "{'cuenta':'" + cuenta + "','pass':'" + pass + "'}"
    })
}

function sp_usuariosUpPassSVjs(id, pass, npass) {
    return $.ajax({
        url: "../WS/USUARIOSws.asmx/sp_usuariosUpPassSVws",
        data: "{'id':'" + id + "','pass':'" + pass + "','npass':'" + npass + "'}"
    })
}

/***************************************************************************************************/
/************************************ARCHIVO********************************************************/
/***************************************************************************************************/
/***************sp_archivoSVjs********************/
function archivarSVjs(Datos,grupo) {
    return $.ajax({
        url: "../WS/ARCHIVOws.asmx/archivarSVws",
        data: "{" + Datos + ",'grupo':"+grupo+"}"
    })
}

/***************sp_archivoGTjs********************/
function sp_archivoGTjs(corresid) {
    return $.ajax({
        url: "../WS/ARCHIVOws.asmx/sp_archivoGTws",
        data: "{'corresid':'" + corresid + " '}"
    })
}

/***************************************************************************************************/
/************************************ADJUNTO********************************************************/
/***************************************************************************************************/
/***************sp_adjuntoSVjs********************/
function sp_adjuntoSVjs(Datos,grupo) {
    return $.ajax({
        url: "../WS/ADJUNTOws.asmx/sp_adjuntoSVws",
        data: "{" + Datos + ",'grupo':"+grupo+"}"
    })
}

/***************sp_adjuntoGTjs********************/
function sp_adjuntoGTjs(corresid) {
    return $.ajax({
        url: "../WS/ADJUNTOws.asmx/sp_adjuntoGTws",
        data: "{'corresid':'" + corresid + " '}"
    })
}

/***************sp_adjuntoDLjs********************/
function sp_adjuntoDLjs(adjuntoName, usrs_id, CorresId) {
    return $.ajax({
        url: "../WS/ADJUNTOws.asmx/sp_adjuntoDLws",
        data: "{'adjuntoName':'" + adjuntoName + "','usrs_id':" + usrs_id + ",'CorresId':" + CorresId + "}"
    })
}

/***************************************************************************************************/
/************************************ENVIADO********************************************************/
/***************************************************************************************************/
/***************sp_enviadoSVjs********************/
function sp_enviadoSVjs(Datos) {
    return $.ajax({
        url: "../WS/ENVIADOws.asmx/sp_enviadoSVws",
        data: "{" + Datos + "}"
    })
}

/***************sp_enviadoGTjs********************/
function sp_enviadoGTjs(corresid) {
    return $.ajax({
        url: "../WS/ENVIADOws.asmx/sp_enviadoGTws",
        data: "{'corresid':'" + corresid + " '}"
    })
}

/***************************************************************************************************/
/******************************************BUSCAR***************************************************/
/***************************************************************************************************/
//Lista de Insitituciones
function contInstGTjs(grupo) {
    return $.ajax({
        url: "../WS/BUSCARws.asmx/contInstGTws",
        data: "{'grupo':"+grupo+"}"
    })
}

// Lista de Correspondencia por insitución
function corresFullByInstGTwsjs(inst,grupo) {
    return $.ajax({
        url: "../WS/BUSCARws.asmx/corresFullByInstGTws",
        data: "{'inst':'" + inst + "','grupo':" + grupo + "}"
    })
}

//Lista Correspondencia por contacto
function corresByContGTjs(tipo,cont,texto,grupo) {
    return $.ajax({
        url: "../WS/BUSCARws.asmx/corresByContGTws",
        data: "{'tipo':'" + tipo + "','cont':'" + cont + "','texto':'"+texto+"','grupo':"+grupo+"}"
    })
}

//Lista Correspondencia po Aunto
function corresByAsuntoGTjs(asunto,grupo) {
    return $.ajax({
        url: "../WS/BUSCARws.asmx/corresByAsuntoGTws",
        data: "{'asunto':'" + asunto + "','grupo':"+grupo+"}"
    })
}

//Lista Correspondencia por fecha
function corresByFechajs(fech01, fech02,grupo) {
    return $.ajax({
        url: "../WS/BUSCARws.asmx/corresByFechaws",
        data: "{'fech01':'" + fech01 + "','fech02':'" + fech02 + "','grupo':"+grupo+"}"
    })
}

//Lista Correspondencia CORRESID
function corresByCorresIdGTjs(corresid,grupo) {
    return $.ajax({
        url: "../WS/BUSCARws.asmx/corresByCorresIdGTws",
        data: "{'corresid':'" + corresid + "','grupo':"+grupo+"}"
    })
}

//Lista Correspondencia COD/REF
function corresByCodRefGTjs(cod,grupo) {
    return $.ajax({
        url: "../WS/BUSCARws.asmx/corresByCodRefGTws",
        data: "{'cod':'" + cod + "','grupo':"+grupo+"}"
    })
}

/***************************************************************************************************/
/*********************************************IMPRIMIR***********************************************/
/***************************************************************************************************/
//Lista enviados sin respuesta por fecha
function enviadosSinResByFechaGTjs(fech01, fech02, grupo, TipoC) {
    return $.ajax({
        url: "../WS/IMPRIMIRws.asmx/enviadosSinResByFechaGTws",
        data: "{'fech01':'" + fech01 + "','fech02':'" + fech02 + "','grupo':'"+grupo+"','TipoC':'"+TipoC+"'}"
    })
}

//Lista Marginados sin respuesta por fecha
function marginadosSinResByFechaGTjs(fech01, fech02,grupo,TipoC) {
    return $.ajax({
        url: "../WS/IMPRIMIRws.asmx/marginadosSinResByFechaGTws",
        data: "{'fech01':'" + fech01 + "','fech02':'" + fech02 + "','grupo':'" + grupo + "','TipoC':'" + TipoC + "'}"
    })
}

function margiRepByFechaGTjs(fech01, fech02,grupo) {
    return $.ajax({
        url: "../WS/IMPRIMIRws.asmx/margiRepByFechaGTws",
        data: "{'fech01':'" + fech01 + "','fech02':'" + fech02 + "','grupo':"+grupo+"}"
    })
}

/***************************************************************************************************/
/****************************************************MENSAJES INTERNOS*******************************/
/***************************************************************************************************/
/***************sp_mensaje_inSVjs********************/
function sp_mensaje_inSVjs(Datos) {
    return $.ajax({
        url: "../WS/MENSAJE_INws.asmx/sp_mensaje_inSVws",
        data: "{" + Datos + "}"
    })
}

/***************sp_mensaje_inGTjs********************/
function sp_mensaje_inGTjs(clm_usrs_id) {
    return $.ajax({
        url: "../WS/MENSAJE_INws.asmx/sp_mensaje_inGTws",
        data: "{'clm_usrs_id':'" + clm_usrs_id + " '}"
    })
}

/***************sp_mensajeRecib_inGTjs********************/
function sp_mensajeRecib_inGTjs(clm_usrs_id) {
    return $.ajax({
        url: "../WS/MENSAJE_INws.asmx/sp_mensajeRecib_inGTws",
        data: "{'clm_usrs_id':'" + clm_usrs_id + " '}"
    })
}

/***************sp_mensajeEnvib_inGTjs********************/
function sp_mensajeEnvi_inGTjs(clm_usrs_id) {
    return $.ajax({
        url: "../WS/MENSAJE_INws.asmx/sp_mensajeEnvi_inGTws",
        data: "{'clm_usrs_id':'" + clm_usrs_id + " '}"
    })
}

/***************sp_mensajeRecibNum_inGTjs********************/
function sp_mensajeRecibNum_inGTjs(clm_usrs_id) {
    return $.ajax({
        url: "../WS/MENSAJE_INws.asmx/sp_mensajeRecibNum_inGTws",
        data: "{'clm_usrs_id':'" + clm_usrs_id + " '}"
    })
}

/***************sp_mensajeUpLeido_inGTjs********************/
function sp_mensajeUpLeido_inGTjs(clm_usrs_id) {
    return $.ajax({
        url: "../WS/MENSAJE_INws.asmx/sp_mensajeUpLeido_inGTws",
        data: "{'clm_usrs_id':'" + clm_usrs_id + " '}"
    })
}

/***************sp_mensajeByIdFech_inGTjs********************/
function sp_mensajeByIdFech_inGTjs(clm_usrs_id, FECH01, FECH02) {
    return $.ajax({
        url: "../WS/MENSAJE_INws.asmx/sp_mensajeByIdFech_inGTws",
        data: "{'clm_usrs_id':'" + clm_usrs_id + " ','FECH01':'"+FECH01+"', 'FECH02':'"+FECH02+"'}"
    })
}

/***************************************************************************************************/
/******************************************MENSAJES EXTERNO******************************************/
/***************************************************************************************************/
/***************sp_mensaje_inSVjs********************/
function mensaje_exMasMailjs(Datos, mail, adjuntos) {
    return $.ajax({
        url: "../WS/MENSAJE_EXws.asmx/mensaje_exMasMailws",
        data: "{" + Datos + ", " + mail + ","+adjuntos+"}"
    })
}

/************Eliminar CONTACTOS************/
function sp_contactoElimSVjs(contactoid, usuarioid) {
    return $.ajax({
        url: "../WS/CONTACTOSws.asmx/sp_contactoDLws",
        data: "{'contactoid':" + contactoid + ", 'usuarioid':" + usuarioid + "}"
    })
}