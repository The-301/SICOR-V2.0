/**Si/No**/
function siNo(id) {
    if (id == 1) {
        return "<img src='Imas/icons/small/check.png' alt='Si' width='15' hight='15' />"
    } else {
        return "<img src='Imas/icons/small/cancel.png' alt='No' width='15' hight='15'/>"
    }
}

/******tabla dinamica*****/
function setTable(table) {
    var oTable = $(table).dataTable({
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        "sDom": '<""f>t<"F"lp>'
    });
}

/*************************************Funciones Basicas*************************************************/
function tooTip() {
    /****************ToolTipText*********************/
    $(".more.[title]").tipTip({ defaultPosition: "top" });
    $("input.[title],select.[title],textArea.[title]").tipTip({ defaultPosition: "right", activation: "focus" });
    $("a.[title], div.[title], img.[title]").tipTip();
    $("#barSup div.menuIco ul li.[title]").tipTip({ defaultPosition: "left" });
    //    /***************Estructura**************/
    //    $("#divContenedor").css("height", screen.height - 370 + "px");
    //    $(".divContenidoPag").css("height", screen.height - 460 + "px");
    //    $("#divPie").css("top", screen.height - 225 + "px");
}

/****************************************/
function subir() {
    if (document.documentElement.scrollTop < 10) {
        window.scrollTo(0, 0);
    } else {
        window.scrollBy(0, -10);
        setTimeout("subir()", 10);
    }
}
function bajar() {
        window.scrollTo(0, 1000);
}
function gup(name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var tmpURL = window.location.href;
    var results = regex.exec(tmpURL);
    if (results == null)
        return "";
    else
        return results[1];
}
function muestraVF() {
    $('#vfBack').fadeIn('slow');
}
function cierraVF() {
    $("#vfBack").fadeOut("slow");
    $("#vfBack .contenidor").empty();
    $("#vfBack .legend span").empty();
}

/**************************************Mensajes****************************************************/
function mError(m) {
    $.Notify({
        caption: 'Error',
        content: m,
        type: 'alert',
        icon: "<span class='mif-cross'></span>"
    });

}
function mOk(m) {
    $.Notify({
        caption: 'Ok',
        content: m,
        type: 'success',
        icon: "<span class='mif-checkmark'></span>"
    });
}

/**********************************Validacion de Formularios****************************/
function valForm(frm) {
    var notNull = $(frm + " .notNull");
    var pass = $(frm + " input:password.notNull");
    var notNan = $(frm + " .notNan");
    var email = $(frm + " .email");

    $('*').removeClass('inputError');

    var val = true;
    for (var i = 0; i < notNull.length; i++) {
        var valTrim = $.trim(notNull[i].value)
        if (notNull[i].value === "" || notNull[i].value == -1) {
            val = false;
            mError("Introduzca todos los datos requeridos");
            //$(notNull[i]).addClass('inputError');
            $(notNull[i]).addClass('error');
            notNull[i].focus();
            return val;
        }
        //Valida minimo 3 carcateres en input texts y no permite espacios en blanco
        if (
            $(notNull[i]).attr("type") == "text" && notNull[i].value.length < 3
            || $(notNull[i]).attr("type") == "text" && valTrim.length < 3
        ) {
            val = false;
            mError("Introduzca al menos 3 caracteres.");
            //$(notNull[i]).addClass('inputError');
            $(notNull[i]).addClass('error');
            notNull[i].focus();
            return val;
        }
        //Valida minimo 10 carcateres en textarea y no permite espacios en blanco
        if (
            notNull[i].tagName == "TEXTAREA" && notNull[i].value.length < 10
            || notNull[i].tagName == "TEXTAREA" && valTrim.length < 10
        ) {
            val = false;
            mError("Introduzca al menos 10 caracteres.");
            //$(notNull[i]).addClass('inputError');
            $(notNull[i]).addClass('error');
            notNull[i].focus();
            return val;
        }
    }

    if (pass.length > 1) {
        if (pass.length == 2) {
            if (pass[0].value != pass[1].value) {
                val = false;
                mError("Las Contraseñas no son iguales");
                //$(pass[0]).addClass('inputError');
                $(pass[0]).addClass('error');
                pass[0].select();
            }
        } else if (pass.length == 3) {
            if (pass[1].value != pass[2].value) {
                val = false;
                mError("Las Contraseñas no son iguales");
                //$(pass[1]).addClass('inputError');
                $(pass[1]).addClass('error');
                pass[1].select();
            } 
        }
    }

    if (notNan.length > 0) {
        for (var i = 0; i < notNan.length; i++) {
            if (isNaN(notNan[i].value)) {
                val = false;
                mError("Introduzca un número");
                //$(notNan[i]).addClass('inputError');
                $(notNan[i]).addClass('error');
                notNan[i].select();
                return val;
            }
        }
    }
    if (email.length > 0) {
        $.each(email, function (i, e) {
            $(e).val($(e).val().replace(/ /gi, ""));
            if (valcorreo($(e).val()) == false) {
                val = false;
                //$(e).addClass('inputError');
                $(e).addClass('error');
                e.select();
            }
        });

        if (val == false) {
            mError("Introduzca una cuenta de email válida.");
        }
        return val;
    }
    return val;
}

