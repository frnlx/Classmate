'use client'

import { Plus } from "@phosphor-icons/react";

const CreateClassCategory = () => {
  return (
    <button
      className="flex flex-row w-full p-2 bg-transparent text-left 
    text-slate-700 hover:text-slate-400 data-[state='active']:text-slate-300">
      <span className="w-8">
        <Plus weight="bold"/>
      </span>
      <span>
        Add Category
      </span>
    </button>
  );
}
 
export default CreateClassCategory;