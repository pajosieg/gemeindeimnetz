import * as React from 'react';
import { ReactComponent as IconCross } from '../../assets/icons/cross.svg';
import './Modal.scss';

interface ModalProps {
  onClose?: (close: boolean) => void;
  transparent?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  onClose,
  transparent = false,
  children,
}) => {
  const handleClose = () => {
    onClose && onClose(true);
  };

  return (
    <div className="modal">
      {transparent ? (
        children
      ) : (
        <div className="modal__content">
          {onClose && (
            <button className="modal__close" onClick={handleClose}>
              <IconCross />
            </button>
          )}
          {children}
        </div>
      )}
    </div>
  );
};
