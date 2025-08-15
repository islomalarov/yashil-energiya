import { gql } from "graphql-request";
import { fetchData } from "@/lib/graphql-client";

export interface Manager {
  id: string;
  email: string;
  jobTitle: string;
  name: string;
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
        }
      }
    `;
    return fetchData<ManagerResponse>(query, { locale });
  },
};
