import { NextRequest, NextResponse } from "next/server";

export const HeaderFullPathKey = 'x-full-url-path'

export function middleware(request: NextRequest) {

  // Is a route not a file request
  if (!request.url.includes('.')) {
    const headers = new Headers(request.headers);
    headers.set(HeaderFullPathKey, request.url);
    return NextResponse.next({ headers })
  }
}
