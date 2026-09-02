import type {
  SolarCalculatorConfig,
  RegionConfig,
} from "interface/solar-calculator.types";

// ─────────────────────────────────────────────────────────────────────────────
// Solar station calculator configuration.
//
// Single source of truth for all tunable numbers (tariffs, equipment specs,
// FX rate, regulatory thresholds). Kept as a typed module — not JSON — so that
// `Infinity` (the open-ended top tariff tier) and readable comments survive.
//
// Migration note: this mirrors the `SolarCalculatorConfig` shape from the spec
// so it can later be moved to a Hygraph model and fetched, without touching the
// calculation layer or the UI.
//
// i18n / Hygraph nuance: Hygraph localization supports only 2 locales here
// (see `cmsContentLocales = ["en", "ru"]`), but the site is trilingual
// (en/ru/uz). Therefore NOTHING translatable is stored as localized text.
// Regions and appliances carry stable, locale-neutral CODES (`code` / `nameKey`)
// and language-neutral numbers only; the three translations live in
// messages/{en,ru,uz}.json under CalculatorPage.* and are resolved by key.
// A future Hygraph model must store only these neutral fields — never localized
// labels — so the 3rd locale (uz) is served entirely from next-intl.
// ─────────────────────────────────────────────────────────────────────────────

// Shared seasonal profile (share of yearly generation per month, Jan…Dec, Σ≈1).
// Source: Global Solar Atlas monthly irradiation for Tashkent, normalized.
// TODO(data): replace with per-region GSA monthly values when the source file is
// available — winter dip is deeper in Karakalpakstan than in Bukhara, etc.
const DEFAULT_SEASONAL_WEIGHTS = [
  0.0499, 0.0574, 0.0771, 0.0899, 0.1054, 0.1108, 0.1158, 0.1141, 0.1024,
  0.0797, 0.0531, 0.0443,
] as const;

// Annual Peak Sun Hours (h/day) per region — Global Solar Atlas, spec §3.3.
const REGION_PSH: { code: string; nameKey: string; pshAnnual: number }[] = [
  { code: "tashkent-city", nameKey: "tashkentCity", pshAnnual: 4.06 },
  { code: "tashkent", nameKey: "tashkent", pshAnnual: 4.01 },
  { code: "andijan", nameKey: "andijan", pshAnnual: 3.71 },
  { code: "bukhara", nameKey: "bukhara", pshAnnual: 4.29 },
  { code: "jizzakh", nameKey: "jizzakh", pshAnnual: 3.94 },
  { code: "kashkadarya", nameKey: "kashkadarya", pshAnnual: 4.33 },
  { code: "navoi", nameKey: "navoi", pshAnnual: 4.37 },
  { code: "namangan", nameKey: "namangan", pshAnnual: 3.78 },
  { code: "samarkand", nameKey: "samarkand", pshAnnual: 4.27 },
  { code: "surkhandarya", nameKey: "surkhandarya", pshAnnual: 4.26 },
  { code: "syrdarya", nameKey: "syrdarya", pshAnnual: 3.88 },
  { code: "fergana", nameKey: "fergana", pshAnnual: 3.66 },
  { code: "khorezm", nameKey: "khorezm", pshAnnual: 4.19 },
  { code: "karakalpakstan", nameKey: "karakalpakstan", pshAnnual: 4.02 },
];

const regions: RegionConfig[] = REGION_PSH.map((r) => ({
  ...r,
  seasonalWeights: [...DEFAULT_SEASONAL_WEIGHTS],
}));

