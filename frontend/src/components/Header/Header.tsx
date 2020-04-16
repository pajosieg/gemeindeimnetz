import React, { useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import Authentication, { AuthenticationState } from '../../storesS/Authentication';
import './Header.scss';
import { Auth } from 'aws-amplify';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg';
import { ReactComponent as LoginIcon } from '../../assets/icons/login.svg';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import CookieConsent from 'react-cookie-consent';
import colors from '../../scss/_colors.scss';
import { Button } from '../Button/Button';

export const Header = withRouter(({ history }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const changeAuthentication = (authenticationState: AuthenticationState) => {
    setAuthenticated(authenticationState.authenticated);
    setUser(authenticationState.user);
  };

  Authentication.subscribe(changeAuthentication);

  const logout = () => {
    Auth.signOut().then(() => {
      Authentication.logout();
      history.push('/');
    });
  };

  return (
    <>
      <div className="header">
        <div className="header__slogan">
          <Link to={'/'}>
            <Logo />
            Gemeinde im Netz
          </Link>
        </div>
        <div className="header__login">
          {authenticated && user ? (
            <>
              <NavLink
                to={'/'}
                activeClassName={'is-active'}
                exact={true}
                title={'Startseite'}
                className="nav__link"
              >
                Startseite
              </NavLink>{' '}
              |{' '}
              <NavLink
                to={'/community'}
                activeClassName={'is-active'}
                title={'Meine Gemeinde'}
                className="nav__link"
              >
                Meine Gemeinde
              </NavLink>{' '}
              |
              <button onClick={logout} title={'Logout'}>
                Logout
                <LogoutIcon />
              </button>
            </>
          ) : (
            <span>
              <Link to="/community">
                Login
                <LoginIcon />
              </Link>
            </span>
          )}
        </div>
        <CookieConsent
          onDecline={() => null}
          location="none"
          buttonText="Accept"
          cookieName="cookieLayer"
          style={{
            position: 'absolute',
            bottom: '0',
            transform: 'translate(0, 100%)',
            backgroundColor: 'rgba(80, 80, 80, 0.9',
            color: colors.white,
          }}
          disableButtonStyles={true}
          buttonStyle={{ margin: '10px 30px 10px' }}
          ButtonComponent={Button}
          expires={150}
        >
          This website uses cookies to enhance the user experience. You have to
          accept all cookies to use this website.
        </CookieConsent>
      </div>
    </>
  );
});
