import React from "react";
import "./Card.scss";
import { Button } from "../Button/Button";

interface ICardProps {
  category: string;
  association: string;
  community: string;
  title: string;
  description: string;
  link: string;
}
export const Card = ({
  category,
  association,
  community,
  title,
  description,
  link
}: ICardProps) => (
  <div className="card">
    <div className="card__category">{category}</div>
    <div className="card__community">{community}</div>
    <div className="card__title">{title}</div>
    <div className="card__description">{description}</div>
    <div className="card__action">
      <Button text="Ansehen" icon="arrow-left" link={link} />
    </div>
  </div>
);
