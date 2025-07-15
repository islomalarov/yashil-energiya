import { Resend } from "resend";
import { EmailTemplate } from "@/src/components/EmailComponent/TheEmail";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { firstName, phone, message } = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "no-reply <onboarding@resend.dev>",
      to: ["yashilenergiya11@gmail.com"],
      subject: "Письмо с сайта yashil-energiya",
      react: EmailTemplate({ firstName, phone, message }),
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
