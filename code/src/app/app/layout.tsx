import RoomContextProvider from '@/app/app/RoomContext'
import LoadUserDataContext from '@/app/app/UserDataContext'
import Providers from '@/app/app/providers'
import config from '@/server/config'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Navbar from './(navbar)/Navbar'

export const metadata = {
}

export default async function RootLayout(p: { children: React.ReactNode }) {
  
  const session = await getServerSession(config.auth)

  if (!session) {
    redirect('/auth')
  }

  return (
    <main className="bg-zinc-900 w-screen h-screen overflow-clip text-slate-20 flex flex-row gap-0 text-slate-200">
      <Providers session={session}>
        <LoadUserDataContext session={session}>
          <RoomContextProvider>

            <Navbar />
            {p.children}
            
          </RoomContextProvider>
        </LoadUserDataContext>
      </Providers>
    </main>
  );
}
