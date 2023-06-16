import { AuthOptions, CallbacksOptions, Session, getServerSession } from "next-auth";
import { authOptions } from "../configs/auth";
import { redirect } from 'next/navigation'
import { color } from "./logger/chalk";
import { cache } from "react"
import { cookies, headers } from "next/headers"
import { AuthHandler } from "next-auth/core"
// @ts-ignore
import { serialize } from "cookie"
import { Cookie } from "next-auth/core/lib/cookie"

export async function getUserId() {
  return (await getLoggedInSession_redirectIfNotAuth()).user.id
}

export async function getLoggedInSession_redirectIfNotAuth() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth')
  return session
}

export async function isAuth() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.id)
      return false;
    return session;
  } catch (error) {
    console.log("Error when getServerSession")
    return false;
  }
}

// export function getCachedSession() {
//   return cache(async ()=> await getLoggedInSession_redirectIfNotAuth() )
// }

export const getCachedSession = cache(
  async () => {
    color.green('Session data fetched fresh')
    return await getLoggedInSession_redirectIfNotAuth()
  }
)




/**
 * 
 */
type GetServerSessionOptions = Partial<Omit<AuthOptions, "callbacks">> & {
  callbacks?: Omit<AuthOptions["callbacks"], "session"> & {
    session?: (...args: Parameters<CallbacksOptions["session"]>) => any
  }
}
export async function getServerActionSession<
  O extends GetServerSessionOptions,
  R = O["callbacks"] extends { session: (...args: any[]) => infer U }
  ? U
  : Session
>(...args: [GetServerSessionOptions]): Promise<R | null> {
  if (!args[0]) throw new Error('Must provide auth options')

  let req, res: any, options: AuthOptions

  options = Object.assign({}, args[0], { providers: [] })
  req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c: any) => [c.name, c.value])
    ),
  }
  res = { getHeader() { }, setCookie() { }, setHeader() { } }

  options.secret ??= process.env.NEXTAUTH_SECRET

  const session = await AuthHandler<Session | {} | string>({
    options,
    req: {
      action: "session",
      method: "GET",
      cookies: req.cookies,
      headers: req.headers,
    },
  })

  const { body, cookies: sessioncookie, status = 200 } = session

  sessioncookie?.forEach((cookie) => setCookie(res, cookie))

  if (body && typeof body !== "string" && Object.keys(body).length) {
    if (status === 200) {
      // @ts-expect-error
      delete body.expires
      return body as R
    }
    throw new Error((body as any).message)
  }
  return null
}

function setCookie(res: any, cookie: Cookie) {
  // Preserve any existing cookies that have already been set in the same session
  let setCookieHeader = res.getHeader("Set-Cookie") ?? []
  // If not an array (i.e. a string with a single cookie) convert it into an array
  if (!Array.isArray(setCookieHeader)) {
    setCookieHeader = [setCookieHeader]
  }
  const { name, value, options } = cookie
  const cookieHeader = serialize(name, value, options)
  setCookieHeader.push(cookieHeader)
  res.setHeader("Set-Cookie", setCookieHeader)
}