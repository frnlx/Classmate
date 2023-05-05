'use client'

import { usePage } from "@/app/app/[classroomid]/PageContext";
import { useRoom } from "@/app/app/(providers)/RoomContext";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const ClassPageClientHandler = (p: { children: ReactNode, params: any }) => {
  
  const room = useRoom()
  const page = usePage()
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter()
  const classid = p.params['classroomid']
  console.log("Params")
  console.log(classid)

  useEffect(() => {
    if (room.list.length > 1) {
      if (classid === 'me') {
        return router.push('/app/me')
      }
      const res = room.switch(classid);
      if (res) {
        setLoading(false)
      } else {
        return router.push('/app/me')
      }
    }
  },[room.list])
  // The dependencies are required if User acecss directly via link.

  return (
    !loading ?
      <Tab.Group
        manual
        vertical
        defaultIndex={0}
        as={'div'}
        className="flex flex-grow-1 w-full"
        selectedIndex={page.current.index}
        onChange={(index) => {
          router.push(`/app/${room.current.id}/${page.list[index].id}`)
        }}
      >
        {p.children}
      </Tab.Group> : null
  );
}
 
export default ClassPageClientHandler;