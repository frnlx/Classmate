import { InitialDataFunction, QueryFunction, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export function useSessionRequired() {
  return useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth')
    }
  })
}