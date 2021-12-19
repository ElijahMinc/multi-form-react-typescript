import { EuiFieldText, EuiFormRow } from '@elastic/eui';
import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { Path, PathValue, UnpackNestedValue } from 'react-hook-form';

export interface IInput {
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
   props?: InputHTMLAttributes<HTMLInputElement>
}

export const Input:React.FC<IInput> = ({
   placeholder, 
   onChange,
   required,
   className,
   ariaLabel,
   isLoading,
   value,
   label,
   helperText,
   isDisabled,
   props
}) => {
   return (
      <EuiFormRow label={label} helpText={helperText} >
         <EuiFieldText
            disabled={isDisabled}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            className={className}
            aria-label={ariaLabel}
            isLoading={isLoading}
            value={value}
            {...props}
         />
      </EuiFormRow>
    
   )
}