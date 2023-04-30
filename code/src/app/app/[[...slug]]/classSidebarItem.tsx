'use client'

import { ChatDots, ClipboardText, Hash, House, Icon, Sidebar } from "@phosphor-icons/react";
import { List, Trigger } from "@radix-ui/react-tabs";
import { ReactNode } from "react";


const ClassSidebarItem = (p: {value: string}) => {
  
  const getIcon = () => {
    if(p.value === 'Home') return <House />
    if(p.value === 'Assignment') return <ClipboardText />
    if (p.value === 'Chat') return <ChatDots />
    return <Hash weight="bold"/>
  }

  const SidebarItemIcons: { [key: string]: ReactNode } = {
    Home: <House />,
    Assignment: <ClipboardText />,
    Chat: <ChatDots />,
  }

  return (
    <Trigger value={p.value}
    className="flex flex-row w-full p-2 bg-transparent text-left text-slate-500 hover:text-slate-400 data-[state='active']:text-slate-300">
      <span className="w-8">
        {getIcon()}
      </span>
      <span>
        {p.value}
      </span>
    </Trigger>
  );
}
 
export default ClassSidebarItem;