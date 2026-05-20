"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

type Props = {
  center: [number, number];
  zoom: number;
  className?: string;
  storageKey?: string;
  onMap: (
    map: L.Map,
    options: { restoredView: boolean },
  ) => void | (() => void);
};

export default function LeafletMap({
  center,
  zoom,
  className,
  storageKey,
  onMap,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const savedView =
      typeof window !== "undefined" && storageKey
        ? window.sessionStorage.getItem(storageKey)
        : null;
    let parsedView = null;
    try {
      parsedView = savedView ? JSON.parse(savedView) : null;
    } catch {
      parsedView = null;
    }
    const restoredView =
      Array.isArray(parsedView?.center) &&
      parsedView.center.length === 2 &&
      typeof parsedView.zoom === "number";

    const map = L.map(containerRef.current, {
      fadeAnimation: !restoredView,
      markerZoomAnimation: !restoredView,
      zoomAnimation: !restoredView,
    }).setView(
      restoredView ? parsedView.center : center,
      restoredView ? parsedView.zoom : zoom,
    );
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      updateWhenIdle: true,
    }).addTo(map);

    const saveView = () => {
      if (!storageKey) return;

      const currentCenter = map.getCenter();
      window.sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          center: [currentCenter.lat, currentCenter.lng],
          zoom: map.getZoom(),
        }),
      );
    };

    map.on("moveend zoomend", saveView);

    const cleanup = onMap(map, { restoredView });

    return () => {
      saveView();
      map.off("moveend zoomend", saveView);
      cleanup?.();
      map.remove();
      mapRef.current = null;
    };
  }, [center[0], center[1], zoom, storageKey, onMap]);

  return <div ref={containerRef} className={className} />;
}
