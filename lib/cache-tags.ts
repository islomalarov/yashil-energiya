/**
 * Cache tags for Hygraph-backed data that must reflect content changes in
 * real time. Each live query is tagged so the `/api/revalidate` webhook can
 * invalidate exactly the affected data when Hygraph publishes an update.
 *
 * Keys mirror the Hygraph model `__typename` values so the webhook can map an
 * incoming payload to the tag it needs to purge.
 */
export const CACHE_TAGS = {
  EvCharge: "ev-charges",
  Mhp: "mhps",
  PlantStatus: "plant-statuses",
} as const;

export type HygraphModel = keyof typeof CACHE_TAGS;

export const ALL_LIVE_CACHE_TAGS = Object.values(CACHE_TAGS);

/**
 * Time-based fallback (seconds) for live queries. On-demand revalidation via
 * the webhook is the primary mechanism; this only bounds staleness if a
 * webhook is ever missed.
 */
export const LIVE_FALLBACK_REVALIDATE = 3600;
