import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { User } from "../lib/models/users";

declare module 'next-auth' {
  interface Session {
    test: string
    user: User
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
}