'use client'

import { Routes } from "@/component/lib/route-helper"
import { Plus } from "@phosphor-icons/react"
import axios from "axios"

const AddPostButton = ({ sectionid } : { sectionid:string }) => {
  const onClick = () => {
    // axios.post(Routes.SectionCreate(classroomid))
    //   .then( res => res.data )
  }
  return (
    <button type='button' onClick={onClick}
      className="p-2 flex flex-row items-center gap-2 hover:bg-slate-700/25 w-full rounded-md"
    >
      <span className="p-1 bg-slate-700 text-slate-500 rounded-md">
        <Plus weight="bold"/>
      </span>
      <span className="text-slate-500 text-sm font-semibold">
        Add a thing
      </span>
    </button>
  )
}
export default AddPostButton;