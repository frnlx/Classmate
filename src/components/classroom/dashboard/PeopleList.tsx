"use client";

import {
  useClassroomMembersQuery,
  useClassroomQuery,
} from "@/api/client/classroom";
import { useLeaveClass, useRemoveUser } from "@/api/client/user";
import { ModalBase, ModalButton } from "@/components/use-client/Modal";
import { Classroom, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type CommonProps = {
  isAdmin: boolean;
  classId: string;
};

function PeopleRow({ user, isAdmin, classId }: { user: User } & CommonProps) {
  const { data } = useSession();
  const { mutateAsync: removeStudent } = useRemoveUser(classId);

  async function onRemove() {
    await removeStudent(user.id);
  }

  return (
    <div key={user.id} className="flex flex-row items-center space-x-2">
      <div className="w-6 h-6 bg-green-600 rounded-full" />
      <span>{user.name}</span>
      {isAdmin && data?.user.id !== user.id && (
        <button
          className="rounded-md bg-alert bg-opacity-80 px-4 py-2 hover:bg-opacity-100 transition-all duration-150 !ml-auto"
          onClick={onRemove}
        >
          Remove
        </button>
      )}
    </div>
  );
}

export function PeopleList({ classId }: { classId: string }) {
  const { isAdmin } = useClassroomQuery(classId);
  const { data } = useClassroomMembersQuery(classId, []);

  if (data?.length === 0) return <p>There is no one in this class</p>;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="grid grid-cols-2">
        {data?.map((user) => {
          return (
            <PeopleRow
              key={user.id}
              user={user}
              isAdmin={false}
              classId={classId}
            />
          );
        })}
      </div>

      <PeopleModal users={data ?? []} isAdmin={isAdmin} classId={classId} />
    </div>
  );
}

export function PeopleModal({
  users,
  isAdmin,
  classId,
}: {
  users: User[];
} & CommonProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <ModalBase
      open={isOpen}
      title="People"
      trigger={<ModalButton label="Open List" onClick={() => {}} />}
      onChange={setOpen}
    >
      <div className="flex flex-col gap-y-2">
        {users.map((user) => {
          return (
            <PeopleRow
              key={user.id}
              user={user}
              isAdmin={isAdmin}
              classId={classId}
            />
          );
        })}
      </div>
    </ModalBase>
  );
}
