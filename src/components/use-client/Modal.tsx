'use client'
import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from "@radix-ui/react-dialog"
import clsx from "clsx"
import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from "react"

type ModalSize = "sm" | "md" | "lg" | "xl" | "4xl"

// const ModalBase2 = forwardRef(
//   (p: {
//     trigger?: ReactNode
//     title: string
//     desc?: string
//     children?: ReactNode
//     content?: (
//       Button: typeof ModalButton
//     ) => JSX.Element
//     open?: boolean
//     onChange?: (state: boolean) => void
//     size?: ModalSize
//   }, ref) => {
//   return (
//     <Root
//       open={ p.open }
//       onOpenChange={ p.onChange }
//     >
//       <Trigger asChild>
//         { p.trigger }
//       </Trigger>
//       <Portal>

//         <Overlay className="bg-black/80 data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide fixed inset-0" />

//         <Content className={ clsx(
//           // appearance
//           "rounded-2xl bg-dark1 focus:outline-none overflow-hidden",
//           // responsive width
//           "w-full",
//           p.size === undefined && "max-w-sm",
//           p.size === "sm" && "max-w-sm",
//           p.size === "md" && "max-w-md",
//           p.size === "lg" && "max-w-lg",
//           p.size === "xl" && "max-w-xl",
//           // shadow
//           "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]", //shadow
//           // animation
//           "data-[state=open]:animate-contentShow",
//           "data-[state=closed]:animate-contentHide",
//           // center position
//           "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//         ) }>

//           <div className="p-6 pt-6">

//             <header className="mb-4 p-2 text-center">
//               <Title className="font-semibold text-xl text-white m-0 mb-0.5">
//                 { p.title }
//               </Title>

//               <Description className="text-sm text-light1">
//                 { p.desc }
//               </Description>
//             </header>

//             { p.children }

//           </div>
//         </Content>
//       </Portal>
//     </Root>
//   )
//   }
// )
// ModalBase2.displayName = 'ModalBase'

export function ModalBase(p: {
  trigger?: ReactNode
  title: string
  desc?: string
  children?: ReactNode
  content?: (
    Button: typeof ModalButton
  ) => JSX.Element
  open?: boolean
  onChange?: (state: boolean) => void
  size?: ModalSize
  className?: string
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
          "w-full",
          p.size === undefined && "max-w-sm",
          p.size === "sm" && "max-w-sm",
          p.size === "md" && "max-w-md",
          p.size === "lg" && "max-w-lg",
          p.size === "xl" && "max-w-xl",
          p.size === "4xl" && "max-w-4xl",
          // shadow
          "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]", //shadow
          // animation
          "data-[state=open]:animate-contentShow",
          "data-[state=closed]:animate-contentHide",
          // center position
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        ) }>

          <div className={ clsx("p-6 pt-6", p.className) }>

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


interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  onClick: () => void
  primary?: boolean
  submit?: boolean
  reset?: boolean
  disabled?: boolean
  danger?: boolean
}

const ModalButton = forwardRef<HTMLButtonElement, ModalButtonProps>(
  (p, ref) => (
    <button
      ref={ ref }
      disabled={ p.disabled ?? false }
      type={ p.submit ? "submit" : p.reset ? "reset" : "button" }
      onClick={ p.onClick }
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
          p.className
        ) : p.danger ?
          clsx(
            "text-whiter bg-alert px-8",
            "hover:shadow-[0_0_20px_-3px_#ff3333]",
            "hover:shadow-alert",
            "active:brightness-90",
            p.className
          ) : clsx(
            "text-light1",
            "hover:text-light0 hover:bg-light2/20",
            "active:brightness-125",
            p.className
          )
      ) }>
      { p.label }
    </button>
  )
)
ModalButton.displayName = 'ModalButton'

export { ModalButton }

// export function ModalButton(p: {
//   label: string
//   onClick: () => void
//   primary?: boolean
//   submit?: boolean
//   reset?: boolean
//   disabled?: boolean
// }) {
//   return (
//     <button
//       disabled={p.disabled ?? false}
//       type={ p.submit ? "submit" : p.reset ? "reset" : "button"}
//       onClick={p.onClick}
//       className={ clsx(
//         //Size and Dimensino
//         "p-2.5 px-5 rounded-md brightness-100",
//         //Font
//         "text-xs font-semibold",
//         //Animation
//         "transition-all duration-200",
//         //Allignment
//         "inline-flex items-center justify-center",
//         //Disabled
//         "disabled:cursor-not-allowed",
//         "disabled:opacity-50",
//         "disabled:shadow-none",
//         p.primary ? clsx(
//           "text-whiter bg-ok px-8",
//           // "hover:brightness-75",
//           "hover:shadow-[0_0_20px_-3px_#008E5A]",
//           "hover:shadow-ok",
//           "active:brightness-90",
//           // "disabled:grayscale",
//           "disabled:hover:brightness-100",
//         ) : clsx(
//           "text-light1",
//           "hover:text-light0 hover:bg-light2/20",
//           "active:brightness-125"
//         )
//     )}>
//       {p.label}
//     </button>
//   )
// }

export function ConfirmModal(p: {
  title: string
  desc: string
  open: boolean
  onChange: (open: boolean) => void
  onConfirm: () => unknown
  children: React.ReactNode
  approveMode?: boolean
}) {
  return <ModalBase
    trigger={ p.children
    }
    title={ p.title }
    desc={ p.desc }
    open={ p.open }
    onChange={ p.onChange }
  >
    <div className="flex flex-row space-x-2 justify-center">
      <button
        className="rounded-md bg-dark2 px-4 py-2 hover:bg-light2 transition-all duration-150"
        onClick={ () => p.onChange(false) }
      >
        No
      </button>
      { p.approveMode ? (
        <button
          className="rounded-md bg-ok bg-opacity-80 px-4 py-2 hover:bg-opacity-100 transition-all duration-150"
          onClick={ p.onConfirm }
        >
          Yes
        </button>) : (
        <button
          className="rounded-md bg-alert bg-opacity-80 px-4 py-2 hover:bg-opacity-100 transition-all duration-150"
          onClick={ p.onConfirm }
        >
          Yes
        </button>
      ) }
    </div>
  </ModalBase>
}