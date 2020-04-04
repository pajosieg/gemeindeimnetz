import * as React from "react";
import "./TextInput.scss";

interface ITextInputProps {
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  [key: string]: any;
}

export const TextInput: React.FunctionComponent<ITextInputProps> = ({
  onTextChange,
  label,
  ...restProps
}) => {
  return (
    <div className="text-input">
      <label htmlFor={restProps.id ?? ""}>{label}</label>
      <input type="text" onChange={onTextChange} {...restProps} />
    </div>
  );
};
