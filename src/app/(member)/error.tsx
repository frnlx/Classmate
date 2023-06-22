'use client' // Error components must be Client Components
import { ErrorProps } from "@/types/next"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function NewErrorPage({ error, reset }: ErrorProps) {
  if(error.name === "Unauthorized") redirect('/auth')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>
        <button onClick={ () => reset() }>
        </button>
      </h2>
    </div>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/error