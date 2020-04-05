import * as React from 'react';

import { ReactComponent as Jugend } from '../../assets/icons/jugend.svg';
import { ReactComponent as Gottesdienst } from '../../assets/icons/gottesdienst.svg';
import { ReactComponent as Musik } from '../../assets/icons/musik.svg';
import { ReactComponent as Gebet } from '../../assets/icons/gebet.svg';
import { ReactComponent as Senioren } from '../../assets/icons/senioren.svg';
import { ReactComponent as Kurse } from '../../assets/icons/kurse.svg';
import { ReactComponent as Konzert } from '../../assets/icons/konzert.svg';
import { ReactComponent as Sonstiges } from '../../assets/icons/sonstiges.svg';

export interface IconProps {
  name: string;
}

export const Icon = ({ name }: IconProps) => {
  const iconSelect = (name: string = 'sonstiges') => {
    switch (name.toLowerCase()) {
      case 'jugend':
        return <Jugend />;
      case 'gottesdienst':
        return <Gottesdienst />;
      case 'musik':
        return <Musik />;
      case 'gebet':
        return <Gebet />;
      case 'senioren':
        return <Senioren />;
      case 'kurse':
      case 'kurs':
        return <Kurse />;
      case 'konzert':
        return <Konzert />;
      case 'sonstiges':
      default:
        return <Sonstiges />;
    }
  };

  return <>{iconSelect(name)}</>;
};
