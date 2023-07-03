"use client";

import { ClientAPI } from "@/api/client/api";
import { useSessionRequired } from "@/api/client/auth";
import { useCreateCategory, useUpdateCategory } from "@/api/client/category";
import { useUpdateUser } from "@/api/client/user";
import { TextInput } from "@/components/static/Inputs";
import { ConfirmModal, ModalBase, ModalButton } from "@/components/use-client/Modal";
import { Form, FormField, FormItem } from "@/components/use-client/form/Form";
import { FormMessage } from "@/components/use-client/form/FormField";
import { FormLabel, FormControl } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { addCategory } from "./addsidebar";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().nonempty("can't be empty").max(64, "too long"),
});
export type CategoryFormSchema = z.infer<typeof formSchema>;

export default function CategoryForm(p: {
  onCancel: () => void;
  onUpdated: () => void;
  onDeleted: () => void;
  defaultTitle?: string;
  idData: {
    userid: string;
    classid: string;
    catid?: string;
  };
}) {
  const { refresh } = useRouter();
  const pathname = usePathname();
  const qc = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { mutateAsync: updateCategory } = useUpdateCategory(
    p.idData.classid,
    p.idData?.catid ?? ""
  );
  const [open, setOpen] = useState(false);

  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: p.defaultTitle ?? "",
    },
    mode: "onBlur",
  });

  function onCreate(values: CategoryFormSchema) {
    startTransition(async () => {
      await addCategory(p.idData.classid, values.name);
      qc.invalidateQueries(["classrooms", p.idData.classid, "categorylist"]);
      p.onUpdated && p.onUpdated();
    });
  }

  async function onSubmit(values: CategoryFormSchema) {
    try {
      if (p.idData.catid) {
        await updateCategory(values);
        if (pathname.indexOf(p.idData.catid) !== -1) refresh();
        p.onUpdated && p.onUpdated();
      } else {
        onCreate(values);
      }
    } catch (error: any) {
      form.setError("root", error?.message);
    }
  }

  async function onDelete() {
    await ClientAPI.deleteCategory({
      userid: p.idData.userid,
      classid: p.idData.classid,
      catid: p.idData.catid!,
    });
    qc.invalidateQueries(["classrooms", p.idData!.classid, "categorylist"]);
    p.onDeleted?.();
  }

  const label = p.idData.catid ? "Update" : "Create";
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
                <FormLabel>Name</FormLabel> <FormMessage />
              </div>
              <FormControl>
                <TextInput { ...field } />
              </FormControl>
            </FormItem>
          ) }
        />
        <div className="flex justify-between gap-2 pt-2">
          { p.idData.catid ? (
            <ConfirmModal
              title="Delete Category"
              desc="Are you sure you want to delete this category?"
              open={ open }
              onChange={ setOpen }
              onConfirm={ onDelete }
            >
              <button
                className="text-whiter bg-alert px-5 p-2.5 rounded-md brightness-100 text-xs font-semibold transition-all duration-200 inline-flex items-center justify-center hover:shadow-[0_0_20px_-3px_#ff3333] hover:shadow-alert active:brightness-90]"
              >
                Delete Category
              </button>
            </ConfirmModal>

          ) : <div></div> }
          <div className="space-x-2">
            <ModalButton label="Cancel" onClick={ () => p.onCancel() } />
            <ModalButton
              label={ valid ? `✨ ${label}` : `✖️ ${label}` }
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
