import React from 'react'
import {EuiFormRow, EuiSelect, EuiSelectOption } from '@elastic/eui'
import { Controller, UseControllerProps, UseFormReturn } from 'react-hook-form'

interface ControlSelectProps {
  name: string
  form: UseFormReturn<any>
  options: (EuiSelectOption & { value: number; text: string })[]
  error?: string
  rules?: UseControllerProps['rules']
  defaultValue?: string | number
  label?: string
  helperText?: string
  placeholder?: string
  handleChange?: (value: any) => void
  required?: boolean
  className?: string
  ariaLabel?: string
  isLoading?: boolean
  value?: string
  isDisabled?: boolean
}

export const ControlSelect: React.FC<ControlSelectProps> = ({
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
  helperText = 'Select',
  isDisabled,
  handleChange,
  options = [],
}) => {
  const { control } = form

  return (
    <EuiFormRow label={label} helpText={helperText} error={error}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue ?? ''}
        render={({ field }) => {
          const { onChange, onBlur, name, ref, value } = field
          return (
            <EuiSelect
              inputRef={ref}
              name={name}
              value={value}
              onChange={(event) => {
                const eventTargetValue = Number(event.target.value)
                const selectedOption = options.filter(({ value }) => value === eventTargetValue)
                handleChange?.(selectedOption)
                onChange(event)
              }}
              options={options}
              onBlur={onBlur}
              className={className}
              disabled={isDisabled}
              isLoading={isLoading}
              placeholder={placeholder}
              required={required}
              defaultValue={defaultValue || undefined}
            />
          )
        }}
      />
    </EuiFormRow>
  )
}
