import * as React from 'react';
import { Modal, MODAL_SIZE } from './Modal';
import { ButtonDefault } from '../Button/ButtonDefault';
import { ButtonDanger } from '../Button/ButtonDanger';
import './ConfirmModal.scss';

interface IConfirmModalProps {
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<IConfirmModalProps> = ({
  onCancel,
  onConfirm,
  text,
}) => {
  return (
    <Modal onClose={onCancel} size={MODAL_SIZE.SMALL}>
      <p>{text}</p>
      <div className="confirm-footer">
        <ButtonDefault onClick={onCancel}>Abbrechen</ButtonDefault>
        <ButtonDanger onClick={onConfirm}>Löschen</ButtonDanger>
      </div>
    </Modal>
  );
};
