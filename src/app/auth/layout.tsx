import ClientComponentProvider, { theme } from '@/component/client/ClientComponentProvider'
import { ColorModeScript } from '@chakra-ui/react'

export const metadata = {
}

export default function AuthLayout(p: { children: React.ReactNode }) {
  return (
    <ClientComponentProvider>
      {p.children}
    </ClientComponentProvider>
  )
}