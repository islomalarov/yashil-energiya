import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import type { NextRequest } from "next/server";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { EmailTemplate } from "@/components/EmailComponent";
import { FormData } from "@/components/FormComponent/TheForm";

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY as string,
});

const sentFrom = new Sender(
  "MS_tiu81u@trial-jy7zpl96323l5vx6.mlsender.net",
  "no-reply"
);

const recipients = [
  new Recipient("islomalarov@gmail.com", "info@yashil-energiya.uz"),
];
export async function POST(request: NextRequest) {
  try {
    const body: FormData = await request.json();

    const { firstName, phone, message } = body;
    const emailHtml = render(EmailTemplate({ firstName, phone, message }));
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`Новое сообщение от ${firstName}`)
      .setHtml(await emailHtml)
      .setText(`Имя: ${firstName}\nEmail: ${phone}\nСообщение: ${message}`);

    await mailersend.email.send(emailParams);

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка при отправке письма:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Неизвестная ошибка";

    return NextResponse.json(
      { status: "error", message: errorMessage },
      { status: 500 }
    );
  }
}
