"use client";

import { useDeleteReward, useUpdateReward } from "@/api/client/reward";
import { Pencil, Trash } from "@/components/use-client/Icons";
import {
  ConfirmModal,
  ModalBase,
  ModalButton,
} from "@/components/use-client/Modal";
import { Reward } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import RewardForm from "./RewardForm";

function RewardRow({
  reward,
  isOwner,
  classId,
  onOpenChange,
}: {
  reward: Reward;
  isOwner: boolean;
  classId: string;
  onOpenChange?: (v: boolean) => unknown;
}) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutateAsync: deleteReward } = useDeleteReward(classId, reward.id);
  const { mutateAsync: updateReward } = useUpdateReward(classId, reward.id);
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);

  function setOpenProxy(v: boolean) {
    onOpenChange?.(v);
    setOpen(v);
  }

  return (
    <tr className="divide-x">
      <td className="p-4">{reward.name}</td>
      <td className="p-4 text-center">{reward.pointCost}</td>
      <td className="p-4">
        <div className="mx-auto w-fit">
          {isOwner ? (
            <>
              <ModalBase
                open={open}
                onChange={setOpenProxy}
                title="Edit Reward"
                trigger={
                  <button className="rounded-bl-md rounded-tl-md bg-dark2 text-light0 bg-opacity-80 p-2 hover:bg-opacity-100 transition-all duration-150">
                    <Pencil size={24} />
                  </button>
                }
                size="xl"
                className="relative"
              >
                <RewardForm
                  mutateFunction={updateReward}
                  onFinished={() => {
                    refresh();
                    setOpenProxy(false);
                  }}
                  defaultValues={{
                    name: reward.name,
                    cost: reward.pointCost,
                  }}
                  onCancel={() => setOpenProxy(false)}
                  label={"Edit"}
                />
              </ModalBase>

              <ConfirmModal
                title="Delete reward?"
                desc="Are you sure you want to delete this reward?"
                open={openDeleteModal}
                onChange={setOpenDeleteModal}
                onConfirm={async () => {
                  await deleteReward();
                  refresh();
                  setOpenDeleteModal(false);
                }}
              >
                <button className="bg-alert/80 p-2 hover:bg-alert transition-all duration-150 rounded-tr-md rounded-br-md">
                  <Trash size={24} />
                </button>
              </ConfirmModal>
            </>
          ) : (
            <ModalButton label="Buy" primary onClick={() => {}} />
          )}
        </div>
      </td>
    </tr>
  );
}

export default function RewardsTable({
  rewards,
  isOwner,
  classId,
}: {
  rewards: Reward[];
  isOwner: boolean;
  classId: string;
}) {
  return (
    <div className="bg-dark1 p-4 rounded-md w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b divide-x">
            <th>Name</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((r) => (
            <RewardRow
              key={r.id}
              reward={r}
              isOwner={isOwner}
              classId={classId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
