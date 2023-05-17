'use client'

import { usePage } from "@/app/app/[classroomid]/PageContext";
import SidebarItem from "./SidebarItem";
import { useClassCategories } from "@/api/client/category";
import { useRoom } from "../../(Navbar)/RoomContext";

const CategoryList = () => {

  const room = useRoom();
  const { data: categoryList } = useClassCategories(room.current.id)

  return (
    <div className="py-2 pt-4">
      <div className="font-bold text-sm text-slate-700 pb-1 pl-2">Categories</div>
      {
        categoryList ? categoryList.map((page, idx) => <SidebarItem key={page.id} value={page.name} category={page}/>) : <></>
      }
    </div>
  );
}
 
export default CategoryList;