import { URL } from "node:url";

// Hygraph asset URL helpers.
//
// RichText image nodes carry a transformed URL, e.g.
//   https://us-west-2.graphassets.com/<env>/output=format:webp/resize=.../<handle>
// Migrations must import the original file, never a resized variant, so the
// URL is rebuilt as <origin>/<env>/<handle>.
export function originalAssetUrl(src, handle) {
  const url = new URL(src);
  const [env] = url.pathname.split("/").filter(Boolean);
  const fileHandle = handle || url.pathname.split("/").filter(Boolean).at(-1);
  return `${url.origin}/${env}/${fileHandle}`;
}

// NDJSON asset directive understood by `sanity dataset import`.
export function sanityAssetDirective(kind, url) {
  return `${kind}@${url}`;
}
