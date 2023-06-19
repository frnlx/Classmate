"use client";

import { Paperclip } from "@phosphor-icons/react";
import { Attachment, Resource } from "@prisma/client";
import { Session } from "next-auth";
import React from "react";

export default function PostContent({
  resource,
}: {
  resource: Resource & {
    attachment: Attachment | null;
  };
}) {
  return (
    <>
      <p className="whitespace-pre-line break-words text-sm">{ resource.content }</p>
      { resource.attachment && (
        <a
          target="_blank"
          href={ `/api/attachment/${resource.attachment.id}` }
          className="flex flex-row space-x-4 hover:text-blue-500"
        >
          <Paperclip size={ 24 } />
          <span>{ resource.attachment.filename }</span>
        </a>
      ) }
    </>
  );
}
