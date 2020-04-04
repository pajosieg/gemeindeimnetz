import * as React from "react";
import "./TextInput.scss";

interface ITextAreaProps {
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  [key: string]: any;
}

export const TextArea: React.FunctionComponent<ITextAreaProps> = ({
  onTextChange,
  label,
  ...restProps
}) => {
  return (
    <div className="text-input">
      <label htmlFor={restProps.id ?? ""}>{label}</label>
      <textarea onChange={onTextChange} {...restProps} />
    </div>
  );
};
