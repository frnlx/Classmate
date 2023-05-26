'use client'
import ContextMenuTemplate from "@/client/ui/context-menu-template";
import Item from "@/client/ui/context-menu-template-item";
import { Hash, Link } from "@phosphor-icons/react";
import { ReactNode } from "react";
import useAppToast from "@/client/lib/toasts";

const NavbarItemContextMenu = (p: {
  children: ReactNode,
  id: string,
  inviteID?: string,
}) => {

  const toast = useAppToast()

  if (p.inviteID === undefined) return <>{p.children}</>;
  
  const link = `${window.location.origin}/app/${p.id}`
  const invitelink = `${window.location.origin}/${p.inviteID}`
  const id = p.id
  
  return (
    <ContextMenuTemplate trigger={p.children}>
      <Item
        icon={<Link weight="bold" />}
        onClick={() => {
          navigator.clipboard.writeText(link)
          toast('Link to classroom copied to clipboard.', "success", 'gray');
        }}
      >
        Copy Link
      </Item>
      <Item
        icon={<Link weight='bold' />}
        onClick={() => {
          navigator.clipboard.writeText(invitelink)
          toast('Invite Link copied to clipboard.','success','gray');
        }}
      >
        Copy Invite Link
      </Item>
      <Item
        icon={<Hash weight='bold' />}
        onClick={() => {
          navigator.clipboard.writeText(id)
          toast('Classroom ID copied to clipboard.','success','gray');
        }}
      >
        Copy ID
      </Item>
    </ContextMenuTemplate>
  );
}
 
export default NavbarItemContextMenu;