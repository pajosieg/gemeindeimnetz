import * as React from 'react';
import './TextInput.scss';

interface INumberInputProps {
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  label: string;
  [key: string]: any;
}

export const NumberInput: React.FunctionComponent<INumberInputProps> = ({
  onBlur,
  label,
  ...restProps
}) => {
  const textInput = React.useRef<HTMLInputElement>(null);

  return (
    <div className="text-input">
      <form>
        <label htmlFor={restProps.id ?? ''}>{label}</label>
        <input type="number" onBlur={onBlur} {...restProps} ref={textInput} />
        <button
          type="reset"
          onClick={() => {
            onBlur({ target: { valueAsNumber: NaN } } as React.FocusEvent<
              HTMLInputElement
            >);
          }}
        >
          <b>X</b>
        </button>
      </form>
    </div>
  );
};
