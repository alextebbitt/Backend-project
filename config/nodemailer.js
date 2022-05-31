const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "testemailbootcamp1111@gmail.com",
    pass: "Testemail111"
  },
});

module.exports = transporter;
