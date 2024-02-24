"use client";
import { sendEmail } from "@/lib/mail";

export default function handler(req: Url, res: any) {
  const { name, phone, msg } = req.body;
  const message = {
    to: "islomalarov@gmail.com", // Change to your recipient
    subject: "Письмо с сайта yashil-energiya ",
    text: `Ф.И.О.: ${name} \nТелефон: ${phone} \nКомментарий: ${msg}`,
  };

  sendEmail(message);
  res.send();
}
