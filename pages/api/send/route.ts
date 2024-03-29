import { EmailTemplate } from "@/components/EmailComponent/email-template";
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, phone, msg } = req.body;
    console.log(name, phone, msg);

    const data = resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["islomalarov@gmail.com"],
      subject: "Pismo",
      text: `${name} sent you a message`,
      react: EmailTemplate({ firstName: name, phone: phone, msg: msg }),
    });

    return res.json(data);
  } catch (error) {
    return res.json({ error });
  }
}
