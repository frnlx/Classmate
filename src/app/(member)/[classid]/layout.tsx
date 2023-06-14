import { LayoutProps } from "@/types/next"
import Pages from "./-Sidebar/Pages"
import Sidebar from "./-Sidebar/Sidebar"
import { SidebarItem } from "./-Sidebar/SidebarItem"
import { SidebarHomeIcon, SidebarRewardShopIcon, SidebarTasksIcon } from "./-Sidebar/SidebarIcons"
import { prefetch } from "@/api/caching/prefetch"
import { prisma } from "@/lib/db"
import { getUserId } from "@/lib/auth-helper"
import { notFound } from "next/navigation"
import { color } from "@/lib/logger/chalk"

export default async function ClassroomLayout({ children, params }: LayoutProps) {

  // Extract classid from URL dynamic route
  const classid = params?.['classid'] as string

  color.cyan("Find First Classroom Include Categories, Check if Classroom part of Member")
  const classroom = await prisma.classroom.findFirst({
    where: {
      id: classid,
      members: {
        some: {
          id: await getUserId()
        }
      }
    },
    include: {
      categories: true
    }
  })
  if (!classroom) notFound()
  
  // PreFetch category list 
  // const categoryList = await prefetch.classroom.categorylist(classid)
  // const classdata = await prefetch.classroom.data(classid)

  return (
    <Pages defaultTab="home">

      <Sidebar prefetchedclasslist={ classroom.categories } prefetchedclassdata={ classroom }>
        <SidebarItem icon={<SidebarHomeIcon />}       label="Home"        id="home" />
        <SidebarItem icon={<SidebarTasksIcon />}      label="Assignment"  id="assignment" />
      </Sidebar>
      { children }
      
    </Pages>
  )
} 