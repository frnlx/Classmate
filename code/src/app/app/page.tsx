import ClientInfo from '@/component/client/clientinfo'
import config from '@/server/config'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {

  const session = await getServerSession(config.auth)
  
  return (
    <main>
      <div>
        <h1>App Dashboard</h1>

        <Link href='/app/auth'>Authentication</Link>

        <h3>Server Session Info</h3>
        {
          session ? 
            <div>
              <p>✔️Logged In</p>
              <p><span className='text-zinc-400 font-semibold text-sm'>Expires:</span><br/>{ session.expires }</p>
              <p><span className='text-zinc-400 font-semibold text-sm'>Name:</span> <br/>{ session.user?.name }</p>
              <p><span className='text-zinc-400 font-semibold text-sm'>Email:</span> <br/>{ session.user?.email }</p>
              <p><span className='text-zinc-400 font-semibold text-sm'>Image:</span> <br/>{ session.user?.image }</p>
            </div>
            :  <p>❌ Not Logged In</p>
        }

        <h3>Client Session Info</h3>
        <ClientInfo />

      </div>
    </main>
  )
}



