"use client";
import nodemailer from "nodemailer";
const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
const smtpTransport = nodemailer.createTransport(
  {
    service: "gmail",
    host: "smtp.google.com", // SMTP Host for sending emails smtp.yandex.ru
    port: 587,
    secure: true,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  },
  {
    from: "yashil-energiya    <islomalarov@gmail.com>",
  }
);

export const sendEmail = (msg: nodemailer.SendMailOptions) => {
  smtpTransport.sendMail(msg, (error, info) => {
    error
      ? console.log("Error occurred", error)
      : console.log("Email send succesfully", info);
    smtpTransport.close();
  });
};
