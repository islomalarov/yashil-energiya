"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

type Props = {
  center: [number, number];
  zoom: number;
  className?: string;
  onMap: (map: L.Map) => void | (() => void);
};

export default function LeafletMap({
  center,
  zoom,
  className,
  onMap,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView(center, zoom);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const cleanup = onMap(map);

    return () => {
      cleanup?.();
      map.remove();
      mapRef.current = null;
    };
  }, [center[0], center[1], zoom, onMap]);

  return <div ref={containerRef} className={className} />;
}
