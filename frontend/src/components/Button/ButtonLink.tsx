import React from 'react';
import './Button.scss';

export interface IButtonLinkProps {
  icon?: string;
  link?: string;
  [key: string]: any;
}

export const ButtonLink: React.FC<IButtonLinkProps> = ({
  children: text,
  icon,
  link,
  ...restProps
}) => {
  return (
    <a
      href={link}
      className="btn"
      target="_blank"
      rel="noopener noreferrer"
      {...restProps}
    >
      {/*iconsvg rein*/}
      {text}
      {/*link rein*/}
    </a>
  );
};
