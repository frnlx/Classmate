"use client";

import { ResourcePopulatedWithUser } from "@/api/client/api";
import { useDeleteResource } from "@/api/client/resource";
import { ConfirmModal } from "@/components/use-client/Modal";
import { Trash } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PostHeader({
  classId,
  resource,
}: {
  classId: string;
  resource: Omit<ResourcePopulatedWithUser, "_count">;
}) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteResource } = useDeleteResource(
    classId,
    resource.categoryId
  );
  const { back } = useRouter();

  return (
    <>
      <div className="flex flex-col gap-1">
        <header className="text-2xl font-bold">{resource.title}</header>
        <span className="text-sm text-light1">
          By {resource.user.name} |{" "}
          {resource.createdAt.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <ConfirmModal
        title="Delete resource?"
        desc="Are you sure you want to delete this resource?"
        open={open}
        onChange={setOpen}
        onConfirm={async () => {
          await deleteResource(resource.id);
          back();
        }}
      >
        <button className="rounded-md bg-alert/80 p-2 hover:bg-alert transition-all duration-150 absolute top-4 right-4">
          <Trash size={24} />
        </button>
      </ConfirmModal>
    </>
  );
}
