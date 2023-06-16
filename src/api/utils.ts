import { isAuth } from "@/lib/auth";
import { RouteHandler, RouteHandlerParam } from "@/lib/route"
import { redirect } from 'next/navigation'

export async function membersOnly() {
  const session = await isAuth();
  if (!session) redirect('/auth')
  return session
}

export async function checkAuth<T>(p: T) {
  await membersOnly();
  if (typeof p === 'function')
    return p()
  else
    return p
}

export function memberOnly(p: RouteHandler) {
  return async (...param: RouteHandlerParam) => {
    await membersOnly()
    return p(...param)
  }
}

export function throwIfNull<T>(p?: T, str?: string):T {
  if (!p) throw new Error(str)
  return p
}

export function throwEmpty(str?: string):never {
  throw new Error(str)
}