/**
 * CLassname supplied by shadcn
 */
import clsx from "clsx";
import {
  ChangeEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import { useFormField } from "../use-client/form/Form";
import { useFormContext } from "react-hook-form";
import * as Popover from "@radix-ui/react-popover";
import EmojiPickerAlfon from "./EmojiPicker";
import { getRandomClassroomEmoji } from "@/configs/emojis";
import ClassroomEmoji from "./emoji";
import { Select, SelectProps } from "@chakra-ui/react";
import { useCreateAttachment } from "@/api/client/resource";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?:
    | "text"
    | "url"
    | "email"
    | "tel"
    | "search"
    | "password"
    | "number"
    | "datetime-local";
  placeholder?: string;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  type?: "text" | "url" | "email" | "tel" | "search" | "password" | "number";
  placeholder?: string;
}

interface AttachmentProps extends TextInputProps {
  onUploaded: (attachmentId: string) => void;
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
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
TextInput.displayName = "TextInput";

const EmojiInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, ...props }, ref) => {
    const { error } = useFormField();
    const { formState } = useFormContext();
    const [displayCP, setDisplayCP] = useState<boolean>(false);

    const s = useFormContext();

    return (
      <Popover.Root
        open={displayCP}
        onOpenChange={(state) => {
          console.log(state);
          // setDisplayCP(state)
        }}
        modal
      >
        {/* <Popover.Trigger className="w-full space-y-2"> */}
        <div className="group focus-within:bg-transparent">
          <div
            className={clsx(
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
              "group-focus-within:ring-4"
            )}
            onClick={() => s.setValue("emoji", getRandomClassroomEmoji())}
            tabIndex={0}
          >
            <ClassroomEmoji text={props.value} />
          </div>
          <div className="h-48 w-full pt-2">
            <EmojiPickerAlfon onEmojiClick={(e) => s.setValue("emoji", e)} />
          </div>
          <input
            type="hidden"
            className={clsx("bg-transparent flex-grow-0 absolute hidden")}
            {...props}
          />
        </div>
      </Popover.Root>
    );
  }
);
EmojiInput.displayName = "EmojiInput";

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

const SelectInput = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    const { error } = useFormField();
    const { formState } = useFormContext();

    return (
      <Select
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
SelectInput.displayName = "SelectInput";

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

const AttachmentInput = forwardRef<HTMLInputElement, AttachmentProps>(
  ({ className, type, onUploaded, ...props }, ref) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false);
    const { mutateAsync: upload } = useCreateAttachment();

    async function uploadData(e: ChangeEvent<HTMLInputElement>) {
      setSubmitted(false);
      setError(false);
      setUploading(true);

      try {
        const file = e.target.files![0];
        const data = await toBase64(file);
        const { id } = await upload({
          filename: file.name,
          data: data,
        });
        onUploaded(id);
        setSubmitted(true);
      } catch (error: any) {
        console.error(error);
        setError(true);
      } finally {
        setUploading(false);
      }
    }

    return (
      <input
        type="file"
        className={clsx(
          // Dimensions
          "flex h-10 w-full rounded-md px-3 py-2 outline-transparent",
          // Colors
          "!bg-dark0 border ring-dark2/50 ",
          // Error
          error
            ? "border-alert focus-visible:ring-alert/30"
            : isSubmitted
            ? "border-ok focus-visible:ring-ok/30"
            : "border-dark2 focus-visible:ring-dark2/50",
          // Text
          "text-sm",
          // Animation
          "transition-all ring-0",
          // File
          "file:border-0 file:text-sm file:font-medium",
          // Placeholder
          "placeholder:text-muted-foreground",
          // Focus Visible
          "focus-visible:outline-none",
          "focus-visible:ring-4",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        disabled={uploading}
        onChange={(e) => uploadData(e)}
        {...props}
      />
    );
  }
);
AttachmentInput.displayName = "AttachmentInput";

export { TextInput, EmojiInput, TextAreaInput, SelectInput, AttachmentInput };
