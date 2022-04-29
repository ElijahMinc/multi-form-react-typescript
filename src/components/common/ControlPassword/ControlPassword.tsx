
import React from 'react';
import { EuiFieldPassword, EuiFormRow } from '@elastic/eui';
import { Controller, UseFormReturn } from 'react-hook-form';
import { IInput } from '../Input/Input';

export interface IControlInput extends Omit<IInput, 'onChange'>{
   name: string
   form: UseFormReturn<any>
   error?: string
   rules?: {required: boolean | string}
   defaultValue?: string
}

export const ControlPassword:React.FC<IControlInput> = ({
  name,
  form,
  rules,
  error,
  defaultValue,
  label,
  helperText,
  ariaLabel,
  className,
  isDisabled,
  isLoading,
  placeholder,
  required,
}) => {
  const { control } = form
  return (
    <>
      <EuiFormRow label={label} helpText={helperText} error={error}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue ?? ''}
          render={({field}) => {
            const {onChange, onBlur, name, ref, value} = field
            return (
              <EuiFieldPassword
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
              />
            )
          }
           
          }
        />
      </EuiFormRow>
    </>
  )
}