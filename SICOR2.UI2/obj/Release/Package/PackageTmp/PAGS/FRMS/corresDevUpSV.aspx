<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="corresDevUpSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.enviadoSV" %>

<!DOCTYPE html>

<html lang="es">
<head runat="server">
    <title></title>
    <script type="text/javascript">
        $(document).ready(function () {
            cambiaLogo("frm_corresDevUp");
        });
    </script>    
</head>
<body>    
   <div id='frm_corresDevUp' class="panel">
    <div class="panel">
      <div class="content bg-white" style="overflow-y:auto;overflow-x:hidden;height:200px;">
          <div class="grid condensed">
              <div class="row cells4">
                  <div class="cell">Fecha recibido*</div>
                  <div class="cell colspan3">
                      <div class="input-control text">
                          <span class="mif-calendar prepend-icon"></span>
                          <input type='text' id='CORRESDEB_RECIBFEC' class='notNull'>
                      </div>
                  </div>
              </div>
              <div class="row cells4">
                  <div class="cell">Hora recibido*</div>
                  <div class="cell colspan3">
                      <div class="input-control text">
                        <span class="mif-history prepend-icon"></span>
                          <input type='text' id='CORRESDEB_RECIBHORA' class='notNull '>
                      </div>
                  </div>                  
              </div>
              <div class="row cells4">
                  <div class="cell colspan4" style="text-align:center;">
                      <button onclick="" class="button primary" id="btn_corresDevUpSV"> 
                          <span class="mif-checkmark"></span> Aceptar</button>
                      <button onclick="javascript:closeWin()" class="button danger">
                          <span class="mif-cross"></span> Cancelar </button>                    
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</body>
</html>
