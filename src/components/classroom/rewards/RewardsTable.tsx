"use client";

import { useDeleteReward, useUpdateReward } from "@/api/client/reward";
import { Pencil, Trash } from "@/components/use-client/Icons";
import {
  ConfirmModal,
  ModalBase,
  ModalButton,
} from "@/components/use-client/Modal";
import { Member, Reward } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import RewardForm from "./RewardForm";
import ClaimRewardForm from "./ClaimRewardForm";

type ConditionalMember =
  | {
    isOwner: true;
    member: Member | undefined | null;
  }
  | {
    isOwner: false;
    member: Member;
  };

function RewardRow({
  reward,
  isOwner,
  classId,
  onOpenChange,
  member,
}: {
  reward: Reward;
  classId: string;
  onOpenChange?: (v: boolean) => unknown;
} & ConditionalMember) {
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
      <td className="p-4">{ reward.name }</td>
      <td className="p-4 text-center">{ reward.pointCost }</td>
      <td className="p-4">
        <div className="mx-auto w-fit">
          { isOwner ? (
            <>
              <ModalBase
                open={ open }
                onChange={ setOpenProxy }
                title="Edit Reward"
                trigger={
                  <button className="rounded-bl-md rounded-tl-md bg-dark2 text-light0 bg-opacity-80 p-2 hover:bg-opacity-100 transition-all duration-150">
                    <Pencil size={ 24 } />
                  </button>
                }
                size="xl"
                className="relative"
              >
                <RewardForm
                  mutateFunction={ updateReward }
                  onFinished={ () => {
                    refresh();
                    setOpenProxy(false);
                  } }
                  defaultValues={ {
                    name: reward.name,
                    cost: reward.pointCost,
                  } }
                  onCancel={ () => setOpenProxy(false) }
                  label={ "Edit" }
                />
              </ModalBase>

              <ConfirmModal
                title="Delete reward?"
                desc="Are you sure you want to delete this reward?"
                open={ openDeleteModal }
                onChange={ setOpenDeleteModal }
                onConfirm={ async () => {
                  await deleteReward();
                  refresh();
                  setOpenDeleteModal(false);
                } }
              >
                <button className="bg-alert/80 p-2 hover:bg-alert transition-all duration-150 rounded-tr-md rounded-br-md">
                  <Trash size={ 24 } />
                </button>
              </ConfirmModal>
            </>
          ) : (
            <ModalBase
              open={ open }
              onChange={ setOpenProxy }
              title="Buy Reward"
              trigger={
                <ModalButton
                  label="Buy"
                  disabled={ reward.pointCost > member.points }
                  primary
                  onClick={ () => { } }
                />
              }
              size="xl"
              className="relative"
            >
              <ClaimRewardForm
                onCancel={ () => {
                  setOpenProxy(false);
                } }
                onFinished={ async () => {
                  setOpenProxy(false);
                  refresh();
                } }
                classId={ classId }
                pointsLeft={ member.points - reward.pointCost }
                reward={ reward }
              />
            </ModalBase>
          ) }
        </div>
      </td>
    </tr>
  );
}

export default function RewardsTable({
  rewards,
  isOwner,
  classId,
  member,
}: {
  rewards: Reward[];
  classId: string;
} & ConditionalMember) {
  return (
    <div className="bg-dark1 p-4 rounded-lg w-full max-h-pc80">
      <div className="flex flex-row w-full justify-around border-b">
        <div className="mb-2">Name</div>
        <div className="mb-2">Cost</div>
        <div className="mb-2">Action</div>
      </div>
      <div className="flex overflow-y-auto max-h-pc55">
        <table className="w-full border-collapse table-fixed">
          <tbody>
            { rewards.map((r) => (
              // @ts-ignore
              <RewardRow
                key={ r.id }
                reward={ r }
                isOwner={ isOwner }
                classId={ classId }
                member={ member }
              />
            )) }
          </tbody>
        </table>
      </div>
    </div>
  );
}
