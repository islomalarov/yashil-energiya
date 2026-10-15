import assert from "node:assert/strict";
import { test } from "node:test";
import { solarCalculatorConfig as config } from "../data/solar-calculator-config.ts";
import { billFor, calculate } from "./solar-calculator.ts";

test("billFor: residential stepped tariff", () => {
  // 200 kWh × 650 + 100 kWh × 900
  assert.equal(billFor(300, "residential", config), 220000);
});

test("calculate: system size for 300 kWh/month in Tashkent city", () => {
  const result = calculate(
    {
      segment: "residential",
      inputMode: "consumption",
      monthlyConsumptionKwh: 300,
      appliances: [],
      regionCode: "tashkent-city",
      coveragePercent: 100,
      solarHouseProgram: false,
      includeBESS: false,
    },
    config,
  );

  // 10 kWh/day ÷ (4.06 PSH × 0.78 PR) ≈ 3.16 kWp → ceil(3158 / 585 Wp) = 6 panels
  assert.equal(result.panelCount, 6);
  assert.equal(result.actualKwp, 3.51);
});
