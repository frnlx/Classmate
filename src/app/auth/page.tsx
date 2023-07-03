import { Inter } from 'next/font/google'
import AppBackground from '../../components/static/background'
import { color } from '@/lib/logger/chalk';
import { SignInButton } from '@/components/use-client/Auth'
import { ClientComponentProvider } from '@/components/Chakra'
import BrandLogo from '@/components/static/brand/Logo'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function AuthPage() {
  color.yellow('  ,- Auth Page')
  return (
    <ClientComponentProvider>
      <AppBackground>
        <div className='w-full h-14 my-24'>

        </div>
        <div className='rounded-lg bg-zinc-900 flex flex-col items-center overflow-hidden shrink-0'>
          <div className='flex flex-col gap-8 p-8'>

            <div className='flex flex-col items-center'>
              <h1 className='text-2xl'>Welcome Back!</h1>
              <p className='text-zinc-400'>{ "We're excited to see you again" }</p>
            </div>

            <SignInButton />
          </div>

        </div>
        <div className='w-full h-14 my-24 flex flex-col'>
          <Link href='/'>
            <BrandLogo className='h-[50px] w-[190px] mx-auto' />
          </Link>
          <div className='m-auto text-zinc-200/20 text-sm mt-8'>
            {/* Copyright © 2023-present Alfonsus Ardani, Eugene Reginald Patrick, Aileen */ }
          </div>
        </div>
      </AppBackground>
    </ClientComponentProvider>

  );
}
