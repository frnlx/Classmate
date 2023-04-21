import { AuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import env from "./env";
import { log } from "../lib/logger";
import { afterLogOut, afterSuccessfullSignIn, checkIfAllowedToSignIn, modifySessionAfterSignIn, jwtManuallyUpdated as sessionManuallyUpdatedFromClient } from "../modules/auth";

const authProviders:Provider[] = [
  GoogleProvider({
    clientId: env('GOOGLE_CLIENT_ID'),
    clientSecret: env('GOOGLE_CLIENT_SECRET')
  })
]

export const auth: AuthOptions = {
  // General Configuration
  providers: authProviders,
  // adapter:
  // secret

  // Authentication Tokens
  session: {
    strategy: 'jwt',
    maxAge: 20,
    updateAge: 5,
  },
  jwt: {},
  
  // Events
  callbacks: {
    // Used to check if user allowed to sign in or not
    async signIn({ user, account, profile, email, credentials }) {
      return checkIfAllowedToSignIn();
    },

    // Tranform data into jwt
    async jwt({ token, user, account, profile, trigger, session }) {

      if (trigger === 'signIn')
        await afterSuccessfullSignIn(token, user, account, profile)
      if (session)
        await sessionManuallyUpdatedFromClient(token, session)
      
      return token // continues to session callback
    },

    // Determines if token will stored in a session
    async session({ session, token }) {

      await modifySessionAfterSignIn(session, token);
      session.user.test = 'asdf';
      session.test = 'asddddff'

      // log('TOKEN ' + JSON.stringify(token, null, 2))
      // log('SESSION ' + JSON.stringify(session, null, 2))

      return session
    },

    async redirect({ baseUrl, url }) {
      return url
    }
  },

  events: {
    async createUser(message) {
      log('AuthOptions.events.createUser: ' + message)
    },
    async linkAccount(message) {
      log('AuthOptions.events.linkAccount: ' + message)
    },
    async session(message) {
      log('AuthOptions.events.session: ' + message)
    },
    async signIn(message) {
      log('AuthOptions.events.signIn: ' + message)
    },
    async signOut(message) {
      await afterLogOut()
      log('AuthOptions.events.signOut: ' + message)
    },
    async updateUser(message) {
      log('AuthOptions.events.updateUser: ' + message)
    },
  },
  debug: false,
  logger: {},

  // Pages
  pages: {},
  theme: {},
}