'use client'

import { useCreateClass, useJoinClass } from "@/api/client/user"
import clsx from "clsx"
import { NavbarAddClassIcon } from "./NavbarIcons"
import { ModalBase, ModalButton } from "@/components/use-client/Modal"
import { ReactNode, useState } from "react"
import JoinForm from "@/components/form/JoinForm"
import { useRouter } from "next/navigation"
import CreateClassForm from "@/components/form/CreateClassForm"
import { Route } from "next"

export default function NavbarItemAddButton() {

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
    "closed" | "index" | "create" | "creating" | "join" | "joining"
  >("closed")

  const closeModal = () => setModal("closed")
  const router = useRouter()

  return (
    <>
      <ModalBase
        trigger={ p.children }
        title="Add a New Classroom"
        desc="Your server is where you and your friends hang out. Make yours and start talking"
        open={ modalState === "index" ? true : false }
        onChange={ (state) => {
          if (state) setModal("index")
          if (!state) closeModal()
        } }
      >
        <div className="flex gap-2 flex-row">
          <button
            onClick={ () => setModal("join") }
            className="font-semibold text-sm bg-dark2 w-full p-4 rounded-md hover:bg-ok transition-all duration-150">
            <div className="text-xs text-light0">Have an invite?</div>
            Join a classroom
          </button>
          <button
            onClick={ () => setModal("create") }
            className="font-semibold text-sm bg-dark2 w-full p-4 rounded-md hover:bg-ok transition-all duration-150">
            <div className="text-xs text-light0">Own a class?</div>
            Create a classroom
          </button>
        </div>
      </ModalBase>


      <ModalBase
        title="Create a New Classroom"
        desc="Give your new server a personality with a name and an icon. You can always change it later"
        open={ modalState === "create" ? true : false }
        onChange={ state => { } }
      >
        <CreateClassForm
          onBack={ () => setModal("index") }
          onCreate={ (classid) => {
            closeModal()
            router.push(`/${classid}` as Route)
          } }
        />
      </ModalBase>


      <ModalBase
        title="Join a Server"
        desc="Enter an invite below to join an existing server"
        open={ modalState === "join" ? true : false }
        onChange={ state => { } }
      >
        <JoinForm
          onBack={ () => setModal("index") }
          onJoin={ (classid) => {
            closeModal()
            classid && router.push(`/${classid}` as Route)
          } } />
      </ModalBase>


      <ModalBase
        title="Joining..."
        desc="Please wait while we connect you with the classroom"
        open={ modalState === "joining" ? true : false }
        onChange={ state => { } }
      >

      </ModalBase>

      <ModalBase
        title="Creating..."
        desc="Please wait while we create you a classroom"
        open={ modalState === "creating" ? true : false }
        onChange={ state => { } }
      >

      </ModalBase>
    </>
  )
}