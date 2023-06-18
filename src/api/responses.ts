import { isAuth } from "@/lib/auth"
import { NextResponse } from "next/server"

// Response Generator

export const Res = {

  json:    <T>(data: T) => NextResponse.json(data, { status: 200 }),
  created: <T>(data: T) => NextResponse.json(data, { status: 201 }),
  ok:      () => new NextResponse(undefined, { status: 204 }),
  send: (data: Blob, filename: string) => new Response(data, { status: 200, headers: {
    "Content-Type": data.type,
    "Content-Disposition": `attachment; filename="${filename}"`
  } })
};


export type ResponseGenerator = typeof Res
export type ResponseTypes = Exclude<keyof typeof Res, 'json'>


// Error Handling


export class RouteError extends Error {
  constructor(readonly responseType: ErrorType) { super() }
}

export function notAuthenticated():never {
  throw new RouteError('unauthenticated')
}
export function notAuthorized(): never {
  throw new RouteError('forbidden')
}
export function notFound(): never {
  throw new RouteError('notfound')
}
export function notImplemented(): never {
  throw new RouteError('notimplemented')
}
export function badrequest(): never {
  throw new RouteError('badrequest')
}

export type ErrorType = keyof typeof ErrorRes

export const ErrorRes = {
  badrequest:      () => new NextResponse(undefined, { status: 400 }),
  unauthenticated: () => new NextResponse(undefined, { status: 401 }),
  forbidden:       () => new NextResponse(undefined, { status: 403 }),
  notfound:        () => new NextResponse(undefined, { status: 404 }),
  error:           () => new NextResponse(undefined, { status: 500 }),
  notimplemented:  () => new NextResponse(undefined, { status: 501 }),
}

