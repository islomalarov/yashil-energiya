// import sendEmail from "@/lib/mail";
import { Resend } from "resend";
import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "@/components/EmailComponent/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: any, res: NextApiResponse) {
  const { firstName, phone, message } = await req.json();
  try {
    const { data, error } = await resend.emails.send(
      {
        from: "no-reply <onboarding@resend.dev>",
        to: ["islomalarov@gmail.com"],
        subject: "Письмо с сайта yashil-energiya ",
        text: `${firstName} sent you a message`,
        react: EmailTemplate({ firstName, phone, message }),
      }
      //   // {
      //   //   from: "Resend <onboarding@resend.dev>",
      //   //   to: ["info@yashil-energiya.uz"],
      //   //   subject: "Письмо с сайта yashil-energiya ",
      //   //   text: `${name} sent you a message`,
      //   //   react: EmailTemplate({ firstName: name, phone: phone, msg: msg }),
      //   // }
    );
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
    // res.status(200).json(data);
    // const message = {
    //   from: "islomalarov@gmail.com",
    //   to: "buar19@mail.ru",
    //   subject: "Письмо с сайта yashil-energiya ",
    //   text: `Ф.И.О.: ${name} \nТелефон: ${phone} \nКомментарий: ${msg}`,
    // };
    // await sendEmail(message);
    // res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ error }, { status: 500 });
    // res.status(500).json({ message: "Error sending email" });
  }
}
