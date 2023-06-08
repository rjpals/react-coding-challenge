import { FC } from "react";

import { EarthquakeBlurb } from "./EarthquakeBlurb";

type Legend = {
  title?: string | null;
  magnitude?: number | null;
  timeStamp?: number | null;
};

export const Legend: FC<Legend> = ({ title, magnitude, timeStamp }) => {
  if (title || magnitude || timeStamp)
    return (
      <div className="Legend">
        <h2>Legend</h2>
        <EarthquakeBlurb
          title={title}
          magnitude={magnitude}
          timeStamp={timeStamp}
        />
      </div>
    );
  else
    return (
      <div className="Legend">
        <h2>Legend</h2>

        <div>Click on an earthquake to see relevant information</div>
      </div>
    );
};