/****Extraer datos del Formulario****/
function getDatForm(frm, name, clase) {
    $('*').removeClass('inputError');
    if (clase) {
        var valDat = $(frm + " input[type=hidden]." + clase + ", " + frm + " input[type=text]." + clase + ", " + frm + " textArea." + clase + ", " + frm + " select." + clase + "");
        var pass = $(frm + " input[type=password]." + clase + "");
        var checkbox = $(frm + " input[type=checkbox]." + clase + "");
        var idD = $(frm + " .id." + clase + "");
        var tem = "'" + name + "':{'" + $(idD[0]).attr("id") + "':'" + $(idD[0]).val() + "',";
    } else {
        var valDat = $(frm + " input[type=hidden], " + frm + " input[type=text], " + frm + " textArea, " + frm + " select");
        var pass = $(frm + " input[type=password]");
        var checkbox = $(frm + " input[type=checkbox]");
        var idD = $(frm + " .id");
        var tem = "'" + name + "':{'" + $(idD[0]).attr("id") + "':'" + $(idD[0]).val() + "',";
    }
    for (var i = 0; i < valDat.length; i++) {

        if ($(valDat[i]).hasClass('money')) {
            tem += "'" + $(valDat[i]).attr("id") + "':'" + formatCurrency($(valDat[i]).val()) + "',";
        } else {
            tem += "'" + $(valDat[i]).attr("id") + "':'" + $(valDat[i]).val().replace(/"/g, "&quot;").replace(/'/g, "&#39;") + "',";
        }
    }
    if(checkbox.length > 0 ){
        for (var i = 0; i < checkbox.length; i++) {
            var valor = 2;
            if ($(checkbox[i]).is(':checked')) { valor = 1; }
            tem += "'" + $(checkbox[i]).attr("id") + "':'" + valor + "',";
        }
    }
    if (pass.length) {
        tem += "'" + $(pass[0]).attr("id") + "':'" + $(pass[0]).val() + "',";
    }
    tem += "'UPDATEUSRID':'" + $.jCookies({ get: 'USRID' }) + "'";
//    tem += "'UPDATEUSRID':1";
    tem += "}"
    
    return tem;
}

/****Carga Datos al Formulario****/
function cargaForm(frm, datos) {
    //$('*').removeClass('inputError');
    $('*').removeClass('error');
    resetForm(frm);
    var mun = 0;

    $.each(datos, function (key, val) {
        if (key == "MUNID") { mun = val }

        if (val == null) {
            $(frm + " #" + key).val("");
        } else {
            if ($(frm + " #" + key).hasClass('select2')) {
                $(frm + " #" + key).select2("val", val);
            }
            //Radio
            if ($(frm + " #" + key).attr('type') == "radio") {
                var radios = $(frm + " #" + key);
                for (var i = 0; i < radios.length; i++) {
                    if ($(radios[i]).val() == val) {
                        $(radios[i]).attr('checked', true);
                    }
                }
            } else {
                //Texto
                if (toType(val) == "string") { val = val.replace(/&quot;/g, "\"").replace(/&#39;/g, "'") }
                $(frm + " #" + key).val(val);
            }
        }

        if (val == 1) {
            $(frm + " #" + key).attr('checked', true);
        }

        if (key == "DEPID") {
            if ($(frm + " #MUNID").length > 0) {
                cargaMun();
                $("#MUNID").val(mun);
            }
        }
    });
}

function resetForm(frm) {
    //$('*').removeClass('inputError');
    $('*').removeClass('error');
    $(frm + " input:text").val('');
    $(frm + " textarea").val('');
    $(frm + " input:password").val('');
    $(frm + " select").val('-1');
    $(frm + " input:hidden.id").val(-1);
    $(frm + " input:checkbox").attr('checked',false) ;
//    $(frm + " input:text")[0].select();
}

function trim (myString){
    return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}



/*******fORMATO MONEDA*****/

function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');

    if (isNaN(num))
        num = 0;

    var signo = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    centavos = num % 100;
    num = Math.floor(num / 100).toString();

    if (centavos < 10)
        centavos = '0' + centavos;

    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + num.substring(num.length - (4 * i + 3));

    return (((signo) ? '' : '-') + num + '.' + centavos);
}


/***********Valida Email*******************/

function valcorreo(valor) {
    var res;
    valor = valor.replace(/ /gi, "");
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor)) {
        res = true;
    } else {
        res = false;
    }
    return res;
}



