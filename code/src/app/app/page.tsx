import ClientInfo from '@/component/client/clientinfo'
import CountriesInfo from '@/component/client/countriesinfo'
import Card from '@/component/ui/card'
import config from '@/server/config'
import { supabase as supabase } from '@/server/config/dbConfig'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {

  const session = await getServerSession(config.auth)

  const { data: countries, status } = await supabase.from('countries').select()

  if (!session) {
    redirect('/app/auth')
  }
  
  return (
    <main>
      <div>
        <h1>App Dashboard</h1>

        {/* <Link href='/app/auth'>Authentication</Link> */}

        <Link href='/app/profile'>User Setting</Link>

        {/* <h3>Server Session Info</h3>
        {
          session ? 
            <div>
              <p>✔️Logged In</p>
              <p><span className='text-zinc-400 font-semibold text-sm'>Expires:</span><br/>{ session.expires }</p>
              <p><span className='text-zinc-400 font-semibold text-sm'>Name:</span> <br/>{ session.user?.name }</p>
              <p><span className='text-zinc-400 font-semibold text-sm'>Email:</span> <br/>{ session.user?.email }</p>
              <p><span className='text-zinc-400 font-semibold text-sm'>Image:</span> <br />{session.user?.image}</p>
              <p><span className='text-zinc-400 font-semibold text-sm'>Raw:</span> <br/>{ JSON.stringify(session) }</p>
            </div>
            :  <p>❌ Not Logged In</p>
        } */}

        <Card>
          <h3>Client Session Info</h3>
          <ClientInfo />
        </Card>

        {/* <h3>Supabase (Server): List of Countries</h3>
        {
          countries ? 
            countries.map((country) => (
              <div key={country.id}>{country.name}</div>
            ))
            : null
        } */}
        
        <Card>
          <h3>Supabase (Client): List of Countries</h3>
          <CountriesInfo />
        </Card>

      </div>
    </main>
  )
}



