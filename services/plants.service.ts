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
}
interface PlantResponse {
  plant: Plant;
}

export const PlantService = {
  getAllPlants: async (locale: string) => {
    const query = gql`
      query GetPlants($locale: Locale!) {
        plants(locales: [$locale]) {
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
    const response = await fetchData<PlantsResponse>(query, { locale });
    return response.plants;
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
};
