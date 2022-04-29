
import React from 'react';
import { EuiFieldText, EuiFieldTextProps, EuiFormRow } from '@elastic/eui';
import { Controller, UseFormReturn } from 'react-hook-form';
import { IInput } from '../Input/Input';

export interface IControlInput extends Omit<IInput, 'onChange'>{
   name: string
   form: UseFormReturn<any>
   error?: string
   rules?: {required: boolean | string}
   defaultValue?: string
   size?: EuiFieldTextProps['size']
   height?: EuiFieldTextProps['height']
}

export const ControlInput: React.FC<IControlInput> = ({
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
  size = 300,
  height = 400,
}
) => {
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
              <EuiFieldText
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                size={size}
                value={value}
                isInvalid={!!error}
                className={className}
                disabled={isDisabled}
                isLoading={isLoading}
                placeholder={placeholder}
                required={required}
                aria-label={ariaLabel}
                height={height}
              />
            )
          }  
          }
        />
      </EuiFormRow>
    </>
  )
}