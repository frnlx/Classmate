import { X } from "@phosphor-icons/react"
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

            {/* { p.content ? p.content(ModalButton) : null} */}
            
          </div>
          
          {/* { p.footer ? p.footer(
            (p: { children?: ReactNode }) =>
              <div className="p-5 flex justify-end bg-dark2/20">
                { p.children }
              </div>,
            ModalButton
          ) : null } */}
          
          {/* <Close asChild>
            <button className={ clsx(
              "text-light0 p-2 absolute top-4 right-4 inline-flex appearance-none rounded-md focus:shadow-[0_0_0_2px] focus:outline-none",
              "hover:text-white hover:bg-dark2/50"
            ) }>
              <X weight="bold" />
            </button>
          </Close> */}

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
}) {
  return (
    <button
      type={ p.submit ? "submit" : p.reset ? "reset" : "button"}
      onClick={p.onClick}
      className={ clsx(
        "p-2.5 px-5 text-sm font-semibold rounded-lg transition-all duration-200",
        p.primary ? clsx(
          "text-whiter bg-ok px-8",
          "hover:brightness-75",
          "active:brightness-50"
        ) : clsx(
          "text-light1",
          "hover:text-light0 hover:bg-light2/20",
          "active:brightness-110"
        )
    )}>
      {p.label}
    </button>
  )
}