import * as React from 'react';
import { Modal } from '../Modal/Modal';
import { ReactComponent as LoaderSVG } from '../../assets/icons/loader.svg';
import './LoadingAnimation.scss';

export const LoadingAnimation = () => (
  <Modal transparent={true}>
    <div className="loading-animation">
      <LoaderSVG />
    </div>
  </Modal>
);
