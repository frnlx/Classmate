/**
 * All of these belongs inside shadcn's Form Field
 */
import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { Root as LabelRoot } from "@radix-ui/react-label"
import { Label } from "../Label"
import clsx from "clsx"
import { useFormField } from "./Form"



// Form Control
// - to contain input control

// <FormControl>
//   <Input />
// </FormInput>

const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return (
    <Slot
      ref={ ref }
      id={ formItemId }
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={ !!error }
      { ...props }
    />
  )
})
FormControl.displayName = "FormControl"



// Form Label
// - to provide label to input
// - usually above the input field
// - needs ID from field

// <FormLabel>Username</FormLabel>

const FormLabel = forwardRef<
  React.ElementRef<typeof LabelRoot>,
  React.ComponentPropsWithoutRef<typeof LabelRoot>
>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return (
      <Label
        ref={ ref }
        className={ clsx(error && "text-alert", className) }
        htmlFor={ formItemId }
        { ...props }
      />
    )
  }
)
FormLabel.displayName = "FormLabel"



// Form Description
// - to describe the input
// - is below the input field

const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
      <p
        ref={ ref }
        id={ formDescriptionId }
        className={ clsx("text-xs text-light0 ml-1", className) }
        { ...props }
      />
    )
  }
)
FormDescription.displayName = "FormDescription"



// Form Message
// - to show any error message

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
      return null
    }

    return (
      <p
        ref={ ref }
        id={ formMessageId }
        className={ clsx("text-xs italic font-medium text-alert leading-none", className) }
        { ...props }
      >
        - { body }
      </p>
    )
  }
)
FormMessage.displayName = "FormMessage"

export {
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}
