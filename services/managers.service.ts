import { gql } from "graphql-request";
import { fetchData } from "@/lib/graphql-client";

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
        managers(locales: [$locale]) {
          id
          email
          jobTitle
          name
          queue
        }
      }
    `;
     const response = await fetchData<ManagerResponse>(query, { locale });

    // сортируем по queue (по возрастанию)
    const sortedManagers = response.managers.sort(
      (a, b) => a.queue - b.queue
    );
    return { ...response, managers: sortedManagers };
    // return fetchData<ManagerResponse>(query, { locale });
  },
};

