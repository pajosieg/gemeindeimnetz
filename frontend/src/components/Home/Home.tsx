import * as React from "react";
import { getFilteredEntries } from "../../api/Entry";
import { Entry } from "../../models/Entry";
import { Card } from "../Card/Card";
import {
  CategoryFilter,
  CategoryFilterType
} from "../CategoryFilter/CategoryFilter";

export const Home = () => {
  const [filteredEntries, setFilteredEntries] = React.useState<Entry[]>([]);

  const handleFilterChange = React.useCallback(
    async (filter: CategoryFilterType) => {
      console.log("load filtered entries");
      setFilteredEntries(await getFilteredEntries(filter));
    },
    []
  );

  return (
    <div className="App">
      <CategoryFilter onFilterChange={handleFilterChange} />
      <div className="grid">
        {filteredEntries.map((entry, index) => (
          <div className="col col-lg-6" key={index}>
            <Card {...entry} />
          </div>
        ))}
      </div>
    </div>
  );
};
