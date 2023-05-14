'use client'

import { useRoom } from "@/app/app/(Navbar)/RoomContext";
import { Tab } from "@headlessui/react";
import { IconContext } from "@phosphor-icons/react";
import { ReactNode } from "react";

const Sidebar = (p: { children: ReactNode }) => {
  
  const { current: currentRoom } = useRoom();

  return (
    <Tab.List className="bg-zinc-950 w-60 h-screen flex-shrink-0 pr-4">
      <div className="font-bold leading-5 border-b py-4 pb-6 border-slate-700">
        {currentRoom.data!.name}
      </div>
      <div className="py-2">
        <IconContext.Provider
          value={{
            size: 20,
            weight: 'fill'
          }}
        >
          {p.children}
        </IconContext.Provider>
      </div>
    </Tab.List>
  );
}
 
export default Sidebar;