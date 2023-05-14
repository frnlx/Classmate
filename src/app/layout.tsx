import './globals.css'
import { Inter, Roboto_Mono  } from 'next/font/google'

export const metadata = {

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

// Server Component
export default function PageLayout(p: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body className={`bg-zinc-950 font-sans m-0 p-0 box-border`}>
        {/* <ClientLayout /> */}
        {p.children}
      </body>
    </html>
  )
}
