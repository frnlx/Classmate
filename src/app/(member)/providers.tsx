'use client'
import { ClientComponentProvider, ColorModeScriptClient } from '@/components/Chakra'
import { color } from '@/lib/logger/chalk'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

type Props = {
  session: Session | null | undefined
  children: React.ReactNode
}

const queryClient = new QueryClient()

const Providers = (props: Props) => {
  color.cyan('  |-(app) Provider')
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