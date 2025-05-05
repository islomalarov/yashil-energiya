"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { uzbekistanBorder } from "@/data/uzbekistanBorder";

// Настройка стандартных иконок Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Координаты ключевых городов Узбекистана
const cities = [
  {
    name: "Ташкент",
    coords: [45.00115399573376, 55.98655762250861],
    population: 1,
    description:
      "Столица Узбекистана, важный культурный и экономический центр.",
  },
  {
    name: "Самарканд",
    coords: [43.89478129284644, 59.129944929728744],
    population: 2,
    description:
      "Один из древнейших городов мира, центр Великого шелкового пути.",
  },
  {
    name: "Бухара",
    coords: [42.351676832416004, 59.64954401575834],
    population: 54,
    description: "Исторический город с множеством архитектурных памятников.",
  },
  {
    name: "",
    coords: [41.47142245031938, 60.68158140201039],
    population: 51,
    description: "",
  },
  {
    name: "",
    coords: [41.05859021824561, 62.01534729567982],
    population: 2,
    description: "",
  },
  {
    name: "",
    coords: [40.17293055355895, 62.991812296324],
    population: 1,
    description: "",
  },
  {
    name: "",
    coords: [42.12475666496405, 63.52341600667221],
    population: 7,
    description: "",
  },
  {
    name: "",
    coords: [41.40787558744426, 64.23792992561381],
    population: 73,
    description: "",
  },
  {
    name: "",
    coords: [39.73005110749985, 64.47448753751516],
    population: 52,
    description: "",
  },
  {
    name: "",
    coords: [40.159301071640236, 65.30992162627585],
    population: 26,
    description: "",
  },
  {
    name: "",
    coords: [38.84175504733189, 65.8847764307385],
    population: 20,
    description: "",
  },
  {
    name: "",
    coords: [39.62750669662738, 67.01078283662312],
    population: 45,
    description: "",
  },
  {
    name: "",
    coords: [38.04328324655596, 67.7290661039131],
    population: 17,
    description: "",
  },
  {
    name: "",
    coords: [37.356690904263054, 67.17833801851177],
    population: 22,
    description: "",
  },
  {
    name: "",
    coords: [40.24540658082275, 69.01469685818536],
    population: 55,
    description: "",
  },
  {
    name: "",
    coords: [41.28172106677049, 69.79957256055532],
    population: 442,
    description: "",
  },
  {
    name: "",
    coords: [40.334085802735416, 70.57948104902037],
    population: 16,
    description: "",
  },
  {
    name: "",
    coords: [40.580138997613226, 71.74190817513636],
    population: 166,
    description: "",
  },
  {
    name: "",
    coords: [40.799732332903766, 72.29781336780897],
    population: 88,
    description: "",
  },
];

export const TheMap = () => {
  return (
    <MapContainer
      center={[41.2, 64.0]}
      zoom={5.5}
      style={{ height: "500px", width: "80%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Кластеризация */}
      {cities.map((city, idx) => (
        <Marker key={idx} position={city.coords}>
          <Popup>
            {" "}
            <strong>{city.name}</strong>
            <br />
            👥 Население: {city.population.toLocaleString()} чел.
            <br />
            📝 {city.description}
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
