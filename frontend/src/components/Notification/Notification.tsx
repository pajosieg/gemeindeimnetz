import * as React from 'react';
import { ReactComponent as ResetIcon } from '../../assets/icons/reset.svg';
import './notification.scss';
import { useState } from 'react';

export const Notification: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <div className="notification">
          <button className="notification__close" onClick={handleClose}>
            <ResetIcon />
          </button>
          {children}
        </div>
      ) : null}
    </>
  );
};
