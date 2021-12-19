
import React from 'react';
import { EuiFieldText, EuiFormRow, EuiText } from '@elastic/eui';
import { Controller, UseFormReturn } from 'react-hook-form';
import { IInput } from '../Input/Input';

export interface IControlInput extends Omit<IInput, 'onChange'>{
   name: string
   form: UseFormReturn<any>
   error?: string
   rules?: {required: boolean | string}
   defaultValue?: string
}

export function ControlInput({
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
   props
}: IControlInput){
   const { control } = form
   return (
      <>
      <EuiFormRow label={label} helpText={helperText} error={error}>
         <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue ?? ''}
            render={({field}) => 
            <EuiFieldText
               isInvalid={!!error}
               className={className}
               disabled={isDisabled}
               isLoading={isLoading}
               placeholder={placeholder}
               required={required}
               aria-label={ariaLabel}
               {...field}
               {...props}
               />
            }
            />
      </EuiFormRow>
      </>
   )
}