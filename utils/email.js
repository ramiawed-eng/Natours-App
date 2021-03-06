const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) CREATE A TRANSPORTER
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // DEFINE THE EMAIL OPTIONS
  const mailOptions = {
    from: 'Rami Awed <ramiawed.education@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // ACTUALLY SEND THE EMAIL
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
