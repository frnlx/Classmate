"use client";

import { NotePencil } from "@phosphor-icons/react";
import React from "react";

export default function Header() {
  return (
    <header className="flex flex-row gap-x-4 items-center p-4 w-full">
      <div className="p-4 rounded-md bg-dark1">
        <NotePencil className="text-light1 font-semibold" size={ 32 } />
      </div>
      <div className="text-slate-100 text-3xl font-bold ">Assignments Evaluation</div>
    </header>
  );
}
