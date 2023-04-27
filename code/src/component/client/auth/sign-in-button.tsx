'use client'

import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <Button onClick={() => signIn(undefined, {
      callbackUrl: '/app'
    })}>Sign in</Button>
  )
}

export default SignInButton;