/*********Generar Contraseña************/

$.extend({
    password: function (length, special) {
        var iteration = 0;
        var password = "";
        var randomNumber;
        if (special == undefined) {
            var special = false;
        }
        while (iteration < length) {
            randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
            if (!special) {
                if ((randomNumber >= 33) && (randomNumber <= 47)) { continue; }
                if ((randomNumber >= 58) && (randomNumber <= 64)) { continue; }
                if ((randomNumber >= 91) && (randomNumber <= 96)) { continue; }
                if ((randomNumber >= 123) && (randomNumber <= 126)) { continue; }
            }
            iteration++;
            password += String.fromCharCode(randomNumber);
        }
        return password;
    }
});

function password(length, special) {
    var iteration = 0;
    var password = "";
    var randomNumber;
    if (special == undefined) {
        var special = false;
    }
    while (iteration < length) {
        randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
        if (!special) {
            if ((randomNumber >= 33) && (randomNumber <= 47)) { continue; }
            if ((randomNumber >= 58) && (randomNumber <= 64)) { continue; }
            if ((randomNumber >= 91) && (randomNumber <= 96)) { continue; }
            if ((randomNumber >= 123) && (randomNumber <= 126)) { continue; }
        }
        iteration++;
        password += String.fromCharCode(randomNumber);
    }
    return password;
}

/*carga Municipios*/
function cargaMun() {
    var depId = $("#DEPID").val();
    if (depId != "-1") {
        $("#MUNID").empty();
        $("#MUNID").append("<option value='-1'>SELECCIONAR</option>");
        for (var i = 1; i < arregloMun[depId].length; i++) {
            $("#MUNID").append("<option value='" + arregloMun[depId][i][1] + "'>" + arregloMun[depId][i][2] + "</option>");
        }
    }
    $("#MUNID").focus();
}

/*quitar tildes y ñ*/
var normalize = (function () {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

    for (var i = 0, j = from.length; i < j; i++)
        mapping[from.charAt(i)] = to.charAt(i);

    return function (str) {
        var ret = [];
        for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
                ret.push(mapping[c]);
            else
                ret.push(c);
        }
        return ret.join('');
    }

})();

/*******************CIIU*****************************/
function detCiiu(ciiu) {
    var contenido = "<h1>" + ciiu + " Contiene</h1><br />"
    if (arregloCiiu4[ciiu]) {
        for (var i = 0; i < arregloCiiu4[ciiu].length; i++) {
            contenido += "<p>"
                + arregloCiiu4[ciiu][i][1] + " - " + arregloCiiu4[ciiu][i][2]
                + "</p><br />"
        }

    }
    $("#d_detCiiu").html(contenido);
}

function checkCiiu(id) {

    if ($("#" + id).is(':checked')) {
        $("#" + id).attr('checked', false);
    } else {
        $("#" + id).attr('checked', true);
    }
}


