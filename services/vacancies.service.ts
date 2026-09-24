import { fetchData } from "lib/sanity-client";
import { CACHE_TAGS } from "lib/cache-tags";
import type { RichText } from "@/types/richtext";
import {
  ENTRY_ID,
  cmsLocale,
  hasLocale,
  languages,
  localized,
  richText,
} from "./fragments";

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
  /** Languages this vacancy is filled in. */
  languages?: string[];
}

const tags = [CACHE_TAGS.vacancy];

const FILTER = `_type == "vacancy" && ${hasLocale()}`;

const FIELDS = `
  ${ENTRY_ID},
  "attachments": coalesce(attachments[]{
    "id": _key,
    "url": asset->url,
    "fileName": asset->originalFilename,
    "mimeType": asset->mimeType,
    "size": asset->size
  }, []),
  ${localized(`title, references, excerpt, ${richText("description")}`)},
  ${languages()}
`;

export const VacancyService = {
  getAllVacancies: async (locale: string) => {
    // Oldest first — the order the Hygraph query returned (createdAt asc).
    const query = `*[${FILTER}] | order(_createdAt asc, _id asc){ ${FIELDS} }`;
    return fetchData<Vacancy[]>(query, { locale: cmsLocale(locale) }, { tags });
  },

  getOneVacancy: async (id: string, locale: string) => {
    if (!id) {
      throw new Error(
        `VacancyService.getOneVacancy: id is missing. locale=${locale}`,
      );
    }

    const query = `*[${FILTER} && entryId == $id][0]{ ${FIELDS} }`;
    return fetchData<Vacancy | null>(
      query,
      { id, locale: cmsLocale(locale) },
      { tags },
    );
  },
};
