'use client'
import useAppToast from "@/components/lib/toasts"
import { Trigger } from "@radix-ui/react-tabs"
import { ReactNode } from "react"
import { useRoom } from "../../-Navbar/Navbar"
import { ContextMenuBase, ContextMenuItem } from "@/components/use-client/ContextMenu"
import { GearSix, Hash, Link, Trash } from "@phosphor-icons/react"
import { ClientAPI } from "@/api/client/api"
import { useUserid } from "@/api/client/auth"
import { useRouter, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation"
import clsx from "clsx"
import { ButtonTooltip } from "@/components/use-client/Tooltip"

export function SidebarItem(p: {
  icon: ReactNode
  label: string
  id: string
  isCategory?: boolean
}) {
  const router = useRouter()
  const room = useRoom()
  const childSegment = useSelectedLayoutSegment()
  const childChildSegment = useSelectedLayoutSegments()[1]
  const childSegmentRoute = childSegment === '(static)' ? childChildSegment : childSegment
  
  const active = childSegmentRoute === p.id

  return (
    <ContextMenu
      id={p.id}
      isCategory={ p.isCategory ?? false }
    >
      <Trigger
        value={p.id}
        className={ clsx(
          "flex flex-row items-center rounded-md w-full px-2 py-1 mt-1 text-left",
          "text-sm group",
          active ? "text-white" : "text-light1 hover:text-light0",
          active ? "bg-dark2 hover:bg-dark2" : "bg-transparent hover:bg-dark2/40",
          "focus-visible:outline-0 focus:shadow-outline"
        ) }
        onContextMenu={ (e) => {
          if (!p.isCategory) {
            e.preventDefault()
            // @ts-ignore
            router.push(`/${room.currentId}/${p.id}`)
          }
        }}
      >
        <span className="w-8 leading-5">{p.icon}</span>
        <span className="font-semibold leading-5 w-full">{ p.label }</span>
        {
          p.isCategory ? <SettingsButton active={ active } /> : null
        }
      </Trigger>
    </ContextMenu>
  )
}



function SettingsButton(p: {
  active: boolean
}) {
  
  return (
    <ButtonTooltip label="Edit Category">
      <div className={ clsx(
        "w-4 h-4 text-light1",
        p.active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        "hover:text-white"
      ) }>
        <GearSix weight={ "fill" }/>
      </div>
    </ButtonTooltip>
  )
}




function ContextMenu(p: {
  children: ReactNode
  id: string
  isCategory: boolean
}) {
  const toast = useAppToast()
  const room = useRoom()
  const userid = useUserid()

  if (!p.isCategory) return <>{p.children}</>
  
  const link = `${globalThis.window?.location.origin}/app/${p.id}`
  const id = p.id

  return (
    <ContextMenuBase trigger={p.children}>
      <ContextMenuItem icon={<Link weight="bold"/>}
        onClick={() => {
          navigator.clipboard.writeText(link)
          toast('Link to category copied to clipboard.', 'success', 'gray')
        }}
      >
        Copy Link
      </ContextMenuItem>
      <ContextMenuItem icon={<Hash weight='bold'/>}
        onClick={() => {
          navigator.clipboard.writeText(id)
          toast('Category ID copied to clipboard.', 'success', 'gray')
        }}
      >
        Copy ID
      </ContextMenuItem>
      <ContextMenuItem icon={<Trash/>}
        onClick={() => { room.currentId ?
          ClientAPI.deleteCategory({
            userid, classid: room.currentId, catid: p.id
          }).then(
            () => {
              toast(`Category ${name} deleted.`, 'success', 'gray')

            } 
          ).catch(
            () => {
              toast(`Error occured`, 'error')

            }
          ) : null
        }}
      >
        Delete Category
      </ContextMenuItem>
    </ContextMenuBase>
  )

}