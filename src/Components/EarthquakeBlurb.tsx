import { FC } from "react";

type EarthquakeBlurb = {
  title?: string | null;
  magnitude?: number | null;
  timeStamp?: number | null;
};
export const EarthquakeBlurb: FC<EarthquakeBlurb> = ({
  title,
  magnitude,
  timeStamp,
}) => {
  return (
    <>
      {title && <h4>{title}</h4>}
      {magnitude && <div>Magnitude: {magnitude}</div>}
      {timeStamp && <div>UNIX timestamp: {timeStamp}</div>}
    </>
  );
};
