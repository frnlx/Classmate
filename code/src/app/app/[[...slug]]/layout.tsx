import Background from '@/component/app/AppBaseUI'
import ClassList from '@/component/app/AppClassList'
import ClassUI from '@/component/app/AppClassUI'
import SelectedClassContextProvider from '@/component/app/context/ClassContext'
import LoadUserData from '@/component/app/context/UserDataContext'
import Providers from '@/component/client/providers'
import config from '@/server/config'
import { getServerSession } from 'next-auth'
import { AppRouterContext, GlobalLayoutRouterContext } from 'next/dist/shared/lib/app-router-context'
import { redirect } from 'next/navigation'

export const metadata = {
}

export default async function RootLayout(p: { children: React.ReactNode, params: {slug: string[] } }) {
  
  const slug1 = p.params.slug && p.params.slug[0] ? p.params.slug[0] : undefined;

  return (
    <SelectedClassContextProvider url={slug1} >
      <ClassList />
      <ClassUI>
        {p.children}
      </ClassUI>
    </SelectedClassContextProvider>
  );
}
