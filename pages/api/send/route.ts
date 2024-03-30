import { EmailTemplate } from "@/components/EmailComponent/email-template";
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, phone, msg } = req.body;
  try {
    const data = await resend.emails.send({
      from: "Resend <onboarding@resend.dev>",
      to: ["islomalarov@gmail.com"],
      subject: "Письмо с сайта yashil-energiya ",
      text: `${name} sent you a message`,
      react: EmailTemplate({ firstName: name, phone: phone, msg: msg }),
    });

    return res.json(data);
  } catch (error) {
    return res.json({ error });
  }
}
