import { FeatureCollection, GeoJSON } from "geojson";
import React, { FC, useState, useEffect, useRef } from "react";
import { Map as MapBoxMap, Source, Layer, useMap, Popup } from "react-map-gl";
import mapboxgl from "mapbox-gl";

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

  const [description, setDescription] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<number[] | null>(null);
  const [popup, setPopup] = useState<boolean>(false);

  const { map } = useMap();
  useEffect(() => {
    if (map) {
      map.on("mouseenter", "earthquakes-layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "earthquakes-layer", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("click", "earthquakes-layer", (e) => {
        console.log(e);
        // Copy coordinates array.
        //@ts-ignore
        const coordinates = e.features[0].geometry.coordinates.slice();
        //@ts-ignore
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        setCoordinates(coordinates);
        setDescription(description);
        setPopup(true);
      });
    }
  }, [map]);

  console.log(coordinates, description, popup);
  return (
    <MapBoxMap
      mapLib={import("mapbox-gl")}
      id="map"
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      style={{ width: "100vw", height: "100vh" }}
      onRender={(event) => event.target.resize()}
      //mapStyle="mapbox://styles/mapbox/streets-v9" // looks better without the base layer IMO
    >
      {popup && coordinates && (
        <Popup
          longitude={coordinates[0]}
          latitude={coordinates[1]}
          closeButton={true}
          closeOnClick={false}
          onClose={() => {
            setPopup(false);
            setCoordinates(null);
            setDescription(null);
          }}
          anchor="top"
        >
          Testing
        </Popup>
      )}
      <Source id="countries-source" type="geojson" data={countries as GeoJSON}>
        <Layer {...fillStyle} />
        <Layer {...outlineStyle} />
      </Source>
      <Source id="earthquake-source" type="geojson" data={earthquakes as any}>
        <Layer {...earthquakeLayerStyle} />
      </Source>
      <div className="Legend">hello world</div>
    </MapBoxMap>
  );
};
