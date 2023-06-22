"use client";

import { Attachment } from "@prisma/client";
import clsx from "clsx";
import React from "react";

export default function Attachment(p: {
  attachment: Attachment;
  className?: string;
}) {
  const filename = p.attachment.filename;
  return (
    <a
      target="_blank"
      href={ `/api/attachment/${p.attachment.id}` }
      className={ clsx(
        "flex flex-row space-x-4 hover:text-blue-500",
        p.className
      ) }
    >
      <div className="flex flex-row text-sky-500 hover:brightness-150">
        { filename.length <= 15 ? (
          <span>{ filename }</span>
        ) : (
          <span>{ filename.substring(0, 5) }...{ filename.substring(filename.length - 7) }</span>
        ) }
      </div>
    </a>
  );
}
