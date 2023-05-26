'use client'

import { useUserClassList } from "@/api/client/user"
import { ReactElement, ReactNode, createContext, useContext, useEffect, useState } from "react"
import NavbarItemAddButton from "./NavbarItemAddButton"
import NavbarItem from "./NavbarItem"
import { useSelectedLayoutSegment } from "next/navigation"
import { Cards, ChartLine, Clipboard, HouseSimple, Icon } from "@phosphor-icons/react"



// CreateContext & UseContext
// --------------------------
const RoomContext = createContext<RoomContextType>({
  currentId: '',
  static: 'dashboard'
})
export const useRoom = () => useContext(RoomContext)

// Context Component
// -----------------
export default function Navbar (p: {
  children?: ReactNode,
}) {
  //  Fetch initial User Class List
  const { data: userClassList, isLoading } = useUserClassList()
  const selectedPage = useSelectedLayoutSegment()

  return (
    <RoomContext.Provider value={{
      // This provides List of app rooms, only contains data for UI
      //  so this doesn't have actual classroom data.
      // The function is also exposed to be able to switch room
      currentId: selectedPage ?? 'dashboard',
    }}>
      <div className="bg-zinc-950 w-24 h-screen p-5 flex flex-col gap-4">
        <ul>
          {
            staticRooms.map((pages, i) => 
              <NavbarItem
                key={i}
                routeid={pages.id}
                label={pages.id}
                icon={pages.icon}
              />
            )
          }
        </ul>
        <hr className="border-slate-700 border-1" />
        <ul className="flex flex-col gap-4">
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
  static?: staticPageNames,
}
export type AppRoom = {
  label: string,
  index: number,
  id: string,
  icon?: Icon
}





// Default Rooms

export type staticPageNames = "dashboard" | "statistics" | "classlist" | "tasks"
const staticRooms: AppRoom[] = [
  {
    label: 'My Dashboard',
    id: 'dashboard',
    index: 0,
    icon: HouseSimple
  },
  {
    label: 'My Statistics',
    id: 'stats',
    index: 1,
    icon: ChartLine
  },
  {
    label: 'My Tasks',
    id: 'tasks',
    index: 2,
    icon: Clipboard
  },
  {
    label: 'My Classrooms',
    id: 'classlist',
    index: 3,
    icon: Cards
  }
]