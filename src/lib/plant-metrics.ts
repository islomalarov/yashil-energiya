import type { Plant } from "services/plants.service";

/**
 * Plant metric fields come from Hygraph as free-form strings
 * ("1500 kW", " 815 000", "1.12 K t."). These helpers parse them
 * defensively; `null` means "could not parse" and callers fall back
 * to the raw CMS string instead of showing invented numbers.
 */

const cleanValue = (raw: string | null | undefined) =>
  (raw ?? "").replace(/[\u00a0\u202f]/g, " ").trim();

function parseLeadingNumber(raw: string | null | undefined): number | null {
  const value = cleanValue(raw);
  const match = value.match(/-?\d[\d\s.,]*/);
  if (!match) return null;

  let digits = match[0].replace(/\s/g, "");
  if (digits.includes(".") && digits.includes(",")) {
    digits = digits.replace(/,/g, "");
  } else if (digits.includes(",")) {
    digits = digits.replace(",", ".");
  }

  const parsed = Number(digits);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parsePowerKw(raw: string | null | undefined): number | null {
  return parseLeadingNumber(raw);
}

export function parseProductionKwh(
  raw: string | null | undefined,
): number | null {
  return parseLeadingNumber(raw);
}

/** "1.12 K t." → 1120; "269.32 t." → 269.32; unit-less assumed tonnes. */
export function parseTons(raw: string | null | undefined): number | null {
  const value = cleanValue(raw);
  const amount = parseLeadingNumber(value);
  if (amount === null) return null;

  // "1.12 K t." (en), "1.12 тыс. т." (ru), "1.12 ming t." (uz) → ×1000
  const withoutDots = value.replace(/\./g, " ");
  const hasThousandsSuffix =
    /\d[\s]*[KkКк]\b/.test(withoutDots) ||
    /тыс|ming/i.test(withoutDots);
  return hasThousandsSuffix ? amount * 1000 : amount;
}

export function parseTrees(raw: string | null | undefined): number | null {
  const amount = parseLeadingNumber(raw);
  return amount === null ? null : Math.round(amount);
}

/** "24.12.2023" (dd.mm.yyyy) → { day, month, year }. */
export function parseInstallationDate(
  raw: string | null | undefined,
): { day: number; month: number; year: number } | null {
  const match = cleanValue(raw).match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  return { day, month, year };
}

export function installationTimestamp(raw: string | null | undefined): number {
  const parts = parseInstallationDate(raw);
  return parts ? Date.UTC(parts.year, parts.month - 1, parts.day) : 0;
}

export function installationYear(
  raw: string | null | undefined,
): number | null {
  return parseInstallationDate(raw)?.year ?? null;
}

/** "Khorezm region, Tuproqqala district" → "Khorezm region". */
export function extractRegion(address: string | null | undefined): string {
  const value = cleanValue(address);
  const [region] = value.split(",");
  return (region ?? "").trim();
}

export type PlantsSummary = {
  count: number;
  totalPowerKw: number;
  totalProductionKwh: number;
  totalCo2Tons: number;
};

export function summarizePlants(plants: Plant[]): PlantsSummary {
  return plants.reduce<PlantsSummary>(
    (summary, plant) => ({
      count: summary.count + 1,
      totalPowerKw: summary.totalPowerKw + (parsePowerKw(plant.power) ?? 0),
      totalProductionKwh:
        summary.totalProductionKwh + (parseProductionKwh(plant.production) ?? 0),
      totalCo2Tons: summary.totalCo2Tons + (parseTons(plant.gases) ?? 0),
    }),
    { count: 0, totalPowerKw: 0, totalProductionKwh: 0, totalCo2Tons: 0 },
  );
}
