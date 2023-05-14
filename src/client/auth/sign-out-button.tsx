'use client'

import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <Button onClick={() => signOut({
      callbackUrl: '/app/auth'
    })}>Sign out</Button>
  )
}

export default SignOutButton;