<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="MultipleFileUpload.Default" %>
<%@ Register TagPrefix="jQuery" TagName="MultipleFileUpload" Src="MultipleFileUploadControl/MultipleFileUpload.ascx" %>
<!DOCTYPE html>
<html lang="es">
<head id="Head1" runat="server">
    <!-- Force latest IE rendering engine or ChromeFrame if installed -->
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><![endif]-->
    <meta charset="utf-8" />
    <title></title>    
</head>
<body>
    <!-- 
        formulario de archivos 
        - solo se permiten archivos formatos de office y pdf
        - tamaño máximo de subida = 30MB
    -->    
    <form id="Form1" runat="server">
        <jQuery:MultipleFileUpload 
            ID="MultipleFileUpload" 
            runat="server" 
            AcceptFileTypes="pdf|doc|docx|xls|xlsx|ppt|pptx"
            SequentialUploads="false" 
            EditableFileNames="true" 
            EnableChunkedUploads="false"
            MaxChunkSize="31562138"                           
            Resume="false" 
            AutoRetry="false" 
            RetryTimeout="1000" 
            MaxRetries="100"
            OnFileUploadDone="fileuploaddone" 
            LimitConcurrentUploads="2" 
            ForceIframeTransport="false"
            AutoUpload="false" 
            PreviewAsCanvas="true" 
            MaxFileSize="31562138" />
    </form>

    <!-- script cuando se agregan los archivos -->
   <script type="text/javascript">
        function fileuploaddone(e, data) {
            var file = data.files[0];
            // use data.formData[0].value to get the file name typed by the user in case of editable filenames
            //alert(file.name + ' uploaded with success (' + file.type + ' ' + file.size + ' bytes).');
            return false;
        }
    </script>
</body>
</html>