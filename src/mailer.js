const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_KEY,
  },
});

const mailer = {
  _buildContactRequest: function (firstName, lastName, email, phone, message) {
    return {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Pedido de contacto.",
      html: `
      <p>Primeiro nome: ${firstName}</p>
      <p>Último nome: ${lastName}</p>
      <p>E-mail: ${email}</p>
      <p>Telemóvel: ${phone}</p>
      <p>Mensagem: ${message}</p>
      `,
    };
  },
  sendContactRequest: function (firstName, lastName, email, phone, message) {
    return new Promise(function (resolve, reject) {
      transporter.sendMail(
        mailer._buildContactRequest(firstName, lastName, email, phone, message),
        function (error, info) {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            console.log("Email sent: " + info.response);
            resolve("Mensagem enviada");
          }
        }
      );
    });
  },
};
module.exports = mailer;
