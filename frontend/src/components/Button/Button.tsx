import React from "react";
import "./Button.scss";

export interface ButtonInterface {
  text: string;
  icon: string;
  link?: string;
}

export const Button = ({ text, icon, link }: ButtonInterface) => {
  return (
    <button className="btn">
      {/*iconsvg rein*/}
      {text}
      {/*link rein*/}
    </button>
  );
};
