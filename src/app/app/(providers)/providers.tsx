'use client'
import ClientComponentProvider, { theme } from '@/component/client/ClientComponentProvider'
import ColorModeScriptClient from '@/component/client/ColorModeScript'
import { ColorModeScript, DarkMode } from '@chakra-ui/react'
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
          <ColorModeScriptClient />
          {props.children}
        </ClientComponentProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default Providers