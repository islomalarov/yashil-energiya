"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";


type Datum = {
  year: string;
  power: number;
  color: string;
};
type TooltipPayloadItem = {
  value?: number | string;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: readonly TooltipPayloadItem[];
  label?: string | number;
};

const data: Datum[] = [
  { year: "2023", power: 25418, color: "#5cb63f" },
  { year: "2024", power: 48066, color: "#5cb63f" },
  { year: "2025", power: 131051, color: "#5cb63f" },
];
const makeCustomTooltip = (unit: string) => {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: CustomTooltipProps) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
      <div
        style={{
          background: "#ffffff",
          padding: "10px 14px",
          borderRadius: 8,
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
          fontSize: 14,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
        <div style={{ color: "#5cb63f" }}>
          Total capacity:{" "}
          {Number(payload[0].value).toLocaleString()} {unit}
        </div>
      </div>
    );
  };
  CustomTooltip.displayName = "CustomTooltip";
  return CustomTooltip;
};



export const TheChart = ({ unit }: { unit: string }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          minWidth: 0,   // <-- ширина графика на больших экранах
          height: 340,     // <-- важно для flex/grid родителей (fix for -1)
          minHeight: 340,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 30, right: 40, left: 60, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 6" stroke="#e0e0e0" />
            <XAxis 
              dataKey="year"
              tickMargin={6}
              label={{value: "Years", position: "insideBottom", offset: -20}} 
            />
            <YAxis />
            <YAxis
              label={{
                value: `Total capacity (${unit})`,
                angle: -90,
                position: "insideLeft",
                offset: -20,
              }}
            />
            <Tooltip content={makeCustomTooltip(unit)} />
            <Bar dataKey="power" radius={[6, 6, 0, 0]} isAnimationActive>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
