import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div className=''>
        <h1>App Dashboard</h1>
      </div>
    </main>
  )
}
