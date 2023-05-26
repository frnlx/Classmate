'use client'

import { useCreateCategory } from "@/api/client/category";
import { useRoom } from "@/app/(member)/-Navbar/Navbar";
import { Plus } from "@phosphor-icons/react";

const CategoryAddButton = () => {

  const room = useRoom()
  const createCategory = useCreateCategory(room.current.id);

  return (
    <button
      className="flex flex-row w-full p-2 bg-transparent text-left 
    text-slate-700 hover:text-slate-400 data-[state='active']:text-slate-300"
      onClick={() => { createCategory.mutate() }}
    >
      <span className="w-8">
        <Plus weight="bold" />
      </span>
      <span>
        Add Category
      </span>
    </button>
  );
}
 
export default CategoryAddButton;