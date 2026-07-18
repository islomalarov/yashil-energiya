import { gql } from "graphql-request";
import { fetchData } from "lib/graphql-client";
import { CACHE_TAGS, LIVE_FALLBACK_REVALIDATE } from "lib/cache-tags";

export type PlantStatus = {
  id: string;
  regionName: string;
  name: string;
  coords: [number, number];
  plants: number;
  power: number;
};

type RawPlantStatus = {
  id?: unknown;
  regionName?: unknown;
  name?: unknown;
  coords?: unknown;
  plants?: unknown;
  power?: unknown;
};

type PlantStatusesResponse = {
  plantStatuses?: RawPlantStatus[] | null;
};

const toFiniteNumber = (value: unknown) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  return null;
};

const normalizeCoords = (coords: unknown): [number, number] | null => {
  if (!Array.isArray(coords) || coords.length < 2) {
    return null;
  }

  const latitude = toFiniteNumber(coords[0]);
  const longitude = toFiniteNumber(coords[1]);

  if (latitude === null || longitude === null) {
    return null;
  }

  return [latitude, longitude];
};

const normalizePlantStatus = (record: RawPlantStatus): PlantStatus | null => {
  const id = typeof record.id === "string" ? record.id.trim() : "";
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const regionName =
    typeof record.regionName === "string" ? record.regionName.trim() : "";
  const coords = normalizeCoords(record.coords);

  if (!id || !name || !coords) {
    return null;
  }

  return {
    id,
    name,
    regionName: regionName || name,
    coords,
    plants: Math.max(0, Math.trunc(toFiniteNumber(record.plants) ?? 0)),
    power: Math.max(0, toFiniteNumber(record.power) ?? 0),
  };
};

const regionOrder = (name: string) => {
  const match = /^region(\d+)$/i.exec(name);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const sortPlantStatuses = (a: PlantStatus, b: PlantStatus) =>
  regionOrder(a.name) - regionOrder(b.name) ||
  a.name.localeCompare(b.name) ||
  a.regionName.localeCompare(b.regionName);

export const PlantStatusService = {
  getPlantStatuses: async () => {
    const query = gql`
      query PlantStatuses {
        plantStatuses(first: 100, stage: PUBLISHED) {
          id
          regionName
          name
          coords
          plants
          power
        }
      }
    `;

    try {
      const response = await fetchData<PlantStatusesResponse>(
        query,
        undefined,
        {
          revalidate: LIVE_FALLBACK_REVALIDATE,
          tags: [CACHE_TAGS.PlantStatus],
        },
      );
      const records = response.plantStatuses ?? [];
      const plantStatuses = records
        .map(normalizePlantStatus)
        .filter((status): status is PlantStatus => status !== null)
        .sort(sortPlantStatuses);

      if (records.length > plantStatuses.length) {
        console.warn(
          "PlantStatusService.getPlantStatuses: skipped invalid PlantStatus records",
        );
      }

      return plantStatuses;
    } catch (error) {
      console.error("PlantStatusService.getPlantStatuses failed", error);
      return [];
    }
  },
};
