'use client'

import { Root } from "@radix-ui/react-tabs";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";
import { useRoom } from "../../-Navbar/Navbar";
import { createReactContext } from "@/lib/react"

const {
  provider: PageContextProvider,
  hook: usePage
} = createReactContext({ currentid: '' })



export default function Pages (p: {
  children?: ReactNode
  defaultTab: string
}) {

  const { currentId } = useRoom();

  const selectedSegment = useSelectedLayoutSegment()
  const router = useRouter();

  const contextValue = { currentid: selectedSegment ?? ''}

  return (
    currentId ?
      <PageContextProvider value={ contextValue }>
        
        <Root
          className='flex flex-grow-1 w-full'
          activationMode="manual"
          orientation="vertical"
          value={ selectedSegment ?? p.defaultTab }
          onValueChange={ (e) => {
            // @ts-ignore
            router.push(`/${currentId}/${e}`)
          } }
          defaultValue={ p.defaultTab }
        >
          { p.children }
        </Root>

      </PageContextProvider>
      : null
  )
}
 
export { usePage }
