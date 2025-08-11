import { request, gql } from "graphql-request";

export interface Vacancy {
  id: string;
  title: string;
  references: string;
  excerpt: string;
  description: {
    raw: {
      children: [{}];
    };
  };
}

interface VacanciesResponse {
  vacancies: Vacancy[];
}
interface VacancyResponse {
  vacancy: Vacancy;
}

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

if (!graphqlAPI) {
  throw new Error("Invalid/Missing environment variable: HYGRAPH_ENDPOINT");
}

export const VacancyService = {
  getAllVacancies: async (locale?: string) => {
    const query = gql`
      query GetVacancies {
        vacancies(locales: ${locale}) {
          excerpt
          id
          title
          references
           description {
            raw
          }
        }
      }
    `;
    const response = await request<VacanciesResponse>(graphqlAPI, query);
    return response.vacancies;
  },
  getOneVacancy: async (id: string, locale?: string) => {
    const query = gql`
      query GetOneVacancy {
        vacancy(where: { id: "${id}" }, locales: ${locale}) {
          title
          references
          description {
            raw
          }
          excerpt
          }
      }
    `;
    const response = await request<VacancyResponse>(graphqlAPI, query);
    return response.vacancy;
  },
};
