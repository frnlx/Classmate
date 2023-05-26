import { Inter } from 'next/font/google'
import AppBackground from '../../client/static/background'
import SignInButton from '@/client/auth/sign-in-button';
import { color } from '@/lib/logger/chalk';

const inter = Inter({ subsets: ['latin'] })

export default function AuthPage() {
  color.yellow('  ,- Auth Page')
  return (
    <AppBackground>
      <div className='p-8 rounded-lg bg-zinc-900 max-w-xl flex flex-col items-center gap-6'>
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl'>Welcome Back!</h1>
          <p className='text-zinc-400'>{"We're excited to see you again"}</p>
        </div>

        <SignInButton />

      </div>
    </AppBackground>
  );
}
