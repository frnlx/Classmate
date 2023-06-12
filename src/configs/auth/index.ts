import { AuthOptions, JWT } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import env from "../../lib/env";
import { checkJWT, udpateJWTfromOAuth, updateJWTfromSessionUpdate } from "./callbacks";
import { color } from "@/lib/logger/chalk";

export const authOptions: AuthOptions = {
  // General Configuration
  providers: [
    GoogleProvider({
      clientId: env('GOOGLE_CLIENT_ID'),
      clientSecret: env('GOOGLE_CLIENT_SECRET'),
    })
  ],

  // Authentication Tokens
  session: {
    strategy: 'jwt',
    // maxAge: 600, // 2592000 // 30 days default
    maxAge: 2592000, // 2592000 // 30 days default
    updateAge: 5,
  },
  jwt: {
    // maxAge: 30 * 24 * 30 * 60 // 30 days default
  },
  
  // Events
  //  source code:  file:\\D:\Project\ThesisAdeKelas\node_modules\next-auth\src\core\routes\callback.ts
  callbacks: {

    /**
     * Use this callback to control if a user is allowed to sign in.
     * Returning true will continue the sign-in flow.
     * Throwing an error or returning a string will stop the flow, and redirect the user.
     *
     * [Documentation](https://next-auth.js.org/configuration/callbacks#sign-in-callback)
     */
    async signIn({ user, account, profile, email, credentials }) {
      // Parameters
      //  [user] - Extracted from OAuth Profile (NextAuth)
      //  [account] - from OAuth
      //  [profile] - from OAuth
      //  [email] - if using Email Provider
      //  [credentials] - if using Email Password Credential
      color.yellow('Begin Authentication Flow --------------')
      // return true to allow all sign ins.
      return true; // default
      // Return false to display a default error message
      // return false

      // Or you can return a URL to redirect to:
      // return '/unauthorized
    },

    // Tranform data into jwt
    /**
     * This callback is called whenever a JSON Web Token is created (i.e. at sign in)
     * or updated (i.e whenever a session is accessed in the client).
     * Its content is forwarded to the `session` callback,
     * where you can control what should be returned to the client.
     * Anything else will be kept from your front-end.
     *
     * The JWT is encrypted by default.
     *
     * [Documentation](https://next-auth.js.org/configuration/callbacks#jwt-callback) |
     * [`session` callback](https://next-auth.js.org/configuration/callbacks#session-callback)
     */
    async jwt({
      token,
      user: extractedUser,
      account: oAuthAccount,
      profile: oAuthProfile,
      trigger,
      session: newSession,
    }) {
      // Parameters
      //  [trigger] - why was the jwt callback invoked
      const fromOAuth = trigger === 'signIn'
      const fromSessionUpdate = trigger === 'update'
      const fromSessionChecking = trigger === undefined

      // When using database sessions, the User (user) object is passed as an argument.
      // When using JWT sessions, the JWT payload (token) is provided instead.

      if (fromOAuth) {
        // JWT callback is run for the first time
        //  [user], [profile], [account] will be present
        //  [token] -> Default JWT: name, email, pic, sub (only partial)
        // const updatedJWT = await udpateJWTfromOAuth( defaultToken, extractedUser, oAuthAccount, oAuthProfile )
        const defaultToken = token;
        const updatedJWT = await udpateJWTfromOAuth(defaultToken, extractedUser, oAuthAccount, oAuthProfile)
        return updatedJWT;
      }
      // if (trigger === 'signUp') {
        // JWT callback is run when a user is created for the first time in the database
        // only if session strategy is set to 'database' and adapter is provided
      // }
      if (fromSessionUpdate) {
        // JWT callback is run when update() from useSession() is called in client.
        // [session] -> will be available noting the updated session.
        const existingToken = token;
        return await updateJWTfromSessionUpdate(existingToken, newSession)
      }
      if (fromSessionChecking) {
        // JWT callback is run for the consequent time
        //  only [token] is provided
        const existingToken = token;
        return await checkJWT(existingToken)
      }
      return token
      // default return token
      // continues to session callback 
    },

    // Determines if token will stored in a session
    // - this will be invoked after jwt()
    /**
     * This callback is called whenever a session is checked.
     * (Eg.: invoking the `/api/session` endpoint, using `useSession` or `getSession`)
     *
     * ⚠ By default, only a subset (email, name, image)
     * of the token is returned for increased security.
     *
     * If you want to make something available you added to the token through the `jwt` callback,
     * you have to explicitly forward it here to make it available to the client.
     *
     * [Documentation](https://next-auth.js.org/configuration/callbacks#session-callback) |
     * [`jwt` callback](https://next-auth.js.org/configuration/callbacks#jwt-callback) |
     * [`useSession`](https://next-auth.js.org/getting-started/client#usesession) |
     * [`getSession`](https://next-auth.js.org/getting-started/client#getsession) |
     *
     */
    async session({
      session: defaultSession,
      token: passedToken,
      newSession,
      trigger,
      user
    }) {
      // [session] contains the default session
      // - user: {name, email, image}, expires: DateISO

      // If session type is DATABASE
      //   [user] will be provided
      //   [newSession] will be provided on session update

      // If session type is JWT
      //   [token] will be provided from the jwt callback

      // If [trigger] is 'update'
      //   Sesion callback is run when update() from useSession() is called in client.
      //   only in database version (not for JWT)
      //   [newSession] -> will be available noting the updated session.

      if (!passedToken.sub) {
        
      }

      const session = defaultSession;
      session.user.id = (passedToken as JWT).sub; //most important
      session.user.name = passedToken.name;

      return session // default return session
    },

    async redirect({ baseUrl, url }) {
      return url
    }
  },

  events: {
    // async createUser(message) {
    //   log('AuthOptions.events.createUser: ' + message)
    // },
    // async linkAccount(message) {
    //   log('AuthOptions.events.linkAccount: ' + message)
    // },
    // async session(message) {
    //   log('AuthOptions.events.session: ' + message)
    // },
    // async signIn(message) {
    //   log('AuthOptions.events.signIn: ' + message)
    // },
    // async signOut(message) {
    //   await afterLogOut()
    //   log('AuthOptions.events.signOut: ' + message)
    // },
    // async updateUser(message) {
    //   log('AuthOptions.events.updateUser: ' + message)
    // },
  },
  debug: false,
  logger: {},

  // Pages
  pages: {

  },
  theme: {},
}