import { request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

if (!graphqlAPI) {
  throw new Error("Invalid/Missing environment variable: HYGRAPH_ENDPOINT");
}

export const fetchData = async <T>(
  query: string,
  variables?: Record<string, unknown>,
) => {
  return request<T>(graphqlAPI, query, variables);
};
