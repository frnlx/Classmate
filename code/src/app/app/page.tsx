import config from '@/server/config'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import BaseUI from '../../component/app/AppBaseUI'
import ClassList from '../../component/app/AppClassList'
import ClassUI from '../../component/app/AppClassUI'
import SelectedClassContextProvider from '@/component/app/context/ClassContext'
import MeScreen from '@/component/app/class/meScreen'
import ClassScreen from '@/component/app/class/classScreen'

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
          <MeScreen>
            <h1>{session.user.name}</h1>
            <div>Test</div>
          </MeScreen>
          <ClassScreen>
            <div>This is for class screen</div>
            <div>Todo: member list here</div>
            {/* Todo: Member List */}
          </ClassScreen>
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



