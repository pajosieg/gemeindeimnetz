import * as React from 'react';
import './TextInput.scss';

interface IDateOrTimeInputProps {
  type: 'date' | 'time';
  onChange: (d: string) => void;
  label: string;
  defaultValue: string;
  className?: string;
  [key: string]: any;
}

export const DateOrTimeInput: React.FC<IDateOrTimeInputProps> = ({
  onChange,
  label,
  type,
  defaultValue,
  className = '',
  ...restProps
}) => {
  const classList = ['date-time-input', className].join(' ').trim();
  return (
    <div className={classList}>
      <label htmlFor={restProps.id ?? ''}>{label}</label>
      <input
        type={type}
        onChange={e => {
          onChange(e.target.value);
        }}
        defaultValue={defaultValue}
        {...restProps}
      />
    </div>
  );
};
