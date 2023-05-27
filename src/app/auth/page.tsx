import { Inter } from 'next/font/google'
import AppBackground from '../../component/static/background'
import { color } from '@/lib/logger/chalk';
import { SignInButton } from '@/component/use-client/Auth';
import { ClientComponentProvider } from '@/component/Chakra';

const inter = Inter({ subsets: ['latin'] })

export default function AuthPage() {
  color.yellow('  ,- Auth Page')
  return (
    <ClientComponentProvider>
    <AppBackground>
      <div className='p-8 rounded-lg bg-zinc-900 max-w-xl flex flex-col items-center gap-6'>
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl'>Welcome Back!</h1>
          <p className='text-zinc-400'>{"We're excited to see you again"}</p>
        </div>

        <SignInButton />

      </div>
      </AppBackground>
    </ClientComponentProvider>
      
  );
}
