const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "ptbxizfvbufeklqm",
  },
});

const mailOptions = {
  from: "",
  to: "",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

 const sendEmail = function() {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = sendEmail;