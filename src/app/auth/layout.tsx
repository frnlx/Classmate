import ClientComponentProvider from "@/client/ClientComponentProvider"

export const metadata = {
}

export default function AuthLayout(p: { children: React.ReactNode }) {
  return (
    <ClientComponentProvider>
      {p.children}
    </ClientComponentProvider>
  )
}
