"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
// import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { uzbekistanBorder } from "data/uzbekistanBorder";
import { plants } from "data/MHP";
import { useTranslations } from "next-intl";

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

const greyIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Настройка стандартных иконок Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export const TheMicroMap = () => {
  const t = useTranslations("MicroGesPage");
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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Кластеризация */}
      {plants.map((plant, idx) => (
        <Marker
          key={idx}
          position={plant.coords}
          icon={plant.status === "planning" ? greyIcon : greenIcon}
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
            <strong>{plant.name}</strong>
            <br />
            <span>
              🏭 {t("mapLabel1")}: {t(plant.status)}
            </span>
            <br />
            <span>
              ⚡ {t("mapLabel")} ({t("mapLabelUnit")}): {plant.capacity}
            </span>
          </Popup>
        </Marker>
      ))}
      <MarkerClusterGroup></MarkerClusterGroup>

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
