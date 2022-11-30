<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SICOR.UI.index" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta charset="UTF-8" />
    <title>SICOR - Sistema de Correspondencia</title>
    <link rel="icon" type="image/png" href="images/favicon.ico" />

   <%-- CSS --%>
    <link href="JS/Metro/build/css/metro.min.css" rel="stylesheet" type="text/css" />
    <link href="JS/Metro/build/css/metro-icons.min.css" rel="stylesheet">

    <link href="CSS/sicorv2.css" rel="stylesheet" type="text/css" />

   <%-- JAVASCRIPT --%>
    <script src="JS/jquery-2.1.4.min.js" type="text/javascript"></script>
    <script src="JS/Metro/build/js/metro.min.js" type="text/javascript"></script>
    <script src="JS/jcookies.js" type="text/javascript"></script>
    <script src="JS/SETUPAJAX-PAG.js" type="text/javascript"></script>
    <script src="JS/SETUP.js" type="text/javascript"></script>
    <script src="JS/CLASES/WS.js" type="text/javascript"></script>
    <script src="JS/CLASES/USUARIOS.js" type="text/javascript"></script>
</head>
<body class="bg-grayLighter">
    <div id='div_load' class="div_load">
        <div>
            <img src="IMAS/ajax-loader.gif" alt="Cargando..." />
        </div>
    </div>
    <div class="app-bar" data-role="appbar">
        <a href="#" class="app-bar-element">
            <span class="mif-mail mif-2x">&nbsp;SICOR MINEC</span>
        </a>
        <span class="app-bar-divider"></span>
        <a href="#" class="app-bar-element">Sistema de correspondencia</a>
    </div>
    <div class="grid">
        <div class="row cells12">
            <div class="cell colspan3"></div>
            <div class="cell colspan6">
                <div class="login-form block-shadow" style="margin:0 auto;">
                    <form id="frm_log" autocomplete="off">
                        <div class="panel">
                            <div class="heading bg-darkCyan" style="padding-left:10px;">
                                <span class="mif-users"></span>LOGIN
                            </div>
                            <div class="content bg-white">
                                <div class="text full-size input-control modern text" data-role="input">
                                    <span class="mif-user prepend-icon"></span>
                                    <input type="text" class="input notNull" id="cuenta" onKeyUp = "OnKeyUp(this,event);" style="padding-right: 36px;" />
                                    <span class="label"><b>Su usuario:</b></span>                
                                    <span class="informer">Ingrese su cuenta de usuario</span>
                                    <span class="placeholder" style="padding-left:30px">Cuenta de usuario</span>                
                                    <button class="button helper-button clear" tabindex="-1" type="button"><span class="mif-cross"></span></button>
                                </div>
                                <br>
                                <br>
                                <div class="input-control password full-size modern" data-role="input">
                                    <span class="mif-key prepend-icon"></span>
                                    <input type="password" class="input notNull" id="pass" onKeyUp = "OnKeyUp(this,event);" />
                                    <span class="label"><b>Su contraseña:</b></span>                
                                    <span class="placeholder" style="padding-left:30px">Contraseña</span>
                                    <span class="informer">Ingrese su contraseña</span>
                                    <button class="button helper-button reveal"><span class="mif-looks"></span></button>
                                </div>
                                <br>
                                <br>
                                <div>
                                    <button type="button" onclick="javascript:verifUsuario()" class="button primary"><span class="mif-enter"></span> Ingresar</button>
                                </div>                
                            </div>
                        </div>
                    </form>
                </div>            
            </div>
            <div class="cell colspan3"></div>
        </div>
    </div>
</body>
</html>