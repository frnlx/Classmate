"use client";

import { HashStraight } from "@phosphor-icons/react";
import AddResource from "./AddResource";

export function Header(p: { title: string }) {
  return (
    <header className="flex flex-row gap-x-4 items-center p-4 w-full">
      <div className="p-4 rounded-md bg-dark1">
        <HashStraight className="text-light1 font-semibold" size={32} />
      </div>
      <div className="text-slate-100 text-3xl font-bold ">{p.title}</div>

      <AddResource />
    </header>
  );
}
