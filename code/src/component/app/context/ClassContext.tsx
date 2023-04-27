'use client'

import { Classroom } from "@prisma/client"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { useUserData } from "./UserDataContext"
import { useRouter } from "next/navigation"
import { UserData } from "@/server/types/fetchmodels"

export type SelectedClassUI = {
  order: number,
  data?: Classroom
}

// CreateContext & UseContext
// --------------------------
const SelectedClassContext = createContext<SelectedClassUI>({ order: 0 })
export const useSelectedClass = () => useContext(SelectedClassContext)

const UpdateSelectedClassContext = createContext<any>(undefined)
export const useUpdateSelectedClass = () => useContext(UpdateSelectedClassContext)

const ClassListContext = createContext<SelectedClassUI[]>([])
export const useClassList = () => useContext(ClassListContext)

// Context Component
// -----------------
const SelectedClassContextProvider = (p: { children: ReactNode, url?: string }) => {
  const userData: UserData = useUserData()!;

  const [classList, setClassList] = useState<SelectedClassUI[]>([])
  const [selectedClass, setSelectedClass] = useState<SelectedClassUI>({ order: 0 })

  const switchClasses = (idx: number) => {
    setSelectedClass(prev => ({ order: idx, data: userData?.classes[idx - 1] }))
  }

  const router = useRouter()

  useEffect(() => {
    // Upon first load, set the class list for distribution
    const list = userData.classes.map<SelectedClassUI>((classroom, idx) => ({ order: idx + 1, data: classroom }))
    setClassList(prev => list)

    // Check the slug. If there is slug instantly set that class.
    if (p.url && p.url !== '%40me' && p.url !== 'join') {
      console.log("Slug if a")
      const classroomFromSlug = list.filter(classroom => classroom.data!.id === p.url ? true : false)[0]
      setSelectedClass(prev => classroomFromSlug)  
    } else {
      if (p.url === '%40me' || !p.url) {
        console.log("Slug if b")
        setSelectedClass(prev => ({ order: 0 }))  
      }
    }
  },[])

  useEffect(() => {
    if (selectedClass.order !== 0) {
      router.push(`/app/${selectedClass.data?.id}`)
    } else {
      router.push(`/app/@me`)
    }
  }, [selectedClass])

  return (
    <ClassListContext.Provider value={classList}>
      <SelectedClassContext.Provider value={selectedClass}>
        <UpdateSelectedClassContext.Provider value={switchClasses}>
          {p.children}
        </UpdateSelectedClassContext.Provider>
      </SelectedClassContext.Provider>
    </ClassListContext.Provider>
  );
}

// Export
// ------
export default SelectedClassContextProvider

