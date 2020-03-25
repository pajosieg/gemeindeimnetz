import * as React from "react";
import {Card} from "../Card/Card";
import {CategoryFilter} from "../CategoryFilter/CategoryFilter";

export const Home = () => {
  return (
    <div className="App">
      <CategoryFilter/>
      <div className="grid">
        <div className="col col-lg-6">
          <Card/>
        </div>
        <div className="col col-lg-6">
          <Card/>
        </div>
      </div>
    </div>
  );
};
