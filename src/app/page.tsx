import BrandLogo from '@/components/static/brand/Logo'
import Button from '@/components/static/button'
import { LandingPageRedirectIfLoggedIn } from '@/components/use-client/Auth'
import InteractiveBackground from '@/components/use-client/InteractiveBackground'
import { color } from '@/lib/logger/chalk'
import Image from 'next/image'
import { cookies } from 'next/headers';


// Server Component
export default function LandingPage() {
  color.yellow('  ,- Landing Page')

  const emojis = ['⚡', '⚡', '⚡', '🚀', '🚀', '🚀', '🙀', '🎯', '🎯', '🎯',];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];

  return (
    <>
      <InteractiveBackground />
      <main className='wrapper homepage text-zinc-50'>

        <LandingPageRedirectIfLoggedIn>
          <div className='flex flex-col justify-between h-screen'>
            <header className='px-4 py-3 sticky top-0 z-50 bg-zinc-900/8  0 backdrop-blur-sm border-x-0 border-y-0 border-b-zinc-800 border-b border-solid'>
              <div className='container m-auto flex justify-between items-center'>
                <a href='/'>
                  <BrandLogo className='h-[35px] w-[130px]' />
                </a>
                <div className='flex flex-row gap-2'>
                  <Button nextjs href='/auth' xs plain>Log in</Button>
                  <Button nextjs href='/app' xs>Continue To App</Button>
                </div>
              </div>
            </header>

            <section className='flex flex-col items-center'>
              <div className='px-12 py-44 flex justify-center items-center flex-col gap-2'>
                <h1 className='text-7xl tracking-tighter m-0 mb-2'>{ emoji } Power Up Your Class.</h1>
                <p className='mt-0 text-xl text-slate-300 text-center mb-8 w-[32rem]'>Classmate upgrades your group chat and equips your class with integrated features and more.</p>
                <Button nextjs href='/app'><span className='font-semibold'>{ `Continue To App ->` }</span></Button>
              </div>
            </section>

            {/* <section className='preview-1'>
            <div className='flex justify-center'>
              <Image
                className='rounded-3xl outline outline-8 outline-slate-600/25'
                src="https://cdn.discordapp.com/attachments/975009736267288627/1077254273936654486/image.png"
                alt="App Preview" width={ 644 } height={ 467 }
              />
            </div>
          </section> */}

            <footer className='w-full bg-zinc-950/40 '>
              <div className='container m-auto px-12 py-6 opacity-80 flex flex-col'>
                <a href='/'>
                  <Image
                    className='app-logo-text'
                    src="https://cdn.discordapp.com/attachments/975009736267288627/1077241863389589586/image.png"
                    alt="Classmate Logo" width={ 112 } height={ 30 }
                  />
                </a>
                <p className='text-xs text-slate-400'>
                  Made with love for our thesis <br />
                  Released under the MIT License.<br />
                  {/* Copyright © 2023-present Alfonsus Ardani, Eugene Reginald Patrick, Aileen */ }
                </p>
              </div>
            </footer>
          </div>
        </LandingPageRedirectIfLoggedIn>

      </main>
    </>
  )
}
