import { Content, Description, Overlay, Portal, Root, Title, Trigger } from "@radix-ui/react-dialog"
import clsx from "clsx"
import React, { ReactNode } from "react"


export function ModalBase(p: {
  trigger: ReactNode
  title: string
  desc: string
  children?: ReactNode
  footer: (
    footer: (p: { children?: ReactNode },
    close: ReactNode
  ) => JSX.Element) => JSX.Element
}) {
  return (
    <Root>
      <Trigger>
        { p.trigger }
      </Trigger>
      <Portal>

        <Overlay className="bg-black/80 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide fixed inset-0" />

        <Content className={ clsx(
          // appearance
          "rounded-[6px] bg-dark1 p-7 focus:outline-none",
          // responsive width
          "w-full max-w-lg",
          // shadow
          "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]", //shadow
          // animation
          "data-[state=open]:animate-contentShow",
          "data-[state=closed]:animate-contentHide",
          // center position
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        ) }>

          <header className="mb-4">
            <Title className="font-semibold text-xl text-white m-0 mb-2">
              { p.title }
            </Title>

            <Description className="text-sm text-light1">
              { p.desc }
            </Description>
          </header>

          { p.children }
          
          { p.footer(
            (p: { children?: ReactNode }) => <div className="mt-9 flex justify-end bg-black">
              { p.children }
            </div>,

          ) }
          
        </Content>
      </Portal>
    </Root>
  )
}