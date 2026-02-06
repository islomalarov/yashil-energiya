"use client";

import "leaflet.markercluster"; // важно: регистрирует плагин в L
import type { MarkerClusterGroupOptions } from "leaflet";
import L from "leaflet";
import { createLayerComponent, extendContext } from "@react-leaflet/core";

type Props = MarkerClusterGroupOptions & {
  children?: React.ReactNode;
};

const MarkerClusterGroup = createLayerComponent<L.MarkerClusterGroup, Props>(
  function createMarkerCluster(props, context) {
    const cluster = L.markerClusterGroup(props);

    return {
      instance: cluster,
      context: extendContext(context, { layerContainer: cluster }),
    };
  },
  function updateMarkerCluster(instance, props, prevProps) {
    // если нужно — можно добавить обработку изменений опций
    // сейчас оставляем минимально и стабильно
    if (props !== prevProps) {
      // no-op
    }
  }
);

export default MarkerClusterGroup;