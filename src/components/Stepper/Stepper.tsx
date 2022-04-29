import { EuiStepsHorizontal } from '@elastic/eui';
import { EuiStepHorizontalProps } from '@elastic/eui/src/components/steps/step_horizontal';
import React from 'react';

export interface ISteps {
   steps: EuiStepHorizontalProps[]
   currentStep: number
}

const Steps: React.FC<ISteps> =  ({steps}) => <EuiStepsHorizontal steps={steps}/>

export default Steps