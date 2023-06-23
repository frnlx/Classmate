"use client";

import { HashStraight } from "@phosphor-icons/react";
import AddResource from "./AddResource";
import { useSessionRequired } from "@/api/client/auth";
import { useClassroomQuery } from "@/api/client/classroom";

export function Header(p: { title: string; classId: string }) {
  const session = useSessionRequired();
  const { data } = useClassroomQuery(p.classId);

  return (
    <header className="flex flex-row gap-x-4 items-center p-4 w-full">
      <div className="p-4 rounded-md bg-dark1">
        <HashStraight className="text-light1 font-semibold" size={ 32 } />
      </div>
      <div className="text-slate-100 text-3xl font-bold ">{ p.title }</div>

      { session.data?.user.id === data?.ownerId && (
        <div className="ml-auto">
          <AddResource />
        </div>
      ) }
    </header>
  );
}
