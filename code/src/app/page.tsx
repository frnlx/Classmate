import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function LandingPage() {
  return (
    <main>
      <div className='flex flex-col align-top'>
        <h1>Welcome to Landing Page</h1>
        <Link href='/app'>Go to App</Link>
      </div>
    </main>
  )
}
