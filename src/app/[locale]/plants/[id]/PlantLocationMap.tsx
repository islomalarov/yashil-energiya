"use client";

import dynamic from "next/dynamic";

export const PlantLocationMap = dynamic(
  () =>
    import("@/components/MapComponent/ThePlantLocationMap").then(
      (m) => m.ThePlantLocationMap,
    ),
  { ssr: false },
);
