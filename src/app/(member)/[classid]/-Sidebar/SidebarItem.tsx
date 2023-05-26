import { Tab } from "@headlessui/react"
import { Trigger } from "@radix-ui/react-tabs"
import { ReactNode } from "react"

export function SidebarItem(p: {
  icon: ReactNode
  label: string
  id: string
}) {
  return (
    <Trigger
      value={p.id}
      className={`flex flex-row items-center rounded-md w-full p-1 px-2 py-[8px] mt-1 text-left 
        text-slate-500 bg-transparent 
        hover:text-slate-400 hover:bg-slate-800/25
        data-[headlessui-state='selected']:text-slate-300 data-[headlessui-state='selected']:bg-slate-800/50
        focus-visible:outline-0 focus:shadow-outline`}
    >
      <span className="w-8 leading-5">{p.icon}</span>
      <span className="font-semibold leading-5">{p.label}</span>
    </Trigger>
  )
}