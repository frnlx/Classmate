'use client'

import { ReactNode, createContext, useContext, useState } from "react"
// import { SelectedClassContext, UpdateSelectedClassContext } from "./ClassContext"

type prop = {
  children: ReactNode
}

const SelectedClassContext = createContext<number>(0)
export const useSelectedClass = () => useContext(SelectedClassContext)

const UpdateSelectedClassContext = createContext<any>(undefined)
export const useUpdateSelectedClass = () => useContext(UpdateSelectedClassContext)

const SelectedClassContextProvider = ({ children }: prop) => {
  const [selectedClass, setSelectedClass] = useState<number>(0)

  const switchClasses = (idx: number) => {
    setSelectedClass(prev => idx)
  }

  return (
    <SelectedClassContext.Provider value={selectedClass}>
      <UpdateSelectedClassContext.Provider value={switchClasses}>
        {children}
      </UpdateSelectedClassContext.Provider>
    </SelectedClassContext.Provider>
  );
}

export default SelectedClassContextProvider