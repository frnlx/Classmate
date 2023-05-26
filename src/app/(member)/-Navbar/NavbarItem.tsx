'use client'
import Image from "next/image";
import NavbarItemContextMenu from "./NavbarItemContextMenu";
import { useSelectedLayoutSegment } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@chakra-ui/react";
import { Icon } from "@phosphor-icons/react";

interface prop {
  image?: string
  label?: string
  routeid: string
  inviteID?: string
  icon?: Icon
}

const NavbarItem = ({ image, label, routeid, inviteID, icon: ItemIcon }: prop) => {
  
  const childSegmentRoute = useSelectedLayoutSegment()
  const router = useRouter()

  const [selected, setSelected] = useState(childSegmentRoute === routeid)

  useEffect(() => {
    if(childSegmentRoute !== routeid) setSelected(false);
  },[childSegmentRoute])
  
  return (
    <NavbarItemContextMenu
      inviteID={inviteID}
      id={routeid}
    >
      <li className={clsx(
        "overflow-hidden transition-all duration-200 w-14 h-14 rounded-3xl cursor-pointer ",
        (selected ? "bg-[#008E5A]" : "bg-zinc-600"),
        "hover:bg-[#008E5A] hover:rounded-xl")}
      >
        <Link href={`/${routeid}`} onClick={() => setSelected(true)} className="w-full h-full flex justify-center items-center" onContextMenu={(e) => {
          if (!inviteID)
          {
            // Disable right click if its a static page (no invite id)
            //  and if right click -> instantly click it normally without popping up context menu
            e.preventDefault()
            setSelected(true)
            router.push(`/${routeid}`)
          }
        }}>
          <VisuallyHidden>{label}</VisuallyHidden> {/** For good accessibility and a tag semantic*/}
          {
            image ? <Image src={image} alt={label + "'s Server Picture"} width={60} height={60} /> : null
          }
          {
            ItemIcon ? <ItemIcon weight="bold" size={28}/> : null
          }
        </Link>
      </li>
    </NavbarItemContextMenu>
  );
  
}
 
export default NavbarItem;