'use client'

import { ClientAPI } from '@/api/client/api'
import { useUserid } from '@/api/client/auth'
import { CaretDown, Plus } from '@phosphor-icons/react'
import { Classroom } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { useEffect, useTransition } from 'react'
import { SidebarItem } from './SidebarItem'
import { SidebarCategoryIcon } from './SidebarIcons'
import { useRoom } from '../../-Navbar/Navbar'
import { useCreateCategory } from '@/api/client/category'
import { useRouter } from 'next/navigation'
import { addCategory } from './addsidebar'
import { ButtonTooltip } from '@/components/use-client/Tooltip'

export { List } from '@radix-ui/react-tabs'


export function SidebarHeader(p: {
}) {
  const { currentId, userData } = useRoom()
  // const { data } = useClassroomQuery(currentId)
  const userid = useUserid()
  const qc = useQueryClient()
  
  const { data } = useQuery({
    queryKey: ['classrooms', currentId, 'data'],
    queryFn() {
      return ClientAPI.getClassroom({ userid, classid: currentId })
    },
    enabled: !!userid && !!currentId,
    initialData: userData.classes.find(c => c.id === currentId) as Classroom,
  })

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
      <CaretDown size={ 16 } weight={ "bold" } className="fill-light1 group-hover:fill-light0" />
    </div>
  )

}

export function CategoryList(p: {
}) {
  const { currentId, userData } = useRoom()
  const userid = useUserid()

  const qc = useQueryClient()

  // So ugly 🤮
  const { data: categoryList, error } = useQuery({
    queryKey: ['classrooms', currentId, 'categorylist'],
    queryFn() {
      return ClientAPI.getCategoryList({ userid, classid: currentId })
    },
    enabled: !!userid && !!currentId,

    initialData: userData.classes.find(c => c.id === currentId)?.categories,

    staleTime: 30,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    console.log(`CategoryList Rerender ${currentId}`)
  }, [])
  return (
    <>
      {
        categoryList ? categoryList.map((page, idx) =>
          <SidebarItem
            key={ page.id }
            id={ page.id }
            icon={ <SidebarCategoryIcon /> }
            label={ page.id }
            isCategory // enables context menu
          />) : <>Loading Categories</>
      }
    </>
  )
}



export function AddCategoryButton() {

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
