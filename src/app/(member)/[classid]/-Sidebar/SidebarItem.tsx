'use client'
import useAppToast from "@/components/lib/toasts"
import { Trigger } from "@radix-ui/react-tabs"
import { ReactNode, useState } from "react"
import { useRoom } from "../../-Navbar/Navbar"
import { GearSix, Hash, Link, Trash } from "@phosphor-icons/react"
import { ClientAPI } from "@/api/client/api"
import { useUserid } from "@/api/client/auth"
import { usePathname, useRouter, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation"
import clsx from "clsx"
import { ButtonTooltip } from "@/components/use-client/Tooltip"
import { ModalBase } from "@/components/use-client/Modal"
import CategoryForm from "./CategoryForm"
import { Route } from "next"

export function SidebarItem(p: {
  icon: ReactNode
  label: string
  id: string
  isCategory?: boolean
  isOwner?: boolean
}) {
  const router = useRouter()
  const room = useRoom()
  const childSegment = useSelectedLayoutSegment()
  const childChildSegment = useSelectedLayoutSegments()[1]
  const childSegmentRoute = childSegment === '(static)' ? childChildSegment : childSegment

  const active = childSegmentRoute === p.id

  return (
    <Trigger
      value={ p.id }
      className={ clsx(
        "flex flex-row items-center rounded-md w-full px-2 py-1 mt-1 text-left duration-150",
        "text-sm group",
        active ? "text-white" : "text-light1 hover:text-light0",
        active ? "bg-dark2 hover:bg-dark2" : "bg-transparent hover:bg-dark2/40",
      ) }
      onContextMenu={ (e) => {
        if (!p.isCategory) {
          e.preventDefault()
          // @ts-ignore
          router.push(`/${room.currentId}/${p.id}`)
        }
      } }
    >
      <span className="w-8 leading-5">{ p.icon }</span>
      <span className="font-semibold leading-5 w-full">{ p.label }</span>
      {
        p.isCategory && p.isOwner ? <SettingsButton active={ active } categoryId={ p.id } name={ p.label } /> : null
      }
    </Trigger>
  )
}



function SettingsButton(p: {
  active: boolean
  categoryId: string
  name: string
}) {
  const { push } = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const room = useRoom()
  const userid = useUserid()

  return (
    <>
      <ButtonTooltip label="Edit Category">
        <div
          className={ clsx(
            "w-4 h-4 text-light1",
            p.active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            "hover:text-white"
          ) }
          onClick={ () => setIsOpen(true) }
        >
          <GearSix weight={ "fill" } />
        </div>
      </ButtonTooltip>
      <ModalBase
        open={ isOpen }
        size="xl"
        title="Edit Category"
        onChange={ setIsOpen }
      >
        <CategoryForm
          onCancel={ () => setIsOpen(false) }
          onUpdated={ () => setIsOpen(false) }
          onDeleted={ () => {
            setIsOpen(false)
            push(`${pathname.split("/").slice(0, -1).join("/")}/home` as Route)
          } }
          idData={ {
            userid, classid: room.currentId, catid: p.categoryId
          } }
          defaultTitle={ p.name }
        />
      </ModalBase>
    </>
  )
}
