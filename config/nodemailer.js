const nodemailer = require("nodemailer");
const User = require("../models/User");
require("dotenv").config();
const { USER, PASS } = process.env;

const PORT = process.env.PORT || 3001;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {user:USER,pass:PASS}
});

module.exports = transporter;
