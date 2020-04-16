import React from 'react';
import './Button.scss';

export interface ButtonInterface {
  icon?: string;
  link?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  [key: string]: any;
  bordered?: boolean;
}

export const Button: React.FC<ButtonInterface> = ({
  children: text,
  icon,
  link,
  onClick,
  className,
  bordered = false,
  ...restProps
}) => {
  const classList = [
    'btn',
    className ? className : '',
    bordered ? 'btn--bordered' : '',
  ]
    .join(' ')
    .trim();
  return (
    <button className={classList} onClick={onClick} {...restProps}>
      {/*iconsvg rein*/}
      {text}
      {/*link rein*/}
    </button>
  );
};
