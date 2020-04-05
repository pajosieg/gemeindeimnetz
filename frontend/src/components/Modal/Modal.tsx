import * as React from 'react';
import './modal.scss';

interface ModalProps {
  children: any;
  onClose: (close: boolean) => void;
}

export const Modal = (props: ModalProps) => {

  const handleClose = () => {
    props.onClose(true);
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={handleClose}>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"/><path d="M7.5 12l-7 7L5 23.5l7-7 7 7 4.5-4.5-7-7 7-7L19 .5l-7 7-7-7L.5 5z" stroke="#52b25e" fill="#52b25e" strokeLinecap="round" strokeLinejoin="round"/></g></svg>
        </button>
        {props.children}
      </div>
    </div>
  );
};
