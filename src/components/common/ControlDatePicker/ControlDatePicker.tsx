import React from 'react'
import { EuiDatePicker, EuiFormRow } from '@elastic/eui'
import moment, { Moment } from 'moment'
import { Controller, UseControllerProps, UseFormReturn } from 'react-hook-form'

interface ControlDatePickerProps {
  name: string
  form: UseFormReturn<any>
  error?: string
  rules?: UseControllerProps['rules']
  defaultValue?: string
  label?: string
  helperText?: string
  placeholder?: string
  handleChange?: (value: null | Moment) => void
  required?: boolean
  className?: string
  ariaLabel?: string
  isLoading?: boolean
  value?: string
  isDisabled?: boolean
}

export const ControlDatePicker: React.FC<ControlDatePickerProps> = ({
  name,
  form,
  defaultValue,
  error,
  rules,
  placeholder,
  required,
  className,
  ariaLabel,
  isLoading,
  label,
  helperText = 'Select a date',
  isDisabled,
  handleChange,
}) => {
  const { control } = form

  return (
    <EuiFormRow label={label} helpText={helperText} error={error}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={moment(defaultValue)}
        render={({ field }) => {
          const { onChange, onBlur, name, ref, value } = field
          console.log('value', value)
          const generateFromMomentToString = moment(value).format('DD/MM/YYYY')
          return (
            <EuiDatePicker
              inputRef={ref}
              name={name}
              value={generateFromMomentToString}
              selected={moment(value)}
              onChange={(value) => {
                handleChange?.(value)
                onChange(value)
              }}
              fullWidth={true}
              timeFormat="DD/MM/YYYY"
              dateFormat="DD/MM/YYYY"
              onBlur={onBlur}
              className={className}
              disabled={isDisabled}
              isLoading={isLoading}
              placeholder={placeholder}
              required={required}
            />
          )
        }}
      />
    </EuiFormRow>
  )
}
