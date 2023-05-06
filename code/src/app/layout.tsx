import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
}

const globalFont = Inter({ subsets: ['latin'] })

export default function PageLayout(p: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={globalFont.className}>{p.children}</body>
    </html>
  )
}
