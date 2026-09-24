import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { SIGNATURE_HEADER_NAME, isValidSignature } from "@sanity/webhook";
import {
  ALL_CACHE_TAGS,
  CACHE_TAGS,
  type SanityDocumentType,
} from "lib/cache-tags";

export const runtime = "nodejs";

// Never cache the webhook response itself.
export const dynamic = "force-dynamic";

const isKnownType = (value: unknown): value is SanityDocumentType =>
  typeof value === "string" && value in CACHE_TAGS;

/**
 * Sanity webhook (Manage → API → Webhooks) with the projection
 * `{ _type, _id, "slug": slug.current }`, fired on publish/unpublish/delete.
 * The request is signed with SANITY_REVALIDATE_SECRET; the signature covers
 * the raw body, so it is read as text before parsing.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.error("Revalidate webhook: SANITY_REVALIDATE_SECRET is not set");

    return NextResponse.json(
      { error: "Revalidation is not configured" },
      { status: 500 },
    );
  }

  const signature = req.headers.get(SIGNATURE_HEADER_NAME) ?? "";
  const body = await req.text();

  let authorized = false;
  try {
    authorized = Boolean(signature) && (await isValidSignature(body, signature, secret));
  } catch {
    authorized = false;
  }

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // An unknown or unparseable payload is not fatal: purge every tag so a
  // valid, signed webhook never silently fails to refresh the site.
  let type: unknown;
  try {
    type = (JSON.parse(body) as { _type?: unknown })._type;
  } catch {
    type = undefined;
  }

  const tags = isKnownType(type) ? [CACHE_TAGS[type]] : ALL_CACHE_TAGS;

  for (const tag of tags) {
    // Next 16 requires a cache-life profile. `{ expire: 0 }` forces an
    // immediate hard purge (no stale-while-revalidate window). The time-based
    // `revalidate` window in lib/sanity-client.ts remains the upper bound.
    revalidateTag(tag, { expire: 0 });
  }

  return NextResponse.json({ revalidated: true, tags });
}
