import { getServerSession } from "next-auth";
import { authOptions } from "../configs/auth";
import { redirect } from 'next/navigation'
import { color } from "./logger/chalk";
import { cache } from "react"

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