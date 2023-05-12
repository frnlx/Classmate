import RoomContextProvider from '@/app/app/(providers)/RoomContext'
import LoadUserDataContext from '@/app/app/(providers)/UserDataContext'
import Providers from '@/app/app/(providers)/providers'
import config from '@/server/config'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Navbar from './(navbar)/Navbar'
import LoadingScreen from './loading'

export const metadata = {
}

export default async function AppLayout(p: { children: React.ReactNode }) {
  
  const session = await getServerSession(config.auth)

  if (!session) {
    redirect('/auth')
  }

  return (
    <main className="bg-zinc-900 w-screen h-screen overflow-clip text-slate-20 flex flex-row gap-0 text-slate-200 flex-grow-1">
      <Providers session={session}>
        <LoadUserDataContext session={session} loading={<LoadingScreen/>}>
          <RoomContextProvider>

            <Navbar />
            {p.children}
            
          </RoomContextProvider>
        </LoadUserDataContext>
      </Providers>
    </main>
  );
}
