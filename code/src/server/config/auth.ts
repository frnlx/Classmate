import { AuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import env from "./env";

const authProviders:Provider[] = [
  GoogleProvider({ clientId: env('clientId'), clientSecret: env('clientSecret') })
]

export const auth: AuthOptions = {
  // General Configuration
  providers: authProviders,
  // adapter:
  // secret

  // Authentication Tokens
  session: {
    strategy: 'jwt'
  },
  jwt: {},
  
  // Events
  callbacks: {},
  events: {},
  debug: false,
  logger: {},

  // Pages
  pages: {},
  theme: {},
}

