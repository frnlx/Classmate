import '@/components/globals.css'
import { Inter, Roboto_Mono  } from 'next/font/google'
import { rootMetadata } from '@/configs/metadata'
import Script from 'next/script'
import EmojiParser from './EmojiParser'

export const metadata = rootMetadata

export default function RootLayout(p: {
  children: React.ReactNode,
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto_mono.variable}`}
      suppressHydrationWarning={true}
    >
      <body
        className='bg-black font-sans m-0 p-0 box-border text-whiter'
        suppressHydrationWarning={true}
        >
        { p.children }
        
      </body>
      <EmojiParser/>

    </html>
  )
}

const inter = Inter({
  subsets: ['latin'],
  display: 'block',
  variable: '--font-inter',
})
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'block',
  variable: '--font-roboto-mono',
});
