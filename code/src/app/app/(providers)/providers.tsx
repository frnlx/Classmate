'use client'
import ClientComponentProvider from '@/component/client/ClientComponentProvider'
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

type Props = {
  session: Session | null | undefined
  children: React.ReactNode
}

const queryClient = new QueryClient()

const Providers = (props: Props) => {

  return (
    <SessionProvider session={props.session} >
      <QueryClientProvider client={queryClient}>
        <ClientComponentProvider>
          {props.children}
        </ClientComponentProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default Providers