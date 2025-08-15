import { gql } from "graphql-request";
import { fetchData } from "@/lib/graphql-client";

export interface Plant {
  id: string;
  address: string;
  pictures: {
    fileName: string;
    url: string;
    height: number;
    width: number;
  }[];
  coal: string;
  date: string;
  gases: string;
  power: string;
  production: string;
  title: string;
  trees: string;
}

export interface PlantsResponse {
  plants: Plant[];
  plantsConnection: {
    aggregate: {
      count: number;
    };
  };
}
interface PlantResponse {
  plant: Plant;
}

export const PlantService = {
  getAllPlants: async (first?: number, skip?: number, locale?: string) => {
    const query = gql`
      query GetPlants($first: Int, $skip: Int, $locale: Locale!) {
        plants(first: $first, skip: $skip, locales: [$locale]) {
          id
          address
          coal
          date
          gases
          power
          production
          title
          trees
          pictures {
            fileName
            url
            height
            width
          }
        }
        plantsConnection(locales: [$locale]) {
          aggregate {
            count
          }
        }
      }
    `;
    return fetchData<PlantsResponse>(query, {
      first,
      skip,
      locale,
    });
  },

  getPlantById: async (id: string, locale: string) => {
    const query = gql`
      query GetPlantById($id: ID!, $locale: Locale!) {
        plant(where: { id: $id }, locales: [$locale]) {
          id
          address
          coal
          date
          gases
          power
          production
          title
          trees
          pictures {
            fileName
            url
            height
            width
          }
        }
      }
    `;
    const response = await fetchData<PlantResponse>(query, { id, locale });
    return response.plant;
  },

  getLastPlants: async (locale: string) => {
    const query = gql`
      query GetLastPlants($locale: Locale!) {
        plants(first: 2, locales: [$locale]) {
          id
          title
          address
          date
          coal
          gases
          power
          production
          trees
          pictures {
            url
          }
        }
      }
    `;
    const response = await fetchData<PlantsResponse>(query, { locale });
    return response.plants;
  },
};
