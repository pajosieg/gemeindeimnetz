import * as React from "react";
import { Card } from "../Card/Card";
import { CategoryFilter } from "../CategoryFilter/CategoryFilter";
import Authentication from "../../Stores/Authentication";

export const Home = () => {
  return (
    <div className="App">
      <CategoryFilter />
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
          onClick={() => {
            const accessToken = (Authentication.getUser()?.user as any)
              ?.signInUserSession.accessToken.jwtToken;
            console.log(accessToken);
            fetch((window as any).env.apiUrl + "/time", {
              method: "GET",
              headers: {
                ...new Headers(),
                Authorization: "Bearer 123"
              }
            })
              .then(res => res.json())
              .then(res => console.log(res));
          }}
        >
          test time (authorized only)
        </button>
      </div>
    </div>
  );
};
