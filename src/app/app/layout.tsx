import LoadUserDataContext from '@/app/app/(Providers)/UserDataContext'
import Providers from '@/app/app/(Providers)/providers'
import NavbarRoot from './(Navbar)/NavbarRoot'
import LoadingScreen from './loading'
import { useServerSession } from '@/server/lib/auth'

export const metadata = {
}

// Server Component
export default async function AppLayout(p: { children: React.ReactNode }) {
  
  const session = await useServerSession()

  return (
    <main className="bg-zinc-900 w-screen h-screen overflow-clip text-slate-20 flex flex-row gap-0 text-slate-200 flex-grow-1">
      <Providers session={session}>
        <LoadUserDataContext session={session} loading={<LoadingScreen/>}>
          <NavbarRoot>
            {p.children}
          </NavbarRoot>
        </LoadUserDataContext>
      </Providers>
    </main>
  );
}
