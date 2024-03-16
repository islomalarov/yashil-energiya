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
// import sendEmail from "@/lib/mail"; // Путь к вашей функции отправки электронной почты

// export default async function handler(req: any, res: any) {
//   if (req.method === "POST") {
//     try {
//       await sendEmail();
//       res.status(200).json({ message: "Email sent successfully" });
//     } catch (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ message: "Error sending email" });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
