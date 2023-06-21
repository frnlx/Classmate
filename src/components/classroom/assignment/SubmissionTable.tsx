"use client";

import {
  Attachment as PAttachment,
  Member,
  Submission,
  User,
} from "@prisma/client";
import React, { useMemo } from "react";
import Attachment from "../category/post/Attachment";
import { ModalButton } from "@/components/use-client/Modal";
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
    p.submission.id.toString()
  );

  async function sendGrade(giveRewards: boolean) {
    await gradeSubmission(giveRewards);
    refresh();
  }

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
          <div className="flex justify-center">
            <ModalButton
              label="Accept"
              primary
              onClick={ () => sendGrade(true) }
            />
            <ModalButton
              label="Reject"
              className="ml-4"
              onClick={ () => sendGrade(false) }
              danger
            />
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
            <SubmissionRow submission={ s } key={ s.id.toString() } />
          )) }
        </tbody>
      </table>
    </div>
  );
}
