'use client'

import { useUserClassList } from "@/api/client/user"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import NavbarItemAddButton from "./NavbarItemAddButton"
import NavbarItem from "./NavbarItem"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import { Icon } from "@phosphor-icons/react"
import { color } from "@/lib/logger/chalk"
import clsx from "clsx"


// CreateContext & UseContext
// --------------------------
const RoomContext = createContext<RoomContextType>({
  currentId: '',
})
export const useRoom = () => useContext(RoomContext)

// Context Component
// -----------------
export default function Navbar (p: {
  children?: ReactNode,
  defaultRoom: ReactNode,
  staticRooms?: ReactNode,
}) {
  color.cyan('  `-(app) Navbar')
  //  Fetch initial User Class List
  const { data: userClassList, isLoading } = useUserClassList()
  const selectedPage = useSelectedLayoutSegment()

  const router = useRouter()

  useEffect(() => {
    if (userClassList) {
      if (userClassList.some((c) => c.id !== selectedPage)) {
        router.push('/dashboard')
      }
    }
  }, [userClassList])

  return (
    <RoomContext.Provider value={{
      currentId: selectedPage ?? 'dashboard',
    }}>
      <div className={clsx(
        "bg-dark1",                               // Navbar color
        "w-20",                                     // Navbar width
        "h-screen flex flex-col gap-4"
      )}>

        <ul className="flex flex-col gap-2 p-4">
          { p.defaultRoom }
          { p.staticRooms }
        </ul>

        <ul className="flex flex-col gap-4 p-4">
          {
            userClassList?.map((classroom, i) =>
              <NavbarItem
                key={i}
                label={classroom.name}
                routeid={classroom.id}
                inviteID={classroom.inviteID}
              />
            )
          }
          <NavbarItemAddButton />
        </ul>
        
      </div>
      {p.children}
    </RoomContext.Provider>
  );
}

export type RoomContextType = {
  currentId: string,
}
export type AppRoom = {
  label: string,
  id: string,
  icon?: Icon
}



// Default Rooms

export type staticPageNames = "dashboard" | "statistics" | "classlist" | "tasks"
// const staticRooms: AppRoom[] = [
//   {
//     label: 'My Dashboard',
//     id: 'dashboard',
//     icon: HouseSimple
//   },
//   {
//     label: 'My Statistics',
//     id: 'stats',
//     icon: ChartLine
//   },
//   {
//     label: 'My Tasks',
//     id: 'tasks',
//     icon: Clipboard
//   },
//   {
//     label: 'My Classrooms',
//     id: 'classlist',
//     icon: Cards
//   }
// ]