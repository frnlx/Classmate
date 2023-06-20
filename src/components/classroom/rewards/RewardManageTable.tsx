"use client";

import { formatDate } from "@/lib/util";
import { Member, MemberReward, User } from "@prisma/client";
import React from "react";

export type MemberRewardWithUser = MemberReward & {
  member: Member & {
    user: User;
  };
};

function RewardManageRow({
  rewardRequest,
  classId,
  isOwner,
}: {
  rewardRequest: MemberRewardWithUser;
  classId: string;
  isOwner: boolean;
}) {
  return (
    <tr className="divide-x">
      <td className="p-4">{rewardRequest.member.user.name}</td>
      <td className="p-4 text-center">{rewardRequest.name}</td>
      <td className="p-4 text-center">{formatDate(rewardRequest.claimDate)}</td>
      <td className="p-4 text-center">{rewardRequest.note}</td>
      {isOwner && (
        <td className="p-4">
          <div className="mx-auto w-fit"></div>
        </td>
      )}
    </tr>
  );
}

export default function RewardManageTable({
  rewardRequests,
  classId,
  isOwner,
}: {
  rewardRequests: MemberRewardWithUser[];
  classId: string;
  isOwner: boolean;
}) {
  return (
    <div className="bg-dark1 p-4 rounded-md w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b divide-x">
            <th>Name</th>
            <th>Reward Name</th>
            <th>Created Date</th>
            <th>Notes</th>
            {isOwner && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {rewardRequests.map((r) => (
            <RewardManageRow
              key={r.id}
              rewardRequest={r}
              isOwner={isOwner}
              classId={classId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
