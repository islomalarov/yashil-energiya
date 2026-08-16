// Uzbek month names in the nominative case — next-intl locale "uz" is not
// backed by a full ICU dataset here, so we format that locale by hand
// (mirrors the approach in TendersList / plants pages).
const UZ_MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentyabr",
  "oktyabr",
  "noyabr",
  "dekabr",
];

// Formats a CMS date/datetime string (ISO from Hygraph — `date`, `createdAt`,
// `updatedAt`, …) as a localized publication date. Falls back to the trimmed
// raw value when it cannot be parsed, so nothing ever renders as "Invalid Date".
export function formatPublicationDate(
  raw?: string | null,
  locale?: string,
): string {
  if (!raw) return "";

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw.trim();

  const safeLocale = locale ?? "en";

  if (safeLocale.startsWith("uz")) {
    return `${date.getUTCDate()}-${UZ_MONTHS[date.getUTCMonth()]}, ${date.getUTCFullYear()}-yil`;
  }

  try {
    return new Intl.DateTimeFormat(safeLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  } catch {
    return raw.trim();
  }
}
