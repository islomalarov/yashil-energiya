// // "use client";
// // import sendEmail from "@/lib/mail";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
dotenv.config();
// const { SMTP_HOST, SMTP_USER, SMTP_PASS, RESEND_API } = process.env;
const api = process.env.NEXT_PUBLIC_RESEND_API_KEY;
const resend = new Resend(api);
export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
// import nodemailer from "nodemailer";

// export default async function handler(req: any, res: any) {
//   // const { firstName, lastName, email, message } = JSON.parse(req.body);
//   const { name, phone, msg } = req.body;

//   const transporter = nodemailer.createTransport({
//     host: SMTP_HOST,
//     port: 465,
//     secure: true, // Важно: для некоторых почтовых серверов (например, Gmail) требуется secure: true
//     auth: {
//       user: SMTP_USER,
//       pass: SMTP_PASS,
//     },
//   });

//   await new Promise((resolve, reject) => {
//     // verify connection configuration
//     transporter.verify(function (error: any, success: any) {
//       if (error) {
//         console.log(error);
//         reject(error);
//       } else {
//         console.log("Server is ready to take our messages");
//         resolve(success);
//       }
//     });
//   });
//   const message = {
//     from: "islomalarov@gmail.com",
//     to: "islomalarov@gmail.com",
//     subject: "Письмо с сайта yashil-energiya ",
//     text: `Ф.И.О.: ${name} \nТелефон: ${phone} \nКомментарий: ${msg}`,
//   };
//   // const mailData = {
//   //   from: {
//   //     name: `${firstName} ${lastName}`,
//   //     address: "islomalarov@gmail.com",
//   //   },
//   //   replyTo: email,
//   //   to: "islomalarov@gmail.com",
//   //   subject: `form message`,
//   //   text: message,
//   //   html: `${message}`,
//   // };

//   await new Promise((resolve, reject) => {
//     // send mail
//     transporter.sendMail(message, (err: any, info: any) => {
//       if (err) {
//         console.error(err);
//         reject(err);
//       } else {
//         console.log(info);
//         resolve(info);
//       }
//     });
//   });

//   res.status(200).json({ status: "OK" });
// }
