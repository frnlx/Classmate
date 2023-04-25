import Providers from '@/component/client/providers'
import config from '@/server/config'
import { getServerSession } from 'next-auth'

export const metadata = {
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(config.auth)

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
