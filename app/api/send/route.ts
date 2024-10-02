// import sendEmail from "@/lib/mail";
// import { Resend } from "resend";
// import type { NextApiRequest, NextApiResponse } from "next";
// import { EmailTemplate } from "@/components/EmailComponent/email-template";
import sendFeedback from "@/lib/mail";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: any) {
//   const { firstName, phone, message } = await req.json();
//   try {
//     const { data, error } = await resend.emails.send(
//       {
//         from: "no-reply <onboarding@resend.dev>",
//         to: ["islomalarov@gmail.com"],
//         subject: "Письмо с сайта yashil-energiya ",
//         text: `${firstName} sent you a message`,
//         react: EmailTemplate({ firstName, phone, message }),
//       }
//       //   // {
//       //   //   from: "Resend <onboarding@resend.dev>",
//       //   //   to: ["info@yashil-energiya.uz"],
//       //   //   subject: "Письмо с сайта yashil-energiya ",
//       //   //   text: `${name} sent you a message`,
//       //   //   react: EmailTemplate({ firstName: name, phone: phone, msg: msg }),
//       //   // }
//     );
//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }
//     return Response.json(data);
//     // res.status(200).json(data);
//     // const message = {
//     //   from: "islomalarov@gmail.com",
//     //   to: "buar19@mail.ru",
//     //   subject: "Письмо с сайта yashil-energiya ",
//     //   text: `Ф.И.О.: ${name} \nТелефон: ${phone} \nКомментарий: ${msg}`,
//     // };
//     // await sendEmail(message);
//     // res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return Response.json({ error }, { status: 500 });
//     // res.status(500).json({ message: "Error sending email" });
//   }
// }
interface ContactFormData {
  firstName: string;
  phone: string;
  message: string;
}
export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { firstName, phone, message } = body;

    // // Настройка транспортера Nodemailer
    // const transporter = nodemailer.createTransport({
    //   host: process.env.EMAIL_HOST, // Например, 'smtp.gmail.com'
    //   port: 465, // Или 587 для TLS
    //   secure: true, // true для 465, false для других портов
    //   auth: {
    //     user: process.env.EMAIL_USER, // Ваш email
    //     pass: process.env.EMAIL_PASS, // Ваш пароль или пароль приложения
    //   },
    // });
    // Настройка письма
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "buar19@mail.ru",
      subject: `Yashil Energiya saytidan murojat`,
      text: `
        F.I.O: ${firstName}
        Telefon: ${phone}
        Murojat: ${message}
      `,
    };
    // Отправка письма
    // await transporter.sendMail(mailOptions);
    await sendFeedback(mailOptions);
    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка при отправке письма:", error);
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
