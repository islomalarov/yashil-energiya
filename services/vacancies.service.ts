import { fetchData } from "lib/graphql-client";
import { gql } from "graphql-request";
import type { RichTextNode } from "@/types/richtext";

export interface Vacancy {
  id: string;
  title: string;
  references: string;
  excerpt: string;
  description: {
    raw: {
      children: RichTextNode[];
    };
  };
  attachments?: {
    id: string;
    url: string;
    fileName: string;
    mimeType?: string | null;
    size?: number | null;
  }[];
}

interface VacanciesResponse {
  vacancies: Vacancy[];
}
interface VacancyResponse {
  vacancy: Vacancy;
}

export const VacancyService = {
  getAllVacancies: async (locale: string) => {
    const query = gql`
      query GetVacancies($locale: Locale!) {
        vacancies(locales: [$locale]) {
          id
          excerpt
          title
          references
          description {
            raw
          }
          attachments {
          id
          url
          fileName
          mimeType
          size
          }
        }
      }
    `;
    const response = await fetchData<VacanciesResponse>(query, { locale });
    return response.vacancies;
  },

  getOneVacancy: async (id: string, locale: string) => {
    if (!id) {
    throw new Error(
      `VacancyService.getOneVacancy: id is missing. locale=${locale}`
    );
  }
    const query = gql`
      query GetOneVacancy($id: ID!, $locale: Locale!) {
        vacancy(where: { id: $id }, locales: [$locale]) {
          title
          references
          description {
            raw
          }
          attachments {
          id
          url
          fileName
          mimeType
          size
          }
          excerpt
        }
      }
    `;
    const response = await fetchData<VacancyResponse>(query, { id, locale });
    return response.vacancy;
  },
};
