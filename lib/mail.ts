"use client";
import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();
// const { SMTP_SERVIS, SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT } = process.env;

export default function sendEmail(mailOptions: any) {
  try {
    const transporter = nodemailer.createTransport({
      // service: SMTP_SERVIS,
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Важно: для некоторых почтовых серверов (например, Gmail) требуется secure: true
      auth: {
        user: "islomalarov@gmail.com",
        pass: "knuh makh vkyr ghaz",
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
