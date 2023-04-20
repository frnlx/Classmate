import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div className=''>
        <h1>Welcome to Main Page</h1>
        <Link href='/app'>Go to App</Link>
      </div>
    </main>
  )
}
