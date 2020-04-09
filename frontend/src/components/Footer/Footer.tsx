import * as React from 'react';
import { Modal } from '../Modal/Modal';
import './Footer.scss';
import { LegalNotice } from './LegalNotice';
import { PrivacyPolicy } from './PrivacyPolicy';
import { NavLink } from 'react-router-dom';

interface IFooterProps {}

export const Footer: React.FunctionComponent<IFooterProps> = props => {
  const [legalNotice, setLegalNotice] = React.useState(false);
  const [privacyPolicy, setPrivacyPolicy] = React.useState(false);

  return (
    <>
      <footer className="footer">
        <div>
          <NavLink
            onClick={() => setLegalNotice(true)}
            to={'#'}
            className="nav__link"
          >
            Impressum
          </NavLink>{' '}
          |{' '}
          <NavLink
            to={'#'}
            onClick={() => setPrivacyPolicy(true)}
            className="nav__link"
          >
            Datenschutzbestimmungen
          </NavLink>
        </div>
      </footer>
      {legalNotice && (
        <Modal onClose={() => setLegalNotice(false)}>
          <LegalNotice />
        </Modal>
      )}
      {privacyPolicy && (
        <Modal onClose={() => setPrivacyPolicy(false)}>
          <PrivacyPolicy />
        </Modal>
      )}
    </>
  );
};
