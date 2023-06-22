'use client'

import { Root } from "@radix-ui/react-tabs";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";
import { useRoom } from "../../-Navbar/Navbar";
import { createReactContext } from "@/lib/react"
import { Route } from "next"

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
            router.push(`/${currentId}/${e}` as Route)

            try {
              const str = localStorage.getItem('lastvisitedcategory')
              if(!str) throw 0
              const lastVisitedCategory = JSON.parse(str) as { [key in string]: string }
              lastVisitedCategory[currentId] = e
              localStorage.setItem('lastvisitedcategory', JSON.stringify(lastVisitedCategory))
            } catch (error) {
              localStorage.setItem('lastvisitedcategory', JSON.stringify({ [currentId]: e }))
            }

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