//Remover Acentos
function remover_acentos(str) {
var map={
' ':'_','À':'A','Á':'A','Â':'A','Ã':'A','Ä':'A','Å':'A','Æ':'AE','Ç':'C','È':'E','É':'E','Ê':'E','Ë':'E','Ì':'I','Í':'I','Î':'I','Ï':'I','Ð':'D','Ñ':'N','Ò':'O','Ó':'O','Ô':'O','Õ':'O','Ö':'O','Ø':'O','Ù':'U','Ú':'U','Û':'U','Ü':'U','Ý':'Y','ß':'s','à':'a','á':'a','â':'a','ã':'a','ä':'a','å':'a','æ':'ae','ç':'c','è':'e','é':'e','ê':'e','ë':'e','ì':'i','í':'i','î':'i','ï':'i','ñ':'n','ò':'o','ó':'o','ô':'o','õ':'o','ö':'o','ø':'o','ù':'u','ú':'u','û':'u','ü':'u','ý':'y','ÿ':'y','Ā':'A','ā':'a','Ă':'A','ă':'a','Ą':'A','ą':'a','Ć':'C','ć':'c','Ĉ':'C','ĉ':'c','Ċ':'C','ċ':'c','Č':'C','č':'c','Ď':'D','ď':'d','Đ':'D','đ':'d','Ē':'E','ē':'e','Ĕ':'E','ĕ':'e','Ė':'E','ė':'e','Ę':'E','ę':'e','Ě':'E','ě':'e','Ĝ':'G','ĝ':'g','Ğ':'G','ğ':'g','Ġ':'G','ġ':'g','Ģ':'G','ģ':'g','Ĥ':'H','ĥ':'h','Ħ':'H','ħ':'h','Ĩ':'I','ĩ':'i','Ī':'I','ī':'i','Ĭ':'I','ĭ':'i','Į':'I','į':'i','İ':'I','ı':'i','Ĳ':'IJ','ĳ':'ij','Ĵ':'J','ĵ':'j','Ķ':'K','ķ':'k','Ĺ':'L','ĺ':'l','Ļ':'L','ļ':'l','Ľ':'L','ľ':'l','Ŀ':'L','ŀ':'l','Ł':'L','ł':'l','Ń':'N','ń':'n','Ņ':'N','ņ':'n','Ň':'N','ň':'n','ŉ':'n','Ō':'O','ō':'o','Ŏ':'O','ŏ':'o','Ő':'O','ő':'o','Œ':'OE','œ':'oe','Ŕ':'R','ŕ':'r','Ŗ':'R','ŗ':'r','Ř':'R','ř':'r','Ś':'S','ś':'s','Ŝ':'S','ŝ':'s','Ş':'S','ş':'s','Š':'S','š':'s','Ţ':'T','ţ':'t','Ť':'T','ť':'t','Ŧ':'T','ŧ':'t','Ũ':'U','ũ':'u','Ū':'U','ū':'u','Ŭ':'U','ŭ':'u','Ů':'U','ů':'u','Ű':'U','ű':'u','Ų':'U','ų':'u','Ŵ':'W','ŵ':'w','Ŷ':'Y','ŷ':'y','Ÿ':'Y','Ź':'Z','ź':'z','Ż':'Z','ż':'z','Ž':'Z','ž':'z','ſ':'s','ƒ':'f','Ơ':'O','ơ':'o','Ư':'U','ư':'u','Ǎ':'A','ǎ':'a','Ǐ':'I','ǐ':'i','Ǒ':'O','ǒ':'o','Ǔ':'U','ǔ':'u','Ǖ':'U','ǖ':'u','Ǘ':'U','ǘ':'u','Ǚ':'U','ǚ':'u','Ǜ':'U','ǜ':'u','Ǻ':'A','ǻ':'a','Ǽ':'AE','ǽ':'ae','Ǿ':'O','ǿ':'o','|':'-','&':'and','~':'-'
};

var res=''; //Está variable almacenará el valor de str, pero sin acentos y tildes
for (var i=0;i<str.length;i++)
{
c=str.charAt(i);res+=map[c]||c;
}
return res;
}

//Extrae nuemro de dias de una fecha formato dd/mm/aaaa
function numDias(fecha) {
    var fechaSplit = fecha.split('/')
   ,d = parseInt(fechaSplit[0], 10)
   ,m = parseInt(fechaSplit[1], 10)
   ,a = parseInt(fechaSplit[2], 10);
    
    m = (m + 9) % 12;
    a = a - Math.floor(m / 10);
    return 365 * a + Math.floor(a / 4) - Math.floor(a / 100) + Math.floor(a / 400)
                + Math.floor((m * 306 + 5) / 10) + d - 1
}


//Seelcciona todo los checkbox
function selctTodo(form) {
    /*Seleccionar todos los items*/
    var items = $(form + " input:checkbox");

    if ($(items[0]).is(':checked')) {
        $(items).attr('checked', false);
    } else {
        $(items).attr('checked', true);
    }

    for (var i = 0; i < items.length; i++) {
        if ($(items[i]).parent().parent().css('display') == "none") {
            if ($(items[i]).is(':checked')) {
                $(items[i]).attr('checked', false);
            } else {
                $(items[i]).attr('checked', true);
            }
        }
    }
}

var toType = function (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}


////If true = 1 else false = 2
function trueOrFalse(v) {
    if (v == true) return 1
    else return 2
}

//Camel Case
function camelCase(input) {
    r = ""
    $.each(input.split(" "), function (i, e) {
        e = e.toLowerCase();
        eInicial = e.substring(0, 1).toUpperCase()
        eResto = e.substring(1, e.length)
        r += eInicial + eResto + " "
    });
    r = r.substring(0, (r.length - 1));//elimina ultimo espacio
    return r
}