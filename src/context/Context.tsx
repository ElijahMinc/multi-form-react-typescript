import React, { createContext, useContext, useState } from 'react'
import { IInitialStateForm, initialStateForm } from '../types/initialStateForm'

interface IProp {
   children: React.ReactNode
}

const InitContext = createContext<any>(null)


export const ConfigureContext: React.FC<IProp> = ({children}) => {

  const [data, setData] = useState<IInitialStateForm>(initialStateForm) 

  const changeData = (newData: any) => {
    setData( prev => ({...prev, ...newData}))
  }
  return (
    <InitContext.Provider value={{data, changeData}}>
      {children}
    </InitContext.Provider>
  )
}

export const useData = () => useContext(InitContext)