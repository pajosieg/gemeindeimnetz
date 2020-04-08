import React from 'react';
import './Button.scss';

export interface ButtonInterface {
  icon?: string;
  link?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  [key: string]: any;
}

export const Button: React.FC<ButtonInterface> = ({
  children: text,
  icon,
  link,
  onClick,
  className,
  ...restProps
}) => {
  const classList = ['btn', className ? className : ''].join(' ').trim();
  return (
    <button className={classList} onClick={onClick} {...restProps}>
      {/*iconsvg rein*/}
      {text}
      {/*link rein*/}
    </button>
  );
};
