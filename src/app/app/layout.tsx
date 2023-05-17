import Providers from '@/app/app/providers'
import NavbarRoot from './(Navbar)/NavbarRoot'
import { useServerSession } from '@/server/lib/auth'

export const metadata = {
}

// Server Component
export default async function AppLayout(p: { children: React.ReactNode, params: any }) {
  
  const session = await useServerSession()

  return (
    <main className="bg-zinc-900 w-screen h-screen overflow-clip text-slate-20 flex flex-row gap-0 text-slate-200 flex-grow-1">
      <Providers session={session}
        // Loads Sessions
        // Loads React Query
        // Loads ChakraUI Library
      >
        <NavbarRoot
          // Consumes useUserClassList()
          // Provides Current Room Info
          // Provides Switch Room
        >
          {p.children}
        </NavbarRoot>
      </Providers>
    </main>
  );
}
