import { LayoutProps } from "@/types/next"
import Pages from "./-Sidebar/Pages"
import Sidebar from "./-Sidebar/Sidebar"
import { SidebarItem } from "./-Sidebar/SidebarItem"

export default async function ClassroomLayout({ children, params }: LayoutProps) {
  return (
    <Pages>
      <Sidebar>
        <SidebarItem icon={<></>} label="Home" id="home" />
        <SidebarItem icon={<></>} label="Assignment" id="assignment" />
        <SidebarItem icon={<></>} label="Reward Shop" id="reward_shop" />
      </Sidebar>
      {children}
    </Pages>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/layout