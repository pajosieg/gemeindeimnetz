import * as React from 'react';
import './TextInput.scss';

interface IDateInputProps {
  onDateChange: (d: string) => void;
  onTimeChange: (t: string) => void;
  labelDate: string;
  labelTime: string;
  date: string;
  time: string;
  className?: string;
  [key: string]: any;
}

export const DateInput: React.FC<IDateInputProps> = ({
  onDateChange,
  onTimeChange,
  labelDate,
  labelTime,
  date,
  time,
  className = '',
  ...restProps
}) => {
  const classList = ['date-input', className].join(' ').trim();
  return (
    <div className={classList}>
      <label htmlFor={restProps.id ?? ''}>{labelDate}</label>
      <label htmlFor={restProps.id ?? ''}>{labelTime}</label>
      <input
        type="date"
        onChange={e => {
          onDateChange(e.target.value);
        }}
        defaultValue={date}
        {...restProps}
      />
      <input
        type="time"
        onChange={e => {
          onTimeChange(e.target.value);
        }}
        defaultValue={time}
        {...restProps}
      />
    </div>
  );
};
