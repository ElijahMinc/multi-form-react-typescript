import { EuiStepHorizontalProps } from '@elastic/eui/src/components/steps/step_horizontal'
import { useState } from 'react'
import { ISteps } from '../components/Stepper/Stepper'

export interface HOCWithStepsProps extends ISteps {
  setStep: () => void
  currentSteps: number
  userData: {
    isNewUser: boolean
    userId: number
  }
}

export const withSteps = <P extends HOCWithStepsProps>(Component: React.FC<P>) => {
  enum Steps {
    FIRST_STEP = 1,
    SECOND_STEP = 2,
    THIRD_STEP = 3,
  }

  return (props: any) => {
    const [step, setStep] = useState(Steps.FIRST_STEP)

    const handleChangeStep = (stepNumber: number) => setStep(stepNumber)

    const steps: EuiStepHorizontalProps[] = [
      {
        title: 'Step 1',
        isComplete: step > Steps.FIRST_STEP,
        status: step === Steps.FIRST_STEP ? 'current' : 'disabled',
        onClick: () => step > Steps.FIRST_STEP && setStep(Steps.FIRST_STEP),
      },
      {
        title: 'Step 2',
        isComplete: step > Steps.SECOND_STEP,
        status: step === Steps.SECOND_STEP ? 'current' : 'disabled',
        onClick: () => step > Steps.SECOND_STEP && setStep(Steps.SECOND_STEP),
      },
      {
        title: 'Step 3',
        isComplete: step > Steps.THIRD_STEP,
        status: step === Steps.THIRD_STEP ? 'current' : 'disabled',
        onClick: () => step > Steps.THIRD_STEP && setStep(Steps.THIRD_STEP),
      },
    ]

    return <Component currentStep={step} steps={steps} setStep={handleChangeStep} {...props} />
  }
}
