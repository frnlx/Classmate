"use client";

import { useSessionRequired } from "@/api/client/auth";
import { useCreateResource } from "@/api/client/resource";
import { useUpdateUser } from "@/api/client/user";
import {
  TextInput,
  TextAreaInput,
  SelectInput,
  AttachmentInput,
} from "@/components/static/Inputs";
import { ModalBase, ModalButton } from "@/components/use-client/Modal";
import { Form, FormField, FormItem } from "@/components/use-client/form/Form";
import { FormMessage } from "@/components/use-client/form/FormField";
import { FormLabel, FormControl, Select } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResourceType } from "@prisma/client";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const baseSchema = z.object({
  title: z.string().nonempty("can't be empty").max(64, "too long"),
  content: z.string().nonempty("can't be empty"),
  type: z.nativeEnum(ResourceType),
  attachmentId: z.string().optional(),
});

export const resourceFormSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal(ResourceType.ASSIGNMENT),
      xp: z.number().min(1, "minimum point is 1"),
      point: z.number().min(1, "minimum point is 1"),
      dueDate: z.date(),
    }),
    z.object({
      type: z.literal(ResourceType.DISCUSSION),
      xp: z.number().min(1, "minimum point is 1"),
      point: z.number().min(1, "minimum point is 1"),
      dueDate: z.date(),
    }),
    z.object({
      type: z.literal(ResourceType.NORMAL_POST),
    }),
  ])
  .and(baseSchema);
export type ResourceFormSchema = z.infer<typeof resourceFormSchema>;

function ResourceForm(p: { onCancel: () => void; onUpdated: () => void }) {
  const params = useParams();
  const { mutateAsync: createResource } = useCreateResource(
    params.classid,
    params.categoryid
  );

  const form = useForm<ResourceFormSchema>({
    resolver: zodResolver(resourceFormSchema),
    reValidateMode: "onBlur",
  });
  const resourceType = form.watch("type");
  console.log(resourceType, form.formState.errors);

  useEffect(() => {
    if (resourceType === ResourceType.NORMAL_POST) {
      form.setValue("xp", 0);
      form.setValue("point", 0);
      // @ts-ignore
      form.setValue("dueDate", undefined);
    }
  }, [resourceType]);

  async function onSubmit(values: ResourceFormSchema) {
    try {
      await createResource(values);
      p.onUpdated && p.onUpdated();
    } catch (error: any) {
      form.setError("root", error?.message);
    }
  }

  function onAttachmentUploaded(attachmentId: string) {
    form.setValue("attachmentId", attachmentId);
  }

  const valid = form.formState.isValid;
  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-4 max-h-pc80 overflow-y-auto">
        <FormField
          control={ form.control }
          name="type"
          render={ ({ field }) => (
            <FormItem>
              <div className="flex gap-1 align-bottom h-3">
                <FormLabel>Type</FormLabel> <FormMessage />
              </div>
              <FormControl>
                <SelectInput placeholder="-" { ...field }>
                  { Object.keys(ResourceType).map((t) => (
                    <option className="" key={ t } value={ t }>
                      { t
                        .split("_")
                        .map(
                          (w) =>
                            w[0].toUpperCase() + w.substring(1).toLowerCase()
                        )
                        .join(" ") }
                    </option>
                  )) }
                </SelectInput>
              </FormControl>
            </FormItem>
          ) }
        />

        { !!resourceType && (
          <>
            <FormField
              control={ form.control }
              name="title"
              render={ ({ field }) => (
                <FormItem>
                  <div className="flex gap-1 align-bottom h-3">
                    <FormLabel>title</FormLabel> <FormMessage />
                  </div>
                  <FormControl>
                    <TextInput { ...field } />
                  </FormControl>
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="content"
              render={ ({ field }) => (
                <FormItem>
                  <div className="flex gap-1 align-bottom h-3">
                    <FormLabel>Content</FormLabel> <FormMessage />
                  </div>
                  <FormControl>
                    <TextAreaInput rows={ 15 } { ...field } />
                  </FormControl>
                </FormItem>
              ) }
            />

            <FormItem>
              <div className="flex gap-1 align-bottom h-3">
                <FormLabel>Attachment (optional)</FormLabel>
              </div>
              <FormControl>
                <AttachmentInput onUploaded={ onAttachmentUploaded } />
              </FormControl>
            </FormItem>

            { resourceType !== ResourceType.NORMAL_POST && (
              <>
                <FormField
                  control={ form.control }
                  name="dueDate"
                  render={ ({ field }) => (
                    <FormItem>
                      <div className="flex gap-1 align-bottom h-3">
                        <FormLabel>Due Date</FormLabel> <FormMessage />
                      </div>
                      <FormControl>
                        <TextInput
                          type="datetime-local"
                          className="[color-scheme:dark]"
                          onChange={ (event) =>
                            field.onChange(new Date(event.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  ) }
                />

                <div className="flex flex-row space-x-2">
                  <FormField
                    control={ form.control }
                    name="xp"
                    render={ ({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex gap-1 align-bottom h-3">
                          <FormLabel>XP Gained</FormLabel> <FormMessage />
                        </div>
                        <FormControl>
                          <TextInput
                            type="number"
                            { ...field }
                            onChange={ (event) =>
                              field.onChange(event.target.value === "" ? null : +event.target.value)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    ) }
                  />
                  <FormField
                    control={ form.control }
                    name="point"
                    render={ ({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex gap-1 align-bottom h-3">
                          <FormLabel>Points Gained</FormLabel> <FormMessage />
                        </div>
                        <FormControl>
                          <TextInput
                            type="number"
                            { ...field }
                            onChange={ (event) =>
                              field.onChange(event.target.value === "" ? null : +event.target.value)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    ) }
                  />
                </div>
              </>
            ) }
          </>
        ) }

        <div className="flex justify-end gap-2 pt-2">
          <ModalButton label="Cancel" onClick={ () => p.onCancel() } />
          <ModalButton
            label={ valid ? "✨ Create" : "✖️ Create" }
            onClick={ () => { } }
            primary
            submit
            disabled={ !valid }
          />
        </div>
      </form>
    </Form>
  );
}

export default function AddResource() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalBase
      open={ isOpen }
      size="xl"
      title="Add Resource"
      trigger={
        <button className="rounded-md bg-dark2 px-4 py-2 hover:bg-light2 transition-all duration-150">
          Add Resource
        </button>
      }
      onChange={ setIsOpen }
    >
      <ResourceForm
        onCancel={ () => setIsOpen(false) }
        onUpdated={ () => setIsOpen(false) }
      />
    </ModalBase>
  );
}
