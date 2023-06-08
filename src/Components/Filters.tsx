import { FC } from "react";

import countries from "../countries.json";

type Filters = {
  activeCountry: string;
  onChange: (country: string) => void;
};

// Filter out anything without a valid ISO_A3 code, e.g. glaciers
// @ts-ignore
const filteredFeatures = countries.features.filter(
  // @ts-ignore
  (f) => f.properties.ISO_A3 !== "-99"
);

export const Filters: FC<Filters> = ({ activeCountry, onChange }) => {
  return (
    <div className="Filters">
      <h2>Filters</h2>
      <select value={activeCountry} onChange={(e) => onChange(e.target.value)}>
        <option key={"ANY"} value={"ANY"}>
          Show all earthquakes
        </option>
        {/*@ts-ignore*/}
        {filteredFeatures.map((country) => (
          <option
            key={country.properties.ISO_A3}
            value={country.properties.ISO_A3}
          >
            {country.properties.ADMIN}
          </option>
        ))}
      </select>
    </div>
  );
};
