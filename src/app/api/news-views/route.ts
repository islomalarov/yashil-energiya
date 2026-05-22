import { NextRequest, NextResponse } from "next/server";
import { incrementNewsView } from "@/lib/news-views";

export const runtime = "nodejs";

type NewsViewRequest = {
  id?: unknown;
  slug?: unknown;
};

const ID_PATTERN = /^[a-zA-Z0-9_-]{1,128}$/;
const SLUG_PATTERN = /^[a-zA-Z0-9/_-]{1,256}$/;

function isValidPayload(body: NewsViewRequest): body is { id: string; slug: string } {
  return (
    typeof body.id === "string" &&
    typeof body.slug === "string" &&
    ID_PATTERN.test(body.id) &&
    SLUG_PATTERN.test(body.slug)
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as NewsViewRequest;

    if (!isValidPayload(body)) {
      return NextResponse.json(
        { error: "Invalid news view payload" },
        { status: 400 },
      );
    }

    const views = await incrementNewsView({
      id: body.id,
      slug: body.slug,
    });

    return NextResponse.json({ success: true, views }, { status: 200 });
  } catch (error) {
    console.error("News view tracking error:", error);

    return NextResponse.json(
      { error: "Failed to track news view" },
      { status: 500 },
    );
  }
}
