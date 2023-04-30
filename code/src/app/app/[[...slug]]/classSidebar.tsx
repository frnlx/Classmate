'use client'

import { useSelectedClass } from "@/component/app/context/ClassContext";
import { IconContext } from "@phosphor-icons/react";
import { List } from "@radix-ui/react-tabs";
import { ReactNode } from "react";

const ClassSidebar = (p: { children: ReactNode }) => {
  
  const selectedClass = useSelectedClass()

  return (
    <List className="bg-slate-900 w-60 h-screen flex-shrink-0">
      <div className="font-bold leading-5 border-b p-4 pb-6 border-slate-700">
        {selectedClass.data!.name}
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
    </List>
  );
}
 
export default ClassSidebar;