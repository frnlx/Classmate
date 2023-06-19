"use client";

import { Paperclip } from "@phosphor-icons/react";
import { Attachment } from "@prisma/client";
import React from "react";

export default function Attachment(p: { attachment: Attachment }) {
  return (
    <a
      target="_blank"
      href={`/api/attachment/${p.attachment.id}`}
      className="flex flex-row space-x-4 hover:text-blue-500"
    >
      <Paperclip size={24} />
      <span>{p.attachment.filename}</span>
    </a>
  );
}
