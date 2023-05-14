import Button from '@/client/static/button';
import Image from 'next/image'

// Server Component
export default function LandingPage() {
  const emojis = ['⚡', '⚡', '⚡', '🚀', '🚀', '🚀', '🙀', '🎯','🎯','🎯',];
  const emoji =  emojis[Math.floor(Math.random() * emojis.length)];


  return (
    <main className='wrapper homepage bg-zinc-900 text-zinc-50 '>
      <header className='px-4 py-3 sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-sm border-x-0 border-y-0 border-b-zinc-800 border-b border-solid'>
        <div className='container m-auto flex justify-between items-center'>
          <a href='/'>
            <Image
              className='app-logo-text'
              src="https://cdn.discordapp.com/attachments/975009736267288627/1077241863389589586/image.png"
              alt="Classmate Logo" width={135} height={35}
            />
          </a>
          <div className='flex flex-row gap-2'>
            <Button nextjs href='/auth' xs plain>Log in</Button>
            <Button nextjs href='/app' xs>Get Classmate Free</Button>
          </div>
        </div>
      </header>
      <section className='flex flex-col items-center'>
        <div className='px-12 py-24 flex justify-center items-center flex-col gap-2'>
          <h1 className='text-7xl tracking-tighter m-0 mb-2'>{emoji} Power Up Your Class.</h1>
          <p className='mt-0 text-xl text-slate-300 text-center mb-8 w-[32rem]'>Classmate upgrades your group chat and equips your class with integrated features and more. <u className='underline-offset-4'>Join Now</u>.</p>
          <Button nextjs href='/app'><span className='font-semibold'>{`Get Classmate Free ->`}</span></Button>
        </div>
      </section>
      <section className='preview-1'>
        <div className='flex justify-center'>
          <Image
            className='shadow-[0px_-49px_155px_-68px_#2515a1] rounded-3xl outline outline-8 outline-slate-600/25'
            src="https://cdn.discordapp.com/attachments/975009736267288627/1077254273936654486/image.png"
            alt="App Preview" width={644} height={467}
          />
        </div>
      </section>
      <footer className='mt-24 w-full bg-zinc-950'>
        <div className='container m-auto p-12 opacity-80 flex flex-col gap-2'>
          <a href='/'>
            <Image
              className='app-logo-text'
              src="https://cdn.discordapp.com/attachments/975009736267288627/1077241863389589586/image.png"
              alt="Classmate Logo" width={112} height={30}
            />
          </a>
          <p className='text-xs text-slate-400'>
            Made with love for our thesis <br />
            Released under the MIT License.<br />
            Copyright © 2023-present Alfonsus Ardani, Aileen & Eugene
          </p>
        </div>
      </footer>
    </main>
  );
}
