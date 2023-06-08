import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Map } from "./Components/Map";
import { MapProvider } from "react-map-gl";

import countries from "./countries.json";
import earthquakes from "./earthquakes.json";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("access_token");

  if (token)
    return (
      <div className="App">
        <MapProvider>
          <Map />
        </MapProvider>
      </div>
    );
  else
    return (
      <div className="App">
        <p>
          Please add your MapBox token to the URL with the{" "}
          <strong>
            <code>?access_token=YOUR_TOKEN_HERE</code>
          </strong>{" "}
          url parameter
        </p>
      </div>
    );
}

export default App;
