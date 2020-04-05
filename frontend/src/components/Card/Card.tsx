import * as React from 'react';
import './Card.scss';
import { Button } from '../Button/Button';
import { Entry } from '../../models/Entry';
import { ButtonDefault } from '../Button/ButtonDefault';
import { ButtonDanger } from '../Button/ButtonDanger';
import { Icon } from '../Icon/Icon';
import { Modal } from '../Modal/Modal';

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
  onDelete,
}: Entry & EditableCardProps) => {
  const [deleteModal, setDeleteModal] = React.useState(false);

  const handleDeleteIntention = () => {
    setDeleteModal(true);
  };
  const handleDeleteCancel = () => {
    setDeleteModal(false);
  };
  const handleDeleteConfirmation = () => {
    setDeleteModal(false);
    onDelete && onDelete();
  };
  return (
    <>
      <div className="card">
        <div className="card__category" title={category.name}>
          <Icon name={category.name} />
        </div>
        <div className="card__community">{Community.Name}</div>
        <div className="card__title">{Title}</div>
        <div className="card__description">
          {`${new Date(date).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
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
              <ButtonDanger onClick={handleDeleteIntention}>Löschen</ButtonDanger>
            </div>
          )}
        </div>
      </div>
      {deleteModal && (
        <Modal onClose={handleDeleteCancel}>
          <p>Diese Aktivität wirklich löschen?</p>
          <div>
            <ButtonDefault onClick={handleDeleteCancel}>Abbrechen</ButtonDefault>
            <ButtonDanger onClick={handleDeleteConfirmation}>Löschen</ButtonDanger>
          </div>
        </Modal>
      )}
    </>
  );
};
