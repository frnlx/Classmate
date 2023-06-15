"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "../use-client/form/Form";
import {
  FormControl,
  FormLabel,
  FormMessage,
} from "../use-client/form/FormField";
import { TextAreaInput, TextInput } from "../static/Inputs";
import { ModalButton } from "../use-client/Modal";
import { Classroom } from "@prisma/client";
import { useDeleteClass, useEditClass } from "@/api/client/classroom";
import { useRouter } from "next/navigation";

/**
 * Form Schema Type
 */
const formSchema = z.object({
  name: z.string().nonempty("can't be empty").max(64, "too long"),
  desc: z.string().nullable(),
});
export type EditClassroomFormSchema = z.infer<typeof formSchema>;

export default function EditClassForm(p: {
  onUpdated?: (classroom: Classroom | null) => void;
  onCancel: () => void;
  children?: ReactNode;
  defaultValues: Classroom;
  classId: string;
}) {
  const session = useSession();
  const { push } = useRouter();
  const { mutateAsync: editClass } = useEditClass(p.classId);
  const { mutateAsync: removeClass } = useDeleteClass(p.classId);
  const form = useForm<EditClassroomFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: p.defaultValues.name,
      desc: p.defaultValues.description,
    },
    mode: "onBlur",
  });

  async function onSubmit(values: EditClassroomFormSchema) {
    try {
      const data = await editClass(values);
      p.onUpdated && p.onUpdated(data);
    } catch (error: any) {
      form.setError("root", error?.message);
    }
  }

  async function onDelete() {
    try {
      await removeClass();
      push("/dashboard");
    } catch (error: any) {
      form.setError("root", error?.message);
    }
  }


  const valid = form.formState.isValid;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-1 align-bottom h-3">
                <FormLabel>Classroom Name</FormLabel> <FormMessage />
              </div>
              <FormControl>
                <TextInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }: any) => (
            <FormItem>
              <div className="flex gap-1 align-bottom h-3">
                <FormLabel>Description</FormLabel> <FormMessage />
              </div>
              <FormControl>
                <TextAreaInput rows={20} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-2">
          <ModalButton label="Cancel" onClick={() => p.onCancel()} />
          <ModalButton
            label="Delete Class"
            onClick={() => {
              onDelete();
            }}
          />
          <ModalButton
            label={valid ? "✨ Update" : "✖️ Update"}
            onClick={() => {}}
            primary
            submit
            disabled={!valid}
          />
        </div>
      </form>
    </Form>
  );
}
