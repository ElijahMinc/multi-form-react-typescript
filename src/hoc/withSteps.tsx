import { EuiStepHorizontalProps } from "@elastic/eui/src/components/steps/step_horizontal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ISteps } from "../components/Stepper/Stepper"

export interface HOCprops extends ISteps{
   setStep: () => void
 }
 

export const withSteps = <P extends HOCprops>(Component: React.ComponentType<P>) => {

   return (props: any) => {
     const [ step, setStep ] = useState(1)
     
       const navigate = useNavigate()
 
     const handleChangeStep = (stepNumber: number) => setStep(stepNumber)
 
     const steps: EuiStepHorizontalProps[] = [
       {
       title: 'Step 1',
       isComplete: step >= 2,
       status: step === 1 ? 'current' : 'disabled',
       onClick: () => 
           {
             navigate('/')
             setStep(1)
           }
       }, 
       {
         title: 'Step 2',
         isComplete:  step >= 3,
         status: step === 2 ? 'current' : 'disabled',
         onClick: () => {
           navigate('/step2')
           setStep(2)
         }
       },
       {
         title: 'Step 3',
         isComplete:  step >= 4,
         status: step === 3 ? 'current' : 'disabled',
         onClick: () => setStep(3)
 
       },
       ]
 
    return (
      <>
        <Component {...props} steps={steps} setStep={handleChangeStep} />
      </>
     
    )
   }
 }