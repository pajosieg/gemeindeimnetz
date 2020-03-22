import * as React from "react";
import { GermanMap, CONFESSION } from "../map/GermanMap";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="App">
      <h1>Gemeinde im Netz</h1>
      <div className="choose-entry">
        <div className="maps">
          <GermanMap confession={CONFESSION.CATHOLIC} />
          <GermanMap confession={CONFESSION.PROTESTANT} />
        </div>
        <div className="all-bistums">
          <Link to="germany">
            <h2>Ganz Deutschland</h2>
          </Link>
        </div>
      </div>
      <Link to="/user">Login</Link>
    </div>
  );
};
