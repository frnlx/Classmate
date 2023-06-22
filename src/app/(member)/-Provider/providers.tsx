'use client'
import { providerConfig } from '@/api/client/auth'
import { ClientComponentProvider, ColorModeScriptClient } from '@/components/Chakra'
import { color } from '@/lib/logger/chalk'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'

type Props = {
  session: Session | null | undefined
  children: React.ReactNode
}

// What's the difference?
// const queryClient = new QueryClient()

export default function Providers(props: Props) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }))
  // color.cyan('  |-(app) Provider')
  return (
    <SessionProvider session={ props.session } { ...providerConfig } basePath="/api/auth">
      <QueryClientProvider client={ queryClient }>
        <ClientComponentProvider>
          <ColorModeScriptClient />
          { props.children }
        </ClientComponentProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}