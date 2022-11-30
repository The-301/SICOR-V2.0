<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="usuariosUpPassSV.aspx.cs" Inherits="SICOR.UI2.PAGS.FRMS.enviadoSV" %>

<!DOCTYPE html>

<html lang="es">
<head runat="server">
    <meta charset="UTF-8" />
    <title></title>
    <link rel="icon" type="image/png" href="../images/favicon.ico" />
</head>
<body>
    <div id='frm_usuariosUpPass' class="panel">
        <div class="content bg-white">
            <div class="grid condensed">
                <div class="row cells4">
                    <div class="cell">Contraseña actual*</div>
                    <div class="cell colspan3">
                        <div class="input-control text full-size">
                            <span class="mif-unlock prepend-icon"></span>
                            <input type='password' id='pass' class='notNull '>
                        </div>
                    </div>
                </div>
                <div class="row cells4">
                    <div class="cell">Nueva actual*</div>
                    <div class="cell colspan3">
                        <div class="input-control text full-size">
                              <span class="mif-lock prepend-icon"></span>
                              <input type='password' id='npass'class='notNull'>
                        </div>
                    </div>
                </div>
                <div class="row cells4">
                    <div class="cell">Confirmar nueva actual*</div>
                    <div class="cell colspan3">
                        <div class="input-control text full-size">
                                <span class="mif-lock prepend-icon"></span>
                                <input type='password' id='cnpass' class='notNull'>
                        </div>
                    </div>
                </div> 
                <div class="row cells4">
                    <div class="cell colspan4" style="text-align:center;">
                          <button onclick="javascript:void(0);" class="button primary" id="btn_usrUpPassOK"> 
                              <span class="mif-checkmark"></span> Aceptar</button>
                          <button onclick="javascript:closeWin()" class="button danger">
                              <span class="pictogram mif-cross"></span> Cancelar </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
