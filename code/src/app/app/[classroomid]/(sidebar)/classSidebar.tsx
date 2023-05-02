'use client'

import { useRoom } from "@/component/app/context/RoomContext";
import { Tab } from "@headlessui/react";
import { IconContext } from "@phosphor-icons/react";
import { ReactNode } from "react";

const ClassSidebar = (p: { children: ReactNode }) => {
  
  const { current: currentRoom } = useRoom();

  return (
    <Tab.List className="bg-slate-900 w-60 h-screen flex-shrink-0">
      <div className="font-bold leading-5 border-b p-4 pb-6 border-slate-700">
        {currentRoom.data!.name}
      </div>
      <div className="p-4 py-5">
        <IconContext.Provider
          value={{
            size: 22,
            weight: 'fill'
          }}
        >
          {p.children}
        </IconContext.Provider>
      </div>
    </Tab.List>
  );
}
 
export default ClassSidebar;