import React from "react";
import "./Card.scss";
import { Button } from "../Button/Button";
import { Entry } from "../../models/Entry";

export const Card = ({
  category,
  association,
  Community,
  date,
  Title,
  Description,
  Link
}: Entry) => (
  <div className="card">
    <div className="card__category">{category.name}</div>
    <div className="card__community">{Community.Name}</div>
    <div className="card__title">{Title}</div>
    <div className="card__description">{new Date(date).toDateString()}</div>
    <div className="card__description">{Description}</div>
    <div className="card__action">
      <Button icon="arrow-left" link={Link}>
        Ansehen
      </Button>
    </div>
  </div>
);
