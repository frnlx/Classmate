'use client'
import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from "@radix-ui/react-dialog"
import clsx from "clsx"
import React, { ReactNode } from "react"


export function ModalBase(p: {
  trigger?: ReactNode
  title: string
  desc?: string
  children?: ReactNode
  // footer?: (
  //   Footer: (p: { children?: ReactNode }, close: ReactNode) => JSX.Element,
  //   Button: typeof ModalButton 
  // ) => JSX.Element
  content?: (
    Button: typeof ModalButton
  ) => JSX.Element
  open?: boolean
  onChange?: (state: boolean) => void
}) {
  return (
    <Root
      open={ p.open }
      onOpenChange={ p.onChange }
    >
      <Trigger asChild>
        { p.trigger }
      </Trigger>
      <Portal>

        <Overlay className="bg-black/80 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide fixed inset-0" />

        <Content className={ clsx(
          // appearance
          "rounded-2xl bg-dark1 focus:outline-none overflow-hidden",
          // responsive width
          "w-full max-w-sm",
          // shadow
          "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]", //shadow
          // animation
          "data-[state=open]:animate-contentShow",
          "data-[state=closed]:animate-contentHide",
          // center position
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        ) }>

          <div className="p-6 pt-6">

            <header className="mb-4 p-2 text-center">
              <Title className="font-semibold text-xl text-white m-0 mb-0.5">
                { p.title }
              </Title>

              <Description className="text-sm text-light1">
                { p.desc }
              </Description>
            </header>

            { p.children }

          </div>
        </Content>
      </Portal>
    </Root>
  )
}

export function ModalButton(p: {
  label: string
  onClick: () => void
  primary?: boolean
  submit?: boolean
  reset?: boolean
  disabled?: boolean
}) {
  return (
    <button
      disabled={p.disabled ?? false}
      type={ p.submit ? "submit" : p.reset ? "reset" : "button"}
      onClick={p.onClick}
      className={ clsx(
        //Size and Dimensino
        "p-2.5 px-5 rounded-md brightness-100",
        //Font
        "text-xs font-semibold",
        //Animation
        "transition-all duration-200",
        //Allignment
        "inline-flex items-center justify-center",
        //Disabled
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "disabled:shadow-none",
        p.primary ? clsx(
          "text-whiter bg-ok px-8",
          // "hover:brightness-75",
          "hover:shadow-[0_0_20px_-3px_#008E5A]",
          "hover:shadow-ok",
          "active:brightness-90",
          // "disabled:grayscale",
          "disabled:hover:brightness-100",
        ) : clsx(
          "text-light1",
          "hover:text-light0 hover:bg-light2/20",
          "active:brightness-125"
        )
    )}>
      {p.label}
    </button>
  )
}

const cl = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"