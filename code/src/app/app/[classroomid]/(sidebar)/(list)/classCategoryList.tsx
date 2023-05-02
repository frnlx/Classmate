'use client'

import { usePage } from "@/component/app/context/PageContext";
import ClassSidebarItem from "./classSidebarItem";

const ClassCategoryList = () => {

  const { list } = usePage();

  return (
    <div className="py-4">
      <div className="font-bold text-sm text-slate-600 pb-2">Categories</div>
      {
        list.filter(p => p.isCategory).map((page, idx) => <ClassSidebarItem key={page.index} value={page.data!.name} />)
      }
    </div>
  );
}
 
export default ClassCategoryList;