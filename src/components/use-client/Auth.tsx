'use client'
import { Button } from "@chakra-ui/react";
import { Route } from "next"
import { getSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { ConfirmModal } from "./Modal";

export function SignInButton() {
  const [isLoading, setLoading] = useState(false)

  return (
    <Button
      variant='ghost'
      leftIcon={
        // google logo
        <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
          <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
          <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
          <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
        </svg> }
      onClick={ () => {
        setLoading(true)
        signIn("google", {
          callbackUrl: '/dashboard'
        })
      } }
      colorScheme="gray"
      paddingInline={ 14 }
      paddingBlock={ 6 }
      isLoading={ isLoading }
    >Sign in with Google</Button>
  );
}

export function SignOutButton() {
  const [open, setOpen] = useState(false)
  return (
    <ConfirmModal
      title="Sign Out"
      desc="Are you sure you want to sign out?"
      open={ open }
      onChange={ setOpen }
      onConfirm={ () => signOut({ callbackUrl: '/' }) }
    >
      <button
        className="text-whiter bg-alert h-full px-1.5 rounded-md brightness-100 text-xs font-semibold transition-all duration-200 inline-flex items-center justify-center hover:shadow-[0_0_20px_-3px_#ff3333] hover:shadow-alert active:brightness-90]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="#ffffff" viewBox="0 0 256 256"><path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40A8,8,0,0,0,168,88v32H104a8,8,0,0,0,0,16h64v32a8,8,0,0,0,13.66,5.66l40-40A8,8,0,0,0,221.66,122.34Z"></path></svg>
      </button>
    </ConfirmModal>
  )
}

export function LandingPageRedirectIfLoggedIn(p: {
  children: React.ReactNode
}) {
  const router = useRouter()
  useEffect(() => {
    getSession().then(
      (session) => session ? router.push('/dashboard' as Route) : null
    )
  }, [])

  return <>
    { p.children }
  </>
}