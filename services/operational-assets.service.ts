import { fetchData } from "lib/sanity-client";

export type OperationalAsset = {
  id: string;
  regionName: string;
  region: string;
  name: string;
  coords: [number, number];
  condition: string;
  capacity: number;
};

export type EvCharge = OperationalAsset;
export type Mhp = OperationalAsset;

type RawOperationalAsset = {
  id?: unknown;
  regionName?: unknown;
  region?: unknown;
  name?: unknown;
  coords?: unknown;
  condition?: unknown;
  capacity?: unknown;
};

type OperationalAssetsResponse<TQueryKey extends string> = {
  [key in TQueryKey]?: RawOperationalAsset[] | null;
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

const normalizeOperationalAsset = (
  record: RawOperationalAsset,
): OperationalAsset | null => {
  const id = typeof record.id === "string" ? record.id.trim() : "";
  const region = typeof record.region === "string" ? record.region.trim() : "";
  const regionName =
    typeof record.regionName === "string" ? record.regionName.trim() : "";
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const condition =
    typeof record.condition === "string" ? record.condition.trim() : "";
  const coords = normalizeCoords(record.coords);

  if (!id || !region || !name || !condition || !coords) {
    return null;
  }

  return {
    id,
    region,
    regionName: regionName || region,
    name,
    condition,
    coords,
    capacity: Math.max(0, toFiniteNumber(record.capacity) ?? 0),
  };
};

const regionOrder = (region: string) => {
  const match = /^region(\d+)$/i.exec(region);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const sortOperationalAssets = (a: OperationalAsset, b: OperationalAsset) =>
  regionOrder(a.region) - regionOrder(b.region) ||
  a.region.localeCompare(b.region) ||
  a.name.localeCompare(b.name) ||
  a.id.localeCompare(b.id);

const fetchOperationalAssets = async <TQueryKey extends "evCharges" | "mhps">(
  query: string,
  queryKey: TQueryKey,
  serviceName: string,
) => {
  try {
    const response = await fetchData<OperationalAssetsResponse<TQueryKey>>(
      query,
      {},
      { revalidate: false },
    );
    const records = response[queryKey] ?? [];
    const assets = records
      .map(normalizeOperationalAsset)
      .filter((asset): asset is OperationalAsset => asset !== null)
      .sort(sortOperationalAssets);

    if (records.length > assets.length) {
      console.warn(`${serviceName}: skipped invalid records`);
    }

    return assets;
  } catch (error) {
    console.error(`${serviceName} failed`, error);
    return [];
  }
};

// Status pages must show changes immediately, so these queries are uncached
// (`revalidate: false`): tag-based revalidation proved unreliable on Next 16.
const assetsQuery = (type: "evCharge" | "mhp", key: string) => `{
  "${key}": *[_type == "${type}"][0...100]{
    "id": _id,
    regionName,
    region,
    name,
    "coords": [coords.lat, coords.lng],
    condition,
    capacity
  }
}`;

export const EvChargeService = {
  getEvCharges: async () =>
    fetchOperationalAssets(
      assetsQuery("evCharge", "evCharges"),
      "evCharges",
      "EvChargeService.getEvCharges",
    ),
};

export const MhpService = {
  getMhps: async () =>
    fetchOperationalAssets(
      assetsQuery("mhp", "mhps"),
      "mhps",
      "MhpService.getMhps",
    ),
};
