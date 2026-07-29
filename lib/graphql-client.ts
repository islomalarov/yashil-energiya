import { publicEnv } from "@/lib/public-env";

const DEFAULT_REVALIDATE = 300;

/**
 * Unique per build. Added to `force-cache` requests so build-time fetches for
 * statically generated pages bypass any Data Cache that Vercel restores from a
 * previous build — guaranteeing a rebuild (triggered by a Vercel Deploy Hook on
 * a Hygraph publish) always bakes in the current Hygraph data. It only affects
 * the build; static pages issue no request at runtime.
 */
const BUILD_ID =
  process.env.VERCEL_DEPLOYMENT_ID ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  String(Date.now());

export type FetchDataOptions = {
  /**
   * Next.js Data Cache revalidation window in seconds. Defaults to 300s.
   * Pass `false` to bypass the cache entirely and always fetch fresh data.
   * Ignored when `cache` is set.
   */
  revalidate?: number | false;
  /**
   * Cache tags for on-demand invalidation via `revalidateTag`. Ignored when
   * `revalidate` is `false` or `cache` is set.
   */
  tags?: string[];
  /**
   * Explicit fetch cache mode. Use `"force-cache"` for statically generated
   * pages: the query runs at build time and the result is baked in, so the
   * page only refreshes on a rebuild (e.g. a Vercel Deploy Hook fired by a
   * Hygraph publish). Takes precedence over `revalidate`/`tags`.
   */
  cache?: "force-cache" | "no-store";
};

export const fetchData = async <T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: FetchDataOptions,
) => {
  const revalidate = options?.revalidate ?? DEFAULT_REVALIDATE;
  let cacheInit: RequestInit;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options?.cache) {
    cacheInit = { cache: options.cache } as RequestInit;
    if (options.cache === "force-cache") {
      // Bust the restored build cache so each rebuild fetches fresh data.
      headers["x-build-id"] = BUILD_ID;
    }
  } else if (revalidate === false) {
    cacheInit = { cache: "no-store" } as RequestInit;
  } else {
    cacheInit = {
      next: {
        revalidate,
        ...(options?.tags ? { tags: options.tags } : {}),
      },
    } as RequestInit & {
      next: { revalidate: number; tags?: string[] };
    };
  }

  const response = await fetch(publicEnv.hygraphEndpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    ...cacheInit,
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as {
    data?: T;
    errors?: { message?: string }[];
  };

  if (payload.errors?.length) {
    throw new Error(
      payload.errors.map((error) => error.message).join("; ") ||
        "GraphQL request failed",
    );
  }

  if (!payload.data) {
    throw new Error("GraphQL response did not include data");
  }

  return payload.data;
};
