import * as React from 'react';
import { ReactComponent as ResetIcon } from '../../assets/icons/reset.svg';
import './notification.scss';

export const Notification: React.FC = ({ children }) => {
  const [isClosed, setIsClosed] = React.useState(
    localStorage.getItem('notificationWasShown') === 'true' || false
  );

  const handleClose = () => {
    setIsClosed(true);
    localStorage.setItem('notificationWasShown', 'true');
  };

  return (
    <>
      {!isClosed ? (
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
