// Types for the solar station calculator.
// Kept framework-agnostic so the calculation layer (lib/solar-calculator.ts)
// stays a set of pure functions that are easy to unit-test.

export type Segment = "residential" | "commercial";
export type InputMode = "consumption" | "appliances";

/** A single appliance row in the "by appliances" input mode. */
export interface ApplianceItem {
  id: string;
  /** i18n key for a preset, or empty for a user-added custom row. */
  nameKey?: string;
  /** Free-text name for custom rows (falls back to nameKey translation). */
  name?: string;
  powerW: number;
  hoursPerDay: number;
  quantity: number;
}

/** A tariff step: energy up to `upTo` kWh/month is billed at `rate` sum/kWh. */
export interface TariffTier {
  /** Upper bound of the tier, kWh/month. `Infinity` for the last tier. */
  upTo: number;
  /** Price, UZS per kWh. */
  rate: number;
}

export interface RegionConfig {
  code: string;
  /** i18n key under the CalculatorPage.regions namespace. */
  nameKey: string;
  /** Average annual Peak Sun Hours, h/day (Global Solar Atlas). */
  pshAnnual: number;
  /** Share of each month in yearly generation, 12 values, Σ = 1 (Jan…Dec). */
  seasonalWeights: number[];
}

export interface AppliancePreset {
  id: string;
  /** i18n key under CalculatorPage.appliances namespace. */
  nameKey: string;
  segment: Segment;
  powerW: number;
  defaultHoursPerDay: number;
}

export interface SolarCalculatorConfig {
  regions: RegionConfig[];
  /** System performance ratio (losses: heat, inverter, cabling, soiling). */
  performanceRatio: number;
  /** DC/AC oversize ratio for inverter sizing. */
  dcAcOversizeRatio: number;
  /** Nominal power of a single panel, Wp. */
  panelWp: number;
  /** Physical area of a single panel, m². */
  panelAreaM2: number;
  /** Row spacing / shading multiplier applied to raw panel area. */
  spacingFactor: number;
  /** Standard inverter sizes, kW, ascending. */
  standardInverterSizes: number[];
  /** Power threshold (kW) at/above which a three-phase connection is required. */
  phaseThresholdKw: number;
  tariff: {
    residential: TariffTier[];
    /** Flat tariff for legal entities, UZS per kWh. */
    commercial: number;
  };
  /** CAPEX per installed kWp, USD. */
  capexPerKwp: Record<Segment, number>;
  /** Extra CAPEX per kWp for a battery energy storage system, USD. */
  bessAddonUsdPerKwp: number;
  /** Central Bank USD → UZS rate used to convert CAPEX to sum. */
  usdToUzsRate: number;
  /** Netting is done per reporting month, per PP-57. */
  nettingPeriod: "monthly";
  /** Surplus export / subsidy rates. */
  export: {
    /** Budget subsidy for "Solar Home" residential participants, UZS/kWh. */
    solarHouseRate: number;
    /** Rate for residential non-participants and legal entities, UZS/kWh. */
    standardRate: number;
    /** Deduction (%) for storage/transmission applied to the base rate. */
    transmissionDeductionPercent: number;
  };
  appliancePresets: AppliancePreset[];
  /** Regulatory thresholds (PP-57) used for UI warnings, kW. */
  limits: {
    /** "Solar Home" subsidy programme cap per household. */
    solarHouseMaxKw: number;
    /** Tax-incentive cap (3 years, or 10 with BESS ≥25%). */
    taxIncentiveMaxKw: number;
    /** At/above this power, registration with the Ministry of Energy is required. */
    gridRegistrationKw: number;
  };
  /** External reference links shown in info tooltips. */
  references: {
    /** Source page describing the "Solar Home" programme. */
    solarHouseProgram: string;
  };
  /** Panel degradation, % per year (informational, v2 toggle). */
  panelDegradationPercentPerYear: number;
  /** Warranty / lifetime horizon used for lifetime-savings figure, years. */
  systemLifetimeYears: number;
}

/** User-provided inputs collected by the UI. */
export interface CalculatorInput {
  segment: Segment;
  inputMode: InputMode;
  monthlyConsumptionKwh: number;
  appliances: ApplianceItem[];
  regionCode: string;
  coveragePercent: number;
  solarHouseProgram: boolean;
  includeBESS: boolean;
}

/** Computed result returned by the calculation layer. */
export interface CalculatorResult {
  monthlyConsumptionKwh: number;
  requiredKwp: number;
  panelCount: number;
  actualKwp: number;
  arrayAreaM2: number;
  inverterKw: number;
  isThreePhase: boolean;
  annualGenerationKwh: number;
  /** 12 values, Jan…Dec, kWh. */
  monthlyGeneration: number[];
  /** 12 values, Jan…Dec, kWh — flat monthly consumption for comparison. */
  monthlyConsumption: number[];
  /** Per-month financial breakdown, Jan…Dec. */
  monthlyBreakdown: MonthlyFinance[];
  coverageActualPercent: number;
  monthlySavingsSum: number;
  annualSavingsSum: number;
  systemCostSum: number;
  paybackYears: number;
  lifetimeSavingsSum: number;
  warnings: CalculatorWarning[];
}

/** One month of the savings breakdown table. */
export interface MonthlyFinance {
  /** Electricity bill without the PV system, UZS. */
  billWithoutPV: number;
  /** Generated energy, kWh. */
  generationKwh: number;
  /** Energy exported to the grid (surplus), kWh. */
  surplusKwh: number;
  /** Savings for the month (bill delta + surplus revenue), UZS. */
  savingsSum: number;
}

export type CalculatorWarning =
  | "solarHouseCap"
  | "taxIncentiveCap"
  | "gridRegistration";
