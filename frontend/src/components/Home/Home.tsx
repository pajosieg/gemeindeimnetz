import * as React from "react";
import { Card } from "../Card/Card";
import {
  CategoryFilter,
  CategoryFilterType
} from "../CategoryFilter/CategoryFilter";
import { Auth, API } from "aws-amplify";

export const Home = () => {
  const handleFilterChange = (filter: CategoryFilterType) => {
    console.log(filter);
  };

  return (
    <div className="App">
      <CategoryFilter onFilterChange={handleFilterChange} />
      <div className="grid">
        <div className="col col-lg-6">
          <Card />
        </div>
        <div className="col col-lg-6">
          <Card />
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
    </div>
  );
};
