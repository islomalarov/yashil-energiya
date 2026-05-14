import { NextRequest, NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

interface FeedbackData {
  firstName: string;
  phone: string;
  email: string;
  message: string;
  captchaToken: string;
}

export const runtime = "nodejs";

const tenantId = process.env.MS_TENANT_ID!;
const clientId = process.env.MS_CLIENT_ID!;
const clientSecret = process.env.MS_CLIENT_SECRET!;
const senderEmail = process.env.MS_SENDER_EMAIL!;
const recipientEmail = process.env.MS_RECIPIENT_EMAIL!;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "1 m"),
  prefix: "feedback-form",
});

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
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
export async function POST(req: NextRequest) {
  try {
    
const ip =
  req.headers.get("cf-connecting-ip") ??
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  req.headers.get("x-real-ip") ??
  "unknown";

const result = await ratelimit.limit(ip);

console.log("Rate limit:", result);

if (!result.success) {
  return NextResponse.json(
    { error: "Too many requests" },
    { status: 429 },
  );
}

const body = (await req.json()) as FeedbackData;
    const locale = req.headers.get("Content-Language") || "uz";

    const { firstName, phone, email, message, captchaToken } = body;
    if (!firstName || !phone || !email || !message || !captchaToken) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    if (
      firstName.length > 100 ||
      phone.length > 50 ||
      email.length > 150 ||
      message.length > 3000
    ) {
      return NextResponse.json({ error: "Input is too long" }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const safeFirstName = escapeHtml(firstName.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");

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
      },
    );

    const captchaResult = await captchaVerify.json();

    if (!captchaResult.success) {
      return NextResponse.json(
        { error: "Captcha verification failed" },
        { status: 400 },
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
            <p><strong>Name:</strong> ${safeFirstName}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Language:</strong> ${locale}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
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
      },
    );

    if (!graphResponse.ok) {
      const errorText = await graphResponse.text();

      console.error("Microsoft Graph error:", errorText);

      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
