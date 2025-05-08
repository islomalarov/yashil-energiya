"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { uzbekistanBorder } from "@/data/uzbekistanBorder";
import { cities } from "@/data/citites";
import { useTranslations } from "next-intl";

// Настройка стандартных иконок Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export const TheMap = () => {
  const t = useTranslations("SolarPanelsPage");
  return (
    <MapContainer
      center={[41.2, 64.0]}
      zoom={5.5}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Кластеризация */}
      <MarkerClusterGroup>
        {cities.map((city, idx) => (
          <Marker
            key={idx}
            position={city.coords}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              },
            }}
          >
            <Popup>
              <strong>{t(city.name)}</strong>
              <br />
              <span>
                🏭 {t("chartLabel1")}: {city.plants}
              </span>
              <br />
              <span>
                ⚡ {t("chartLabel")} ({t("chartLabelUnit")}): {city.power}
              </span>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* Граница страны */}
      {/* <GeoJSON
        data={uzbekistanBorder as GeoJSON.FeatureCollection}
        style={{ color: "black", weight: 1, fillOpacity: 0.05 }}
        // onEachFeature={(feature, layer) => {
        //   layer.bindPopup(feature.properties.name);
        // }}
      /> */}
    </MapContainer>
  );
};
