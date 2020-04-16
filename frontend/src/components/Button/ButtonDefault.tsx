import React from 'react';
import { Button, ButtonInterface } from './Button';
import colors from '../../scss/_colors.scss';

export const ButtonDefault: React.FC<ButtonInterface> = ({
  children,
  ...restProps
}) => {
  return (
    <Button {...restProps} style={{ backgroundColor: colors.gray_light }}>
      {children}
    </Button>
  );
};
