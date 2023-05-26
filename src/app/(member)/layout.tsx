import { color } from "@/lib/logger/chalk"
import { LayoutProps } from "@/types/next"
import Providers from "./providers"
import { getLoggedInSession } from "@/lib/auth-helper"
import Navbar from "./-Navbar/Navbar"

export default async function AppRouteGroupLayout({ children, params }: LayoutProps) {
  
  color.yellow('  |-(app) Layout Rendered')

  color.magenta('    - getting session server-side')
  const session = await getLoggedInSession()

  return (
    <main className="bg-zinc-900 w-screen h-screen overflow-clip text-slate-20 flex flex-row gap-0 text-slate-200 flex-grow-1">
      <Providers session={session}> {/** Loads sessions, state, and chakraUI context */}
        <Navbar> { /** Loads current navbar selected id */}
          {children}
        </Navbar> 
      </Providers>
    </main>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/layout