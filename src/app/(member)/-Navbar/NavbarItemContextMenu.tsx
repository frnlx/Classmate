'use client'
import { Hash, Link } from "@phosphor-icons/react";
import { ReactNode } from "react";
import useAppToast from "@/components/lib/toasts"
import { ContextMenuBase, ContextMenuItem } from "@/components/use-client/ContextMenu"

const _window = globalThis.window ? global.window : undefined;

export default function NavbarItemContextMenu (p: {
  children: ReactNode,
  id: string,
  inviteID?: string,
}) {
  // color.cyan('      `- Context Menu')

  const toast = useAppToast()

  if (p.inviteID === undefined) return <>{p.children}</>;
  
  const link = `${globalThis.window?.location.origin}/app/${p.id}`
  const invitelink = `${globalThis.window?.location.origin}/${p.inviteID}`
  const id = p.id
  
  return (
    <ContextMenuBase trigger={p.children}>
      <ContextMenuItem
        icon={<Link weight="bold" />}
        onClick={() => {
          navigator.clipboard.writeText(link)
          toast('Link to classroom copied to clipboard.', "success", 'gray');
        }}
      >
        Copy Link
      </ContextMenuItem>
      <ContextMenuItem
        icon={<Link weight='bold' />}
        onClick={() => {
          navigator.clipboard.writeText(invitelink)
          toast('Invite Link copied to clipboard.','success','gray');
        }}
      >
        Copy Invite Link
      </ContextMenuItem>
      <ContextMenuItem
        icon={<Hash weight='bold' />}
        onClick={() => {
          navigator.clipboard.writeText(id)
          toast('Classroom ID copied to clipboard.','success','gray');
        }}
      >
        Copy ID
      </ContextMenuItem>
    </ContextMenuBase>
  );
}