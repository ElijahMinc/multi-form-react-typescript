import { EuiFieldNumber, EuiFieldText, EuiFormRow } from '@elastic/eui';
import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { Controller, Path, PathValue, UnpackNestedValue, UseControllerProps, UseFormReturn } from 'react-hook-form';
import { EmailRegExp } from '../../../constants/RegExp';
import { IInitialStateForm } from '../../../types/initialStateForm';

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
               />
            }
            />
      </EuiFormRow>
    
   )
}