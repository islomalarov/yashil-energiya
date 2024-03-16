"use client";
import sendEmail from "@/lib/mail";

export default function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const { name, phone, msg } = req.body;
      const message = {
        from: "islomalarov@gmail.com",
        to: "islomalarov@gmail.com",
        subject: "Письмо с сайта yashil-energiya ",
        text: `Ф.И.О.: ${name} \nТелефон: ${phone} \nКомментарий: ${msg}`,
      };
      sendEmail(message);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
