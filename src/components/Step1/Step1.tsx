import { EuiForm, EuiFormRow, EuiButton } from '@elastic/eui'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {RoutesProps, useNavigate } from 'react-router-dom'
import { EmailRegExp } from '../../constants/RegExp'
import { useData } from '../../context/Context'
import { useStateMachine } from '../../storage/littleStateMachine'
import { IInitialStateForm, NameOfValues } from '../../types/initialStateForm'
import { ControlEmail } from '../common/ControlEmail/ControlEmail'
import { ControlInput } from '../common/ControlInput/ControlInput'
import { ControlNumberField } from '../common/ControlNumberField/NumberField'
import { ControlPassword } from '../common/ControlPassword/ControlPassword'

interface Step1Props extends RoutesProps {
  getEmailAndPassword?: (email: string, parol: string) => void
  setStep?: (number: number) => void
  withTitle?: boolean
  withRoute?: boolean
  isLoginOrRegister?: boolean
  isCreateNewUser?: boolean
  isFetching?: boolean
}

export const Step1: React.FC<Step1Props> = ({
  setStep,
  withRoute,
  withTitle,
  isLoginOrRegister,
  getEmailAndPassword,
  isCreateNewUser,
  isFetching = false,
  location,
}) => {
  const { data, changeData } = useData()
  const { store, action } = useStateMachine<IInitialStateForm>(data, {})
  const router = useNavigate()

  const form = useForm<IInitialStateForm>({
    defaultValues: store,
  })

  const {
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = form

  const onSubmit = (dataForm: IInitialStateForm) => {
    changeData(dataForm)
    action(dataForm)
    if (isLoginOrRegister && getEmailAndPassword) {
      return getEmailAndPassword(dataForm.step1.email, dataForm.step1.password)
    }
    withRoute && router(`/step2`)
    setStep?.(2)
  }
  const errorEmail =
    errors.step1?.[`${NameOfValues.EMAIL}`]?.type === 'required'
      ? 'This field is required'
      : errors.step1?.[`${NameOfValues.EMAIL}`]?.type === 'pattern'
        ? 'Not valid Email'
        : ''

  useEffect(() => {
    reset(data)
  }, [data, reset])

  return (
    <>
      <div className="step">
        {withTitle && <h1 className="step__title">Step1</h1>}
        <div className="step__content">
          <EuiForm onSubmit={handleSubmit(onSubmit)} component="form">
            {(!isLoginOrRegister || !isCreateNewUser) && (
              <>
                <EuiFormRow
                  label="Name"
                  error={errors.step1?.[`${NameOfValues.NAME}`]?.message ?? ''}
                  isInvalid={!!errors.step1?.[`${NameOfValues.NAME}`]?.message}>
                  <ControlInput
                    name={`step1.${NameOfValues.NAME}`}
                    form={form}
                    rules={{ required: 'This field is required' }}
                    placeholder="Your Name"
                    error={errors.step1?.[`${NameOfValues.NAME}`]?.message ?? ''}
                    defaultValue={watch(`step1.${NameOfValues.NAME}`)}
                  />
                </EuiFormRow>
                <EuiFormRow
                  label="Lastname"
                  error={errors.step1?.[`${NameOfValues.LASTNAME}`]?.message ?? ''}
                  isInvalid={!!errors.step1?.[`${NameOfValues.LASTNAME}`]?.message}>
                  <ControlInput
                    name={`step1.${NameOfValues.LASTNAME}`}
                    form={form}
                    rules={{ required: 'This field is required' }}
                    placeholder="Your Lastname"
                    error={errors.step1?.[`${NameOfValues.LASTNAME}`]?.message ?? ''}
                    defaultValue={watch(`step1.${NameOfValues.LASTNAME}`)}
                  />
                </EuiFormRow>
                <EuiFormRow
                  label="Your Phone Number"
                  error={errors.step1?.[`${NameOfValues.NUMBER}`]?.message ?? ''}
                  isInvalid={!!errors.step1?.[`${NameOfValues.NUMBER}`]?.message}>
                  <ControlNumberField
                    name={`step1.${NameOfValues.NUMBER}`}
                    form={form}
                    rules={{
                      required: 'This field is required',
                    }}
                    placeholder="Your Phone number"
                    error={errors.step1?.[`${NameOfValues.NUMBER}`]?.message ?? ''}
                    defaultValue={+watch(`step1.${NameOfValues.NUMBER}`) ?? ''}
                  />
                </EuiFormRow>
              </>
            )}
            <EuiFormRow
              label="Your Email"
              error={errorEmail}
              isInvalid={!!errors.step1?.[`${NameOfValues.EMAIL}`]?.message}>
              <ControlEmail
                name={`step1.${NameOfValues.EMAIL}`}
                form={form}
                rules={{
                  required: 'This field is required',
                  pattern: {
                    value: EmailRegExp,
                    message: 'is not valid email',
                  },
                }}
                placeholder="Your Email"
                defaultValue={watch(`step1.${NameOfValues.EMAIL}`)}
                error={errorEmail}
              />
            </EuiFormRow>
            <EuiFormRow
              label="Your password"
              error={errorEmail}
              isInvalid={!!errors.step1?.[`${NameOfValues.PASSWORD}`]?.message}>
              <ControlPassword
                name={`step1.${NameOfValues.PASSWORD}`}
                form={form}
                rules={{ required: 'This field is required' }}
                placeholder="Your password"
                defaultValue={watch(`step1.${NameOfValues.PASSWORD}`)}
                error={errors.step1?.[`${NameOfValues.PASSWORD}`]?.message ?? ''}
              />
            </EuiFormRow>
            <EuiButton type="submit" isLoading={isFetching}>
              {isLoginOrRegister ? 'Enter to Account' : isCreateNewUser ? 'Create new user' : 'Save'}
            </EuiButton>
          </EuiForm>
        </div>
      </div>
    </>
  )
}
