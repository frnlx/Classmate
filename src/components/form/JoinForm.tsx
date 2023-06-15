"use client"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem } from "../use-client/form/Form"
import { FormControl, FormDescription, FormLabel, FormMessage } from "../use-client/form/FormField"
import { TextInput } from "../static/Inputs"
import { ReactNode } from "react"
import { useJoinClass } from "@/api/client/user"
import { ModalButton } from "../use-client/Modal"


/**
 * Form Schema Type
 */
const formSchema = z.object({
  inviteid: z.union([
    z.string({
      coerce: true,
      required_error: "Invite id is required",
    }).regex(/^[A-Za-z0-9_-]{6}$/, "Invalid invite id"),

    z.string({
      coerce: true,
      required_error: "Invite id is required"
    }).url().refine((url) => {
      return url.split('/').at(-1)?.match(/^[A-Za-z0-9_-]{6}$/)
    },"Invalid invite id link")
  ])
})
export type InferedJoinFormSchema = z.infer<typeof formSchema>



/**
 * Join a classroom Form
 */
export default function JoinForm(p: {
  onJoin: (classid: string) => void
  onBack: () => void
  children?: ReactNode
}) {

  const { mutateAsync: joinClass } = useJoinClass()
  const form = useForm<InferedJoinFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inviteid: ""
    }
  })

  function serverError(str: string) {
    form.setError('inviteid', {
      message: str,
      type: 'validate'
    })
  }

  async function onSubmit(values: InferedJoinFormSchema) {
    try {
      const data = await joinClass(values.inviteid)
      p.onJoin(data.id)
    } catch (error: any) {
      serverError(error?.message)
    }
  }

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) }>
        <FormField control={ form.control } name="inviteid" render={
          ({ field }) => (
            <FormItem>

              <div className="flex gap-1">
                <FormLabel>Invite ID  </FormLabel> <FormMessage />
              </div>
              <FormControl>
                <TextInput placeholder="siw148" { ...field } />
              </FormControl>
              <FormDescription>
                Paste either invite URL or invite Code.
              </FormDescription>
              
            </FormItem>
          )
        } />
        <div className="flex justify-end gap-2 mt-4">
          <ModalButton label="<- Back" onClick={ p.onBack } />
          <ModalButton label="🚪 Join" onClick={ () => { } } primary submit />
        </div>
      </form>
    </Form>
  )
}