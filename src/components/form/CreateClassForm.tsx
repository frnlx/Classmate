"use client"
import * as z from "zod"
import { useCreateClass } from "@/api/client/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { ReactNode } from "react"
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem } from "../use-client/form/Form"
import { FormControl, FormDescription, FormLabel, FormMessage } from "../use-client/form/FormField"
import { TextInput } from "../static/Inputs"
import { ModalButton } from "../use-client/Modal"

/**
 * Form Schema Type
 */
const formSchema = z.object({
  name: z.string().nonempty("can't be empty").max(64, "too long"),
  subject: z.string().nonempty("can't be empty").max(64, "too long"),
})
export type InferedCreateClassroomFormSchema = z.infer<typeof formSchema>

export default function CreateClassForm(p: {
  onCreate: (classid: string) => void
  onBack: () => void
  children?: ReactNode
}) {
  const session = useSession()
  const { mutateAsync: createClass } = useCreateClass()
  const form = useForm<InferedCreateClassroomFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${session.data?.user.name}'s Classroom`
    },
    mode: "onBlur"
  })

  async function onSubmit(values: InferedCreateClassroomFormSchema) {
    console.log(values)
    try {
      const data = await createClass(values)
      p.onCreate(data.id)
    } catch (error: any) {
      form.setError("root", error?.message)
    }
  }

  const valid = form.formState.isValid

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6">
        <FormField control={ form.control } name="name" render={
          ({ field }) => (
            <FormItem>

              <div className="flex gap-1 align-bottom h-3">
                <FormLabel>Classroom Name</FormLabel> <FormMessage />
              </div>
              <FormControl>
                <TextInput { ...field } />
              </FormControl>

            </FormItem>
          )
        } />
        <FormField control={ form.control } name="subject" render={
          ({ field }) => (
            <FormItem>

              <div className="flex gap-1 align-bottom h-3">
                <FormLabel>Subject</FormLabel> <FormMessage />
              </div>
              <FormControl>
                <TextInput { ...field } />
              </FormControl>

            </FormItem>
          )
        } />
        <div className="flex justify-end gap-2 pt-2">
          <ModalButton label="<- Back" onClick={ p.onBack } />
          <ModalButton label={ valid ? "✨ Create" : "✖️ Create"} onClick={ () => { } } primary submit disabled={ !valid } />
        </div>
      </form>
    </Form>
  )

}