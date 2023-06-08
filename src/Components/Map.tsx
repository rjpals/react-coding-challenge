import { FeatureCollection, GeoJSON } from "geojson";
import React, { FC, useState, useEffect, useRef } from "react";
import { Map as MapBoxMap, Source, Layer } from "react-map-gl";

import countries from "../countries.json";
import earthquakes from "../earthquakes.json";

export const Map: FC = () => {
  const fillStyle = {
    type: "fill",
    layout: {},
    paint: {
      "fill-color": "#777", // lucky grey
      "fill-opacity": 0.2,
    },
  } as const;

  const outlineStyle = {
    type: "line",
    layout: {},
    paint: {
      "line-color": "#212f4f", // pattern ag blue
      "line-width": 3,
    },
  } as const;

  const earthquakeLayerStyle = {
    id: "earthquakes-layer",
    type: "circle",
    source: "earthquakes",
    paint: {
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-color": "#62a845", // pattern ag green
      "circle-stroke-color": "white",
    },
  } as const;

  return (
    <MapBoxMap
      mapLib={import("mapbox-gl")}
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      style={{ width: 900, height: 600 }}
      //mapStyle="mapbox://styles/mapbox/streets-v9" // looks better without the base layer IMO
    >
      <Source id="countries-source" type="geojson" data={countries as GeoJSON}>
        <Layer {...fillStyle} />
        <Layer {...outlineStyle} />
      </Source>
      <Source id="earthquake-source" type="geojson" data={earthquakes as any}>
        <Layer {...earthquakeLayerStyle} />
      </Source>
    </MapBoxMap>
  );
};
