import * as React from 'react'
import './TextInput.scss'

interface INumberInputProps {
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  [key: string]: any
}

export const NumberInput: React.FunctionComponent<INumberInputProps> = ({
  onBlur,
  label,
  ...restProps
}) => {
  return (
    <div className="text-input">
      <label htmlFor={restProps.id ?? ''}>{label}</label>
      <input type="number" onBlur={onBlur} {...restProps} />
    </div>
  )
}
