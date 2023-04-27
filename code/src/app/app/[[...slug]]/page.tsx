import config from '@/server/config'
import { getServerSession } from 'next-auth'
import MeScreen from '@/app/app/[[...slug]]/meScreen'
import SignOutButton from '@/component/client/auth/sign-out-button'
import ClassScreen from '@/app/app/[[...slug]]/classScreen'
import SlugHandler from './SlugHandler'
import {redirect } from 'next/navigation'
import ClassMemberList from '@/component/app/class/ClassMemberList'
import ClassInviteList from '@/component/app/class/ClassInviteList'

export default async function ClassroomScreen({ params }: { params: { slug: string[] } }) {

  const session = await getServerSession(config.auth)
  
  if (!session) {
    redirect('/auth')
  }

  //Handle Dynamic URL and Metadata Here
  return (
    <SlugHandler slug={params.slug} >
      <MeScreen>
        <h1>This is Me Screen</h1>
        <p>This is Me Screen, for debug only.</p>
        <hr className="border-slate-600 my-4" />
        {/* <h3>Pending Class Invite</h3> */}
        {/* <PendingInviteRequestList /> */}
        <h3>Search for Class</h3>
        <SignOutButton />
      </MeScreen>
      <ClassScreen>
        <h1>This is Class Screen</h1>
        <div>This is server side-rendering</div>
        <h3>Member List</h3>
        <ClassMemberList />
        <h3>Invite Link</h3>
        <ClassInviteList />
      </ClassScreen>
    </SlugHandler>
  );
} 



