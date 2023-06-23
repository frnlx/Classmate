import { ReactNode, Suspense } from "react";
import { useRoom } from "../../-Navbar/Navbar";
import { Category, Classroom } from "@prisma/client"
import { useUserid } from "@/api/client/auth"
import { List, SidebarHeader, CategoryList, AddCategoryButton } from "./SidebarClient"
import { getClassroomData, getUserData } from "../../utils"
import { notFound } from "next/navigation"
import { getCachedSession, getUserId } from "@/lib/auth"
import { prisma } from "@/lib/db"


export default function Sidebar(p: {
  children: ReactNode
  isOwner: boolean
}) {
  const isOwner = p.isOwner

  return (
    <List className='bg-dark1 w-56 h-screen flex-shrink-0 gap-2' loop>

      <SidebarHeader />
      <div className="py-2 px-2">
        { p.children }
      </div>
      <div className="py-2 px-2">
        <div className="font-bold text-xs text-light2 px-2 py-0.5 flex justify-between">
          Categories
          { isOwner && <AddCategoryButton /> }
        </div>
        <CategoryList isOwner={ isOwner } />
      </div>

    </List>
  )

}
