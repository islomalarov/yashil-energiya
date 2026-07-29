import { publicEnv } from "@/lib/public-env";

const DEFAULT_REVALIDATE = 300;

export type FetchDataOptions = {
  /**
   * Next.js Data Cache revalidation window in seconds. Defaults to 300s.
   * Pass `false` to bypass the cache entirely and always fetch fresh data.
   */
  revalidate?: number | false;
  /**
   * Cache tags for on-demand invalidation via `revalidateTag`. Tagged data is
   * cached (using `revalidate` as a time-based fallback) and purged instantly
   * when the Hygraph webhook fires. Ignored when `revalidate` is `false`.
   */
  tags?: string[];
};

export const fetchData = async <T>(
  query: string,
  variables?: Record<string, unknown>,
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

  const response = await fetch(publicEnv.hygraphEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
