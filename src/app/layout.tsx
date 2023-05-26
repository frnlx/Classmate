import '@/client/globals.css'
import { Inter, Roboto_Mono  } from 'next/font/google'
import { rootMetadata } from '@/configs/metadata'
import { color } from '@/lib/logger/chalk'

export const metadata = rootMetadata

// Server Component
export default async function PageLayout(p: {
  children: React.ReactNode,
}) {
  color.yellow('- Root Layout')

  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto_mono.variable}`}
      suppressHydrationWarning={true}
    >
      <body
        className='bg-zinc-950 font-sans m-0 p-0 box-border text-slate-200'
        suppressHydrationWarning={true}
      >
        {p.children}
      </body>
    </html>
  )
}





const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});