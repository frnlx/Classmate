"use client";

import { useClaimReward } from "@/api/client/reward";
import { ConfirmModal } from "@/components/use-client/Modal";
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
  const [open, setOpen] = React.useState(false);

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
            <ConfirmModal
              title="Redeem Request"
              desc="Are you sure you want to redeem this request?"
              open={ open }
              onChange={ setOpen }
              onConfirm={ onClaim }
              approveMode={ true }
            >
              <button
                className="text-whiter bg-ok p-2.5 px-8 rounded-md brightness-100 text-xs font-semibold transition-all duration-200 inline-flex items-center justify-center hover:shadow-[0_0_20px_-3px_#008E5A] hover:shadow-ok active:brightness-90"
              >
                Redeem Request
              </button>
            </ConfirmModal>
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
    <div className="bg-dark1 p-4 rounded-lg w-full max-h-pc80">
      <div className="flex flex-row w-full justify-around border-b text-center">
        { isOwner && <div className="mb-2 w-full">Name</div> }
        <div className="mb-2 w-full">Reward Name</div>
        <div className="mb-2 w-full">Date Bought</div>
        <div className="mb-2 w-full">Notes</div>
        <div className="mb-2 w-full">{ isOwner ? "Action" : "Status" }</div>
      </div>
      <div className="flex overflow-y-auto max-h-pc55">
        <table className="w-full border-collapse table-fixed">
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
    </div>
  );
}
