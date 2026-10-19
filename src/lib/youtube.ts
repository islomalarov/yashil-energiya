// Video id (11 chars) from the YouTube links editors paste: watch?v=,
// youtu.be/, /shorts/, /embed/, /live/. The Studio validates links with the
// same pattern (studio/schemaTypes/objects/youtubeBlock.ts) — keep in sync.
const YOUTUBE_ID =
  /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})(?=[?&#/]|$)/;

export function youtubeId(url?: string | null): string | null {
  return url?.trim().match(YOUTUBE_ID)?.[1] ?? null;
}
