import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Map } from "./Components/Map";

import countries from "./countries.json";
import earthquakes from "./earthquakes.json";

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("access_token");

  console.log({ earthquakes, countries });
  if (token) return <Map />;
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
