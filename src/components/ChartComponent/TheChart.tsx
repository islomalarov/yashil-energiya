"use client";
import React from "react";
import { Chart } from "react-charts";
type Datum = {
  year: string;
  power: number;
  color: string;
};
const raw: Datum[] = [
  { year: "2025", power: 131051, color: "#5cb63f" },
  { year: "2025", power: 131051, color: "#5cb63f" },
  { year: "2024", power: 48066, color: "#5cb63f" },
  { year: "2023", power: 25418, color: "#5cb63f" },
];

export const TheChart = ({ label, unit }: { label: string; unit: string }) => {
  const data = React.useMemo(
    () => [
      {
        label: `${label} (${unit})`,
        data: raw,
      },
    ],
    [label, unit]
  );

  return (
    <div style={{ position: "relative", width: "100%", height: 340 }}>
      
      {/* Заголовок оси Y */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "rotate(-90deg) translate(-50%, -50%)",
          transformOrigin: "left center",
          fontSize: 12,
          color: "#555",
        }}
      >
        Year
      </div>

      {/* Заголовок оси X */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 12,
          color: "#555",
        }}
      >
        {label} ({unit})
      </div>

      <Chart
        options={{
          data,
          primaryAxis: {
            getValue: (d: Datum) => d.year,
            scaleType: "band",
            position: "left",
          },
          secondaryAxes: [
            {
              getValue: (d: Datum) => d.power,
              scaleType: "linear",
              position: "bottom",
              elementType: "bar",
              min: 0,
            },
          ],
          getDatumStyle: (datum) => ({
            fill: (datum.originalDatum as Datum).color,
          }),
          tooltip: true,
          interactionMode: "closest",
          padding: 20,
        }}
      />
    </div>
  );
};
