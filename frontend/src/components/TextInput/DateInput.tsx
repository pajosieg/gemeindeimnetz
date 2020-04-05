import * as React from 'react'
import './TextInput.scss'

interface IDateInputProps {
  onDateChange: (d: string) => void
  onTimeChange: (t: string) => void
  label: string
  date: string
  time: string
  [key: string]: any
}

export const DateInput: React.FunctionComponent<IDateInputProps> = ({
  onDateChange,
  onTimeChange,
  label,
  date,
  time,
  ...restProps
}) => {
  return (
    <div className="date-input">
      <label htmlFor={restProps.id ?? ''}>{label}</label>
      <input
        type="date"
        onChange={(e) => {
          onDateChange(e.target.value)
        }}
        defaultValue={date}
        {...restProps}
      />
      <input
        type="time"
        onChange={(e) => {
          onTimeChange(e.target.value)
        }}
        defaultValue={time}
        {...restProps}
      />
    </div>
  )
}
