"use client";

import {
  useClassroomMembersQuery,
  useClassroomQuery,
} from "@/api/client/classroom";
import { useLeaveClass, useRemoveUser } from "@/api/client/user";
import { ConfirmModal, ModalBase, ModalButton } from "@/components/use-client/Modal";
import { Classroom, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { ReactNode, useState } from "react";
import Image from "next/image";

type CommonProps = {
  isAdmin: boolean;
  classId: string;
  ownerId: string;
};

function PeopleRow({
  user,
  isAdmin,
  classId,
  ownerId,
}: { user: User } & CommonProps) {
  const { data } = useSession();
  const { mutateAsync: removeStudent } = useRemoveUser(classId);
  const [open, setOpen] = useState(false);

  async function onRemove() {
    await removeStudent(user.id);
  }

  return (
    <div key={ user.id } className="flex flex-row items-center space-x-2 justify-between">
      <div className="flex flex-row items-center space-x-2">
        <div className="w-6 h-6 relative">
          <Image
            src={ user.pfp }
            className="object-contain rounded-full"
            alt="Profile picture"
            fill
          />
        </div>
        <div className="flex flex-col">
          <span>{ user.name } { user.id === ownerId && (
            <span className="self-center text-sm text-light2"> - Owner</span>
          ) }</span>
        </div>
      </div>
      <div>
        { isAdmin && data?.user.id !== user.id && ownerId !== user.id && (
          <ConfirmModal
            title="Remove Member"
            desc="Are you sure you want to remove this member?"
            open={ open }
            onChange={ setOpen }
            onConfirm={ onRemove }
          >
            <button
              className="text-whiter bg-alert px-5 p-2.5 rounded-md brightness-100 text-xs font-semibold transition-all duration-200 inline-flex items-center justify-center hover:shadow-[0_0_20px_-3px_#ff3333] hover:shadow-alert active:brightness-90]"
            >
              Remove
            </button>
          </ConfirmModal>
        ) }
      </div>
    </div>
  );
}

export function PeopleList({ classId }: { classId: string }) {
  const { data: classroom, isAdmin } = useClassroomQuery(classId);
  const { data } = useClassroomMembersQuery(classId, []);

  if (data?.length === 0) return <p>There is no one in this class</p>;

  return (
    <div className="flex flex-col max-h-40">
      <div className="grid grid-cols-2 h-full gap-y-2 overflow-hidden">
        { data?.map((user) => {
          return (
            <PeopleRow
              key={ user.id }
              user={ user.user }
              isAdmin={ false }
              classId={ classId }
              ownerId={ classroom?.ownerId ?? "" }
            />
          );
        }) }
      </div>
      { data && data.length > 6 && (
        <div className="relative">
          <div className="w-full h-12 bg-gradient-to-t from-dark1 absolute bottom-0"></div>
        </div>
      ) }
      <PeopleModal
        users={ data?.map((u) => u.user) ?? [] }
        isAdmin={ isAdmin }
        classId={ classId }
        ownerId={ classroom?.ownerId ?? "" }
      >
        <ModalButton label="Open List" onClick={ () => { } } />
      </PeopleModal>
    </div>
  );
}

export function PeopleModal({
  users,
  isAdmin,
  classId,
  ownerId,
  children,
}: {
  users: User[];
  children: ReactNode;
} & CommonProps) {
  return (
    <ModalBase title="People" trigger={ children } size="lg">
      <div className="flex flex-col gap-y-2 max-h-pc55 overflow-y-auto">
        { users.map((user) => {
          return (
            <PeopleRow
              key={ user.id }
              user={ user }
              isAdmin={ isAdmin }
              classId={ classId }
              ownerId={ ownerId }
            />
          );
        }) }
      </div>
    </ModalBase>
  );
}
