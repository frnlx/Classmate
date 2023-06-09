'use client'

import { useCreateClass } from "@/api/client/user";
import clsx from "clsx"
import { NavbarAddClassIcon } from "./NavbarIcons"
import { ModalBase } from "@/components/use-client/Modal"
import { ReactNode } from "react"

export default function NavbarItemAddButton() {
  // color.cyan('    `- Add Button')

  // Using hook from a different file, ❌ doesn't work. why?
  const { mutate: createClass } = useCreateClass()

  return (
    <CreateClassModal>
      <button className={ clsx(
        "w-12 h-12",
        "transition-all duration-200 rounded-3xl cursor-pointer list-none",
        "bg-zinc-600",
        "hover:bg-[#008E5A]",
        "flex justify-center items-center"
      ) }
      >
        <NavbarAddClassIcon />
      </button>
    </CreateClassModal>
  )
}



function CreateClassModal(p: {
  children: ReactNode
}) {
  return (
    <ModalBase
      trigger={ p.children }
      title="Create New Classroom"
      desc="Your server is where you and your friends hang out. Make yours and start talking"
      footer={ (Footer) =>
        <Footer>
        
        </Footer>
      }
    >
      Test
    </ModalBase>
  )
}