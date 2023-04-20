import Providers from '@/component/client/providers'
import { getServerSession } from 'next-auth'

export const metadata = {
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
