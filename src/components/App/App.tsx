import React, { useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import  Step1  from '../Step1';
import Step2 from '../Step2';
import Steps from '../Stepper/Stepper';
import { EuiStepHorizontalProps } from '@elastic/eui/src/components/steps/step_horizontal';

import './App.module.css';

interface HOCprops{
  steps: EuiStepHorizontalProps[]
  setStep: () => void
}


const App: React.FC<HOCprops> = ({steps,setStep}) =>  {


  return (
    <>
      <Steps steps={steps} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Step1 setStep={setStep}/>}  />
          <Route path="/step2" element={<Step2 setStep={setStep}/>} />
          <Route path="*" element={<h1>Not Route</h1>}/>
        </Routes>
      </div>
    </>
   
  )
}


const withSteps = <P extends HOCprops>(Component: React.ComponentType<P>) => {

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


export default withSteps(App)
