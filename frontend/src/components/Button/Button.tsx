import React from "react";
import "./Button.scss";

export interface ButtonInterface {
  icon?: string;
  link?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: any;
}

export const Button: React.FC<ButtonInterface> = ({
  children: text,
  icon,
  link,
  onClick,
  ...restProps
}) => {
  return (
    <button className="btn" onClick={onClick} {...restProps}>
      {/*iconsvg rein*/}
      {text}
      {/*link rein*/}
    </button>
  );
};
