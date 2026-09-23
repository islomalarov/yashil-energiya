import { fetchData } from "lib/sanity-client";
import { CACHE_TAGS } from "lib/cache-tags";
import { ENTRY_ID, IMAGE, LANGUAGES } from "./fragments";
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
  /** Languages with a published version of this plant. */
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

const FILTER = `_type == "plant" && language == $locale`;

// Oldest first — the order the Hygraph queries returned (createdAt asc);
// `_createdAt` is carried over by the migration.
const ORDER = `order(_createdAt asc, _id asc)`;

const FIELDS = `
  ${ENTRY_ID},
  title,
  address,
  power,
  date,
  production,
  coal,
  gases,
  trees,
  "coords": select(defined(coords) => [coords.lat, coords.lng], null),
  "pictures": coalesce(pictures[]${IMAGE}, []),
  ${LANGUAGES}
`;

export const PlantService = {
  getAllPlants: async (first?: number, skip = 0, locale = "en") => {
    const paginated = first !== undefined;
    const query = `{
      "plants": *[${FILTER}] | ${ORDER} ${paginated ? "[$start...$end]" : ""} { ${FIELDS} },
      "plantsConnection": { "aggregate": { "count": count(*[${FILTER}]) } }
    }`;

    return fetchData<PlantsResponse>(
      query,
      paginated ? { locale, start: skip, end: skip + first } : { locale },
      { tags },
    );
  },

  getPlantById: async (id: string, locale: string) => {
    const query = `*[${FILTER} && entryId == $id][0]{ ${FIELDS} }`;
    return fetchData<Plant | null>(query, { id, locale }, { tags });
  },

  getLastPlants: async (locale: string) => {
    const query = `*[${FILTER}] | ${ORDER} [0...4]{ ${FIELDS} }`;
    return fetchData<Plant[]>(query, { locale }, { tags });
  },
};
