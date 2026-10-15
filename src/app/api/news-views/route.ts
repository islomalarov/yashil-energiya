import { NextRequest, NextResponse } from "next/server";
import { clientIp } from "@/lib/client-ip";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { incrementNewsView } from "@/lib/news-views";
import { NewsService } from "services/news.service";

export const runtime = "nodejs";

const redis = Redis.fromEnv();

// Caps request volume from one IP; a reader never opens this many news a minute.
const requestLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 m"),
  prefix: "news-views",
});

// Counts at most one view of the same news per IP per window, so popularity
// cannot be inflated by replaying the request (the client-side sessionStorage
// guard is trivially bypassed).
const viewLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(1, "30 m"),
  prefix: "news-views:per-news",
});

type NewsViewRequest = {
  id?: unknown;
};

const ID_PATTERN = /^[a-zA-Z0-9_-]{1,128}$/;

function isValidPayload(body: NewsViewRequest): body is { id: string } {
  return typeof body.id === "string" && ID_PATTERN.test(body.id);
}

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);

    const result = await requestLimit.limit(ip);

    if (!result.success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = (await req.json()) as NewsViewRequest;

    // Unknown ids would otherwise grow the popular-news sets forever.
    if (
      !isValidPayload(body) ||
      !(await NewsService.getAllNewsIds()).includes(body.id)
    ) {
      return NextResponse.json(
        { error: "Invalid news view payload" },
        { status: 400 },
      );
    }

    const view = await viewLimit.limit(`${ip}:${body.id}`);

    if (!view.success) {
      return NextResponse.json(
        { success: true, counted: false },
        { status: 200 },
      );
    }

    const views = await incrementNewsView(body.id);

    return NextResponse.json(
      { success: true, counted: true, views },
      { status: 200 },
    );
  } catch (error) {
    console.error("News view tracking error:", error);

    return NextResponse.json(
      { error: "Failed to track news view" },
      { status: 500 },
    );
  }
}
