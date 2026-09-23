import type { SlugIsUniqueValidator, ValidationContext } from "sanity";
import { apiVersion } from "../env";

const publishedId = (id: string) => id.replace(/^drafts\./, "");

type LocalizedDocument = { _id: string; _type: string; language?: string };

// Is `field == value` already used by another document of the same type
// and language? Translations share slug/entryId, so the default isUnique
// (which ignores language) would flag every translation as a duplicate.
async function takenInLanguage(
  field: "slug.current" | "entryId",
  value: string,
  context: ValidationContext,
) {
  const document = context.document as LocalizedDocument | undefined;
  if (!document) return false;

  const id = publishedId(document._id);
  const client = context.getClient({ apiVersion });
  return client.fetch<boolean>(
    `count(*[_type == $type && ${field} == $value && language == $language && !(_id in [$id, $draftId])]) > 0`,
    {
      type: document._type,
      value,
      language: document.language ?? null,
      id,
      draftId: `drafts.${id}`,
    },
  );
}

export const isUniqueSlugInLanguage: SlugIsUniqueValidator = async (
  slug,
  context,
) => !(await takenInLanguage("slug.current", slug, context));

export async function isUniqueEntryIdInLanguage(
  value: string | undefined,
  context: ValidationContext,
) {
  if (!value) return true;
  return (await takenInLanguage("entryId", value, context))
    ? "Этот ID уже занят другим документом на этом языке"
    : true;
}
