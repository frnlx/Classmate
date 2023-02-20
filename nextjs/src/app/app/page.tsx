import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import styled from '@emotion/styled';

const inter = Inter({ subsets: ['latin'] })

const body = styled.div`

`;

export default function Page() {
  return (
    <main>
      Hello
    </main>
  )
}
