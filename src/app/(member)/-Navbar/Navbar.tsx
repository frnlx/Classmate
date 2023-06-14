'use client'

import { useUserClassList } from "@/api/client/user"
import { ReactNode, useEffect, useState } from "react"
import NavbarItemAddButton from "./NavbarItemAddButton"
import NavbarItem from "./NavbarItem"
import { notFound, useRouter, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation"
import clsx from "clsx"
import { Category, Classroom, User } from "@prisma/client"
import { createReactContext } from "@/lib/react"
import { QueryClient, useQuery } from "@tanstack/react-query"
import { ClientAPI } from "@/api/client/api"
import Link from "next/link"


// CreateContext & UseContext
// --------------------------
const {
  provider: RoomContextProvider,
  hook: useRoom
} = createReactContext({
  currentId: '',
  userData: {} as UserData
})

export function invalidateClasslist(qc: QueryClient) {
  qc.invalidateQueries(['classlist'])
}

// Context Component
// -----------------
export default function Navbar(p: {
  children?: ReactNode,
  defaultRoom: ReactNode,
  staticRooms?: ReactNode,
  prefetchedUserData: UserData
}) {

  //  Fetch initial User Class List
  // const { data: userClassList, isLoading } = useUserClassList(p.prefetchedUserData.classes)

  const { data: classlist } = useQuery({
    queryKey: ['classlist'],
    queryFn() {
      return ClientAPI.getClassroomList({ userid: p.prefetchedUserData.id })
    },
    initialData: p.prefetchedUserData.classes
  })

  // Get context from route segment
  const childSegment = useSelectedLayoutSegment() // get current class id
  const childChildSegment = useSelectedLayoutSegments()[1] // to get static pages
  const selectedPage = childSegment === '(static)' ? childChildSegment : childSegment

  // check if current id is in userdata
  const router = useRouter()
  const [found, setFound] = useState<boolean | null>(null) 
  const chidlsegments = useSelectedLayoutSegments()
  useEffect(() => {
    // console.log(childSegment)
    // console.log(p.prefetchedUserData.classes.some(c => c.id === childSegment))
    if (childSegment !== '(static)' && !classlist.some(c => c.id === childSegment)) {
      console.log(false)
      setFound(false)
    } else {
      console.log(true)
      setFound(true)
    }
  }, [childSegment, classlist])


  const contextValue = { currentId: selectedPage ?? 'dashboard', userData: p.prefetchedUserData }

  return (
    <RoomContextProvider value={ contextValue }>
      
      <div className={ clsx(
        "bg-dark1 w-20",
        "h-screen flex flex-col gap-4"
      ) }>
        <ListGroup>
          { p.defaultRoom }
          { p.staticRooms }
        </ListGroup>

        <ListGroup>
          <ClassList list={ classlist } />
          <NavbarItemAddButton />
        </ListGroup>

      </div>
      
      {
        found === null ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div>
              Loading Classroom...
            </div>
          </div>
        ) : found === false ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="font-semibold">
              Classroom not found!
            </div>
            <Link href="/dashboard">Go back to my Dashboard</Link>
              
          </div>
        ) : p.children
      }
    </RoomContextProvider>
  )
}

export { useRoom }

function ListGroup(p: { children: ReactNode }) {
  return (
    <ul className="flex flex-col gap-2 p-4">
      { p.children }
    </ul>
  )
}

function ClassList(p: { list?: Classroom[] }) {


  return (
    <>
      { p.list?.map(classroom =>
        <NavbarItem
          key={ classroom.id }
          label={ classroom.name }
          routeid={ classroom.id }
          inviteID={ classroom.inviteID }
        />
      ) }
    </>
  )
}



export type UserData = User & {
  classes: (Classroom & {
    categories: Category[]
  })[]
}