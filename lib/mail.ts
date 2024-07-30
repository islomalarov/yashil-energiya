import nodemailer from "nodemailer";
import dotenv from "dotenv";
import SMTPTransport from "nodemailer/lib/smtp-transport";

dotenv.config();
const { SMTP_SERVICE, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } =
  process.env;

export default async function sendEmail(
  mailOptions: nodemailer.SendMailOptions
) {
  try {
    const transporter = nodemailer.createTransport({
      service: SMTP_SERVICE,
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true, // Важно: для некоторых почтовых серверов (например, Gmail) требуется secure: true
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    } as SMTPTransport.Options);
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
