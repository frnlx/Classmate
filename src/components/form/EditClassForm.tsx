"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "../use-client/form/Form";
import {
  FormControl,
  FormLabel,
  FormMessage,
} from "../use-client/form/FormField";
import { TextAreaInput, TextInput } from "../static/Inputs";
import { ConfirmModal, ModalButton } from "../use-client/Modal";
import { Classroom } from "@prisma/client";
import { useDeleteClass, useEditClass } from "@/api/client/classroom";
import { useRouter } from "next/navigation";
import { useUserClassList } from "@/api/client/user";

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
  const [openDeleteMdal, setOpenDeleteModal] = useState(false);
  const { push } = useRouter();
  const { mutateAsync: editClass } = useEditClass(p.classId);
  const { mutateAsync: removeClass } = useDeleteClass(p.classId);
  const { refetch } = useUserClassList();
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
      push("/dashboard");
      await removeClass();
      await refetch();
    } catch (error: any) {
      form.setError("root", error?.message);
    }
  }

  const valid = form.formState.isValid;

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6">
        <FormField
          control={ form.control }
          name="name"
          render={ ({ field }) => (
            <FormItem>
              <div className="flex gap-1 align-bottom h-3">
                <FormLabel>Classroom Name</FormLabel> <FormMessage />
              </div>
              <FormControl>
                <TextInput { ...field } />
              </FormControl>
            </FormItem>
          ) }
        />
        <FormField
          control={ form.control }
          name="desc"
          render={ ({ field }: any) => (
            <FormItem>
              <div className="flex gap-1 align-bottom h-3">
                <FormLabel>Description</FormLabel> <FormMessage />
              </div>
              <FormControl>
                <TextAreaInput rows={ 20 } { ...field } />
              </FormControl>
            </FormItem>
          ) }
        />
        <div className="flex justify-between gap-2 pt-2">
          <ConfirmModal
            title="Delete class?"
            desc="Are you sure you want to delete this class?"
            open={ openDeleteMdal }
            onChange={ setOpenDeleteModal }
            onConfirm={ () => onDelete() }
          >
            <ModalButton label="Delete Class" onClick={ () => { } } danger />
          </ConfirmModal>
          <div className="space-x-2">
            <ModalButton label="Cancel" onClick={ () => p.onCancel() } />
            <ModalButton
              label={ valid ? "✨ Update" : "✖️ Update" }
              onClick={ () => { } }
              primary
              submit
              disabled={ !valid }
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
