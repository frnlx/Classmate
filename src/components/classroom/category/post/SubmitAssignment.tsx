"use client";

import {
  Assignment,
  Attachment as PAttachment,
  Resource,
  Submission,
} from "@prisma/client";
import React, { useState } from "react";
import Attachment from "./Attachment";
import { AttachmentInput } from "@/components/static/Inputs";
import { ModalButton } from "@/components/use-client/Modal";
import { useCreateSubmission } from "@/api/client/resource";
import { useRouter } from "next/navigation";
import useAppToast from "@/components/lib/toasts";

export default function SubmitAssignment(p: {
  classId: string;
  resource: Resource;
  assignment: Assignment;
  submission: (Submission & { attachment: PAttachment | null }) | null;
}) {
  const toast = useAppToast();
  const { refresh } = useRouter();
  const [uploadAttachmentId, setAttachmentId] = useState("");
  const { mutateAsync: submitAssignment } = useCreateSubmission(
    p.classId,
    p.resource.categoryId,
    p.resource.id
  );

  async function onSubmit() {
    await submitAssignment(uploadAttachmentId);
    toast("Assignment submitted", "success");
    refresh();
    setAttachmentId("");
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <strong>Submission</strong>
        { p.submission && p.assignment.dueDate < new Date() && (
          <div className="text-xs text-light1">
            {
              p.submission.graded
                ? p.submission.rewarded
                  ? "(Checked, rewarded)"
                  : "(Checked, not rewarded)"
                : "(Not checked yet)"
            }
          </div>
        ) }
        { !p.submission && p.assignment.dueDate < new Date() && (
          <div className="text-xs text-light1">(Not submitted)</div>
        ) }
      </div>

      { p.submission && (
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex flex-row">
            Last submission:
            <div className="px-1"></div>
            { p.submission.attachment && (
              <Attachment attachment={ p.submission.attachment } />
            ) }
            <div className="px-1"></div>
          </div>
        </div>
      ) }
      { p.assignment.dueDate > new Date() && !p.submission?.graded && (
        <div className="flex flex-row gap-2">
          <AttachmentInput onUploaded={ setAttachmentId } />
          <ModalButton
            primary
            label="Submit"
            disabled={ uploadAttachmentId === "" }
            onClick={ () => onSubmit() }
          />
        </div>
      ) }

    </>
  );
}
