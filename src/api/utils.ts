import { isAuth } from "@/lib/auth-helper";
import { ResponseTypes } from "@/lib/responses";
import { RouteHandlerParam } from "@/lib/route";
import { redirect } from 'next/navigation'

export class RouteResponse extends Error {
  constructor(readonly responseType: ResponseTypes) { super() }
}

export async function MustBeAuthenticated() {
  const session = await isAuth();
  if (!session) redirect('/auth')
  return session
}
