// "use client";
// import nodemailer from "nodemailer";
// const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
// const smtpTransport = nodemailer.createTransport(
//   {
// service: "gmail",
//     host: "smtp.google.com", // SMTP Host for sending emails smtp.yandex.ru
//     port: 587,
//     secure: true,
//     auth: {
//       user: SMTP_EMAIL,
//       pass: SMTP_PASSWORD,
//     },
//     tls: { rejectUnauthorized: false },
//   },
//   {
//     from: "yashil-energiya    <islomalarov@gmail.com>",
//   }
// );

// export const sendEmail = (msg: nodemailer.SendMailOptions) => {
//   smtpTransport.sendMail(msg, (error, info) => {
//     error
//       ? console.log("Error occurred", error)
//       : console.log("Email send succesfully", info);
//     smtpTransport.close();
//   });
// };
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export default async function sendEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // Важно: для некоторых почтовых серверов (например, Gmail) требуется secure: true
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "islomalarov@gmail.com",
      to: "islomalarov@gmail.com",
      subject: "Subject of your email",
      text: "Body of your email",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
