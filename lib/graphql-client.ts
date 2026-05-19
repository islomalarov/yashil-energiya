import { request } from "graphql-request";
import { publicEnv } from "@/lib/public-env";

export const fetchData = async <T>(
  query: string,
  variables?: Record<string, unknown>,
) => {
  return request<T>(publicEnv.hygraphEndpoint, query, variables);
};
