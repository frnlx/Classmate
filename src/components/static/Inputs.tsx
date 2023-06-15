/**
 * CLassname supplied by shadcn
 */
import clsx from "clsx"
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useState } from "react"
import { useFormField } from "../use-client/form/Form"
import { useFormContext } from "react-hook-form"
import * as Popover from '@radix-ui/react-popover'
import EmojiPickerAlfon from "./EmojiPicker"
import { getRandomClassroomEmoji } from "@/configs/emojis"
import ClassroomEmoji from "./emoji"

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "url" | "email" | "tel" | "search" | "password" | "number";
  placeholder?: string;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  type?: "text" | "url" | "email" | "tel" | "search" | "password" | "number";
  placeholder?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, type, ...props }, ref) => {
    const { error } = useFormField();
    const { formState } = useFormContext();

    return (
      <input
        type={type ?? "text"}
        className={clsx(
          // Dimensions
          "flex h-10 w-full rounded-md px-3 py-2 outline-transparent",
          // Colors
          "!bg-dark0 border ring-dark2/50 ",
          // Error
          error
            ? "border-alert focus-visible:ring-alert/30"
            : formState.isSubmitted
            ? "border-ok focus-visible:ring-ok/30"
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
        )}
        {...props}
      />
    );
  }
);
TextInput.displayName = "TextInput";

const EmojiInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, ...props }, ref) => {

    const { error } = useFormField()
    const { formState } = useFormContext()
    const [displayCP, setDisplayCP] = useState<boolean>(false)

    const s = useFormContext()

    return (
      <Popover.Root
        open={ displayCP }
        onOpenChange={ (state) => {
          console.log(state)
          // setDisplayCP(state)
        } }
        modal

      >
        {/* <Popover.Trigger className="w-full space-y-2"> */ }
        <div className="group focus-within:bg-transparent">
          <div
            className={ clsx(
              // Dimensions
              "m-auto flex w-16 h-16 rounded-full text-center items-center justify-center",
              // Colors
              "bg-dark0",
              "border",
              "ring-offset-dark1 ring-dark2/50",
              // Hover
              "hover:bg-dark1 cursor-pointer select-none",
              "outline-transparent",
              "transition-all ring-0",
              "ring-dark2/50",
              "group-focus-within:ring-dark2/50",
              "group-focus-within:outline-none",
              "group-focus-within:ring-4",
            ) }
            onClick={ () => s.setValue('emoji', getRandomClassroomEmoji()) }
            tabIndex={ 0 }
          >


            <ClassroomEmoji text={props.value} />



          </div>
          <div className="h-48 w-full pt-2">
            <EmojiPickerAlfon
              onEmojiClick={ (e) => s.setValue('emoji', e) }
            />
          </div>
          <input
            type="hidden"
            className={ clsx(
              "bg-transparent flex-grow-0 absolute hidden",
            ) }
            { ...props }
          />
        </div >
      </Popover.Root>
    )
  }
)
EmojiInput.displayName = "EmojiInput"

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, type, ...props }, ref) => {
    const { error } = useFormField();
    const { formState } = useFormContext();

    return (
      <textarea
        className={clsx(
          // Dimensions
          "flex w-full rounded-md px-3 py-2 outline-transparent",
          // Colors
          "bg-dark0 border ring-offset-dark1 ring-dark2/50",
          // Error
          error
            ? "border-alert focus-visible:ring-alert/30"
            : formState.isSubmitted
            ? "border-ok focus-visible:ring-ok/30"
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
        )}
        {...props}
      />
    );
  }
);
TextAreaInput.displayName = "TextAreaInput";


export { TextInput, EmojiInput, TextAreaInput }
