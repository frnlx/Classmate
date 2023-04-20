'use client'

import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button onClick={() => signOut({
      callbackUrl: '/app/auth'
    })}>Sign out</button>
  )
}

export default SignOutButton;