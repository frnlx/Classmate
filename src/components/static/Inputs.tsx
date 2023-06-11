/**
 * CLassname supplied by shadcn
 */
import clsx from "clsx"
import { InputHTMLAttributes, forwardRef } from "react"
import { useFormField } from "../use-client/form/Form"

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "url" | "email" | "tel" | "search" | "password" | "number"
  placeholder?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, type, ...props }, ref) => {

    const { error } = useFormField()


    return (
      <input
        type={ type ?? "text" }
        className={ clsx(
          // Dimensions
          "flex h-10 w-full rounded-md px-3 py-2",
          // Colors
          "bg-transparent border border-light1 ring-offset-transparent",
          // Error
          error ? "border-alert" : "border-light1",
          // Text
          "text-sm",
          // File
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          // Placeholder
          "placeholder:text-muted-foreground",
          // Focus Visible
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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