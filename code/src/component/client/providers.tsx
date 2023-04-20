'use client'
import { Session } from 'next-auth'
import { SessionProvider, getSession } from 'next-auth/react'

type Props = {
  session: Session | null | undefined
  children: React.ReactNode
}

const Providers = (props: Props) => { 

  return (
    <SessionProvider
      session={props.session}
    >
      {props.children}
    </SessionProvider>
  )
}

export default Providers