import { isAuth } from "@/server/lib/auth";
import { ResponseTypes } from "@/server/lib/responses";
import { RouteHandlerParam } from "@/server/lib/route";

export class RouteResponse extends Error {
  constructor(readonly responseType: ResponseTypes) { super() }
}

// async function mustAuth(...params: RouteHandlerParam) {
//   if (!await isAuth()) Promise.reject()
//   else Promise.resolve(params)
// }



export async function MustBeAuthenticated() {
  const session = await isAuth();
  if (!session) throw new RouteResponse('notAuth')
  return session
}
