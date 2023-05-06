import Link from 'next/link'

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
