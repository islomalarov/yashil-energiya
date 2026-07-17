"use client";

import "@/lib/leaflet-icons";
import { memo } from "react";
import L from "leaflet";
import LeafletMap from "@/components/MapComponent/LeafletMap";
import styles from "@/components/MapComponent/Map.module.scss";
import { escapeHtml } from "@/lib/html";

type ThePlantLocationMapProps = {
  coords: [number, number];
  title: string;
  address: string;
};

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const ThePlantLocationMap = memo(function ThePlantLocationMap({
  coords,
  title,
  address,
}: ThePlantLocationMapProps) {
  return (
    <LeafletMap
      center={coords}
      zoom={14}
      className={styles.locationMap}
      onMap={(map) => {
        const marker = L.marker(coords, { icon: greenIcon }).addTo(map);
        marker.bindPopup(
          `<strong>${escapeHtml(title)}</strong><br/>${escapeHtml(address)}`,
          {
            maxWidth: 190,
            keepInView: true,
            autoPanPadding: L.point(16, 16),
            className: styles.plantPopup,
          },
        );

        return () => {
          map.removeLayer(marker);
        };
      }}
    />
  );
});
