import * as React from 'react';
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { Entry } from '../../models/Entry';
import colors from '../../scss/_colors.scss';
import { ButtonDangerIcon } from '../Button/ButtonDangerIcon';
import { ButtonIcon } from '../Button/ButtonIcon';
import { ButtonLink } from '../Button/ButtonLink';
import { Icon } from '../Icon/Icon';
import { ConfirmModal } from '../Modal/ConfirmModal';
import './Card.scss';

type EditableCardProps = {
  editable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onCopy?: () => void;
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
  onCopy,
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
          <div style={{ display: 'flex' }}>
            <ButtonLink
              icon="arrow-left"
              link={Link.startsWith('http') ? Link : 'http://' + Link}
            >
              Ansehen
            </ButtonLink>
            {editable && (
              <>
                <ButtonIcon onClick={onEdit} style={{ marginLeft: '1em' }}>
                  <EditIcon
                    style={{ height: '22px', width: '22px', marginRight: 0 }}
                  />
                </ButtonIcon>
                <ButtonIcon onClick={onCopy}>
                  <CopyIcon
                    style={{ height: '22px', width: '22px', marginRight: 0 }}
                  />
                </ButtonIcon>
              </>
            )}
          </div>
          {editable && (
            <ButtonDangerIcon onClick={handleDeleteIntention}>
              <DeleteIcon
                style={{
                  height: '22px',
                  width: '22px',
                  marginRight: 0,
                  stroke: colors.red,
                }}
              />
            </ButtonDangerIcon>
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
