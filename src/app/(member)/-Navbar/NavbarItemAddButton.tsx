'use client'

import { useCreateClass } from "@/api/client/user";
import { color } from "@/lib/logger/chalk";
import clsx from "clsx"
import { NavbarAddClassIcon } from "./NavbarIcons"

interface prop extends React.HTMLAttributes<HTMLButtonElement>{
  userid: string
}

export default function NavbarItemAddButton({ userid, className, ...rest }: prop) {
  // color.cyan('    `- Add Button')

  const createClassroomMutation = useCreateClass(userid)

  return (
    <button { ...rest } className={ clsx(
      "w-12 h-12",
      "transition-all duration-200 rounded-3xl cursor-pointer list-none",
      "bg-zinc-600",
      "hover:bg-[#008E5A]",
      "flex justify-center items-center"
    ) }
      onClick={() => createClassroomMutation.mutate()}
    >
      <NavbarAddClassIcon />
    </button>
  )
}