import {  EuiFieldText, EuiFormRow } from '@elastic/eui';
import React, { ChangeEventHandler } from 'react';
import { Controller, UseControllerProps, UseFormReturn } from 'react-hook-form';

export interface IControlEmail {
   name: string
   form: UseFormReturn<any>
   error?: string
   rules?: UseControllerProps['rules']
   defaultValue?: string
   label?: string
   helperText?: string
   placeholder?: string
   onChange?: ChangeEventHandler<HTMLInputElement>
   required?: boolean
   className?: string
   ariaLabel?: string
   isLoading?: boolean
   value?: string
   isDisabled?: boolean
}

export const ControlEmail:React.FC<IControlEmail> = ({
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
  helperText,
  isDisabled,
}) => {
  const {control } = form
  return (
    <EuiFormRow label={label} helpText={helperText} error={error}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue ?? ''}
        render={({field}) => {
          const {onChange, onBlur, name, ref, value} = field
          return (<EuiFieldText
            inputRef={ref}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            isInvalid={!!error}
            className={className}
            disabled={isDisabled}
            isLoading={isLoading}
            placeholder={placeholder}
            required={required}
            aria-label={ariaLabel}
            // {...field}
          />)
        }}
      />
    </EuiFormRow>
    
  )
}