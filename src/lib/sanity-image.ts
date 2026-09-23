import { createImageUrlBuilder } from "@sanity/image-url";
import { publicEnv } from "@/lib/public-env";

export const SANITY_CDN_HOSTNAME = "cdn.sanity.io";

const builder = createImageUrlBuilder({
  projectId: publicEnv.sanityProjectId,
  dataset: publicEnv.sanityDataset,
});

/** URL builder for a Sanity image (asset URL, reference or image object). */
export function sanityImage(source: string) {
  return builder.image(source);
}

export function isSanityImageUrl(url: URL) {
  return url.hostname === SANITY_CDN_HOSTNAME;
}
