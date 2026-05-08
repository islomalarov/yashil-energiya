import { gql } from "graphql-request";
import { fetchData } from "lib/graphql-client";

export interface Manager {
  id: string;
  email: string;
  jobTitle: string;
  name: string;
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
          queue
        }
      }
    `;

    return fetchData<ManagerResponse>(query, { locale });
  },
};

