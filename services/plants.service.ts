import { fetchData } from "lib/sanity-client";
import { CACHE_TAGS } from "lib/cache-tags";
import {
  ENTRY_ID,
  IMAGE,
  cmsLocale,
  hasLocale,
  languages,
  localized,
} from "./fragments";
import type { CmsImage } from "./news.service.types";

export interface Plant {
  id: string;
  address: string;
  pictures: CmsImage[];
  coal: string;
  date: string;
  gases: string;
  power: string;
  production: string;
  title: string;
  trees: string;
  coords: number[] | null;
  /** Languages this plant is filled in. */
  languages?: string[];
}

export interface PlantsResponse {
  plants: Plant[];
  plantsConnection: {
    aggregate: {
      count: number;
    };
  };
}

const tags = [CACHE_TAGS.plant];

const FILTER = `_type == "plant" && ${hasLocale()}`;

// Oldest first — the order the Hygraph queries returned (createdAt asc);
// `_createdAt` is carried over by the migration.
const ORDER = `order(_createdAt asc, _id asc)`;

const FIELDS = `
  ${ENTRY_ID},
  date,
  trees,
  "coords": select(defined(coords) => [coords.lat, coords.lng], null),
  "pictures": coalesce(pictures[]${IMAGE}, []),
  ${localized("title, address, power, production, coal, gases")},
  ${languages()}
`;

export const PlantService = {
  getAllPlants: async (first?: number, skip = 0, locale = "en") => {
    const paginated = first !== undefined;
    const query = `{
      "plants": *[${FILTER}] | ${ORDER} ${paginated ? "[$start...$end]" : ""} { ${FIELDS} },
      "plantsConnection": { "aggregate": { "count": count(*[${FILTER}]) } }
    }`;

    const params = { locale: cmsLocale(locale) };
    return fetchData<PlantsResponse>(
      query,
      paginated ? { ...params, start: skip, end: skip + first } : params,
      { tags },
    );
  },

  getPlantById: async (id: string, locale: string) => {
    const query = `*[${FILTER} && entryId == $id][0]{ ${FIELDS} }`;
    return fetchData<Plant | null>(
      query,
      { id, locale: cmsLocale(locale) },
      { tags },
    );
  },

  getLastPlants: async (locale: string) => {
    const query = `*[${FILTER}] | ${ORDER} [0...4]{ ${FIELDS} }`;
    return fetchData<Plant[]>(query, { locale: cmsLocale(locale) }, { tags });
  },
};
