"use client";

import "@/lib/leaflet-icons";
import L from "leaflet";
import "leaflet.markercluster";
import LeafletMap from "@/components/MapComponent/LeafletMap";
import styles from "@/components/MapComponent/Map.module.scss";
import { plants } from "data/EV_Charge";
import { useTranslations } from "next-intl";

const isLatLng = (c: unknown): c is [number, number] =>
  Array.isArray(c) &&
  c.length === 2 &&
  typeof c[0] === "number" &&
  typeof c[1] === "number" &&
  Number.isFinite(c[0]) &&
  Number.isFinite(c[1]);

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

const yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const TheChSMap = () => {
  const t = useTranslations("ChargingStationPage");

  return (
    <LeafletMap
      center={[41.2, 64.0]}
      zoom={5}
      className={styles.map}
      onMap={(map) => {
        const cluster = L.markerClusterGroup();
        const bounds = L.latLngBounds([]);

        plants.forEach((plant) => {
          if (!isLatLng(plant.coords)) return;

          bounds.extend(plant.coords);

          const icon = plant.status === "running" ? greenIcon : yellowIcon;
          const marker = L.marker(plant.coords, { icon });

          marker.bindPopup(
            `<strong>${plant.name}</strong><br/>
             🏭 ${t("mapLabel1")}: ${t(plant.status)}<br/>
             ⚡ ${t("mapLabel")} (${t("mapLabelUnit")}): ${plant.capacity}`
          );

          cluster.addLayer(marker);
        });

        cluster.addTo(map);

        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [20, 20], maxZoom: 10 });
        }

        return () => {
          cluster.clearLayers();
          map.removeLayer(cluster);
        };
      }}
    />
  );
};
