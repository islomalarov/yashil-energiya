"use client";
import "@/lib/leaflet-icons";
import L from "leaflet";
import "leaflet.markercluster";
import LeafletMap from "@/components/MapComponent/LeafletMap";
import styles from "./Map.module.scss";
import { plants } from "data/plants";
import { useTranslations } from "next-intl";

const isLatLng = (c: unknown): c is [number, number] =>
  Array.isArray(c) &&
  c.length === 2 &&
  typeof c[0] === "number" &&
  typeof c[1] === "number" &&
  Number.isFinite(c[0]) &&
  Number.isFinite(c[1]);

export const ThePlantsMap = () => {
  const t = useTranslations("SolarPanelsPage");

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

          const marker = L.marker(plant.coords);
          marker.bindPopup(
            `<strong>${t(plant.name)}</strong><br/>
             🏭 ${t("chartLabel1")}: ${plant.plants}<br/>
             ⚡ ${t("chartLabel")} (${t("chartLabelUnit")}): ${plant.power}`
          );

          cluster.addLayer(marker);
        });

        cluster.addTo(map);

        if (bounds.isValid()) {
          map.fitBounds(bounds, {
            padding: [20, 20],
            maxZoom: 10,
          });
        }

        return () => {
          cluster.clearLayers();
          map.removeLayer(cluster);
        };
      }}
    />
  );
};
