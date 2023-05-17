import { ClassAPI } from "@/api/route-helper";
import useAppToast from "@/client/lib/toasts";
import ContextMenuTemplate from "@/client/ui/context-menu-template";
import Item from "@/client/ui/context-menu-template-item";
import { Hash, Link, Trash } from "@phosphor-icons/react";
import { Category } from "@prisma/client";
import axios from "axios";
import { ReactNode } from "react";
import { useRoom } from "../../(Navbar)/RoomContext";

const CategoryItemContextMenu = (p: { children: ReactNode, category?: Category }) => {
  const toast = useAppToast()
  const room = useRoom()
  if (!p.category) return <>{p.children}</>
  const link = `${window.location.origin}/app/${p.category.id}`
  const id = p.category.id
  const name = p.category.name
  return (
    <ContextMenuTemplate trigger={p.children}>
      <Item icon={<Link weight="bold"/>}
        onClick={() => {
          navigator.clipboard.writeText(link)
          toast('Link to category copied to clipboard.', 'success', 'gray')
        }}
      >
        Copy Link
      </Item>
      <Item icon={<Hash weight='bold'/>}
        onClick={() => {
          navigator.clipboard.writeText(id)
          toast('Category ID copied to clipboard.', 'success', 'gray')
        }}
      >
        Copy ID
      </Item>
      <Item icon={<Trash/>}
        onClick={() => {
          ClassAPI.DeleteCategory(room.current.id, p.category!.id).then(
            () => {
              
              toast(`Category ${name} deleted.`, 'success', 'gray')
            } 
          ).catch(
            () => {
              
              toast(`Error occured`, 'error')
            }
          )
          
        }}
      >
        Delete Category
      </Item>
    </ContextMenuTemplate>
  );
}
 
export default CategoryItemContextMenu;