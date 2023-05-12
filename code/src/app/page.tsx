import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className='wrapper homepage bg-zinc-900 text-zinc-50'>
      <header className='p-4'>
        <div className='flex justify-between items-center'>
          <a>
            <Image
              className='app-logo-text'
              src="https://cdn.discordapp.com/attachments/975009736267288627/1077241863389589586/image.png"
              alt="Classmate Logo" width={150} height={39}
            />
          </a>
          <Link href='/app'>Go to App</Link>
        </div>
      </header>
      <section className=''>
        <div className='px-12 py-16 flex justify-center items-center flex-col gap-2'>
          <h1 className='text-7xl tracking-tighter m-0'>Power Up Your Class</h1>
          <p className='mt-0 text-xl opacity-80 text-center'>Classmate upgrades your group chat and equips your class with integrated features and more. 100% free.</p>
          <Link href='/app'>Go to App</Link>
        </div>
      </section>
      <section className='preview-1'>
        <div className='flex justify-center'>
          <Image
            className='shadow-[0px_49px_155px_-68px_#2E4c9A] rounded-lg'
            src="https://cdn.discordapp.com/attachments/975009736267288627/1077254273936654486/image.png"
            alt="App Preview" width={644} height={467}
          />
        </div>
      </section>
      <footer className='mt-24 w-full bg-zinc-950'>
        <div className='p-4 text-center text-sm opacity-80'>
          <p className='font-semibold'>
            Made with love for our thesis <br />
            Released under the MIT License.<br />
            Copyright © 2023-present Alfonsus Ardani, Aileen & Eugene
          </p>
        </div>
      </footer>
    </main>
  );
}
