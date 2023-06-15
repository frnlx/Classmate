"use client";

import { useSessionRequired } from "@/api/client/auth";
import { useClassroomQuery } from "@/api/client/classroom";
import { useLeaveClass } from "@/api/client/user";
import EditClassForm from "@/components/form/EditClassForm";
import { ModalBase } from "@/components/use-client/Modal";
import { Classroom } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type ButtonProps = { classroom: Classroom };

function EditClassButton({ classroom }: ButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalBase
      trigger={
        <button className="rounded-md bg-dark2 px-4 py-2 hover:bg-light2 transition-all duration-150">
          Edit Class
        </button>
      }
      title="Edit classroom"
      open={isOpen}
      onChange={setIsOpen}
    >
      <EditClassForm
        defaultValues={classroom}
        classId={classroom.id}
        onCancel={() => setIsOpen(false)}
        onUpdated={() => setIsOpen(false)}
      />
    </ModalBase>
  );
}

function LeaveClassButton({ classroom }: ButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: leaveClassroom } = useLeaveClass();
  const { push } = useRouter();

  return (
    <ModalBase
      trigger={
        <button className="rounded-md bg-dark2 px-4 py-2 hover:bg-light2 transition-all duration-150">
          Leave Class
        </button>
      }
      title="Leave classroom?"
      desc="Are you sure you want to leave this classroom?"
      open={isOpen}
      onChange={setIsOpen}
    >
      <div className="flex flex-row space-x-2 justify-center">
        <button
          className="rounded-md bg-dark2 px-4 py-2 hover:bg-light2 transition-all duration-150"
          onClick={() => setIsOpen(false)}
        >
          No
        </button>
        <button
          className="rounded-md bg-alert bg-opacity-80 px-4 py-2 hover:bg-opacity-100 transition-all duration-150"
          onClick={async () => {
            // TODO: actually leave classroom
            await leaveClassroom(classroom.id);
            setIsOpen(false);
            push("/dashboard");
          }}
        >
          Yes
        </button>
      </div>
    </ModalBase>
  );
}

export default function ControlButton({ classId }: { classId: string }) {
  const { data, isLoading } = useClassroomQuery(classId);
  const { data: user } = useSessionRequired();
  if (isLoading) return <></>;

  return (
    <div className="flex flex-row justify-end">
      {user?.user.id === data?.ownerId ? (
        <EditClassButton classroom={data!} />
      ) : (
        <LeaveClassButton classroom={data!} />
      )}
    </div>
  );
}
