import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

if (!graphqlAPI) {
  throw new Error("Invalid/Missing environment variable: HYGRAPH_ENDPOINT");
}

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

export interface PlantResponse {
  plants: Plant[];
}
export const PlantService = {
  getAllPlants: async (locale?: string) => {
    const query = gql`
      query GetPlants {
        plants(locales: ${locale}) {
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
    const response = await request<PlantResponse>(graphqlAPI, query);
    return response.plants;
  },
  getPlantById: async (id: string, locale?: string) => {
    const query = gql`
      query GetPlantById {
        plant(where: { id: "${id}" }, locales: ${locale}) {
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
    const response = await request<{ plant: Plant }>(graphqlAPI, query);
    return response.plant;
  },
};
