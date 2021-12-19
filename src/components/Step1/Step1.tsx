import { EuiForm,EuiFormRow, EuiButton } from '@elastic/eui'
import React, {  useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { EmailRegExp } from '../../constants/RegExp'
import { useData } from '../../context/Context'
import { useStateMachine } from '../../storage/littleStateMachine'
import { IInitialStateForm, NameOfValues } from '../../types/initialStateForm'
import { ControlEmail } from '../common/ControlEmail/ControlEmail'
import { ControlInput } from '../common/ControlInput/ControlInput'
import { ControlNumberField } from '../common/ControlNumberField/NumberField'


export const Step1: React.FC = () => {
  const {data, changeData} = useData()
  const {store, action, clear } = useStateMachine<IInitialStateForm>(data,{})
  const [formData, setFormData] = useState(store)
  const router = useNavigate()

   const form = useForm<IInitialStateForm>({
      defaultValues: formData,
   })

   const {watch, getValues, handleSubmit, formState: {errors}, reset} = form

   const onSubmit = (dataForm: IInitialStateForm) => {
      changeData(dataForm)
      action(dataForm)
      router(`/step2`)
   }
   const errorEmail = errors.step1?.[`${NameOfValues.EMAIL}`]?.type === 'required'
    ? 'This field is required'
      : errors.step1?.[`${NameOfValues.EMAIL}`]?.type === 'pattern'
    ? 
    'Not valid Email' 
      : ''
   console.log(store)
      useEffect(() => {
         setFormData(formData)
         reset(formData)
      },[formData])
      
   return (
      <>
       <div className="step">
         <h1 className="step__title">Step1</h1>
         <div className="step__content">
            <EuiForm onSubmit={handleSubmit(onSubmit)} component="form">
               <EuiFormRow label="Name" error={errors.step1?.[`${NameOfValues.NAME}`]?.message ?? ''} isInvalid={!!errors.step1?.[`${NameOfValues.NAME}`]?.message}>
                  <ControlInput
                     name={`step1.${NameOfValues.NAME}`}
                     form={form}
                     rules={{required: 'This field is required'}}
                     placeholder='Your Name'
                     error={errors.step1?.[`${NameOfValues.NAME}`]?.message ?? ''}
                     defaultValue={watch(`step1.${NameOfValues.NAME}`)}
                  />
               </EuiFormRow>
               <EuiFormRow label="Lastname" error={errors.step1?.[`${NameOfValues.LASTNAME}`]?.message ?? ''} isInvalid={!!errors.step1?.[`${NameOfValues.LASTNAME}`]?.message}>
                  <ControlInput
                     name={`step1.${NameOfValues.LASTNAME}`}
                     form={form}
                     rules={{required: 'This field is required'}}
                     placeholder='Your Lastname'
                     error={errors.step1?.[`${NameOfValues.LASTNAME}`]?.message ?? ''}
                     defaultValue={watch(`step1.${NameOfValues.LASTNAME}`)}
                  />
               </EuiFormRow>
               <EuiFormRow label="Your Number" error={errors.step1?.[`${NameOfValues.NUMBER}`]?.message ?? ''} isInvalid={!!errors.step1?.[`${NameOfValues.NUMBER}`]?.message}>
                  <ControlNumberField
                     name={`step1.${NameOfValues.NUMBER}`}
                     form={form}
                     rules={{required: 'This field is required'}}
                     placeholder='Your Phone number'
                     error={errors.step1?.[`${NameOfValues.NUMBER}`]?.message ?? ''}
                     defaultValue={+watch(`step1.${NameOfValues.NUMBER}`) ?? ''}
                  />
               </EuiFormRow>
               <EuiFormRow label="Your Email" error={errorEmail} isInvalid={!!errors.step1?.[`${NameOfValues.EMAIL}`]?.message}>
                  <ControlEmail
                     name={`step1.${NameOfValues.EMAIL}`}
                     form={form}
                     rules={{required: 'This field is required', pattern: EmailRegExp}}
                     placeholder='Your Lastname'
                     defaultValue={watch(`step1.${NameOfValues.EMAIL}`)}
                     error={errorEmail}
                  />
               </EuiFormRow>
               <EuiButton  type="submit">
                   Save form
               </EuiButton>
            </EuiForm>
         </div>
      </div>
      </>
     
   )
}