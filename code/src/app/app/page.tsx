import ClientInfo from '@/component/client/clientinfo'
import CountriesInfo from '@/component/client/countriesinfo'
import ServerSessionInfo from '@/component/server/serverSession'
import Card from '@/component/ui/card'
import config from '@/server/config'
import { supabase as supabase } from '@/server/config/dbConfig'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import BaseUI from '../../component/app/AppBaseUI'
import ClassList from '../../component/app/AppClassList'
import ClassUI from '../../component/app/AppClassUI'
import SelectedClassContextProvider from '@/component/app/context/ClassContextProvider'

export default async function AppHome() {

  const session = await getServerSession(config.auth)

  if (!session) {
    redirect('/app/auth')
  }
  
  return (
    <BaseUI>
      <SelectedClassContextProvider>
        <ClassList />
        <ClassUI>
            {/* Todo: Member List */}
        </ClassUI>
      </SelectedClassContextProvider>
      {/* <Card>
          <h3>
          List of Classes
          </h3>
          </Card>
          
          <Card>
          <h3>Client Session Info</h3>
          <ClientInfo />
          </Card>
          
          <Card>
          <h3>Supabase (Client): List of Countries</h3>
          <CountriesInfo />
        </Card> */}
    </BaseUI>
  )
}



