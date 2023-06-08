import React, { FC, useState, useEffect, useRef } from "react";
import { Map as MapBoxMap } from "react-map-gl";

export const Map: FC = () => {
  return (
    <MapBoxMap
      mapLib={import("mapbox-gl")}
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      style={{ width: 900, height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
};
