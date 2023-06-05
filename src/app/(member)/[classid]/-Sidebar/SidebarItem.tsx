'use client'
import useAppToast from "@/components/lib/toasts"
import { Trigger } from "@radix-ui/react-tabs"
import { ReactNode } from "react"
import { useRoom } from "../../-Navbar/Navbar"
import { ContextMenuBase, ContextMenuItem } from "@/components/use-client/ContextMenu"
import { Hash, Link, Trash } from "@phosphor-icons/react"
import { ClientAPI } from "@/api/client/api"
import { useUserid } from "@/api/client/auth"

export function SidebarItem(p: {
  icon: ReactNode
  label: string
  id: string
  isCategory?: boolean
}) {

  return (
    <ContextMenu
      id={p.id}
      isCategory={p.isCategory ?? false}
    >
      <Trigger
        value={p.id}
        className={`flex flex-row items-center rounded-md w-full p-1 px-2 py-[8px] mt-1 text-left 
          text-slate-500 bg-transparent 
          hover:text-slate-400 hover:bg-slate-800/25
          data-[state='active']:text-slate-300 data-[state='active']:bg-slate-800/50
          focus-visible:outline-0 focus:shadow-outline`}
      >
        <span className="w-8 leading-5">{p.icon}</span>
        <span className="font-semibold leading-5">{p.label}</span>
      </Trigger>
    </ContextMenu>
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
  
  const link = `${window.location.origin}/app/${p.id}`
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