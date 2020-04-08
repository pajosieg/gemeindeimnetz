import * as React from 'react';
import './TextInput.scss';

interface ITextInputProps {
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
  [key: string]: any;
}

export const TextInput: React.FunctionComponent<ITextInputProps> = ({
  onTextChange,
  label,
  className = '',
  ...restProps
}) => {
  const classList = ['text-input', className].join(' ').trim();

  return (
    <div className={classList}>
      <label htmlFor={restProps.id ?? ''}>{label}</label>
      <input type="text" onChange={onTextChange} {...restProps} />
    </div>
  );
};
