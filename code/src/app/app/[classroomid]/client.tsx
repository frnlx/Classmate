'use client'

import PageContextProvider, { usePage } from "@/component/app/context/PageContext";
import { useRoom } from "@/component/app/context/RoomContext";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const ClassPageClientHandler = (p: { children: ReactNode, params: any }) => {
  
  const room = useRoom()
  const page = usePage()
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter()

  useEffect(() => {
    if (room.list.length > 1) {
      console.log('Test')
      const res = room.switch(p.params['classroomid']);
      if (res) {
        console.log("yes?")
        setLoading(false)
      } else {
        console.log("no?")
        router.push('/app/me')
      }
    }
  },[room.list])
  // The dependencies are required if User acecss directly via link.

  return (
    loading ?
      <></>
      :
      <>
        <Tab.Group
          manual
          vertical
          defaultIndex={0}
          as={'div'}
          className="flex"
          selectedIndex={page.current.index}
          onChange={(index) => {
            router.push(`/app/${room.current.id}/${page.list[index].id}`)
          }}
        >
          {p.children}
        </Tab.Group>
      </>
  );
}
 
export default ClassPageClientHandler;