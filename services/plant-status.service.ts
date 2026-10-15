import { fetchData } from "lib/sanity-client";
import {
  normalizeCoords,
  regionOrder,
  toFiniteNumber,
} from "./operational-assets.service";

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

const sortPlantStatuses = (a: PlantStatus, b: PlantStatus) =>
  regionOrder(a.name) - regionOrder(b.name) ||
  a.name.localeCompare(b.name) ||
  a.regionName.localeCompare(b.regionName);

export const PlantStatusService = {
  getPlantStatuses: async () => {
    // The region key lives in `region`; alias it to `name` so the downstream
    // normalize/sort/label logic is unchanged. Uncached: see operational-assets.
    const query = `{
      "plantStatuses": *[_type == "plantStatus"][0...100]{
        "id": _id,
        regionName,
        "name": region,
        "coords": [coords.lat, coords.lng],
        plants,
        power
      }
    }`;

    try {
      const response = await fetchData<PlantStatusesResponse>(
        query,
        {},
        { revalidate: false },
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
