import NextAuth, { DefaultSession, DefaultUser, User } from "next-auth";

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
    }
  }

  // interface User{
  //   bio: string
  //   created_at: string
  //   id: string
  //   name: string
  //   pfp: string
  // } 

  interface Account{

  }

  interface Profile {
    
  }

  interface JWT {
    sub: string
  }
}