'use client'
import { useClassroomQuery } from "@/api/client/classroom";
import { ReactNode } from "react";
import { List } from "@radix-ui/react-tabs";
import { useRoom } from "../../-Navbar/Navbar";
import { useClassCategories, useCreateCategory } from "@/api/client/category";
import { SidebarItem } from "./SidebarItem";
import { SidebarCategoryIcon } from "./SidebarIcons";
import { Plus } from "@phosphor-icons/react";
import { color } from "@/lib/logger/chalk";

export default function Sidebar(p: {
  children: ReactNode
}) {
  color.cyan('    `- (classid) Navbar')
  const { currentId } = useRoom()
  return (
    <List className='bg-zinc-950 w-60 h-screen flex-shrink-0 pr-4' loop>
      <SidebarHeader currentId={ currentId } />
      <div className="py-2">
        {p.children}
      </div>
      <CategoryList currentId={ currentId } />
    </List>
  )
}

//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
function SidebarHeader({ currentId }: {
  currentId?: string
}) {
  const { data } = useClassroomQuery( currentId )
  return (
    <div className="font-bold leading-5 border-b py-4 pb-6 border-slate-700 truncate">
      { data ? data.name : 'loading...'}
    </div>
  )
}


//----------------------------------------------------
function CategoryList({ currentId }: {
  currentId: string
}) {
  const { data: categoryList } = useClassCategories(currentId)
  return (
    <div className="py-2 pt-4">
      <div className="font-bold text-sm text-slate-700 pb-1 pl-2">
        Categories
        <AddCategoryButton />
      </div>
      {
        categoryList ? categoryList.map((page, idx) =>
          <SidebarItem
            key={page.id}
            id={page.id}
            icon={<SidebarCategoryIcon />}
            label={page.name}
            isCategory // enables context menu
          />) : <>Loading Categories</>
      }
    </div>
  )
}


//----------------------------------------------------
function AddCategoryButton(p: {
  
}) {
  const room = useRoom()
  const createCategory = useCreateCategory(room.currentId ?? '')

  return (
    <button
      className="text-slate-600 hover:text-slate-300 "
      onClick={() => { }}
    >
      <Plus weight="bold" />
    </button>
  )
}
