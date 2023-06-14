'use client'

import { useRoom } from "@/app/(member)/-Navbar/Navbar"
import { usePage } from "../../-Sidebar/Pages"
import clsx from "clsx"
import { Plus } from "@phosphor-icons/react"

export default function AddSectionButton() {
  const room = useRoom()
  const page = usePage()
  
  return (
    <button type="button"
      className={clsx(
        "px-4 p-2 flex flex-row items-center gap-2 w-full rounded-md",
        "text-slate-500",
        "hover:text-slate-300",
      )}
      onClick={() => { }}
    >
      <span className="p-1 rounded-md">
        <Plus weight="bold" />
      </span>
      <span className="text-sm font-semibold">
        Add a section
      </span>
    </button>
  )
}