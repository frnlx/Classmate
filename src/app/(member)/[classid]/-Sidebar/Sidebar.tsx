'use client'
import { useClassroomQuery } from "@/api/client/classroom";
import { Tab } from "@headlessui/react";
import { ReactNode } from "react";
import { useRoom } from "./Pages";
import { List } from "@radix-ui/react-tabs";

export default function Sidebar(p: {
  children: ReactNode
}) {
  return (
    <List className='bg-zinc-950 w-60 h-screen flex-shrink-0 pr-4'>
      <SidebarHeader/>
      <div className="py-2">
        {p.children}
      </div>

    </List>
  )
}

function SidebarHeader() {
  const { currentid } = useRoom()
  const { data } = useClassroomQuery( currentid )
  return (
    <div className="font-bold leading-5 border-b py-4 pb-6 border-slate-700">
      { data ? data.name : 'loading...'}
    </div>
  )
}
