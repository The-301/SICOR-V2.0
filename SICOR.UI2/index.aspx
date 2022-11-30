<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SICOR.UI.index" %>
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>SICOR - Sistema de Correspondencia</title>
  <link rel="icon" type="image/png" href="images/favicon.ico" />
  <link href='https://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Arimo' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Hind:300' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="CSS/NWL.css">
  <link href="JS/Metro/build/css/metro.min.css" rel="stylesheet" type="text/css" />
  <link href="JS/Metro/build/css/metro-icons.min.css" rel="stylesheet">
  <link href="CSS/sicorv2.css" rel="stylesheet" type="text/css"/>

     <%-- JAVASCRIPT --%>
    <script src='//cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    
    <script src="JS/jquery-2.1.4.min.js" type="text/javascript"></script>
    <script src="JS/Metro/build/js/metro.min.js" type="text/javascript"></script>
    <script src="JS/jcookies.js" type="text/javascript"></script>
    <script src="JS/SETUPAJAX-PAG.js" type="text/javascript"></script>
    <script src="JS/SETUP.js" type="text/javascript"></script>
    <script src="JS/CLASES/WS.js" type="text/javascript"></script>
    <script src="JS/CLASES/USUARIOS.js" type="text/javascript"></script>

</head>
<body>
<!-- Boton inicio -->
<div id="login-button">
  <img id="img1" src="https://www.presidencia.gob.sv/wp-content/uploads/2020/04/WhatsApp-Image-2020-04-06-at-4.53.29-PM.jpeg"/>
</div>
    <div class="app-bar" data-role="appbar">
        <a href="#" class="app-bar-element">
            <span class="mif-mail mif-2x">&nbsp;SICOR MINEC</span>
        </a>
        <span class="app-bar-divider"></span>
        <a href="#" class="app-bar-element">Sistema de correspondencia</a>
    </div>
    <!--Div del formulario login-->
<div id="container" style="">
  <div class="heading bg-darkCyan" style="padding-left:10px;height: 12%;background-color: blue;padding-left: 2%;padding-top: 2%; border-radius:3%;">
      <span class="mif-users" style="font-size:125%; color:#ffff; padding-left:2%;">&nbsp;LOGIN</span>
  </div>
  <span class="close-btn">
    <img src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"/>
  </span>
<!--Formulario login-->
  <form autocomplete="off">
      <br>
      <div class="container" style="width:95%">
    <div class="text full-size input-control modern text" data-role="input">
        <span class="mif-user prepend-icon" style="padding-top:0.7%;"></span>
        <input type="text" class="input notNull" id="cuenta" onKeyUp = "OnKeyUp(this,event);" style="padding-right: 36px; color:black; padding-top:0.8%;" />
        <span class="label"><b>Su usuario:</b></span> 
        <span class="informer">Ingrese su cuenta de usuario</span>
        <span class="placeholder" style="padding-left:30px">Cuenta de usuario</span>
        <button class="button helper-button clear" tabindex="-1" type="button" style="height:45%; margin-top:3%;"><span class="mif-cross"></span></button>
    </div>
   <br>
   <br>
<div class="input-control password full-size modern" data-role="input">
    <span class="mif-key prepend-icon" style="padding-top:1%;"></span>
    <input type="password" class="input notNull" id="pass" onKeyUp = "OnKeyUp(this,event);" style="color:black;"/>
    <span class="label"><b>Su contraseña:</b></span>  
    <span class="placeholder" style="padding-left:30px">Contraseña</span>
    <span class="informer">Ingrese su contraseña</span>
    <button class="button helper-button reveal" style="height:45%; margin-top:3%;"><span class="mif-looks"></span></button>
</div>
      <br><br><br><br>
      <div padding-left: 25%>
          <button type="button" onclick="javascript:verifUsuario()" class="button primary" padding-left: 2%><span class="mif-enter"></span> Ingresar</button>
      </div>
          </div>
</form>
    <script src="JS/logs.js" type="text/javascript"></script>
</div>
</body>

    <!--Body-->

</html>