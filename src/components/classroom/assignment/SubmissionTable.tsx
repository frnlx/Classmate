"use client";

import {
  Attachment as PAttachment,
  Member,
  Submission,
  User,
} from "@prisma/client";
import React, { useMemo, useState } from "react";
import Attachment from "../category/post/Attachment";
import { ModalButton, ConfirmModal } from "@/components/use-client/Modal";
import { useSearchFilter } from "./SearchFilterContext";
import { useGradeSubmission } from "@/api/client/resource";
import { useRouter } from "next/navigation";

type UserSubmission = Submission & {
  attachment: PAttachment;
  member: Member & {
    user: User;
  };
};

function SubmissionRow(p: { submission: UserSubmission }) {
  const { refresh } = useRouter();
  const { mutateAsync: gradeSubmission } = useGradeSubmission(
    p.submission.id
  );

  async function sendGradeApprove() {
    await gradeSubmission(true);
    refresh();
  }

  async function sendGradeReject() {
    await gradeSubmission(false);
    refresh();
  }

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <tr className="divide-x">
      <td className="p-4">{ p.submission.member.user.name }</td>
      <td className="p-4">
        <Attachment
          attachment={ p.submission.attachment }
          className="flex-col justify-center gap-y-1 items-center"
        />
      </td>
      <td className="p-4">
        { !!!p.submission.attachmentId ? (
          "No rewards"
        ) : p.submission.graded ? (
          p.submission.rewarded ? (
            <p className="text-green-300">Rewards Given</p>
          ) : (
            <p className="text-red-300">Rewards Rejected</p>
          )
        ) : (
          <div className="flex gap-x-2 justify-center">
            <ConfirmModal
              title="Reject Reward"
              desc="Are you sure you want to reject this reward?"
              open={ open1 }
              onChange={ setOpen1 }
              onConfirm={ sendGradeReject }
            >
              <button
                className="text-whiter bg-alert px-5 p-2.5 rounded-md brightness-100 text-xs font-semibold transition-all duration-200 inline-flex items-center justify-center hover:shadow-[0_0_20px_-3px_#ff3333] hover:shadow-alert active:brightness-90]"
              >
                Reject
              </button>
            </ConfirmModal>
            <ConfirmModal
              title="Approve Reward"
              desc="Are you sure you want to approve this reward?"
              open={ open2 }
              onChange={ setOpen2 }
              onConfirm={ sendGradeApprove }
              approveMode
            >
              <button
                className="text-whiter bg-ok px-5 p-2.5 rounded-md brightness-100 text-xs font-semibold transition-all duration-200 inline-flex items-center justify-center hover:shadow-[0_0_20px_-3px_#ff3333] hover:shadow-ok active:brightness-90]"
              >
                Approve
              </button>
            </ConfirmModal>
          </div>
        ) }
      </td>
    </tr>
  );
}

export default function SubmissionTable({
  submissions,
}: {
  submissions: UserSubmission[];
}) {
  const { name, filters } = useSearchFilter();
  const filteredSubmissions = useMemo(() => {
    return submissions
      .filter((s) => s.member.user.name.toLowerCase().match(`${name.toLowerCase()}`))
    // .filter((s) => {
    //   if (filters.given && s.rewarded) return true;
    //   if (filters.ungraded && !s.graded) return true;
    //   if (filters.notGiven && !s.rewarded && s.graded) return true;
    //   return false;
    // })
    // .filter((s) => {
    //   if (filters.notSubmitted && !!!s.attachmentId) return true;
    //   if (filters.submitted && s.attachmentId) return true;
    //   return false;
    // });
  }, [submissions, name, filters]);

  return (
    <div className="bg-dark1 p-4 rounded-md">
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr className="border-b divide-x">
            <th>Name</th>
            <th>Submission</th>
            <th>Reward</th>
          </tr>
        </thead>
        <tbody>
          { filteredSubmissions.map((s) => (
            <SubmissionRow submission={ s } key={ s.id } />
          )) }
        </tbody>
      </table>
    </div>
  );
}
