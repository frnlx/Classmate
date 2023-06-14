import { LayoutProps } from "@/types/next"
import Pages from "./-Sidebar/Pages"
import Sidebar from "./-Sidebar/Sidebar"
import { SidebarItem } from "./-Sidebar/SidebarItem"
import { SidebarHomeIcon, SidebarTasksIcon } from "./-Sidebar/SidebarIcons"
import { prisma } from "@/lib/db"
import { getUserData } from "../utils"
import { getCachedSession } from "@/lib/auth-helper"
import { notFound, redirect } from "next/navigation"




export default async function ClassroomLayout({ children, params }: LayoutProps) {

  return (
    <Pages defaultTab="home">

      <Sidebar>
        <SidebarItem icon={<SidebarHomeIcon />}       label="Home"        id="home" />
        <SidebarItem icon={<SidebarTasksIcon />}      label="Assignment"  id="assignment" />
      </Sidebar>
      { children }
      
    </Pages>
  )
} 