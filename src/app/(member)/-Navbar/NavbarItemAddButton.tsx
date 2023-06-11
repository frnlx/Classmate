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
  const [modalState, setModal] = useState<
    "closed" | "index" | "create" | "join"  
    >("closed")
  
  const closeModal = () => setModal("closed")


  return (
    <>
      <ModalBase
        trigger={ p.children }
        title="Add a New Classroom"
        desc="Your server is where you and your friends hang out. Make yours and start talking"
        footer={ (Footer) => <></> }
        open={ modalState === "index" ? true : false }
        onChange={ (state) => {
          if (state) setModal("index")
          if (!state) closeModal()
        } }
      >
        <div className="flex gap-2 flex-row">
          <button
            onClick={()=>setModal("join")}
            className="bg-dark2 w-full p-4 rounded-md hover:bg-ok transition-all duration-150">
            <div className="text-sm text-light0">Have an invite?</div>
            Join a classroom
          </button>
          <button
            onClick={()=>setModal("create")}
            className="bg-dark2 w-full p-4 rounded-md hover:bg-ok transition-all duration-150">
            Create a new classroom
          </button>
        </div>
      </ModalBase>


      <ModalBase
        title="Create a New Classroom"
        desc="Give your new server a personality with a name and an icon. You can always change it later"
        footer={ (Footer, Button) =>
          <Footer>
            <div className="w-full">
              <Button label="<- Back" onClick={()=>setModal("index")} />
            </div>
            <Button label="Create" onClick={()=>{}} primary />
          </Footer> }
        open={ modalState === "create" ? true : false }
        onChange={ state => {
          if (!state) closeModal()
        }}
      >

      </ModalBase>


      <ModalBase
        title="Join a Server"
        desc="Enter an invite below to join an existing server"
        footer={ (Footer, Button) =>
          <Footer>
            <div className="w-full">
              <Button label="<- Back" onClick={ () => setModal("index") } />
            </div>
            <Button label="Join" onClick={ () => { } } primary />
          </Footer> }
        open={ modalState === "join" ? true : false }
        onChange={ state => {
          if (!state) closeModal()
        }}
      >

      </ModalBase>
    </>
  )
}