'use client'

import { Trash, TrashSimple } from "@phosphor-icons/react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { ReactNode } from "react";

const Item = (p: {
  children: ReactNode,
  shortcut?: string,
  disabled?: boolean,
  icon?: ReactNode,
  onClick?: () => void
}) => {
  return (
    <ContextMenu.Item
      className="group text-sm leading-none text-slate-300 rounded-sm flex items-center h-[25px] py-4 px-2 relative select-none outline-none data-[disabled]:text-slate-600 data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-700 data-[highlighted]:text-slate-50"
      disabled={p.disabled}
      onClick={p.onClick}
    >
      <div className="w-6 text-slate-400 ">
        {p.icon}
      </div>
      {p.children}
      {p.shortcut ? <div className="ml-auto text-slate-400 group-data-[highlighted]:text-white group-data-[disabled]:text-slate-600">{ p.shortcut }</div> : null}
    </ContextMenu.Item>
  );
}
 
export default Item;