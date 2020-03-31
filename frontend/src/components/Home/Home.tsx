import { API, Auth } from "aws-amplify";
import * as React from "react";
import { Entry } from "../../models/Entry";
import { Card } from "../Card/Card";
import {
  CategoryFilter,
  CategoryFilterType
} from "../CategoryFilter/CategoryFilter";
import { getFilteredEntries } from "../../api/Entry";

export const Home = () => {
  const [filteredEntries, setFilteredEntries] = React.useState<Entry[]>([]);
  const handleFilterChange = (filter: CategoryFilterType) => {
    console.log("load filtered entries");
    setFilteredEntries(getFilteredEntries(filter));
  };

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
      <button
        onClick={() => {
          fetch((window as any).env.apiUrl + "/votes")
            .then(res => res.json())
            .then(res => console.log(res));
        }}
      >
        test votes
      </button>
      <br />
      <button
        onClick={async () => {
          let token = "";
          try {
            token = `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`;
          } catch (e) {
            console.error(e);
          }
          API.get("k7gezen-wnyytoj", "/time", {
            headers: {
              Authorization: token
            }
          })
            .then(res => console.log(res))
            .catch(e => console.error(e.message));
        }}
      >
        test time (authorized only)
      </button>
    </div>
  );
};
