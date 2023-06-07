import { Arrow, Content, Portal, Provider, Root, Trigger } from "@radix-ui/react-tooltip"
import clsx from "clsx"

export default function TooltipBase(p: {
  trigger: React.ReactNode
  bold?: string
  text?: string
  children?: React.ReactNode
}) {
  return (<Provider>
    <Root
      delayDuration={ 0 }
      disableHoverableContent={ true }
    >
      <Trigger>{ p.trigger }</Trigger>
      <Portal>
        <Content
          side="right"
          className={ clsx(
            "text-white select-none rounded-[4px] m-4",
            "text-sm leading-none",
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
