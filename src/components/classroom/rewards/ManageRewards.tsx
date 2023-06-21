"use client";

import { ModalBase } from "@/components/use-client/Modal";
import { Member, Reward } from "@prisma/client";
import React, { useState } from "react";
import RewardsTable from "./RewardsTable";
import RewardForm from "./RewardForm";
import { useCreateReward } from "@/api/client/reward";
import { useRouter } from "next/navigation";

export default function ManageRewards({
  rewards,
  classId,
}: {
  rewards: Reward[];
  classId: string;
}) {
  const { refresh } = useRouter();
  const [open, setOpen] = useState<"closed" | "list" | "new">("closed");
  const { mutateAsync: createReward } = useCreateReward(classId);

  return (
    <>
      <ModalBase
        open={open === "new"}
        onChange={(v) => setOpen(v ? "new" : "list")}
        title="New Reward"
        trigger={<></>}
        size="xl"
        className="relative"
      >
        <RewardForm
          mutateFunction={createReward}
          onFinished={() => {
            refresh();
            setOpen("list");
          }}
          onCancel={() => setOpen("list")}
          label={"Create"}
        />
      </ModalBase>

      <ModalBase
        open={open === "list"}
        onChange={(v) => setOpen(v ? "list" : "closed")}
        title="Manage Rewards"
        trigger={
          <button className="rounded-md bg-dark2 px-4 py-2 hover:bg-light2 transition-all duration-150">
            Manage Rewards
          </button>
        }
        size="xl"
        className="relative"
      >
        <button
          onClick={() => setOpen("new")}
          className="rounded-md bg-dark2 px-4 py-2 hover:bg-light2 transition-all duration-150 absolute top-6 right-6"
        >
          New
        </button>

        <RewardsTable
          rewards={rewards}
          isOwner={true}
          classId={classId}
          member={null}
        />
      </ModalBase>
    </>
  );
}
