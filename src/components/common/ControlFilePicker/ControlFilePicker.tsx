import React, { useState } from 'react'
import {
  EuiButton,
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  useGeneratedHtmlId,
} from '@elastic/eui'
import { Controller, UseControllerProps, UseFormReturn } from 'react-hook-form'

import styles from './ControlFilePicker.module.scss'

interface ControlFilePickerProps {
  name: string
  form: UseFormReturn<any>
  error?: string
  rules?: UseControllerProps['rules']
  previewFiles: any[]
  defaultValue?: any[]
  label?: string
  helperText?: string
  placeholder?: string
  handleChange?: (value: any) => void
  handleRemove?: () => void
  required?: boolean
  className?: string
  ariaLabel?: string
  isLoading?: boolean
  value?: string
  isDisabled?: boolean
}

export const ControlFilePicker: React.FC<ControlFilePickerProps> = ({
  name,
  form,
  defaultValue = [],
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
  handleRemove,
  previewFiles,
}) => {
  const [fileLinksBlob, setFileLinksBlob] = useState<any[]>(previewFiles || [])
  const filePickerId = useGeneratedHtmlId({ prefix: 'filePicker' })
  const { control } = form

  const handleRemoveAll = () => {
    setFileLinksBlob([])
    handleRemove?.()
  }

  const handleFiles = (files: FileList | null, withPreview?: boolean) => {
    if (!!defaultValue?.length) {
      handleRemoveAll()
    }

    if (withPreview && !!files?.length) {
      Array.from(files).forEach((file, i) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const url = event.target?.result
          setFileLinksBlob([
            {
              id: i,
              name: file.name,
              url,
            },
          ])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  return (
    <>
      <EuiFormRow fullWidth={true} label={label} helpText={helperText} error={error}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue ?? ''}
          render={({ field }) => {
            const { onChange, onBlur, name, ref } = field
            return (
              <EuiFilePicker
                id={filePickerId}
                ref={ref}
                name={name}
                // multiple
                fullWidth={true}
                initialPromptText="Select or drag and drop multiple files"
                onChange={(files: FileList | null) => {
                  handleChange?.(files)
                  handleFiles(files, true)
                  onChange(files)
                }}
                onBlur={onBlur}
                display={'large'}
                isLoading={isLoading}
                disabled={isDisabled}
                placeholder={placeholder}
                className={className}
                required={required}
                aria-label={ariaLabel}
                list="1"
                results={1}
              />
            )
          }}
        />
      </EuiFormRow>
      {!!fileLinksBlob.length && (
        <EuiFlexGroup gutterSize="m" alignItems="center">
          <EuiFlexItem grow={false}>
            <h3>Files attached: {`${fileLinksBlob.length}`} </h3>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={handleRemoveAll}>Remove all</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      )}
      <ul className={`${styles.wrapperFiles} flex-row-base`}>
        {!!fileLinksBlob.length &&
          fileLinksBlob.map((link: any) => {
            return (
              <li key={link.id} className={`${styles.itemFile}`}>
                <img width={200} height={200} src={link.url} alt={link.name} />
              </li>
            )
          })}
      </ul>
    </>
  )
}
