"use client";

import { useClaimReward } from "@/api/client/reward";
import { ModalButton } from "@/components/use-client/Modal";
import { formatDate } from "@/lib/util";
import { Member, MemberReward, User } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
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
  const { refresh } = useRouter();
  const { mutateAsync: claimRequest } = useClaimReward(
    classId,
    rewardRequest.id
  );

  async function onClaim() {
    console.log("CLAIM");
    await claimRequest();
    refresh();
  }

  return (
    <tr className="divide-x">
      { isOwner && <td className="p-4">{ rewardRequest.member.user.name }</td> }
      <td className="p-4 text-center">{ rewardRequest.name }</td>
      <td className="p-4 text-center">{ rewardRequest.claimDate.toLocaleDateString("en-SG") }</td>
      <td className="p-4 text-center">{ rewardRequest.note }</td>

      <td className="p-4">
        <div
          className={ clsx(
            "mx-auto w-fit text-center",
            rewardRequest.redeemed ? "text-ok" : "text-light1"
          ) }
        >
          { rewardRequest.redeemed ? (
            "Redeemed"
          ) : isOwner ? (
            <ModalButton
              label="Redeem Request"
              onClick={ () => onClaim() }
              primary
            />
          ) : (
            "Requested"
          ) }
        </div>
      </td>
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
  console.log(rewardRequests);
  return (
    <div className="bg-dark1 p-4 rounded-md w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b divide-x">
            { isOwner && <th>Name</th> }
            <th>Reward Name</th>
            <th>Date Bought</th>
            <th>Notes</th>
            <th>{ isOwner ? "Action" : "Status" }</th>
          </tr>
        </thead>
        <tbody>
          { rewardRequests.map((r) => (
            <RewardManageRow
              key={ r.id }
              rewardRequest={ r }
              isOwner={ isOwner }
              classId={ classId }
            />
          )) }
        </tbody>
      </table>
    </div>
  );
}
