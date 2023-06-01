import { LayoutProps } from "@/types/next"
import Pages from "./-Sidebar/Pages"
import Sidebar from "./-Sidebar/Sidebar"
import { SidebarItem } from "./-Sidebar/SidebarItem"
import { SidebarHomeIcon, SidebarRewardShopIcon, SidebarTasksIcon } from "./-Sidebar/SidebarIcons"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import { getUser } from "@/api/caching/prefetch"

export default async function ClassroomLayout({ children, params }: LayoutProps) {

  const classid = params?.['classid'] as string
  if (!classid) notFound()


  const classdata = await prisma.classroom.findUnique({
    where: {
      id: classid
    }
  })
  if (!classdata) notFound()

  return (
    <Pages defaultTab="home"> {/** Provides context of current sidebar route */}
      <Sidebar> { /** Displays the sidebar. Show static pages  */}
        <SidebarItem icon={<SidebarHomeIcon />} label="Home" id="home" />
        <SidebarItem icon={<SidebarTasksIcon />} label="Assignment" id="assignment" />
        <SidebarItem icon={<SidebarRewardShopIcon />} label="Reward Shop" id="reward_shop" />
      </Sidebar>
      {children}
    </Pages>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/layout