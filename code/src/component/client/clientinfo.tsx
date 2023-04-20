'use client'

import { useSession } from "next-auth/react";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import SignOutButton from "./auth/sign-out-button";

const ClientInfo = () => {
  
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return redirect('/app/auth')
    },
  })

  if (session) {

    let timestr = ''
    if (session.expires) {
      TimeAgo.addDefaultLocale(en)
      const timeAgo = new TimeAgo('en-US')
      timestr = timeAgo.format(Date.parse(session.expires))
    }

    return (
      <div>
        <p>✔️Logged In</p>
        <p><span className='text-zinc-400 font-semibold text-sm'>Expires:</span>
          <br />{timestr} ({session.expires}) ({Date.parse(session.expires)})</p>
        <p><span className='text-zinc-400 font-semibold text-sm'>Name:</span>
          <br />{session.user?.name}</p>
        <p><span className='text-zinc-400 font-semibold text-sm'>Email:</span>
          <br />{session.user?.email}</p>
        <p><span className='text-zinc-400 font-semibold text-sm'>Image:</span>
          <br />{session.user?.image}</p>
        <SignOutButton />
      </div>
    )
  }
  else if (!session)
    return <p>❌Not Logged In</p>

  
  
  return <p>No Data</p>

}
 
export default ClientInfo;