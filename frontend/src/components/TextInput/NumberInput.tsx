import * as React from "react";
import "./TextInput.scss";

interface INumberInputProps {
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  [key: string]: any;
}

export const NumberInput: React.FunctionComponent<INumberInputProps> = ({
  onTextChange,
  label,
  ...restProps
}) => {
  return (
    <div className="text-input">
      <label htmlFor={restProps.id ?? ""}>{label}</label>
      <input type="number" onChange={onTextChange} {...restProps} />
    </div>
  );
};
