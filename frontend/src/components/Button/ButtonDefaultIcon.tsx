import React from 'react';
import { Button, ButtonInterface } from './Button';
import colors from '../../scss/_colors.scss';

export const ButtonDefaultIcon: React.FC<ButtonInterface> = ({
  children,
  ...restProps
}) => {
  return (
    <Button
      {...restProps}
      style={{
        backgroundColor: 'transparent',
        border: '1px solid ' + colors.gray_light,
        paddingTop: '5px',
        paddingBottom: '5px',
        ...restProps.style,
      }}
    >
      {children}
    </Button>
  );
};
