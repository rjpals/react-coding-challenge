import { FC } from "react";

type Filters = {
  activeCountry: string | null;
};

export const Filters: FC<Filters> = ({ activeCountry }) => {
  return (
    <div className="Filters">
      <h2>Filters</h2>
    </div>
  );
};
