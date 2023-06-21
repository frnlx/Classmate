"use client";

import { useSessionRequired } from "@/api/client/auth";
import { useUpdateUser } from "@/api/client/user";
import { TextInput } from "@/components/static/Inputs";
import { ModalBase, ModalButton } from "@/components/use-client/Modal";
import { Form, FormField, FormItem } from "@/components/use-client/form/Form";
import { FormMessage } from "@/components/use-client/form/FormField";
import { FormLabel, FormControl } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().nonempty("can't be empty").max(64, "too long"),
});
export type EditProfileFormSchema = z.infer<typeof formSchema>;

function EditProfileForm(p: { onCancel: () => void; onUpdated: () => void }) {
  const session = useSessionRequired();
  const { mutateAsync: updateProfile } = useUpdateUser();
  const form = useForm<EditProfileFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session.data?.user.name ?? "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: EditProfileFormSchema) {
    try {
      await updateProfile(values);
      session.update();
      p.onUpdated && p.onUpdated();
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
                <FormLabel>Name</FormLabel> <FormMessage />
              </div>
              <FormControl>
                <TextInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-2">
          <ModalButton label="Cancel" onClick={() => p.onCancel()} />
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

export default function EditProfile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalBase
      open={isOpen}
      size="xl"
      title="Edit Profile"
      trigger={
        <button className="rounded-md bg-dark2 px-4 py-2 hover:bg-light2 transition-all duration-150 text-xs font-semibold">
          Edit Profile
        </button>
      }
      onChange={setIsOpen}
    >
      <EditProfileForm
        onCancel={() => setIsOpen(false)}
        onUpdated={() => setIsOpen(false)}
      />
    </ModalBase>
  );
}
