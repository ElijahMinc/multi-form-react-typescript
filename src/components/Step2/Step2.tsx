import React from 'react'
import {  Route, Routes, useLocation, useMatch, useNavigate, useParams } from 'react-router-dom'
import { useData } from '../../context/Context'

export const Step2: React.FC = () => {
   const {data, changeData} = useData()
   const navigate = useNavigate()
   const location = useLocation()
   console.log(data)
   
   return (
   <>
   <button onClick={()=> navigate(-1)}>go back</button>
   </>
   )
}