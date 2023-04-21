import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module 'next-auth' {
  interface Session {
    test: string
    user: {
      test: string
      // custom data
    } & DefaultSession['user']
  }

  interface User extends DefaultUser{
    
  } 

  interface Account{

  }

  interface Profile {
    
  }
}