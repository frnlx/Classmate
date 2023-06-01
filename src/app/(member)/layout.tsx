import { color } from "@/lib/logger/chalk"
import { LayoutProps } from "@/types/next"
import Providers from "./providers"
import { getLoggedInSession_redirectIfNotAuth } from "@/lib/auth-helper"
import Navbar from "./-Navbar/Navbar"
import NavbarItem from "./-Navbar/NavbarItem"
import { NavbarClassListIcon, NavbarDashboardIcon, NavbarStatisticsIcon, NavbarTasksIcon } from "./-Navbar/NavbarIcons"
import { sleepInDev } from "@/lib/util"
import { prisma } from "@/lib/db"
import { getUser, getUserClassroomList } from "@/api/caching/prefetch"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default async function AppLayout({ children, params }: LayoutProps) {

  await sleepInDev(2)

  color.yellow('  |-(app) Layout Rendered')
  color.magenta('    - getting session server-side')

  // On await, display the loading.tsx

  // Get Logged in session first
  const session = await getLoggedInSession_redirectIfNotAuth()

  // PreFetch user data including the classlist.
  const classlist = await getUserClassroomList()

  // Render after finished fetching classlist and session.
  return (
    <main className="bg-dark0 w-screen h-screen overflow-clip text-slate-20 flex flex-row gap-0 text-white flex-grow-1">

      <Providers session={ session }>
        
        <Navbar
          defaultRoom={ <NavbarItem label="My Dashboard" routeid="dashboard" icon={<NavbarDashboardIcon />}/> }
          staticRooms={ <>
            <NavbarItem label="My Tasks" routeid="tasks" icon={ <NavbarTasksIcon /> } />
            <NavbarItem label="My Statistics" routeid="stats" icon={ <NavbarStatisticsIcon /> } />
            <NavbarItem label="My Classrooms" routeid="classlist" icon={ <NavbarClassListIcon /> } />
          </> }
          prefetchedClasslist={ classlist }
        >

          {children}
        </Navbar> 
        <ReactQueryDevtools initialIsOpen={ false } />
      </Providers>
    </main>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/layout
