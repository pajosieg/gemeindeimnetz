import * as React from 'react';
import './TextInput.scss';

interface ITextAreaProps {
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  className?: string;
  [key: string]: any;
}

export const TextArea: React.FunctionComponent<ITextAreaProps> = ({
  onTextChange,
  label,
  className = '',
  ...restProps
}) => {
  const classList = ['text-input', className].join(' ').trim();

  return (
    <div className={classList}>
      <label htmlFor={restProps.id ?? ''}>{label}</label>
      <textarea onChange={onTextChange} {...restProps} />
    </div>
  );
};
