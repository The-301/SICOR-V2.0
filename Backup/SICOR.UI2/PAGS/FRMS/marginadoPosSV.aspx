<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="marginadoPosSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.marginadoSV" %>

<!DOCTYPE html>

<html lang="es">
<head runat="server">
    <title></title>
    <script type="text/javascript">
        $(document).ready(function () {
            cambiaLogo("frm_margRecibUp");
        });
    </script>
</head>
<body>
  <div id='frm_marginadoPos' class="panel">
    <div class="panel">
      <div class="content bg-white" style="overflow-y:auto;overflow-x:hidden;height:250px;">
          <div class="detalle-margi-corres"></div>
          <div class="grid condensed">
              <div class="row cells4">
                  <div class="cell">
                      Razon*
                  </div>
                  <div class="cell colspan3">
                      <div class="input-control textarea full-size">
                          <textarea id="MARGIPOSRAZON" class='notNull'></textarea>
                          <input type="hidden" id="MARGID" value='-1' />
                      </div>
                  </div>
              </div>
              <div class="row cells4">
                  <div class="cell">
                      Nueva fecha*
                  </div>
                  <div class="cell colspan3">
                      <div class="input-control text">
                          <span class="mif-calendar prepend-icon"></span>
                          <input type='text' id='MARGIPOSNUEVAFECH' name='MARGIPOSNUEVAFECH' class='notNull'>
                      </div>
                  </div>
              </div>  
              <div class="row cells4">
                  <div class="cell colspan4" style="text-align:center;">
                      <button onclick="javascript:margiPosSV()" class="button primary"> 
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
