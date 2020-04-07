import * as React from 'react';
import { Entry } from '../../models/Entry';
import { ButtonDanger } from '../Button/ButtonDanger';
import { ButtonDefault } from '../Button/ButtonDefault';
import { ButtonLink } from '../Button/ButtonLink';
import { Icon } from '../Icon/Icon';
import { ConfirmModal } from '../Modal/ConfirmModal';
import './Card.scss';

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
          <ButtonLink
            icon="arrow-left"
            link={Link.startsWith('http') ? Link : 'http://' + Link}
          >
            Ansehen
          </ButtonLink>
          {editable && (
            <div>
              <ButtonDefault onClick={onEdit}>Bearbeiten</ButtonDefault>
              <ButtonDanger onClick={handleDeleteIntention}>Löschen</ButtonDanger>
            </div>
          )}
        </div>
      </div>
      {deleteModal && (
        <ConfirmModal
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirmation}
          text={'Diese Aktivität wirklich löschen?'}
        />
      )}
    </>
  );
};
