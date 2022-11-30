using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Web;
using SICOR.DL;
using SICOR.EL;

namespace SICOR.BL
{
    public class MENSAJE_EXbl
    {
        SICOR_DBEntities cx = new SICOR_DBEntities();
        
        //Mensaje Externo SV

        public String sp_mensaje_exSVbl(MENSAJE_EXel Datos)
        {
            String res = "";
            try {
                res = cx.sp_mensaje_exSV(
                    Datos.msjexid
                    , Datos.corresid
                    , Datos.contid
                    , Datos.tipoid
                    , Datos.msjexmensaje
                    ,Datos.updateusrid
                    ).SingleOrDefault().MSJEXID.ToString();
            }
            catch { res = "Error interno, intente de nuevo después de recargar la aplicación."; }

            return res;
        }

        
        //MAIL
        public String enviaMail(MAILel mail,String[] adjuntos)
        {
            var msg = new MailMessage();
            //Agrega destinatarios
            foreach (var to in mail.mailTo)
            {
                msg.To.Add(to);
            }

            //Agrega copiados
            if (mail.mailCC.Length > 0)
            {
                foreach (var cc in mail.mailCC)
                {
                    msg.CC.Add(cc);
                }
            }
            
            msg.From = new MailAddress(mail.mailFrom, "SICOR - MINEC Control de Correspondencia", Encoding.UTF8);
            msg.Subject = mail.mailSubject;
            msg.SubjectEncoding = Encoding.UTF8;
            msg.Body = mail.mailBody;
            msg.BodyEncoding = Encoding.UTF8;
            msg.IsBodyHtml = true;
            //añade adjuntos
            if (adjuntos.Length > 0)
            {
                foreach (var adj in adjuntos)
                {
                    string[] words = adj.Split('|');

                    System.Net.Mail.Attachment Attach = new System.Net.Mail.Attachment(words[0].Replace("+", " "));
                    Attach.Name = words[1].Replace("+", " ");
                    msg.Attachments.Add(Attach);
                }
            }
            
            var client = new SmtpClient
            {
                Host = "mailer"
            };
            try
            {
                client.Send(msg);
                return "1";
            }
            catch (SmtpException ex)
            {
                return "Error interno, el email no pudo ser enviado.";
            }
        }

        public class MAILel
        {
            public String mailFrom { get; set; }
            public String[] mailTo { get; set; }
            public String[] mailCC { get; set; }
            public String mailSubject { get; set; }
            public String mailBody { get; set; }
        }

        
        //Mensaje + MAIL
        public String mensaje_exMasMailbl(MENSAJE_EXel Datos, MAILel mail, String[] adjuntos)
        {
            var res = "";
            res = sp_mensaje_exSVbl(Datos);

            if (res != "Error interno, intente de nuevo después de recargar la aplicación.")
            {
                res = enviaMail(mail, adjuntos);
            }

            return res;
        }
    }
}
