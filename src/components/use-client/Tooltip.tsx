import { Arrow, Content, Portal, Provider, Root, Trigger } from "@radix-ui/react-tooltip"
import clsx from "clsx"
import { ReactNode } from "react"

export function ButtonTooltip(p: {
  label: string
  children: ReactNode
}) {
  return (
    <TooltipBase
      trigger={ p.children }
      className="m-2 text-xs"
    >
      {p.label}
    </TooltipBase>
  )
}


export default function TooltipBase(p: {
  trigger: React.ReactNode
  bold?: string
  text?: string
  children?: React.ReactNode
  side?: "left" | "right" | "top" | "bottom"
  className?: string
}) {
  return (<Provider>
    <Root
      delayDuration={ 0 }
      disableHoverableContent={ true }
    >
      <Trigger asChild>{ p.trigger }</Trigger>
      <Portal>
        <Content
          side={p.side ?? "top"}
          className={ clsx(
            p.className,
            "text-white select-none rounded-[4px]",
            "text-sm leading-none font-semibold",
            "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]",
            "will-change-[transform,opacity]",
            "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
            "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
            "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade",
            "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
          )}
        >
          <Arrow />
          { p.bold ? <span></span> : null }
          <div className="px-3 py-2 bg-black rounded-[4px]">
            { p.children }
          </div>
        </Content>

      </Portal>
    </Root>
  </Provider>)
}
