import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Authentication, { AuthenticationState } from '../../stores/Authentication';
import './Header.scss';
import { Auth } from 'aws-amplify';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg';
import { ReactComponent as LoginIcon } from '../../assets/icons/login.svg';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';

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
            <Link to={'/community'} className="username">
              {user.username}
            </Link>{' '}
            |
            <button onClick={logout}>
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
    </div>
  );
});
