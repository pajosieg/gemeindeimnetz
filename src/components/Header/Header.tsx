import React from 'react';
import "./Header.scss";

export const Header = () => {
  return (
    <div className="header">
      <div className="header__slogan">
        Gemeinde im Netz
      </div>
      <div className="header__login">
        <a href="">
          Login
          <svg width="22" height="22" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g stroke="#FFF" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 3.48V.5h13v21h-13v-4M.5 10.5h17"/><path d="M12.5 15.508l5-5-5-5"/></g></g></svg>
        </a>
      </div>
    </div>
  );
};
