// "use client";
// import sendEmail from "@/lib/mail";
import dotenv from "dotenv";
import { Resend } from "resend";
dotenv.config();
const { SMTP_HOST, SMTP_USER, SMTP_PASS, RESEND_API } = process.env;
const resend = new Resend(RESEND_API);
export default function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const { name, phone, msg } = req.body;
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: "islomalarov@gmail.com",
        subject: "Hello World",
        // text: `Ф.И.О.: ${name} \nТелефон: ${phone} \nКомментарий: ${msg}`,
        // html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
        html: `Ф.И.О.: ${name} \nТелефон: ${phone} \nКомментарий: ${msg}`,
      });
      // const message = {
      //   from: "islomalarov@gmail.com",
      //   to: "islomalarov@gmail.com",
      //   subject: "Письмо с сайта yashil-energiya ",
      //   text: `Ф.И.О.: ${name} \nТелефон: ${phone} \nКомментарий: ${msg}`,
      // };
      // sendEmail(message);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
