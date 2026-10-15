import type { NextRequest } from "next/server";

// Vercel sets x-real-ip / x-forwarded-for itself; cf-connecting-ip is not
// trusted because no Cloudflare proxy sits in front, so clients can forge it.
export function clientIp(req: NextRequest) {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
