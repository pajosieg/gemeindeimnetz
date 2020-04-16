import React from 'react';
import { Button, ButtonInterface } from './Button';
import colors from '../../scss/_colors.scss';

export const ButtonDanger: React.FC<ButtonInterface> = ({
  children,
  ...restProps
}) => {
  return (
    <Button {...restProps} style={{ backgroundColor: colors.red }}>
      {children}
    </Button>
  );
};
