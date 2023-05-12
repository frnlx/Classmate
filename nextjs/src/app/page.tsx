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
  )
}
