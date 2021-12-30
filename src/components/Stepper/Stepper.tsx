import { EuiStepsHorizontal } from '@elastic/eui';
import { EuiStepHorizontalProps } from '@elastic/eui/src/components/steps/step_horizontal';
import React from 'react';

interface ISteps {
   steps: EuiStepHorizontalProps[]
}

const Steps: React.FC<ISteps> =  ({steps}) => <EuiStepsHorizontal steps={steps}/>

export default Steps