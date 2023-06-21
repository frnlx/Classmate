"use client";

import React, { useState } from "react";
import RewardManageTable, { MemberRewardWithUser } from "./RewardManageTable";
import { ModalBase } from "@/components/use-client/Modal";

export default function RewardsHistory({
  rewards,
  classId,
}: {
  rewards: MemberRewardWithUser[];
  classId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <ModalBase
      open={open}
      onChange={setOpen}
      title="Rewards History"
      trigger={
        <button className="rounded-md bg-dark2 px-4 py-2 hover:bg-light2 transition-all duration-150">
          History
        </button>
      }
      size="4xl"
      className="relative"
    >
      <RewardManageTable
        rewardRequests={rewards}
        isOwner={false}
        classId={classId}
      />
    </ModalBase>
  );
}
