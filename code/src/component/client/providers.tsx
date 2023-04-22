'use client'
import { ChakraProvider } from '@chakra-ui/react'
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
      {/* <ChakraProvider> */}
        {props.children}
      {/* </ChakraProvider> */}
    </SessionProvider>
  )
}

export default Providers