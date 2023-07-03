"use client";

import { Comment } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  CommentWithUser,
  ResourcePopulatedWithUserComment,
} from "../../../../api/client/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/components/static/Inputs";
import { Form, FormField, FormItem } from "@/components/use-client/form/Form";
import { FormMessage } from "@/components/use-client/form/FormField";
import { FormLabel, FormControl } from "@chakra-ui/react";
import { PaperPlaneRight, Trash } from "@phosphor-icons/react";
import {
  useComments,
  useCreateComment,
  useDeleteComment,
} from "@/api/client/resource";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ConfirmModal } from "@/components/use-client/Modal";

function CommentItem(p: {
  comment: CommentWithUser;
  isClassOwner: boolean;
  deleteFunc: (id: string) => unknown;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(false)
  const session = useSession();
  const canDelete =
    p.comment.userId === session.data?.user.id || p.isClassOwner;

  async function onDelete() {
    await p.deleteFunc(p.comment.id);
    p.onDelete && p.onDelete();
  }

  return (
    <div className="flex flex-col gap-2 text-sm relative">
      <div className="flex flex-row gap-2 items-center">
        <div className="w-5 h-5 relative">
          <Image
            src={ p.comment.user.pfp }
            className="object-contain rounded-full"
            alt="Profile picture"
            fill
          />
        </div>
        <strong className="font-bold">{ p.comment.user.name }</strong>
        <span className="text-xs">
          { p.comment.createdAt.toLocaleDateString("en-SG", {
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "numeric",
          }) }
        </span>
      </div>
      <p className="whitespace-pre-line break-words">{ p.comment.content }</p>

      { canDelete && (
        <ConfirmModal
          title="Delete comment?"
          desc="Are you sure you want to delete this comment?"
          open={ open }
          onChange={ setOpen }
          onConfirm={ () => onDelete() }
        >
          <button
            className="h-6 w-6 bg-alert/80 hover:bg-alert duration-150 transition-all absolute top-0 right-0 rounded-md mr-2"
          >
            <Trash size={ 18 } className="m-auto" />
          </button>
        </ConfirmModal>
      ) }
    </div>
  );
}

const formSchema = z.object({
  content: z.string().nonempty("can't be empty"),
});
export type CommentFormSchema = z.infer<typeof formSchema>;

export default function CommentSection(p: {
  classId: string;
  resource: ResourcePopulatedWithUserComment;
}) {
  const session = useSession();
  const form = useForm<CommentFormSchema>({
    resolver: zodResolver(formSchema),
  });
  const { data: comments } = useComments(
    p.classId,
    p.resource.categoryId,
    p.resource.id,
    p.resource.Comment
  );
  const { mutateAsync: createComment } = useCreateComment(
    p.classId,
    p.resource.categoryId,
    p.resource.id
  );
  const { mutateAsync: deleteComment } = useDeleteComment(
    p.classId,
    p.resource.categoryId,
    p.resource.id
  );
  async function onSubmit(values: CommentFormSchema) {
    try {
      await createComment(values);
    } catch (error: any) {
      form.setError("root", error?.message);
    }
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({ content: "" });
    }
  }, [form.formState]);

  return (
    <div className="flex flex-col justify-between gap-2 h-full overflow-y-auto">
      <div className="flex flex-col gap-4 overflow-auto">
        { comments?.map((c) => (
          <CommentItem
            key={ c.id }
            comment={ c }
            deleteFunc={ deleteComment }
            isClassOwner={ p.resource.userId === session.data?.user.id }
          />
        )) }
      </div>

      <Form { ...form }>
        <form
          onSubmit={ form.handleSubmit(onSubmit) }
          className="flex flex-row justify-between gap-2 items-end"
        >
          <FormField
            control={ form.control }
            name="content"
            render={ ({ field }) => (
              <FormItem className="w-full">
                <div className="flex gap-1 align-bottom h-3 mb-2">
                  <FormLabel>Comment</FormLabel> <FormMessage />
                </div>
                <FormControl className="w-full">
                  <TextInput className="w-full" { ...field } />
                </FormControl>
              </FormItem>
            ) }
          />
          <button className="h-10 w-10 bg-ok hover:bg-oklight duration-150 transition-all rounded-md">
            <PaperPlaneRight className="m-auto" size={ 20 } />
          </button>
        </form>
      </Form>
    </div>
  );
}
