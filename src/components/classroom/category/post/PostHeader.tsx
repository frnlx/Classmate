import { ResourcePopulatedWithUser } from "@/api/client/api";
import React from "react";

export default function PostHeader({
  resource,
}: {
  resource: Omit<ResourcePopulatedWithUser, "_count">;
}) {
  return (
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
  );
}
