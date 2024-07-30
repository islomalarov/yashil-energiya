import sendEmail from "@/lib/mail";
import { Resend } from "resend";
import { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "@/components/EmailComponent/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

// export default async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const { name, phone, msg } = req.body;
//   try {
//     const data = await resend.emails.send(
//       {
//         from: "Resend <onboarding@resend.dev>",
//         to: ["islomalarov@gmail.com"],
//         subject: "Письмо с сайта yashil-energiya ",
//         text: `${name} sent you a message`,
//         react: EmailTemplate({ firstName: name, phone: phone, msg: msg }),
//       }
//       // {
//       //   from: "Resend <onboarding@resend.dev>",
//       //   to: ["info@yashil-energiya.uz"],
//       //   subject: "Письмо с сайта yashil-energiya ",
//       //   text: `${name} sent you a message`,
//       //   react: EmailTemplate({ firstName: name, phone: phone, msg: msg }),
//       // }
//     );

//     return res.json(data);
//   } catch (error) {
//     return res.json({ error });
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name, phone, msg } = req.body;
      const message = {
        from: "islomalarov@gmail.com",
        to: "buar19@mail.ru",
        subject: "Письмо с сайта yashil-energiya ",
        text: `Ф.И.О.: ${name} \nТелефон: ${phone} \nКомментарий: ${msg}`,
      };
      await sendEmail(message);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
