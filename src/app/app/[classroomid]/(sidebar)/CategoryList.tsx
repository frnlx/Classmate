'use client'

import { usePage } from "@/app/app/[classroomid]/PageContext";
import SidebarItem from "./SidebarItem";

const CategoryList = () => {

  const { list } = usePage();

  return (
    <div className="py-2 pt-4">
      <div className="font-bold text-sm text-slate-700 pb-1 pl-2">Categories</div>
      {
        list.filter(p => p.isCategory).map((page, idx) => <SidebarItem key={page.index} value={page.data!.name} category={page.data}/>)
      }
    </div>
  );
}
 
export default CategoryList;