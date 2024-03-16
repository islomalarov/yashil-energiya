"use client";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
// const smtpTransport = nodemailer.createTransport(
//   {
//     service: "gmail",
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

export default function sendEmail(mailOptions: any) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: SMTP_HOST,
      port: 465,
      secure: true, // Важно: для некоторых почтовых серверов (например, Gmail) требуется secure: true
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
    transporter.sendMail(mailOptions, (error, info) => {
      console.log("Message sent: %s", info.messageId);
      error
        ? console.log("Error occurred", error)
        : console.log("Email send succesfully", info);
      transporter.close();
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
