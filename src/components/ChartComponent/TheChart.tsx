"use client";

import { Chart } from "react-charts";
type Datum = {
  year: string;
  power: number;
  color: string;
};
const data: Datum[] = [
  { year: "2025", power: 48843, color: "#5cb63f" },
  { year: "2024", power: 48066, color: "#5cb63f" },
  { year: "2023", power: 25418, color: "#5cb63f" },
];

export const TheChart = ({ label, unit }: { label: string; unit: string }) => {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Chart
        options={{
          data: [
            {
              label: `${label} (${unit})`,
              data: data,
            },
          ],
          primaryAxis: {
            getValue: (datum) => datum.year,
            position: "left", // для горизонтального вида
          },
          secondaryAxes: [
            {
              getValue: (datum: Datum) => datum.power,
              position: "bottom",
              elementType: "bar",
            },
          ],
          getDatumStyle: (datum) => ({
            fill: datum.originalDatum.color,
            transition: "all 0.8s ease",
          }),
          tooltip: true,
          interactionMode: "closest",
          dark: false, // если используете темную тему, можно поставить true
          padding: 10,
        }}
      />
    </div>
  );
};
