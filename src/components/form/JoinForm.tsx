"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormField, FormItem } from "../use-client/form/Form"
import { FormControl, FormDescription, FormLabel, FormMessage } from "../use-client/form/FormField"
import { TextInput } from "../static/Inputs"
import { ReactNode } from "react"


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
type inferedSchema = z.infer<typeof formSchema>

export default function JoinForm(p: {
  onSubmit: (values: inferedSchema) => void
  children?: ReactNode
}) {

  const form = useForm<inferedSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inviteid: ""
    }
  })

  function onSubmit(values: inferedSchema) {
    //... open up joining modal
    //... fetch to api
    //... close modal
    //... redirect to classroom
  }

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(p.onSubmit) }>
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

              </FormDescription>
              
            </FormItem>
          )
        } />
        {p.children}
      </form>
    </Form>
  )
}