import type {
  ApplianceItem,
  CalculatorInput,
  CalculatorResult,
  CalculatorWarning,
  MonthlyFinance,
  Segment,
  SolarCalculatorConfig,
  TariffTier,
} from "interface/solar-calculator.types";

const DAYS_PER_MONTH = 30;
const DAYS_PER_YEAR = 365;

/** Monthly consumption (kWh) from a list of appliances. */
export function monthlyConsumptionFromAppliances(
  appliances: ApplianceItem[],
): number {
  const dailyKwh = appliances.reduce((sum, a) => {
    const power = Number.isFinite(a.powerW) ? a.powerW : 0;
    const hours = Number.isFinite(a.hoursPerDay) ? a.hoursPerDay : 0;
    const qty = Number.isFinite(a.quantity) ? a.quantity : 0;
    return sum + (power * hours * qty) / 1000;
  }, 0);
  return dailyKwh * DAYS_PER_MONTH;
}

/**
 * Billed amount (UZS) for a given monthly consumption.
 * Residential uses a stepped tariff; commercial is flat per category.
 */
export function billFor(
  kwh: number,
  segment: Segment,
  config: SolarCalculatorConfig,
): number {
  if (kwh <= 0) return 0;

  if (segment === "residential") {
    return billResidential(kwh, config.tariff.residential);
  }
  return kwh * config.tariff.commercial;
}

function billResidential(kwh: number, tiers: TariffTier[]): number {
  let remaining = kwh;
  let prevLimit = 0;
  let total = 0;
  for (const tier of tiers) {
    const tierWidth = Math.min(remaining, tier.upTo - prevLimit);
    if (tierWidth <= 0) break;
    total += tierWidth * tier.rate;
    remaining -= tierWidth;
    prevLimit = tier.upTo;
  }
  return total;
}

/** Surplus buyback / subsidy rate (UZS/kWh) for the given segment. */
export function subsidyRate(
  segment: Segment,
  solarHouseProgram: boolean,
  config: SolarCalculatorConfig,
): number {
  if (segment === "residential" && solarHouseProgram) {
    return config.export.solarHouseRate;
  }
  return config.export.standardRate;
}

/** Round up to the nearest standard inverter size. */
export function nearestStandardInverter(
  value: number,
  sizes: number[],
): number {
  const sorted = [...sizes].sort((a, b) => a - b);
  const fit = sorted.find((size) => size >= value);
  return fit ?? sorted[sorted.length - 1] ?? value;
}

/**
 * Full calculation. Pure: given the same input and config it always returns the
 * same result, so it is trivially unit-testable and free of UI concerns.
 */
export function calculate(
  input: CalculatorInput,
  config: SolarCalculatorConfig,
): CalculatorResult {
  const region =
    config.regions.find((r) => r.code === input.regionCode) ??
    config.regions[0];

  const monthlyConsumptionKwh =
    input.inputMode === "appliances"
      ? monthlyConsumptionFromAppliances(input.appliances)
      : Math.max(0, input.monthlyConsumptionKwh || 0);

  const dailyConsumptionKwh = monthlyConsumptionKwh / DAYS_PER_MONTH;
  const coverage = (input.coveragePercent || 100) / 100;

  const denom = region.pshAnnual * config.performanceRatio;
  const requiredKwp = denom > 0 ? (dailyConsumptionKwh * coverage) / denom : 0;

  // Discrete panels → actual installed power.
  const panelCount = Math.max(
    0,
    Math.ceil((requiredKwp * 1000) / config.panelWp),
  );
  const actualKwp = (panelCount * config.panelWp) / 1000;

  const arrayAreaM2 = panelCount * config.panelAreaM2 * config.spacingFactor;

  const inverterRaw = actualKwp / config.dcAcOversizeRatio;
  const inverterKw = nearestStandardInverter(
    inverterRaw,
    config.standardInverterSizes,
  );
  const isThreePhase = actualKwp >= config.phaseThresholdKw;

  const annualGenerationKwh =
    actualKwp * region.pshAnnual * DAYS_PER_YEAR * config.performanceRatio;

  const monthlyGeneration = region.seasonalWeights.map(
    (w) => annualGenerationKwh * w,
  );
  const monthlyConsumption = Array.from(
    { length: 12 },
    () => monthlyConsumptionKwh,
  );

  // Financials — per-month netting (spec §3.6).
  const billWithoutPV = billFor(monthlyConsumptionKwh, input.segment, config);
  const rate = subsidyRate(input.segment, input.solarHouseProgram, config);

  const monthlyBreakdown: MonthlyFinance[] = [];
  let annualSavingsSum = 0;
  for (let i = 0; i < 12; i += 1) {
    const gen = monthlyGeneration[i];
    const surplus = Math.max(0, gen - monthlyConsumptionKwh);
    const fromGrid = Math.max(0, monthlyConsumptionKwh - gen);
    const billWithPV = billFor(fromGrid, input.segment, config);
    const subsidyRevenue = surplus * rate;
    const savings = billWithoutPV - billWithPV + subsidyRevenue;
    annualSavingsSum += savings;
    monthlyBreakdown.push({
      billWithoutPV,
      generationKwh: gen,
      surplusKwh: surplus,
      savingsSum: savings,
    });
  }
  const monthlySavingsSum = annualSavingsSum / 12;

  const capexUsdPerKwp =
    config.capexPerKwp[input.segment] +
    (input.includeBESS ? config.bessAddonUsdPerKwp : 0);
  const systemCostSum = actualKwp * capexUsdPerKwp * config.usdToUzsRate;

  const paybackYears =
    annualSavingsSum > 0 ? systemCostSum / annualSavingsSum : Infinity;
  const lifetimeSavingsSum =
    annualSavingsSum * config.systemLifetimeYears - systemCostSum;

  const coverageActualPercent =
    monthlyConsumptionKwh > 0
      ? (annualGenerationKwh / (monthlyConsumptionKwh * 12)) * 100
      : 0;

  return {
    monthlyConsumptionKwh,
    requiredKwp,
    panelCount,
    actualKwp,
    arrayAreaM2,
    inverterKw,
    isThreePhase,
    annualGenerationKwh,
    monthlyGeneration,
    monthlyConsumption,
    monthlyBreakdown,
    coverageActualPercent,
    monthlySavingsSum,
    annualSavingsSum,
    systemCostSum,
    paybackYears,
    lifetimeSavingsSum,
    warnings: buildWarnings(input.segment, actualKwp, config),
  };
}

function buildWarnings(
  segment: Segment,
  actualKwp: number,
  config: SolarCalculatorConfig,
): CalculatorWarning[] {
  const warnings: CalculatorWarning[] = [];
  if (segment === "residential" && actualKwp > config.limits.solarHouseMaxKw) {
    warnings.push("solarHouseCap");
  }
  if (actualKwp > config.limits.taxIncentiveMaxKw) {
    warnings.push("taxIncentiveCap");
  }
  if (actualKwp >= config.limits.gridRegistrationKw) {
    warnings.push("gridRegistration");
  }
  return warnings;
}
