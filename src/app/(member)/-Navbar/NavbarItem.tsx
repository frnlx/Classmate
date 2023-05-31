'use client'
import Image from "next/image";
import NavbarItemContextMenu from "./NavbarItemContextMenu";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation"
import clsx from "clsx";
import Link from "next/link";
import { ForwardRefExoticComponent, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@chakra-ui/react";
import { Icon } from "@phosphor-icons/react";
import { color } from "@/lib/logger/chalk";

interface prop {
  image?: string
  label?: string
  routeid: string
  inviteID?: string
  icon?: ReactNode
}

export default function NavbarItem({ image, label, routeid, inviteID, icon }: prop) {
  
  color.cyan('    `- Item')

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
  
  return (
    <NavbarItemContextMenu
      inviteID={inviteID}
      id={routeid}
    >
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
        <Link
          // @ts-ignore
          href={`/${routeid}`}
          onClick={() => setSelected(true)}
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
              // @ts-ignore
              router.push(`/${routeid}`)
            }
          }}>
          <VisuallyHidden>{label}</VisuallyHidden> {/** For good accessibility and a tag semantic*/}
          {
            image ? <Image src={image} alt={label + "'s Server Picture"} width={60} height={60} /> : null
          }
          {icon}
        </Link>
      </li>
    </NavbarItemContextMenu>
  );
  
}