import { color } from "@/lib/logger/chalk"
import { LayoutProps } from "@/types/next"
import Providers from "./providers"
import { getLoggedInSession } from "@/lib/auth-helper"
import Navbar, { AppRoom } from "./-Navbar/Navbar"
import { Cards, ChartLine, Clipboard, HouseSimple } from "@phosphor-icons/react"

export default async function AppRouteGroupLayout({ children, params }: LayoutProps) {
  
  color.yellow('  |-(app) Layout Rendered')

  color.magenta('    - getting session server-side')
  const session = await getLoggedInSession()

  return (
    <main className="bg-zinc-900 w-screen h-screen overflow-clip text-slate-20 flex flex-row gap-0 text-slate-200 flex-grow-1">
      <Providers session={session}
      // Loads Sessions
      // Loads React Query
      // Loads ChakraUI Library
      >
        <Navbar
        // Consumes useUserClassList()
        // Provides Current Room Info
        >
          {children}
        </Navbar>
      </Providers>
    </main>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/layout