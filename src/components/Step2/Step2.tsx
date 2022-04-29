import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiForm, EuiSpacer } from '@elastic/eui'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { genderOptions, languageOptions } from '../../constants/constants'
import { useData } from '../../context/Context'
import { LittleStateMachine, useStateMachine } from '../../storage/littleStateMachine'
import { IInitialStateForm, initialStateForm, NameOfValues } from '../../types/initialStateForm'
import { ControlDatePicker } from '../common/ControlDatePicker/ControlDatePicker'
import { ControlFilePicker } from '../common/ControlFilePicker/ControlFilePicker'
import { ControlSelect } from '../common/ControlSelect/ControlSelect'

import styles from './Step2.module.scss'

export const Step2: React.FC<{ setStep: (number: number) => void }> = ({ setStep }) => {
  const { data, changeData } = useData()

  const { store, action } = useStateMachine<IInitialStateForm>(data, {})
  const form = useForm<IInitialStateForm>({
    defaultValues: initialStateForm,
  })
  const previewFile = store.step2?.file || []
  const {
    watch,
    handleSubmit,
    reset,
    setValue,
  } = form

  const datePickerValue = watch(`step2.dateOfBirth`)
  const languageValue = watch(`step2.language`)
  const genderValue = watch(`step2.gender`)
  const defaultValuesFilePicker = watch(`step2.file`)

  const setAllFiles = (state: IInitialStateForm, fileName: string, url: string) => ({
    ...state,
    step2: {
      ...state.step2,
      file: [
        {
          id: 0,
          fileName,
          url,
        },
      ],
    },
  })

  const onSubmit = ({ step2 }: IInitialStateForm) => {
    const file = store.step2?.file || []
    const dateOfBirth = moment(step2.dateOfBirth)

    action({
      step2: {
        ...step2,
        dateOfBirth,
        file,
      },
    })

    changeData({
      step2: {
        ...step2,
        dateOfBirth,
        file,
      },
    })

    const isFile = 'type' in step2.file[0]

    if (isFile) {
      const reader = new FileReader()

      reader.onload = function () {
        const url = reader?.result
        const state = LittleStateMachine.getStore()
        const file = step2?.file[0] as File
        action(setAllFiles(state, file.name, url?.toString()!))
        changeData(setAllFiles(state, file.name, url?.toString()!))
      }
      reader.readAsDataURL(step2?.file[0])
    }

    setStep(3)
  }

  useEffect(() => {
    reset(data)
  }, [data, reset])

  return (
    <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
      <EuiFlexGroup gutterSize="s">
        <EuiFlexItem grow={2}>
          <ControlDatePicker
            name={`step2.${NameOfValues.DATE_OF_BIRTH}`}
            form={form}
            required
            rules={{ required: true }}
            defaultValue={datePickerValue}
            helperText="Select Date of Birth"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={2} className={styles.wrapperSelect}>
          <ControlSelect
            name={`step2.${NameOfValues.LANGUAGE}`}
            form={form}
            options={genderOptions}
            required
            rules={{ required: true }}
            defaultValue={languageValue}
            helperText="Select Language"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={2} className={styles.wrapperSelect}>
          <ControlSelect
            name={`step2.${NameOfValues.GENDER}`}
            form={form}
            options={languageOptions}
            required
            rules={{ required: true }}
            defaultValue={genderValue}
            helperText="Select Gender"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem grow={1} className="wrapperPicker">
          <ControlFilePicker
            name={`step2.${NameOfValues.FILE}`}
            form={form}
            defaultValue={defaultValuesFilePicker}
            previewFiles={previewFile}
            rules={{ required: !defaultValuesFilePicker.length }}
            handleRemove={() => {
              if (!!store.step2?.file.length) {
                setValue(`step2.${NameOfValues.FILE}`, [])
                action({
                  step2: {
                    ...store.step2,
                    file: [],
                  },
                })
              }
            }}
            helperText="Select Your Favorite Image"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiFlexGroup>
        <EuiFlexItem grow={true}>
          <EuiButton type="submit">Save</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  )
}
