import React from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import { useData } from '../../context/Context'

export const Step2: React.FC<{setStep: (number: number) => void}> = ({setStep}) => {
   const {data, changeData} = useData()
   const navigate = useNavigate()

   
   return (
   <>
      <button onClick={()=> navigate(-1)}>go back</button>
   </>
   )
}