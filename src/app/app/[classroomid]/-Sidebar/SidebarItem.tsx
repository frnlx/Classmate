'use client'

import { Tab } from "@headlessui/react";
import { ChatDots, ClipboardText, Hash, House, Icon, Sidebar } from "@phosphor-icons/react";
import CategoryItemContextMenu from "./CategoryContextMenu";
import { Category } from "@prisma/client";


const SidebarItem = (p: {value: string, category?: Category}) => {
  
  const getIcon = () => {
    if(p.value === 'Home') return <House />
    if(p.value === 'Assignment') return <ClipboardText />
    if (p.value === 'Chat') return <ChatDots />
    return <Hash weight="bold"/>
  }

  return (
    <CategoryItemContextMenu category={p.category}>
      <Tab value={p.value}
        className={`flex flex-row items-center rounded-md w-full p-1 px-2 py-[8px] mt-1 text-left 
        text-slate-500 bg-transparent 
        hover:text-slate-400 hover:bg-slate-800/25
        data-[headlessui-state='selected']:text-slate-300 data-[headlessui-state='selected']:bg-slate-800/50
        focus-visible:outline-0 focus:shadow-outline`}>
        <span className="w-8 leading-5">
          {getIcon()}
        </span>
        <span className="font-semibold leading-5">
          {p.value}
        </span>
      </Tab>
    </CategoryItemContextMenu>
  );
}
 
export default SidebarItem;