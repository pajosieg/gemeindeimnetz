import React from "react";
import "./Card.scss";
import { Button } from "../Button/Button";
import { Entry } from "../../models/Entry";
import { ButtonDefault } from "../Button/ButtonDefault";
import { ButtonDanger } from "../Button/ButtonDanger";

type EditableCardProps = {
  editable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const Card = ({
  category,
  Community,
  date,
  time,
  Title,
  Description,
  Link,
  editable,
  onEdit,
  onDelete
}: Entry & EditableCardProps) => (
  <div className="card">
    <div className="card__category">{category.name}</div>
    <div className="card__community">{Community.Name}</div>
    <div className="card__title">{Title}</div>
    <div className="card__description">
      {`${new Date(date).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })} - ${time} Uhr`}
    </div>
    <div className="card__description">{Description}</div>
    <div className="card__action">
      <Button icon="arrow-left" link={Link}>
        Ansehen
      </Button>
      {editable && (
        <div>
          <ButtonDefault onClick={onEdit}>Bearbeiten</ButtonDefault>
          <ButtonDanger onClick={onDelete}>Löschen</ButtonDanger>
        </div>
      )}
    </div>
  </div>
);
