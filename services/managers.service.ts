import { request, gql } from "graphql-request";

export interface Manager {
  id: string;
  email: string;
  jobTitle: string;
  name: string;
  showAtList: boolean;
}

interface ManagerResponse {
  managers: Manager[];
}

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

if (!graphqlAPI) {
  throw new Error("Invalid/Missing environment variable: HYGRAPH_ENDPOINT");
}

export const ManagerService = {
  getAllManagers: async (locale?: string) => {
    const query = gql`
      query GetManagers {
        managers(locales: ${locale}) {
          email
          jobTitle
          name
          showAtList
        }
      }
    `;
    const response = await request<ManagerResponse>(graphqlAPI, query);
    return response;
  },
};
