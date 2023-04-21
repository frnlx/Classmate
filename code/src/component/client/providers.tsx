'use client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

type Props = {
  session: Session | null | undefined
  children: React.ReactNode
}

const Providers = (props: Props) => { 

  console.log(props.session)

  return (
    <SessionProvider session={props.session} >
      {props.children}
    </SessionProvider>
  )
}

export default Providers