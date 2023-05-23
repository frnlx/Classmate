import './globals.css'
import { Inter, Roboto_Mono  } from 'next/font/google'
import { rootMetadata } from './metadata';

export { rootMetadata as metadata }

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

// Server Component
export default function PageLayout(p: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`} suppressHydrationWarning={true} >
      <body className='bg-zinc-950 font-sans m-0 p-0 box-border' suppressHydrationWarning={true} >
        {p.children}
      </body>
    </html>
  )
}
