import { publicEnv } from "@/lib/public-env";

const API_VERSION = "v2025-02-19";
const DEFAULT_REVALIDATE = 300;
// Longer GROQ queries go as POST; GET keeps URLs well under proxy limits.
const MAX_GET_URL_LENGTH = 8000;

export type FetchDataOptions = {
  /**
   * Next.js Data Cache revalidation window in seconds. Defaults to 300s.
   * Pass `false` to bypass the cache entirely and always fetch fresh data.
   */
  revalidate?: number | false;
  /**
   * Cache tags for on-demand invalidation via `revalidateTag` (the Sanity
   * webhook in /api/revalidate). The time-based `revalidate` window stays the
   * upper bound on staleness. Ignored when `revalidate` is `false`.
   */
  tags?: string[];
};

/**
 * Runs a GROQ query against the Sanity Query HTTP API with Next.js caching.
 * Thin wrapper on purpose (same contract as the former Hygraph client), so no
 * Sanity SDK is needed in the app bundle. The dataset is public and the
 * `published` perspective never returns drafts.
 */
export const fetchData = async <T>(
  query: string,
  params: Record<string, unknown> = {},
  options?: FetchDataOptions,
) => {
  const revalidate = options?.revalidate ?? DEFAULT_REVALIDATE;
  const cacheInit: RequestInit =
    revalidate === false
      ? ({ cache: "no-store" } as RequestInit)
      : ({
          next: {
            revalidate,
            ...(options?.tags ? { tags: options.tags } : {}),
          },
        } as RequestInit & {
          next: { revalidate: number; tags?: string[] };
        });

  // Uncached requests (live status pages) run on every page view: serve them
  // from the API CDN, which Sanity purges on publish. Cached requests are rare
  // and must be fresh right after a webhook purge, so they use the live API.
  const host = revalidate === false ? "apicdn.sanity.io" : "api.sanity.io";
  const url = new URL(
    `https://${publicEnv.sanityProjectId}.${host}/${API_VERSION}/data/query/${publicEnv.sanityDataset}`,
  );
  url.searchParams.set("perspective", "published");

  const getUrl = new URL(url);
  getUrl.searchParams.set("query", query);
  for (const [name, value] of Object.entries(params)) {
    getUrl.searchParams.set(`$${name}`, JSON.stringify(value));
  }

  const response =
    getUrl.toString().length <= MAX_GET_URL_LENGTH
      ? await fetch(getUrl, cacheInit)
      : await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, params }),
          ...cacheInit,
        });

  const payload = (await response.json().catch(() => null)) as {
    result?: T;
    error?: { description?: string };
  } | null;

  if (!response.ok) {
    throw new Error(
      payload?.error?.description ||
        `Sanity query failed with status ${response.status}`,
    );
  }

  if (!payload || !("result" in payload)) {
    throw new Error("Sanity response did not include a result");
  }

  return payload.result as T;
};
