"use client"
/**
 * Label UI from shadcn UI and radix UI
 */
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import clsx from "clsx"

// const labelVariants = cva(
//   "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// )

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
  // & VariantProps<typeof labelVariants>
>(({className, ...props}, ref) => (
  <LabelPrimitive.Root
    ref={ ref }
    className={ clsx(
      className,
      "uppercase font-black text-light0",
      "text-[10px] ml-1 leading-none",
      //peer disabled
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    ) }
    { ...props }
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
