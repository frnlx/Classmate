import { isAuth } from "@/lib/auth-helper"
import { NextResponse } from "next/server"

// Response Generator

export const Res = {

  json:    (data: any) => NextResponse.json(data, { status: 200 }),
  created: (data: any) => NextResponse.json(data, { status: 201 }),
  ok:      () => new NextResponse(undefined, { status: 204 }),

};


export type ResponseGenerator = typeof Res
export type ResponseTypes = Exclude<keyof typeof Res, 'json'>


// Error Handling


export class RouteError extends Error {
  constructor(readonly responseType: ErrorType) { super() }
}

export function notAuthenticated() {
  throw new RouteError('unauthenticated')
}
export function notAuthorized() {
  throw new RouteError('forbidden')
}
export function notFound() {
  throw new RouteError('notfound')
}
export function notImplemented() {
  throw new RouteError('notimplemented')
}
export function badrequest() {
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

