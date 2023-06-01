'use client'

import { useUserClassList } from "@/api/client/user"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import NavbarItemAddButton from "./NavbarItemAddButton"
import NavbarItem from "./NavbarItem"
import { useRouter, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation"
import { Icon } from "@phosphor-icons/react"
import { color } from "@/lib/logger/chalk"
import clsx from "clsx"
import { Classroom } from "@prisma/client"


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
  prefetchedClasslist?: Classroom[]
}) {
  // color.cyan('  `-(app) Navbar')
  //  Fetch initial User Class List
  const { data: userClassList, isLoading } = useUserClassList(p.prefetchedClasslist)

  // Get context from route segment
  const childSegment = useSelectedLayoutSegment()
  const childChildSegment = useSelectedLayoutSegments()[1]
  const selectedPage = childSegment === '(static)' ? childChildSegment : childSegment

  return (
    <RoomContext.Provider value={ {
      // Provide context of current selected classroom id to child component
      currentId: selectedPage ?? 'dashboard',
    }}>
      <div className={clsx(
        "bg-dark1 w-20",                      
        "h-screen flex flex-col gap-4"
      ) }>

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