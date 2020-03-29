import * as React from "react";
import { Card } from "../Card/Card";
import {
  CategoryFilter,
  CategoryFilterType
} from "../CategoryFilter/CategoryFilter";
import { Auth, API } from "aws-amplify";

const cardContent = {
  description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
                clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor…`,
  title: "Title of Entry",
  association: "Bistum Mainz",
  community: "Gemeinde XYZ",
  link: "link/to/resource",
  category: "Gottesdienst"
};

export const Home = () => {
  const handleFilterChange = (filter: CategoryFilterType) => {
    console.log(filter);
  };

  return (
    <div className="App">
      <CategoryFilter onFilterChange={handleFilterChange} />
      <div className="grid">
        <div className="col col-lg-6">
          <Card {...cardContent} />
        </div>
        <div className="col col-lg-6">
          <Card {...cardContent} />
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
