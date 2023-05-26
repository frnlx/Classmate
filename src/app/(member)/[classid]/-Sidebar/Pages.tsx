'use client'

import { useClassroomQuery } from "@/api/client/classroom";
import { Tab } from "@headlessui/react";
import { Root } from "@radix-ui/react-tabs";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";

// CreateContext & UseContext
// --------------------------
const PageContext = createContext<PageContextType>({
  currentid: ''
})
export const useRoom = () => useContext(PageContext)

// Context Component
// -----------------
export default function Pages (p: {
  children?: ReactNode
}) {
  
  const { currentid } = useRoom();

  const selectedSegment = useSelectedLayoutSegment()
  const router = useRouter();

  // Somehow find the key of the tabs??

  return (
    <PageContext.Provider value={{
      currentid: selectedSegment ?? '',
    }}>
      <Root
        className='flex flex-grow-1 w-full'
        activationMode="manual"
        orientation="vertical"
        onValueChange={(e) => {
          router.push(`/${currentid}/${e}`)
          // Push route to that page.
        }}
      >
        {p.children}
      </Root>
    </PageContext.Provider>
  );
}
 




export type AppPage = {
  id: string,
}
export type PageContextType = {
  currentid: string,
}