'use client'
import Image from "next/image";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation"
import clsx from "clsx";
import Link from "next/link";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@chakra-ui/react";
import useAppToast from "@/components/lib/toasts"
import { ContextMenuBase, ContextMenuItem } from "@/components/use-client/ContextMenu"
import { Hash, Link as LinkIcon, Trash } from "@phosphor-icons/react"
import TooltipBase from "@/components/use-client/Tooltip"
import { gotoClassroom } from "./redirectClassroom"
import { Route } from "next"
import ClassroomEmoji from "@/components/static/emoji"

interface prop {
  image?: string
  label: string
  routeid: string
  inviteID?: string
  icon?: ReactNode
  emoji?: string | null
}

export default function NavbarItem({ emoji, label, routeid, inviteID, icon, image }: prop) {
  // color.cyan('    `- Item')

  const router = useRouter()

  const childSegment = useSelectedLayoutSegment()
  const childChildSegment = useSelectedLayoutSegments()[1]
  const childSegmentRoute = childSegment === '(static)' ? childChildSegment : childSegment

  const active = childSegmentRoute === routeid
  const [selected, setSelected] = useState(childSegmentRoute === routeid)

  useEffect(() => {
    if (childSegmentRoute !== routeid) setSelected(false)
    else setSelected(true);
  }, [childSegmentRoute])

  const [isPending, startTransition] = useTransition()
  
  return (
    <NavbarItemContextMenu
      inviteID={inviteID}
      id={routeid}
    >
      <NavbarItemTooltip label={label}>
        <li className={clsx(
          "w-12 h-12", // Navbar Item Size
          "transition-all duration-200 rounded-3xl cursor-pointer list-none",
          (selected ? "bg-[#008E5A]" : "bg-zinc-600"),

          // Little white bar thing
          "before:w-2 before:h-6 before:-left-4 before:top-3 before:bg-white before:rounded-md", // what it look like
          "before:opacity-0 before:transition-all before:block before:absolute before:content-['']", // what it takes to make it appear
          (active ? "translate-x-3 before:opacity-100" : null), // transition when active
            
          "hover:bg-[#008E5A] hover:rounded-xl"
        )}
        >
          <div
            // href={ `/${routeid}` }
            onClick={ () => {
              // startTransition(() => gotoClassroom(routeid))
              setSelected(true)
              if (inviteID) {
                try {
                  const local = JSON.parse(localStorage.getItem('lastvisitedcategory')!) as { [key: string]: string }
                  if (local[routeid]) {
                    
                    router.push(`/${routeid}/${local[routeid]}` as Route)
                  }
                  else router.push(`/${routeid}/home` as Route)
                } catch (error) {
                  localStorage.removeItem('lastvisitedcategory')
                  router.push(`/${routeid}/home` as Route)
                }
              } else {
                router.push(`/${routeid}` as Route)
              }
            } }
            
            className={clsx(
              "w-full h-full flex justify-center items-center",
              // (active ? "translate-x-3" : null)
            )}
            onContextMenu={(e) => {
              if (!inviteID) {
                // Disable right click if its a static page (no invite id)
                //  and if right click -> instantly click it normally without popping up context menu
                e.preventDefault()
                setSelected(true)
                router.push(`/${routeid}` as Route)
              }
            }}>
            <VisuallyHidden>{ label }</VisuallyHidden> {/** For good accessibility and a tag semantic*/ }
            <ClassroomEmoji text={ emoji } size="smaller" />
            {/* {
              image ? <Image src={image} alt={label + "'s Server Picture"} width={60} height={60} /> : null
            } */}
            {icon}
          </div>
        </li>
      </NavbarItemTooltip>
    </NavbarItemContextMenu>
  );
  
}



function NavbarItemTooltip(p: {
  children: ReactNode
  label: string
}) {
  return (
    <TooltipBase
      trigger={ p.children }
      side="right"
      className="m-4"
    >
      {p.label}
    </TooltipBase>
  )

}





const _window = globalThis.window ? global.window : undefined

function NavbarItemContextMenu(p: {
  children: ReactNode,
  id: string,
  inviteID?: string,
}) {
  // color.cyan('      `- Context Menu')

  const toast = useAppToast()

  if (p.inviteID === undefined) return <>{ p.children }</>

  const link = `${globalThis.window?.location.origin}/app/${p.id}`
  const invitelink = `${globalThis.window?.location.origin}/${p.inviteID}`
  const id = p.id

  return (
    <ContextMenuBase trigger={ p.children }>
      <ContextMenuItem
        icon={ <LinkIcon weight="bold" /> }
        onClick={ () => {
          navigator.clipboard.writeText(link)
          toast('Link to classroom copied to clipboard.', "success", 'gray')
        } }
      >
        Copy Link
      </ContextMenuItem>
      <ContextMenuItem
        icon={ <LinkIcon weight='bold' /> }
        onClick={ () => {
          navigator.clipboard.writeText(invitelink)
          toast('Invite Link copied to clipboard.', 'success', 'gray')
        } }
      >
        Copy Invite Link
      </ContextMenuItem>
      <ContextMenuItem
        icon={ <Hash weight='bold'/> }
        onClick={ () => {
          navigator.clipboard.writeText(id)
          toast('Classroom ID copied to clipboard.', 'success', 'gray')
        } }
      >
        Copy ID
      </ContextMenuItem>
      <ContextMenuItem
        icon={ <Trash weight='bold' className="fill-alert" /> }
        onClick={ () => {
          // navigator.clipboard.writeText(id)
          // toast('Classroom ID copied to clipboard.', 'success', 'gray')
        } }
      >
        Archive Classroom
      </ContextMenuItem>
    </ContextMenuBase>
  )
}