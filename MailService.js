import nodemailer from "nodemailer"

// ?MailService settings
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "najomob@gmail.com",
                pass: "tmcrovpvjhmstnia"
            }
        })
    }

    // ?Sending a configuration message to the user's email
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: "CATShop",
            to,
            subject: "Активация аккаунта",
            html: `
            <!DOCTYPE html
            PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>HTML Template</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Quicksand:wght@300&family=Rubik:wght@700&display=swap');
                body {
                    width: 100% !important;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    margin: 0;
                    padding: 0;
                    line-height: 100%;
                    font-family: 'Quicksand', arial, serif !important;
                    font-family: 'Rubik', arial, serif !important;
                    font-family: 'Open Sans', arial, serif !important;
                }
                
                [style*="Quicksand"] {
                    font-family: 'Quicksand', arial, serif !important;
                }
                
                [style*="Rubik"] {
                    font-family: 'Rubik', arial, serif !important;
                }
                
                [style*="Open Sans"] {
                    font-family: 'Open Sans', arial, serif !important;
                }
                
                img {
                    outline: none;
                    text-decoration: none;
                    border: none;
                    -ms-interpolation-mode: bicubic;
                    max-width: 100%!important;
                    margin: 0;
                    padding: 0;
                    display: block;
                }
                
                table td {
                    border-collapse: collapse;
                }
                
                table {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
            </style>
        </head>
        
        <body style="margin: 0; padding: 0; font-family: 'Quicksand', arial, serif !important;
        font-family: 'Rubik', arial, serif !important;
        font-family: 'Open Sans', arial, serif !important;">
            <div style="font-size:0px;font-color:#ffffff;opacity:0;visibility:hidden;width:0;height:0;display:none;">Тестовое письмо</div>
            <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#F7D6B2">
                <tr style="height: 600px;">
                    <td>
                        <table cellpadding="0" cellspacing="0" width="600" height="100" align="center" text-align="center">
                            <tr>
                                <td align="center" padding-bottom="100">
                                    <img src="https://fotohosting.su/images/2023/10/17/Logo.png" alt="Logo.png" border="0">
                                </td>
                            </tr>
                        </table>
                        <table cellpadding="0" cellspacing="0" width="600" height="100" align="center" text-align="center">
                            <tr>
                                <td align="center" style="padding-top: 80px;">
                                    <p style="font-family:'Quicksand'; font-size: 30px; color: gray;">You're one step away</p>
                                    <h1 style=" font-size: 50px; font-family:'Rubik'; font-weight: 700; color: black; ">Verify Your Email</h1>
                                    <p style="width: 230px; text-align: center; font-family:'Open Sans'; font-weight: normal; margin-bottom: 43px; color: gray;">To complete your profile and start using our product, you need to verify your email address.</p>
                                    <a href="${link}" style="font-family:'Open Sans'; font-weight: normal; text-decoration: none; background: #000; padding-top: 20px; padding-bottom: 20px; padding-left: 50px; padding-right: 50px; border-radius: 40px; color: #ffffff; font-size: 20px;">VERIFY</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
            `
        })
    }

}
export default new MailService()