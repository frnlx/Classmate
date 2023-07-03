"use client";

import { ResourcePopulatedWithUser } from "@/api/client/api";
import { useSessionRequired } from "@/api/client/auth";
import { useCreateResource, useUpdateResource } from "@/api/client/resource";
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
import { Pencil } from "@phosphor-icons/react";
import { ResourceType } from "@prisma/client";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ResourceFormSchema,
  resourceFormSchema,
} from "../resources/AddResource";

function ResourceForm(p: {
  onCancel: () => void;
  onUpdated: () => void;
  resource: Omit<ResourcePopulatedWithUser, "_count">;
}) {
  const params = useParams();
  const { mutateAsync: updateResource } = useUpdateResource(
    params.classid,
    params.categoryid,
    p.resource.id
  );

  const form = useForm<ResourceFormSchema>({
    resolver: zodResolver(resourceFormSchema),
    reValidateMode: "onBlur",
    defaultValues: {
      title: p.resource.title,
      content: p.resource.content,
      type: p.resource.type,
      xp: p.resource.Assignment?.xpReward || p.resource.Discussion?.xpReward,
      point: p.resource.Assignment?.point || p.resource.Discussion?.point,
      dueDate: p.resource.Assignment?.dueDate || p.resource.Discussion?.dueDate,
    },
  });

  async function onSubmit(values: ResourceFormSchema) {
    try {
      await updateResource(values);
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
      <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6">
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
            <span className="text-sm text-light1">
              NOTE: If no attachment is given, we will use previous attachment
            </span>
          </FormControl>
        </FormItem>

        { p.resource.type !== ResourceType.NORMAL_POST && (
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
                      value={ new Date(field.value.getTime() - field.value.getTimezoneOffset() * 60000).toISOString().slice(0, -1) }
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

        <div className="flex justify-end gap-2 pt-2">
          <ModalButton label="Cancel" onClick={ () => p.onCancel() } />
          <ModalButton
            label={ valid ? "✨ Update" : "✖️ Update" }
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

export default function EditResourceModal(p: {
  classId: string;
  resource: Omit<ResourcePopulatedWithUser, "_count">;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <ModalBase
      open={ isOpen }
      size="xl"
      title="Edit Resource"
      trigger={
        <button className="rounded-bl-md rounded-tl-md bg-dark2 text-light0 bg-opacity-80 p-2 hover:bg-opacity-100 transition-all duration-150">
          <Pencil size={ 24 } />
        </button>
      }
      onChange={ setIsOpen }
    >
      <ResourceForm
        onCancel={ () => setIsOpen(false) }
        onUpdated={ () => {
          setIsOpen(false);
          router.refresh();
        } }
        resource={ p.resource }
      />
    </ModalBase>
  );
}
