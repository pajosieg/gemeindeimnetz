import * as React from 'react';
import { ReactComponent as IconCross } from '../../assets/icons/cross.svg';
import './modal.scss';

interface ModalProps {
  onClose?: (close: boolean) => void;
  transparent?: boolean;
  size?: MODAL_SIZE;
}

export enum MODAL_SIZE {
  SMALL,
  LARGE,
}

export const Modal: React.FC<ModalProps> = ({
  onClose,
  transparent = false,
  children,
  size = MODAL_SIZE.LARGE,
}) => {
  const handleClose = () => {
    onClose && onClose(true);
  };

  const classList = ['modal', size === MODAL_SIZE.SMALL && 'modal--small'].join(' ');

  return (
    <div className={classList}>
      {transparent ? (
        children
      ) : (
        <div className="modal__content">
          {onClose && (
            <button className="modal__close" onClick={handleClose}>
              <IconCross />
            </button>
          )}
          <div className="body">{children}</div>
        </div>
      )}
    </div>
  );
};
