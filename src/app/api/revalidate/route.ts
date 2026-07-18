import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  ALL_LIVE_CACHE_TAGS,
  CACHE_TAGS,
  type HygraphModel,
} from "lib/cache-tags";

export const runtime = "nodejs";

// Never cache the webhook response itself.
export const dynamic = "force-dynamic";

const isKnownModel = (value: unknown): value is HygraphModel =>
  typeof value === "string" && value in CACHE_TAGS;

/**
 * Pull the affected Hygraph model name(s) out of a webhook payload. Hygraph
 * sends the changed record under `data`, with its model exposed as
 * `__typename`. We stay defensive about the exact shape and fall back to
 * purging every live tag when the model can't be determined.
 */
const extractModels = (body: unknown): HygraphModel[] => {
  if (!body || typeof body !== "object") {
    return [];
  }

  const records: unknown[] = [];
  const data = (body as { data?: unknown }).data;

  if (Array.isArray(data)) {
    records.push(...data);
  } else if (data) {
    records.push(data);
  } else {
    records.push(body);
  }

  const models = new Set<HygraphModel>();

  for (const record of records) {
    const typename =
      record && typeof record === "object"
        ? (record as { __typename?: unknown }).__typename
        : undefined;

    if (isKnownModel(typename)) {
      models.add(typename);
    }
  }

  return [...models];
};

const secretsMatch = (provided: string, expected: string) => {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
};

const readProvidedSecret = (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  return req.headers.get("x-webhook-secret")?.trim() ?? "";
};

export async function POST(req: NextRequest) {
  const expectedSecret = process.env.HYGRAPH_REVALIDATE_SECRET;

  if (!expectedSecret) {
    console.error("Revalidate webhook: HYGRAPH_REVALIDATE_SECRET is not set");

    return NextResponse.json(
      { error: "Revalidation is not configured" },
      { status: 500 },
    );
  }

  const providedSecret = readProvidedSecret(req);

  if (!providedSecret || !secretsMatch(providedSecret, expectedSecret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // A missing / unparseable body is not fatal: purge every live tag so a
  // valid, authorized webhook never silently fails to refresh the site.
  let body: unknown = null;

  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const models = extractModels(body);
  const tags =
    models.length > 0
      ? models.map((model) => CACHE_TAGS[model])
      : ALL_LIVE_CACHE_TAGS;

  for (const tag of tags) {
    // Next 16 requires a cache-life profile; "max" performs an immediate
    // on-demand purge of the tag.
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: true, tags });
}
