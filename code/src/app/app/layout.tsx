import Background from '@/component/app/AppBaseUI'
import ClassList from '@/component/app/AppClassList'
import RoomContextProvider from '@/component/app/context/RoomContext'
import LoadUserDataContext from '@/component/app/context/UserDataContext'
import Providers from '@/component/client/providers'
import config from '@/server/config'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata = {
}

export default async function RootLayout(p: { children: React.ReactNode }) {
  
  const session = await getServerSession(config.auth)

  if (!session) {
    redirect('/auth')
  }

  return (
    <Providers session={session}>
      <main>
        <Background>
          <LoadUserDataContext session={session}>
            <RoomContextProvider>
              <ClassList />
              {p.children}
            </RoomContextProvider>
          </LoadUserDataContext>
        </Background>
      </main>
    </Providers>
  );
}
