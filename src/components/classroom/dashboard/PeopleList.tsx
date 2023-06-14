"use client";

import { useClassroomMembersQuery } from "@/api/client/classroom";
import React from "react";

export function PeopleList({ classId }: { classId: string }) {
  const { data } = useClassroomMembersQuery(classId, []);

  if (data?.length === 0) return <p>There is no one in this class</p>;

  return (
    <div className="grid grid-cols-2">
      {data?.map((user) => {
        return (
          <div key={user.id} className="flex flex-row items-center space-x-2">
            <div className="w-6 h-6 bg-green-600 rounded-full" />
            <span>{user.name}</span>
          </div>
        );
      })}
    </div>
  );
}
