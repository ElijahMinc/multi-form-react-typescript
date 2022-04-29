import { EuiStepsHorizontal } from "@elastic/eui"
import { HOCWithStepsProps, withSteps } from "../../hoc/withSteps"
import Step1 from "../Step1"
import Step2 from "../Step2"
import { Step3 } from "../Step3/Step3"

export const MultyForm: React.FC<HOCWithStepsProps> = ({ setStep, steps, currentStep, userData}) => {
  return (
    <>
      <EuiStepsHorizontal steps={steps}/>
      <div className="container flex-column-base">
        {currentStep === 1 && (
          <Step1 withTitle setStep={setStep}/>
        )}
        {currentStep === 2 && (
          <Step2 setStep={setStep}/>
        )}
        {currentStep === 3 && (
          <Step3 userData={userData} />
        )}
      </div>
    </>
  )
}


export default withSteps(MultyForm)