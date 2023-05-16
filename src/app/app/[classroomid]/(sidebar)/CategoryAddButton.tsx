'use client'

import { useInvalidateUserData } from "@/api/client/user";
import { useRoom } from "@/app/app/(Navbar)/RoomContext";
import { Routes } from "@/api/route-helper";
import { Plus } from "@phosphor-icons/react";
import axios from "axios";
import { useCreateCategory } from "@/api/client/classroom";

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