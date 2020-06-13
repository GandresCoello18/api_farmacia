import nodemailer from "nodemailer";
const { config } = require("../../config/index");

class UtilEmail {
  constructor() {}

  async send(
    from: string,
    to: string,
    subject: string,
    text: string,
    hash: string
  ) {
    console.log("entro en send");

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: "gmail",
      requireTLS: true,
      secure: true, // true for 465, false for other ports
      tls: { rejectUnauthorized: false },
      auth: {
        user: config.correoGmail, // generated ethereal user
        pass: config.claveGmail, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: `${from}`, // sender address
      to: `${to}`, // list of receivers
      subject: `${subject}`, // Subject line
      text: `${text}`, // plain text body
      html: `<a style='padding: 5px 10px; background-color: #cdcdcd; text-decorate: none; color: #000;' href=${
        "https://api-laboratorio-juanito.herokuapp.com/api/email/verificar/" +
        hash
      } target='_blank'>Continuar con la verificacion</a>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

let utilemail = new UtilEmail();
export default utilemail;

//send().catch(console.error);
