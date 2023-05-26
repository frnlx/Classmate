import ClientComponentProvider from "@/client/ClientComponentProvider"
import { color } from "@/lib/logger/chalk"
import { LayoutProps } from "@/types/next"

export const metadata = {
}

export default function AuthLayout({ children, params }: LayoutProps) {
  color.yellow('  |-Auth Layout')
  return (
    <ClientComponentProvider>
      {children}
    </ClientComponentProvider>
  )
}

