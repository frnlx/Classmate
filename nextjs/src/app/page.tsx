import Image from 'next/image'
import { Open_Sans } from '@next/font/google'
import styles from './page.module.sass'

const font = Open_Sans({ subsets: ['latin'] })

const AppLogo =
  () => <a><Image
    className='app-logo-text'
    src="https://cdn.discordapp.com/attachments/975009736267288627/1077241863389589586/image.png"
    alt="Classmate Logo" width={150} height={39}
  /></a>
const LoginButton = () => <a className='login'>Login</a>

const HeroTagline = () => <h1>Power Up Your Class</h1>
const HeroDescription = () => <p>Classmate upgrades your group chat and equips your class with integrated features and more. 100% free.</p>
const HeroButtonSignUp = () => <a className='signup'>Sign Up</a>

const Preview1_Image =
  () => <Image
    className='app-preview'
    src="https://cdn.discordapp.com/attachments/975009736267288627/1077254273936654486/image.png"
    alt="App Preview" width={644} height={467}
  />

export default function Home() {
  return (
    <main className={'wrapper homepage ' + font.className}>
      <header>
        <div>
          <AppLogo />
          <LoginButton />
        </div>
      </header>
      <section className='hero'>
        <div>
          <HeroTagline />
          <HeroDescription />
          <HeroButtonSignUp />
        </div>
      </section>
      <section className='preview-1'>
        <div>
          <Preview1_Image />
        </div>
      </section>
      <footer>
        <div>
          <p>
            Made with love for our thesis <br/>
            Released under the MIT License.<br/>
            Copyright © 2023-present Alfonsus Ardani, Aileen & Eugene
          </p>
        </div>
      </footer>
    </main>
    // <main className={styles.main}>
    //   <div className={styles.description}>
    //     <p>
    //       Get started by editing&nbsp;
    //       <code className={styles.code}>src/app/page.tsx</code>
    //     </p>
    //     <div>
    //       <a
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{' '}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className={styles.vercelLogo}
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className={styles.center}>
    //     <Image
    //       className={styles.logo}
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //     <div className={styles.thirteen}>
    //       <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
    //     </div>
    //   </div>

    //   <div className={styles.grid}>
    //     <a
    //       href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={inter.className}>
    //         Docs <span>-&gt;</span>
    //       </h2>
    //       <p className={inter.className}>
    //         Find in-depth information about Next.js features and API.
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={inter.className}>
    //         Templates <span>-&gt;</span>
    //       </h2>
    //       <p className={inter.className}>Explore the Next.js 13 playground.</p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={inter.className}>
    //         Deploy <span>-&gt;</span>
    //       </h2>
    //       <p className={inter.className}>
    //         Instantly deploy your Next.js site to a shareable URL with Vercel.
    //       </p>
    //     </a>
    //   </div>
    // </main>
  )
}
