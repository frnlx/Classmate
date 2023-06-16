'use client'
/**
 * Form component supplied by shadcn UI and radix UI
 * some of the component are modified to suit the coding style of this project
 */
import { createReactContext } from "@/lib/react"
import clsx from "clsx"
import { HTMLAttributes, ReactNode, forwardRef, useContext, useId } from "react"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  UseFormReturn,
  useFormContext
} from "react-hook-form"



// Root Form
// - gives form context to inputs

const Form = FormProvider

// export default function Form<T extends FieldValues>(p: {
//   form: UseFormReturn<T>,
//   onSubmit: any,
//   children: ReactNode
// }) {

//   return (
//     <FormProvider { ...p.form }>
//       <form onSubmit={ p.form.handleSubmit(p.onSubmit) }>
//         { p.children }
//       </form>
//     </FormProvider>
//   )
// }



// Form Items
// - responsible for creating unique id for every item

type FormItemContextValue = { id: string }

const {
  provider: FormItemContextProvider,
  context: FormItemContext
} = createReactContext<FormItemContextValue>({} as FormItemContextValue)

const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(
  ({ className, ...props }, ref) => {
    const id = useId()
    return (
      <FormItemContextProvider value={ { id } }>
        <div ref={ ref } className={ clsx("space-y-1", className) } { ...props } />
      </FormItemContextProvider>
    )
  }
)
FormItem.displayName = "FormItem"



// Form Fields
// - responsible for giving name for every fields

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const {
  context: FormFieldContext,
  provider: FormFieldContextProvider
} = createReactContext<FormFieldContextValue>({} as FormFieldContextValue)

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContextProvider value={ { name: props.name } }>
      <Controller { ...props } />
    </FormFieldContextProvider>
  )
}

// Form field use hook
// - using field context and item context

function useFormField() {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  }
}




export {
  useFormField,
  Form,
  FormItem,
  FormField,
}