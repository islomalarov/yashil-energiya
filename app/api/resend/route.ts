import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailComponent";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: any) {
  const { firstName, phone, message } = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "no-reply <onboarding@resend.dev>",
      to: ["islomalarov@gmail.com"],
      subject: "Письмо с сайта yashil-energiya ",
      text: `${firstName} sent you a message`,
      react: EmailTemplate({ firstName, phone, message }),
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ error }, { status: 500 });
  }
}
