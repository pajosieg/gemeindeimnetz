import React from "react";
import "./Card.scss";
import {Button} from "../Button/Button";

export const Card = () => {
  return (
    <div className="card">
      <div className="card__category">
        Gottesdienst
      </div>
      <div className="card__community">
        Gemeinde XY
      </div>
      <div className="card__title">
        Title
      </div>
      <div className="card__description">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor…
      </div>
      <div className="card__action">
        <Button text="Ansehen" icon="arrow-left"/>
      </div>
    </div>
  );
};
