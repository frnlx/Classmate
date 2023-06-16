import NextAuth, { DefaultSession, DefaultUser, User } from "next-auth";

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
    }
  }

  interface Account{

  }

  interface Profile {
    
  }

  interface JWT {
    sub: string
  }
}