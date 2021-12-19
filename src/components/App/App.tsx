import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useRoutes,
  useNavigate,
  useLocation
} from "react-router-dom";
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import { IInitialStateForm, initialStateForm } from '../../types/initialStateForm';
import { useData } from '../../context/Context';
import  Step1  from '../Step1';
import Step2 from '../Step2';
import './App.module.css';
import { Header } from '../Header/Header';
import { Step3 } from '../Step3/Step3';


const App = () =>  {

  return (
    <>
     <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Step1/>}  />
          <Route path="/step2" element={<Step2/>} />
          <Route path="*" element={<h1>Not Route</h1>}/>
        </Routes>
      </div>
    </>
   
  )
}


export default App;
