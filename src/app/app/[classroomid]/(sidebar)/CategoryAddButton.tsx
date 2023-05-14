'use client'

import { useRoom } from "@/app/app/(navbar)/RoomContext";
import { useUpdateUserData } from "@/app/app/(providers)/UserDataContext";
import { Routes } from "@/component/lib/route-helper";
import { Plus } from "@phosphor-icons/react";
import axios from "axios";

const CategoryAddButton = () => {

  const room = useRoom()
  const updateUserData = useUpdateUserData();

  return (
    <button
      className="flex flex-row w-full p-2 bg-transparent text-left 
    text-slate-700 hover:text-slate-400 data-[state='active']:text-slate-300"
      onClick={() => {
        axios.post(Routes.ClassCategoryCreate(room.current.id))
          .then(
            (res) => {
              if (res.status === 200) {
                console.log("Category Created!")
                updateUserData();
              }
            }
          )
      }}
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