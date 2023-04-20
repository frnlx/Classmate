import { AuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import env from "./env";
import { assert } from "console";

const authProviders:Provider[] = [
  GoogleProvider({ clientId: env('GOOGLE_CLIENT_ID'), clientSecret: env('GOOGLE_CLIENT_SECRET') })
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
  callbacks: {
    // Used to check if user allowed to sign in or not
    async signIn(prop) {
      console.log('\n---------------------------------\n[auth.ts] >>> SignIn Callback\n')
      // console.log(prop)
      return true
    },

    // Tranform data into jwt
    async jwt(prop) {
      console.log('\n---------------------------------\n[auth.ts] >>> JWT Callback\n')
      // console.log(prop)
      return prop.token
    },
    async session(prop) {
      console.log('\n---------------------------------\n[auth.ts] >>> Session Callback\n')
      // console.log(prop)
      return prop.session
    },
    async redirect(prop) {
      console.log('\n---------------------------------\n[auth.ts] >>> Redirect Callback\n')
      console.log(prop)
      // if (prop.url.match('/app/auth')) return '/app'
      // if (prop.url.match('/app')) return '/app'
      // else return prop.baseUrl
      return prop.url
    }
  },
  events: {},
  debug: false,
  logger: {},

  // Pages
  pages: {},
  theme: {},
}

