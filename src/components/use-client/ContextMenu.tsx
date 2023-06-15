'use client'

import { Content, Portal, Root, Trigger } from "@radix-ui/react-context-menu"
import clsx from "clsx"

export function ContextMenuBase(p: {
  children: React.ReactNode // the content of the context menu. Fill with Item
  trigger: React.ReactNode // the children of trigger, like the actual object.
}) {
  return (
    <Root>
      {/** the children of trigger, like the actual object that
       * responsds to right click
       */}
      <Trigger>{p.trigger}</Trigger>

      {/** the content of the context menu. Fill with Item 
       * It will portal to root element so it display on top
      */}
      <Portal>
        <Content className={clsx(
          'bg-black',
          'min-w-[220px] rounded-md overflow-hidden',
          'p-1.5',
          'shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]',
          'origin-top-left',
          'animate-[contextMenuAnimation_150ms_ease-out]',
          'relative'
        )}>
          {p.children}
        </Content>
      </Portal>
    </Root>
  )
}

import { Item } from "@radix-ui/react-context-menu"






export function ContextMenuItem(p: {
  children: React.ReactNode
  shortcut?: string
  disabled?: boolean
  icon?: React.ReactNode
  onClick?: () => void
}) {
  return (
    <Item
      className={clsx(
        "group",
        "rounded-sm flex items-center h-[25px] py-4 px-1.5 relative",
        "select-none outline-none",
        "text-slate-300 text-sm leading-none",
        "data-[disabled]:text-slate-600 data-[disabled]:pointer-events-none",
        "data-[highlighted]:bg-dark1 data-[highlighted]:text-slate-50",
        "cursor-pointer"
      )}
      disabled={ p.disabled }
      onClick={ p.onClick }
    >
      <div className="w-6 text-light0 text-base">{p.icon}</div>
      { p.children }
      {
        p.shortcut ?
          <div className={clsx(
            "ml-auto",
            "text-white",
            "group-data-[highlighted]:text-white",
            "group-data-[disabled]:text-slate-600"
          )}>
            { p.shortcut }
          </div>
        : null
      }
    </Item>
  )
}