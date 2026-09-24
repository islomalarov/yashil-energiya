import type { ValidationContext } from "sanity";
import { apiVersion } from "../env";

const publishedId = (id: string) => id.replace(/^drafts\./, "");

// entryId is read-only and generated, but a duplicated document would copy
// it — and two entries must never share a public id.
export async function isUniqueEntryId(
  value: string | undefined,
  context: ValidationContext,
) {
  const document = context.document;
  if (!value || !document) return true;

  const id = publishedId(document._id);
  const taken = await context.getClient({ apiVersion }).fetch<boolean>(
    `count(*[_type == $type && entryId == $value && !(_id in [$id, $draftId])]) > 0`,
    { type: document._type, value, id, draftId: `drafts.${id}` },
  );

  return taken ? "Этот ID уже занят другой записью" : true;
}
