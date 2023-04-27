import { signIn } from 'next-auth/react'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import SignInButton from '../../component/client/auth/sign-in-button'
import SignOutButton from '../../component/client/auth/sign-out-button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <div className=''>
        
        <h1>Please Authenticate Yourself</h1>
        <SignInButton />

      </div>
  )
}
