'use client'

import { usePage } from "@/app/app/[classroomid]/PageContext";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useRoom } from "../-Navbar/RoomContext";

// This component sets the state of the Navbar from the given url parameter.
const ClassPageClientHandler = (p: { children: ReactNode, params: any }) => {
  
  // Required to get the selected room id and to get the id of the selected page later.
  const room = useRoom()
  const page = usePage()

  const router = useRouter()
  const classid = p.params['classroomid']

  // This is required to set the state of the Navbar, which belong to the parent Layout
  //  parent layout doesn't have access to classroomid params hence it must be done in context.
  useEffect(() => {
    if (room.list.length > 1) {
      const res = room.switch(classid);
      if (res) {
        // If class is found... do nothing
      } else {
        // If class not found, redirect to /me room
        return router.push('/app/me')
      }
    }
  },[room.list])
  // The dependencies are required if User acecss directly via link.

  return (
    <Tab.Group
      manual
      vertical
      defaultIndex={0}
      as={'div'}
      className="flex flex-grow-1 w-full"
      selectedIndex={page.current.index}
      onChange={(index) => {
        page.switch(page.list[index].id)
        router.push(`/app/${room.current.id}/${page.list[index].id}`)
      }}
    >
      {p.children}
    </Tab.Group>
  );
}
 
export default ClassPageClientHandler;