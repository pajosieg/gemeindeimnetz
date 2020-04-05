import * as React from 'react';
import './Checkbox.scss';
import { Icon } from '../Icon/Icon';

interface CbState {
  value: string;
  checked: boolean;
}

interface CbProps {
  name: React.ReactChild;
  id: string;
  checked: boolean;
  onCheckboxChange: (name: string, checked: boolean) => void;
  showIcon?: boolean;
}

export const Checkbox = (props: CbProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onCheckboxChange(props.id, event.target.checked);
  };

  return (
    <div className="input__checkbox">
      <input
        type="checkbox"
        id={props.id}
        name={props.name.toString()}
        checked={props.checked}
        onChange={handleChange}
      />
      <label htmlFor={props.id}>
        {props.showIcon ? <Icon name={props.name.toString()} /> : null}
        {props.name}
      </label>
    </div>
  );
};
