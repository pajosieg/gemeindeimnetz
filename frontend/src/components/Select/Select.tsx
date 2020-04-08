import * as React from 'react';
import './Select.scss';

export type SelectOptionType = {
  label: string;
  value: string;
};

interface CbProps {
  name: string;
  headline: string;
  options: SelectOptionType[];
  value: string;
  onChangeSelect: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const Select = (props: CbProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChangeSelect(event.target.value);
  };

  const items =
    props.value === ''
      ? [
          <option key={-1} value="" hidden>
            Bitte wählen
          </option>,
        ]
      : [];

  props.options.forEach(({ label, value }, index) => {
    items.push(
      <option key={index} value={value}>
        {label}
      </option>
    );
  });

  const classList = ['select-wrapper', props.className ? props.className : '']
    .join(' ')
    .trim();

  return (
    <div className={classList}>
      <label htmlFor={props.name}>{props.headline}</label>
      <select
        id={props.name}
        value={!props.value ? '-1' : props.value}
        onChange={handleChange}
        disabled={!props.options.length || props.disabled}
      >
        {items}
      </select>
    </div>
  );
};
