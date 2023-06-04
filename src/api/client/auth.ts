import { InitialDataFunction, QueryFunction, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

// SessionProvider configuration
export const providerConfig = {
  refetchInterval: 0,          // default: 0
  refetchOnWindowFocus: false, // default: true
  refetchWhenOffline: undefined,    // default: undefined
}

export function useSessionRequired() {
  return useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth')
    }
  })
}

export function useUserid(){
  const userid = useSession().data?.user.id
  if (userid === undefined) throw new Error('This hook needs to be put under <SessionProvider> (session not found!)')
  return userid
}