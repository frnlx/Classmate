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
    <div className="flex flex-col gap-2">
      <strong>Submission</strong>
      {p.submission && (
        <div className="flex flex-col gap-2">
          <p>
            Existing submission:{" "}
            <span className="text-xs">
              (
              {p.submission.graded
                ? p.submission.rewarded
                  ? "Graded, rewarded"
                  : "Graded, not rewarded"
                : "Not graded"}
              )
            </span>
          </p>
          {p.submission.attachment && (
            <Attachment attachment={p.submission.attachment} />
          )}
        </div>
      )}

      {p.assignment.dueDate > new Date() && !p.submission?.graded && (
        <div className="flex flex-row gap-2">
          <AttachmentInput onUploaded={setAttachmentId} />
          <ModalButton
            primary
            label="Submit"
            disabled={uploadAttachmentId === ""}
            onClick={() => onSubmit()}
          />
        </div>
      )}
    </div>
  );
}
