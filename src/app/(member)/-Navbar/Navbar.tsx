'use client'

import { useUserClassList } from "@/api/client/user"
import { ReactNode } from "react"
import NavbarItemAddButton from "./NavbarItemAddButton"
import NavbarItem from "./NavbarItem"
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation"
import clsx from "clsx"
import { Classroom } from "@prisma/client"
import { createReactContext } from "@/lib/react"


// CreateContext & UseContext
// --------------------------
const {
  provider: RoomContextProvider,
  hook: useRoom
} = createReactContext({ currentId: '' })


// Context Component
// -----------------
export default function Navbar (p: {
  children?: ReactNode,
  defaultRoom: ReactNode,
  staticRooms?: ReactNode,
  prefetchedClasslist?: Classroom[]
}) {

  //  Fetch initial User Class List
  const { data: userClassList, isLoading } = useUserClassList(p.prefetchedClasslist)

  // Get context from route segment
  const childSegment = useSelectedLayoutSegment()
  const childChildSegment = useSelectedLayoutSegments()[1]
  const selectedPage = childSegment === '(static)' ? childChildSegment : childSegment

  const contextValue = { currentId: selectedPage ?? 'dashboard' }

  return (
    <RoomContextProvider value={ contextValue }>
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
    </RoomContextProvider>
  );
}

export { useRoom }
