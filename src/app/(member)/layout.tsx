import { color } from "@/lib/logger/chalk"
import { LayoutProps } from "@/types/next"
import Providers from "./providers"
import { getLoggedInSession } from "@/lib/auth-helper"
import Navbar from "./-Navbar/Navbar"
import NavbarItem from "./-Navbar/NavbarItem"
import { NavbarClassListIcon, NavbarDashboardIcon, NavbarStatisticsIcon, NavbarTasksIcon } from "./-Navbar/NavbarIcons"

export default async function AppLayout({ children, params }: LayoutProps) {
  
  color.yellow('  |-(app) Layout Rendered')
  color.magenta('    - getting session server-side')
  const session = await getLoggedInSession()

  return (
    <main className="bg-dark0 w-screen h-screen overflow-clip text-slate-20 flex flex-row gap-0 text-white flex-grow-1">
      <Providers session={session}> {/** Loads sessions, state, and chakraUI context */}
        
        <Navbar
          defaultRoom={ <NavbarItem label="My Dashboard" routeid="dashboard" icon={<NavbarDashboardIcon />}/> }
          staticRooms={
            <>
              <NavbarItem label="My Tasks" routeid="tasks" icon={<NavbarTasksIcon />} />
              <NavbarItem label="My Statistics" routeid="stats" icon={<NavbarStatisticsIcon />} />
              <NavbarItem label="My Classrooms" routeid="classlist" icon={<NavbarClassListIcon />} />
            </>
          }
        > { /** Loads current navbar selected id */}
          {children}
        </Navbar> 

      </Providers>
    </main>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/layout
