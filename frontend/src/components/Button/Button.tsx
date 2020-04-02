import React from "react";
import "./Button.scss";

export interface ButtonInterface {
  icon?: string;
  link?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonInterface> = ({
  children: text,
  icon,
  link,
  onClick
}) => {
  return (
    <button className="btn" onClick={onClick}>
      {/*iconsvg rein*/}
      {text}
      {/*link rein*/}
    </button>
  );
};
