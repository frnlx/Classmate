'use client'
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

type Props = {
  session: Session | null | undefined
  children: React.ReactNode
}


const { Modal } = chakraTheme.components
const theme = extendBaseTheme({
  components: { Modal },
})

const Providers = (props: Props) => { 

  return (
    <SessionProvider session={props.session} >
      <ChakraProvider>
        {props.children}
      </ChakraProvider>
    </SessionProvider>
  )
}

export default Providers