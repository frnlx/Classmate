'use client'

import { Root } from "@radix-ui/react-tabs";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";
import { useRoom } from "../../-Navbar/Navbar";
import { color } from "@/lib/logger/chalk";

// CreateContext & UseContext
// --------------------------
const PageContext = createContext<PageContextType>({
  currentid: ''
})
export const usePage = () => useContext(PageContext)

// Context Component
// -----------------
export default function Pages (p: {
  children?: ReactNode
  defaultTab: string
}) {
  color.cyan('  `- (classid) Pages')
  
  const { currentId } = useRoom();

  const selectedSegment = useSelectedLayoutSegment()
  const router = useRouter();

  // Somehow find the key of the tabs??

  return (
    currentId ? 
    <PageContext.Provider value={{
      currentid: selectedSegment ?? '',
    }}>
      <Root
        className='flex flex-grow-1 w-full'
        activationMode="manual"
        orientation="vertical"
        value={selectedSegment ?? p.defaultTab}
        onValueChange={(e) => {
          // console.log(currentId)
          router.push(`/${currentId}/${e}`)
          // Push route to that page.
        }}
        defaultValue={p.defaultTab}
      >
        {p.children}
      </Root>
    </PageContext.Provider> : null
  );
}
 




export type AppPage = {
  id: string,
}
export type PageContextType = {
  currentid: string,
}