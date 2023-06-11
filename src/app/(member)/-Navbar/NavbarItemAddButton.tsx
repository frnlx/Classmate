'use client'

import { useCreateClass } from "@/api/client/user";
import clsx from "clsx"
import { NavbarAddClassIcon } from "./NavbarIcons"
import { ModalBase } from "@/components/use-client/Modal"
import { ReactNode, useState } from "react"

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
  const [] = useState(0)


  return (
    <>
      <ModalBase
        trigger={ p.children }
        title="Add a New Classroom"
        desc="Your server is where you and your friends hang out. Make yours and start talking"
        footer={ (Footer) => <></> }
      >
        <div className="flex gap-2 flex-row">
          <button className="bg-dark2 w-full p-4 rounded-md hover:bg-ok transition-all duration-150">
            <div className="text-sm text-light0">Have an invite?</div>
            Join a classroom
          </button>
          <button className="bg-dark2 w-full p-4 rounded-md hover:bg-ok transition-all duration-150">
            Create a new classroom
          </button>
        </div>
      </ModalBase>
      <ModalBase
        title="Join a Server"
        desc="Enter an invite below to join an existing classroom"
        footer={ (Footer) =>
          <Footer>

          </Footer>
        }
      >
        
      </ModalBase>
    </>
  )
}