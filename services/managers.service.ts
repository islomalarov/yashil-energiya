import { fetchData } from "lib/sanity-client";
import { CACHE_TAGS } from "lib/cache-tags";
import { ENTRY_ID, IMAGE, cmsLocale, hasLocale, localized } from "./fragments";

export interface Manager {
  id: string;
  email: string;
  jobTitle: string;
  name: string;
  photo?: {
    fileName?: string | null;
    height?: number | null;
    url: string;
    width?: number | null;
  } | null;
  queue: number;
}

interface ManagerResponse {
  managers: Manager[];
}

export const ManagerService = {
  getAllManagers: async (locale: string) => {
    const query = `{
      "managers": *[_type == "manager" && ${hasLocale("name")}] | order(queue asc, _id asc) [0...50]{
        ${ENTRY_ID},
        email,
        "photo": photo${IMAGE},
        queue,
        ${localized("name, jobTitle")}
      }
    }`;

    return fetchData<ManagerResponse>(
      query,
      { locale: cmsLocale(locale) },
      { tags: [CACHE_TAGS.manager] },
    );
  },
};
