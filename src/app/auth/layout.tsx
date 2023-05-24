import ClientComponentProvider from "@/client/ClientComponentProvider"
import { LayoutProps } from "nextutil"

export const metadata = {
}

export default function AuthLayout({ children, params }: LayoutProps) {
  return (
    <ClientComponentProvider>
      {children}
    </ClientComponentProvider>
  )
}