export const solarCalculatorConfig: SolarCalculatorConfig = {
  regions,

  // Uzbekistan climate: summer heat lowers panel yield more than the global mean.
  performanceRatio: 0.78,
  dcAcOversizeRatio: 1.15,

  panelWp: 585,
  panelAreaM2: 2.58, // ~2278 × 1134 mm bifacial module
  spacingFactor: 1.4,

  standardInverterSizes: [
    3, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100, 110, 125,
  ],
  phaseThresholdKw: 10,

  tariff: {
    // Residential stepped tariff, 6 tiers — spec §3.6 (indexed from 2026-06-01).
    residential: [
      { upTo: 200, rate: 650 },
      { upTo: 500, rate: 900 },
      { upTo: 1000, rate: 1100 },
      { upTo: 5000, rate: 1600 },
      { upTo: 10000, rate: 1900 },
      { upTo: Infinity, rate: 2200 },
    ],
    // Legal entities: flat 1100 sum/kWh.
    commercial: 1100,
  },

  capexPerKwp: {
    commercial: 450, // USD/kWp, utility/industrial scale (spec §3.6)
    // TODO(pricing): confirm a separate, higher figure for small rooftop
    // residential systems — 600 is a placeholder until clarified (spec §8.3).
    residential: 600,
  },
  bessAddonUsdPerKwp: 120,
  usdToUzsRate: 12600, // TODO(fx): refresh from CBU periodically.

  nettingPeriod: "monthly",

  export: {
    solarHouseRate: 1000, // budget subsidy, "Solar Home" residential participants
    standardRate: 800, // 1000 − 20% storage/transmission deduction
    transmissionDeductionPercent: 20,
    // TODO(legal): set per-category buyback for legal entities if differentiated
    // (spec §3.6 / §8.4). Undefined → falls back to standardRate.
  },

  limits: {
    solarHouseMaxKw: 50,
    taxIncentiveMaxKw: 100,
    gridRegistrationKw: 300,
  },

  references: {
    // Authoritative legal source (PP-57 / decrees). Editable without a deploy.
    // TODO(legal): pin the exact decree page on lex.uz when confirmed.
    solarHouseProgram: "https://lex.uz",
  },
  panelDegradationPercentPerYear: 0.5,
  systemLifetimeYears: 25,

  appliancePresets: [
    // Residential
    { id: "fridge", nameKey: "fridge", segment: "residential", powerW: 150, defaultHoursPerDay: 8 },
    { id: "ac", nameKey: "ac", segment: "residential", powerW: 1200, defaultHoursPerDay: 6 },
    { id: "washingMachine", nameKey: "washingMachine", segment: "residential", powerW: 800, defaultHoursPerDay: 1 },
    { id: "tv", nameKey: "tv", segment: "residential", powerW: 100, defaultHoursPerDay: 5 },
    { id: "lighting", nameKey: "lighting", segment: "residential", powerW: 200, defaultHoursPerDay: 6 },
    { id: "waterHeater", nameKey: "waterHeater", segment: "residential", powerW: 2000, defaultHoursPerDay: 2 },
    { id: "computer", nameKey: "computer", segment: "residential", powerW: 200, defaultHoursPerDay: 5 },
    { id: "microwave", nameKey: "microwave", segment: "residential", powerW: 1000, defaultHoursPerDay: 0.5 },
    { id: "kettle", nameKey: "kettle", segment: "residential", powerW: 2000, defaultHoursPerDay: 0.5 },
    { id: "pump", nameKey: "pump", segment: "residential", powerW: 750, defaultHoursPerDay: 2 },
    // Commercial
    { id: "officeLighting", nameKey: "officeLighting", segment: "commercial", powerW: 1500, defaultHoursPerDay: 10 },
    { id: "officeAc", nameKey: "officeAc", segment: "commercial", powerW: 5000, defaultHoursPerDay: 9 },
    { id: "workstations", nameKey: "workstations", segment: "commercial", powerW: 3000, defaultHoursPerDay: 9 },
    { id: "serverRoom", nameKey: "serverRoom", segment: "commercial", powerW: 2000, defaultHoursPerDay: 24 },
    { id: "refrigeration", nameKey: "refrigeration", segment: "commercial", powerW: 4000, defaultHoursPerDay: 24 },
    { id: "productionLine", nameKey: "productionLine", segment: "commercial", powerW: 15000, defaultHoursPerDay: 8 },
  ],
};
