'use client' // Error components must be Client Components
import { SignOutButton } from "@/components/use-client/Auth"
import { ErrorProps } from "@/types/next"
import { useEffect } from "react"

export default function NewErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>
        { error.message }
        <SignOutButton />
        <button onClick={ () => reset() }>
        </button>
      </h2>
    </div>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/error