import { LayoutProps } from "@/types/next"
import Pages from "./-Sidebar/Pages"
import Sidebar from "./-Sidebar/Sidebar"
import { SidebarItem } from "./-Sidebar/SidebarItem"
import { SidebarHomeIcon, SidebarRewardShopIcon, SidebarTasksIcon } from "./-Sidebar/SidebarIcons"
import { prisma } from "@/lib/db"
import { getUserData } from "../utils"
import { getCachedSession } from "@/lib/auth"
import { notFound, redirect } from "next/navigation"




export default async function ClassroomLayout({ children, params }: LayoutProps) {
  const session = await getCachedSession();
  const classId = params!.classid as string
  const classroom = await prisma.classroom.findUnique({
    where: { id: classId },
    select: { ownerId: true }
  })

  if (!classroom) notFound()


  return (
    <Pages defaultTab="home">

      <Sidebar isOwner={ classroom.ownerId === session.user.id }>
        <SidebarItem icon={ <SidebarHomeIcon /> } label="Home" id="home" />
        { classroom.ownerId === session.user.id && <SidebarItem icon={ <SidebarTasksIcon /> } label="Assignment" id="assignment" /> }
        <SidebarItem icon={ <SidebarRewardShopIcon /> } label="Reward Shop" id="rewards" />

      </Sidebar>
      { children }

    </Pages>
  )
} 