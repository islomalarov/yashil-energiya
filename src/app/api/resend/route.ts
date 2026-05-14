// import { Resend } from "resend";
// import { EmailTemplate } from "@/components/EmailComponent/TheEmail";
// import { NextRequest } from "next/server";

// const resend = new Resend(process.env.RESEND_API_KEY);
// //
// export async function POST(req: NextRequest) {
//   const { firstName, phone, message } = await req.json();
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "no-reply <onboarding@resend.dev>",
//       to: ["yashilenergiya11@gmail.com"],
//       subject: "Письмо с сайта yashil-energiya",
//       react: EmailTemplate({ firstName, phone, message }),
//     });
//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }
//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";

interface FeedbackData {
  firstName: string;
  phone: string;
  email: string;
  message: string;
  captchaToken: string;
}

const tenantId = process.env.MS_TENANT_ID!;
const clientId = process.env.MS_CLIENT_ID!;
const clientSecret = process.env.MS_CLIENT_SECRET!;
const senderEmail = process.env.MS_SENDER_EMAIL!;
const recipientEmail = process.env.MS_RECIPIENT_EMAIL!;

const msalClient = new ConfidentialClientApplication({
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientSecret,
  },
});

async function getAccessToken() {
  const tokenResponse = await msalClient.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });

  if (!tokenResponse?.accessToken) {
    throw new Error("Failed to acquire Microsoft Graph access token");
  }

  return tokenResponse.accessToken;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FeedbackData;
    const locale = req.headers.get("Content-Language") || "uz";

    const { firstName, phone, email, message, captchaToken } = body;

    if (!firstName || !phone || !email || !message || !captchaToken) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const captchaVerify = await fetch(
  "https://challenges.cloudflare.com/turnstile/v0/siteverify",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: captchaToken,
    }),
  }
);

const captchaResult = await captchaVerify.json();

if (!captchaResult.success) {
  return NextResponse.json(
    { error: "Captcha verification failed" },
    { status: 400 }
  );
}
    const accessToken = await getAccessToken();

    const emailPayload = {
      message: {
        subject: `New feedback request from yashil-energiya.uz`,
        body: {
          contentType: "HTML",
          content: `
            <h2>New feedback request</h2>
            <p><strong>Name:</strong> ${firstName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Language:</strong> ${locale}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br />")}</p>
          `,
        },
        toRecipients: [
          {
            emailAddress: {
              address: recipientEmail,
            },
          },
        ],
      },
      saveToSentItems: true,
    };

    const graphResponse = await fetch(
      `https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      }
    );

    if (!graphResponse.ok) {
      const errorText = await graphResponse.text();

      console.error("Microsoft Graph error:", errorText);

      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
