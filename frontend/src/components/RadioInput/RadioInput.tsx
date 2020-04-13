import * as React from 'react';
import './RadioInput.scss';

interface RIProps {
  name: string;
  id: string;
  label: string;
  checked: boolean;
  onChangeRadioInput: (id: string, checked: boolean) => void;
  className?: string;
}

export const RadioInput = (props: RIProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChangeRadioInput(props.id, event.target.checked);
  };

  const classList = ['input__radio', props.className || ''].join(' ').trim();

  return (
    <div className={classList}>
      <input
        type="radio"
        name={props.name}
        id={props.id}
        checked={props.checked}
        onChange={handleChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};
