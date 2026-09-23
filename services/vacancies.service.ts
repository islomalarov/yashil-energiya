import { fetchData } from "lib/sanity-client";
import { CACHE_TAGS } from "lib/cache-tags";
import type { RichText } from "@/types/richtext";
import { ENTRY_ID, LANGUAGES, richText } from "./fragments";

export interface Vacancy {
  id: string;
  title: string;
  references: string;
  excerpt: string;
  description: RichText | null;
  attachments?: {
    id: string;
    url: string;
    fileName: string;
    mimeType?: string | null;
    size?: number | null;
  }[];
  /** Languages with a published version of this vacancy. */
  languages?: string[];
}

const tags = [CACHE_TAGS.vacancy];

const FILTER = `_type == "vacancy" && language == $locale`;

const FIELDS = `
  ${ENTRY_ID},
  title,
  references,
  excerpt,
  ${richText("description")},
  "attachments": coalesce(attachments[]{
    "id": _key,
    "url": asset->url,
    "fileName": asset->originalFilename,
    "mimeType": asset->mimeType,
    "size": asset->size
  }, []),
  ${LANGUAGES}
`;

export const VacancyService = {
  getAllVacancies: async (locale: string) => {
    // Oldest first — the order the Hygraph query returned (createdAt asc).
    const query = `*[${FILTER}] | order(_createdAt asc, _id asc){ ${FIELDS} }`;
    return fetchData<Vacancy[]>(query, { locale }, { tags });
  },

  getOneVacancy: async (id: string, locale: string) => {
    if (!id) {
      throw new Error(
        `VacancyService.getOneVacancy: id is missing. locale=${locale}`,
      );
    }

    const query = `*[${FILTER} && entryId == $id][0]{ ${FIELDS} }`;
    return fetchData<Vacancy | null>(query, { id, locale }, { tags });
  },
};
