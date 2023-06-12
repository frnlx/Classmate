/**
 * CLassname supplied by shadcn
 */
import clsx from "clsx"
import { InputHTMLAttributes, forwardRef } from "react"
import { useFormField } from "../use-client/form/Form"
import { useFormContext } from "react-hook-form"

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "url" | "email" | "tel" | "search" | "password" | "number"
  placeholder?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, type, ...props }, ref) => {

    const { error, } = useFormField()
    const { formState } = useFormContext()

    return (
      <input
        type={ type ?? "text" }
        className={ clsx(
          // Dimensions
          "flex h-10 w-full rounded-md px-3 py-2 outline-transparent",
          // Colors
          "bg-dark0 border ring-offset-dark1 ring-dark2/50",
          // Error
          error ? "border-alert focus-visible:ring-alert/30" :
            formState.isSubmitted ? "border-ok focus-visible:ring-ok/30"
              : "border-dark2 focus-visible:ring-dark2/50",
          // Text
          "text-sm",
          // Animation
          "transition-all ring-0",
          // File
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          // Placeholder
          "placeholder:text-muted-foreground",
          // Focus Visible
          "focus-visible:outline-none",
          "focus-visible:ring-4",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50"
        ) }
        { ...props }
      />
    )
  }
)
TextInput.displayName = "TextInput"

export { TextInput }