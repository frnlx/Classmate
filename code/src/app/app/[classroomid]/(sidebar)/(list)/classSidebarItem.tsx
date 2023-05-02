'use client'

import { Tab } from "@headlessui/react";
import { ChatDots, ClipboardText, Hash, House, Icon, Sidebar } from "@phosphor-icons/react";
import { ReactNode } from "react";


const ClassSidebarItem = (p: {value: string}) => {
  
  const getIcon = () => {
    if(p.value === 'Home') return <House />
    if(p.value === 'Assignment') return <ClipboardText />
    if (p.value === 'Chat') return <ChatDots />
    return <Hash weight="bold"/>
  }

  return (
    <Tab value={p.value}
    className="flex flex-row w-full p-2 bg-transparent text-left text-slate-500 hover:text-slate-400 data-[headlessui-state='selected']:text-slate-300">
      <span className="w-8">
        {getIcon()}
      </span>
      <span>
        {p.value}
      </span>
    </Tab>
  );
}
 
export default ClassSidebarItem;