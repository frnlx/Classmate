import { Member } from "@prisma/client";
import React from "react";

export default function MemberLevel({ member }: { member: Member }) {
  const userLevel = (member.xp / 100).toFixed();
  const modulo = member.xp % 100;

  return (
    <div className="rounded-lg bg-dark1 p-4 flex flex-row space-x-2 w-full">
      <div className="rounded-md border-2 p-4 border-light0 font-bold">
        <span className="text-xl m-auto">{userLevel}</span>
      </div>

      <div className="flex flex-col gap-2 text-light0 w-full justify-center">
        <div className="flex flex-row justify-between w-full">
          <span>{modulo} / 100</span>
          <span className="text-right">XP</span>
        </div>
        <div className="rounded-xl h-4 w-full bg-dark0">
          <div
            className="rounded-xl h-4 bg-light0"
            style={{
              width: `${modulo}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
