'use client'
import { useClassroomQuery } from "@/api/client/classroom";
import { ReactNode, useEffect, useTransition } from "react";
import { List } from "@radix-ui/react-tabs";
import { useRoom } from "../../-Navbar/Navbar";
import { useCreateCategory } from "@/api/client/category";
import { SidebarItem } from "./SidebarItem";
import { SidebarCategoryIcon } from "./SidebarIcons";
import { CaretDown, Plus } from "@phosphor-icons/react";
import { Category, Classroom } from "@prisma/client"
import clsx from "clsx"
import { ButtonTooltip } from "@/components/use-client/Tooltip"
import { addCategory } from "./addsidebar"
import { useRouter } from "next/navigation"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ClientAPI } from "@/api/client/api"
import { useUserid } from "@/api/client/auth"


export default function Sidebar(p: {
  children: ReactNode
  prefetchedclasslist: Category[]
  prefetchedclassdata: Classroom
}) {

  const { currentId } = useRoom()
  const userid = useUserid()

  // const { data: classroom } = useClassroomQuery(currentId, p.prefetchedclassdata)
  // const { data: categoryList } = useClassCategories(currentId, p.prefetchedclasslist)

  const { data: categoryList } = useQuery({
    queryKey: ['classrooms', currentId, 'categorylist'],
    queryFn() {
      return ClientAPI.getCategoryList({ userid, classid: currentId })
    },
    enabled: !!userid && !!currentId,
    initialData: p.prefetchedclasslist,
    staleTime: 30,
    refetchOnWindowFocus: false,
  })

  return (
    <List className='bg-dark1 w-56 h-screen flex-shrink-0 gap-2' loop>

      <SidebarHeader currentId={ currentId } />
      <div className="py-2 px-2">
        {p.children}
      </div>
      <div className="py-2 px-2">
        {/* <CategoryList currentId={ currentId } categoryList={ categoryList! } /> */}
        <CategoryList currentId={ currentId } categoryList={ categoryList } />
      </div>
      
    </List>
  )
  
}


function SidebarHeader(p: {
  currentId: string
}) {

  const { data } = useClassroomQuery( p.currentId )
  return (
    <div className={ clsx(
      "font-bold leading-5 py-4 px-4 border-slate-700 truncate",
      "text-sm",
      "hover:bg-dark2/50 group",
      "flex",
      "gap-1"
    ) }>
      <div className="truncate text-white">
        { data ? data.name : 'loading...' }
      </div>
      <CaretDown size={16} weight={"bold"} className="fill-light1 group-hover:fill-light0"/>
    </div>
  )
      
}



function CategoryList(p: {
  currentId: string
  categoryList: Category[]
}) {
  useEffect(() => {
    console.log(`CategoryList Rerender ${p.currentId}`)
  },[])
  return (
    <>
      <div className="font-bold text-xs text-light2 px-2 py-0.5 flex justify-between">
        Categories
        <AddCategoryButton />
      </div>
      {
        p.categoryList ? p.categoryList.map((page, idx) =>
          <SidebarItem
            key={page.id}
            id={page.id}
            icon={<SidebarCategoryIcon />}
            label={page.id}
            isCategory // enables context menu
          />) : <>Loading Categories</>
      }
    </>
  )
}


function AddCategoryButton() {

  const room = useRoom()
  const createCategory = useCreateCategory(room.currentId ?? '')

  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const qc = useQueryClient()

  return (
    <ButtonTooltip label="Add New Category">
      <button
        className="text-light2 hover:text-light0 text-sm"
        onClick={ () => startTransition(() => {
          return addCategory(room.currentId).then(() => {
            qc.invalidateQueries(['classrooms', room.currentId, 'categorylist'])
            // router.refresh()
          })
        }) }
      >
        <Plus weight="bold" />
      </button>
    </ButtonTooltip>
  )

}
