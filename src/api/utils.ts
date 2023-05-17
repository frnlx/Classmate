import { isAuth } from "@/server/lib/auth";
import { ResponseTypes } from "@/server/lib/responses";
import { RouteHandlerParam } from "@/server/lib/route";
import { redirect } from 'next/navigation'

export class RouteResponse extends Error {
  constructor(readonly responseType: ResponseTypes) { super() }
}

export async function MustBeAuthenticated() {
  const session = await isAuth();
  if (!session) redirect('/auth')
  return session
}
