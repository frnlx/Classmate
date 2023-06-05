'use client'

import { useCreateClass } from "@/api/client/user";
import clsx from "clsx"
import { NavbarAddClassIcon } from "./NavbarIcons"

export default function NavbarItemAddButton() {
  // color.cyan('    `- Add Button')

  // Using hook from a different file, ❌ doesn't work. why?
  const { mutate: createClass } = useCreateClass()

  return (
    <button className={ clsx(
      "w-12 h-12",
      "transition-all duration-200 rounded-3xl cursor-pointer list-none",
      "bg-zinc-600",
      "hover:bg-[#008E5A]",
      "flex justify-center items-center"
    ) }
      onClick={ () => createClass()}
    >
      <NavbarAddClassIcon />
    </button>
  )
}