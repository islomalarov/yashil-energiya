import { NextRequest, NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { serverEnv } from "@/lib/server-env";

// Dedicated endpoint for solar-calculator lead requests.
// Sends through the project's mail integration — Microsoft Graph
// (@azure/msal-node → graph.microsoft.com/sendMail), NOT the Resend service —
// behind the same protections as the feedback form: Upstash rate limit +
// Cloudflare Turnstile, delivering to the corporate mailbox (serverEnv from env).
// Email is optional here; all other contact/calculation fields are required.

interface CalculatorRequestData {
  firstName: string;
  phone: string;
  email?: string;
  captchaToken: string;
  consumerType: string;
  annualConsumptionKwh: number;
  region: string;
  coveragePercent: number;
  includeBESS: boolean;
  recommendedKwp: number;
}

export const runtime = "nodejs";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  prefix: "calculator-request",
});

const msalClient = new ConfidentialClientApplication({
  auth: {
    clientId: serverEnv.msClientId,
    authority: `https://login.microsoftonline.com/${serverEnv.msTenantId}`,
    clientSecret: serverEnv.msClientSecret,
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("cf-connecting-ip") ??
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const result = await ratelimit.limit(ip);

    if (!result.success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = (await req.json()) as CalculatorRequestData;
    const locale = req.headers.get("Content-Language") || "uz";

    const {
      firstName,
      phone,
      email,
      captchaToken,
      consumerType,
      annualConsumptionKwh,
      region,
      coveragePercent,
      includeBESS,
      recommendedKwp,
    } = body;

    if (!firstName || !phone || !captchaToken) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (
      firstName.length > 100 ||
      phone.length > 50 ||
      trimmedEmail.length > 150 ||
      (typeof consumerType === "string" && consumerType.length > 100) ||
      (typeof region === "string" && region.length > 150)
    ) {
      return NextResponse.json({ error: "Input is too long" }, { status: 400 });
    }

    const captchaVerify = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: serverEnv.turnstileSecretKey,
          response: captchaToken,
        }),
      },
    );

    const captchaResult = await captchaVerify.json();

    if (!captchaResult.success) {
      // Surface the real reason (e.g. invalid-input-secret, hostname-mismatch,
      // timeout-or-duplicate) so failures are diagnosable from server logs.
      console.error(
        "[calculator-request] Turnstile verification failed:",
        captchaResult["error-codes"],
      );
      return NextResponse.json(
        { error: "Captcha verification failed" },
        { status: 400 },
      );
    }

    const toNumber = (value: unknown) =>
      Number.isFinite(Number(value)) ? Number(value) : 0;

    const safeFirstName = escapeHtml(firstName.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeEmail = trimmedEmail ? escapeHtml(trimmedEmail) : "—";
    const safeConsumerType = escapeHtml(String(consumerType ?? "").trim());
    const safeRegion = escapeHtml(String(region ?? "").trim());
    const annual = Math.round(toNumber(annualConsumptionKwh));
    const coverage = Math.round(toNumber(coveragePercent));
    const kwp = toNumber(recommendedKwp).toFixed(1);
    const bess = includeBESS ? "Да / Yes" : "Нет / No";

    const accessToken = await getAccessToken();

    const emailPayload = {
      message: {
        subject: "New solar calculator request from yashil-energiya.uz",
        body: {
          contentType: "HTML",
          content: `
            <h2>New solar calculator request</h2>
            <p><strong>Name:</strong> ${safeFirstName}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Language:</strong> ${locale}</p>
            <hr />
            <h3>Calculation parameters</h3>
            <p><strong>Consumer type:</strong> ${safeConsumerType}</p>
            <p><strong>Annual consumption:</strong> ${annual} kWh</p>
            <p><strong>Region:</strong> ${safeRegion}</p>
            <p><strong>Coverage:</strong> ${coverage}%</p>
            <p><strong>Battery storage (BESS):</strong> ${bess}</p>
            <p><strong>Recommended power:</strong> ${kwp} kW</p>
          `,
        },
        toRecipients: [
          { emailAddress: { address: serverEnv.msRecipientEmail } },
        ],
        ...(trimmedEmail
          ? { replyTo: [{ emailAddress: { address: trimmedEmail.toLowerCase() } }] }
          : {}),
      },
      saveToSentItems: true,
    };

    const graphResponse = await fetch(
      `https://graph.microsoft.com/v1.0/users/${serverEnv.msSenderEmail}/sendMail`,
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
