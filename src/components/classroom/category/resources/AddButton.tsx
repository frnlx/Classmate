'use client'

import { Plus } from "@phosphor-icons/react"
import NewResourceModal from "./NewResourceModal"
import { useDisclosure } from "@chakra-ui/react"
import clsx from "clsx"

export default function AddResourceButton(p: {
  
}) {
  const { isOpen, onOpen, onClose } = useDisclosure() 
  return (
    <>
      <button type='button' onClick={onOpen}
        className={clsx(
          "p-2 flex flex-row items-center gap-w w-full rounded-md",
          "text-slate-500",
          "hover:bg-slate-700/25 hover:text-slate-300"
        )}
      >
        <span className="p-1 bg-slate-700 rounded-md"> 
          <Plus weight="bold" />
        </span>
        <span className="text-sm font-semibold"> 
          Add a thing
        </span>
      </button>
      <NewResourceModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}