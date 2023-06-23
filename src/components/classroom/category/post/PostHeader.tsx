"use client";

import { ResourcePopulatedWithUser } from "@/api/client/api";
import { useDeleteResource } from "@/api/client/resource";
import { ConfirmModal } from "@/components/use-client/Modal";
import { Trash } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import EditResourceModal from "./EditResourceModal";

export default function PostHeader({
  classId,
  resource,
  isOwner,
}: {
  classId: string;
  resource: Omit<ResourcePopulatedWithUser, "_count">;
  isOwner: boolean;
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
        <header className="text-2xl font-bold">{ resource.title }</header>
        <span className="text-sm text-light1">
          By { resource.user.name } - { " " }
          { resource.createdAt.toLocaleDateString("en-SG", {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }) } - { " " }
          { resource.type
            .split("_")
            .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
            .join(" ") }{ " " }
        </span>
      </div>

      { isOwner && (
        <div className="absolute top-4 right-4 flex flex-row rounded-md">
          <EditResourceModal classId={ classId } resource={ resource } />
          <ConfirmModal
            title="Delete resource?"
            desc="Are you sure you want to delete this resource?"
            open={ open }
            onChange={ setOpen }
            onConfirm={ async () => {
              await deleteResource(resource.id);
              back();
            } }
          >
            <button className="bg-alert/80 p-2 hover:bg-alert transition-all duration-150 rounded-tr-md rounded-br-md">
              <Trash size={ 24 } />
            </button>
          </ConfirmModal>
        </div>
      ) }
    </>
  );
}
