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
      <div className="header__slogan">
        <Link to={"/"}>Gemeinde im Netz</Link>
      </div>
      <div className="header__login">
        {authenticated && user ? (
          <span>
            <Link to={"/community"}>{user.username}</Link> |
            <button onClick={logout}>
              Logout
              <svg width="24" height="22" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <path d="M0-1h24v24H0z" />
                  <g stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13.5 17.5v4H.5V.5h13v4M5.5 11.5h18M18.5 6.5l5 5-5 5" />
                  </g>
                </g>
              </svg>
            </button>
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
