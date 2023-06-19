import { color } from "@/lib/logger/chalk";
import { LayoutProps } from "@/types/next";
import Providers from "./-Provider/providers";
import { getCachedSession } from "@/lib/auth";
import Navbar from "./-Navbar/Navbar";
import NavbarItem from "./-Navbar/NavbarItem";
import {
  NavbarClassListIcon,
  NavbarDashboardIcon,
  NavbarStatisticsIcon,
  NavbarTasksIcon,
} from "./-Navbar/NavbarIcons";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getUserData } from "./utils";
import { notFound, redirect } from "next/navigation";

export default async function AppLayout({ children, params }: LayoutProps) {
  // Get Logged in session first
  color.cyan("Get Logged in Session");
  // const session = await getLoggedInSession_redirectIfNotAuth()
  const session = await getCachedSession();

  // PreFetch class list
  color.cyan("Prefetch user classlist");

  const userdata = await getUserData(session.user.id);
  if (!userdata) redirect("/auth");

  // Render after finished fetching classlist and session.
  return (
    <main className="bg-dark0 w-screen h-screen overflow-hidden text-slate-20 flex flex-row gap-0 text-white flex-grow-1">
      <Providers session={session}>
        <Navbar
          defaultRoom={
            <NavbarItem
              label="My Dashboard"
              routeid="dashboard"
              icon={<NavbarDashboardIcon />}
            />
          }
          staticRooms={
            <>
              {/* <NavbarItem label="My Tasks" routeid="tasks" icon={ <NavbarTasksIcon /> } />
            <NavbarItem label="My Statistics" routeid="stats" icon={ <NavbarStatisticsIcon /> } />
            <NavbarItem label="My Classrooms" routeid="classlist" icon={ <NavbarClassListIcon /> } /> */}
            </>
          }
          prefetchedUserData={userdata}
        >
          {children}
        </Navbar>

        <ReactQueryDevtools initialIsOpen={false} />
      </Providers>
    </main>
  );
}
// https://nextjs.org/docs/app/api-reference/file-conventions/layout
