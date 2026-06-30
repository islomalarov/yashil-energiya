import { gql } from "graphql-request";
import { fetchData } from "lib/graphql-client";
import { resolveCmsLocale } from "@/lib/cms-locale";

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
    const query = gql`
      query GetManagers($locale: Locale!) {
        managers(first: 50, locales: [$locale], orderBy: queue_ASC) {
          id
          email
          jobTitle
          name
          photo {
            fileName
            height
            url
            width
          }
          queue
        }
      }
    `;

    return fetchData<ManagerResponse>(query, {
      locale: resolveCmsLocale(locale),
    });
  },
};

