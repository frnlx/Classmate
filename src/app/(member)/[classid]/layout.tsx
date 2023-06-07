import { LayoutProps } from "@/types/next"
import Pages from "./-Sidebar/Pages"
import Sidebar from "./-Sidebar/Sidebar"
import { SidebarItem } from "./-Sidebar/SidebarItem"
import { SidebarHomeIcon, SidebarRewardShopIcon, SidebarTasksIcon } from "./-Sidebar/SidebarIcons"
import { prefetch } from "@/api/caching/prefetch"

export default async function ClassroomLayout({ children, params }: LayoutProps) {

  // Extract classid from URL dynamic route
  const classid = params?.['classid'] as string

  // PreFetch category list 
  const classdata = await prefetch.classroom.data(classid)
  const categoryList = await prefetch.classroom.categorylist(classid)

  return (
    <Pages defaultTab="home">

      <Sidebar classlist={ Array.from(categoryList.values()) } classdata={classdata}>
        <SidebarItem icon={<SidebarHomeIcon />}       label="Home"        id="home" />
        <SidebarItem icon={<SidebarTasksIcon />}      label="Assignment"  id="assignment" />
      </Sidebar>
      { children }
      
    </Pages>
  )
} 