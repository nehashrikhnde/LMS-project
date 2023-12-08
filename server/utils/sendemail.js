import nodemailer from "nodemailer";

const sendemail = async function(email,subject,message){

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  }
});

// async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL, // sender address
    to: email, // list of receivers
    subject:subject , // Subject line // plain text body
    html:message , // html body
  });
};

export default sendemail;