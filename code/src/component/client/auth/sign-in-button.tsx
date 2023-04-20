'use client'

import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <button onClick={() => signIn(undefined, {
      callbackUrl: '/app'
    })}>Sign in</button>
  )
}

export default SignInButton;