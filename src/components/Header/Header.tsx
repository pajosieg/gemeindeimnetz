import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Authentication from "../../Stores/Authentication";
import "./Header.scss";
import { Auth } from "aws-amplify";

export const Header = withRouter(({ history }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const changeAuthentication = (authenticationState: any) => {
    setAuthenticated(authenticationState.authenticated);
    setUser(authenticationState.user);
  };

  Authentication.subscribe(changeAuthentication);

  const logout = () => {
    Auth.signOut().then(() => {
      Authentication.logout();
      history.push("/");
    });
  };

  return (
    <div className="header">
      <div className="header__slogan">Gemeinde im Netz</div>
      <div className="header__login">
        {authenticated && user ? (
          <span>
            {user.username}
            <button onClick={logout}>Logout</button>
          </span>
        ) : (
          <Link to="/community">
            Login
            <svg width="22" height="22" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <g stroke="#FFF" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 3.48V.5h13v21h-13v-4M.5 10.5h17" />
                  <path d="M12.5 15.508l5-5-5-5" />
                </g>
              </g>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
});
