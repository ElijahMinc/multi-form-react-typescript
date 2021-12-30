import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import  Step1  from '../Step1';
import Step2 from '../Step2';
import Steps from '../Stepper/Stepper';
import './App.module.css';
import { HOCprops, withSteps } from '../../hoc/withSteps';



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





export default withSteps(App)
