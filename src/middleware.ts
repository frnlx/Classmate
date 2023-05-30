import { NextRequest, NextResponse } from "next/server";
import { devlog, verboselog } from "./lib/logger/devlog";

export const HeaderFullPathKey = 'x-full-url-path'

export function middleware(request: NextRequest) {

  // Logger
  request.headers.get('sec-fetch-dest') === 'document' ? verboselog('\n\n------------------Browser Request') : null
  // request.headers.get('sec-fetch-dest') === 'empty' && !request.url.endsWith('webpack.hot-update.json') ? verboselog('\n\n------------------Browser Hot Update') : null
  // if(request.headers.get('sec-fetch-dest') === 'manifest') verboselog('- fetching manifest data...')
  // else if (request.headers.get('sec-fetch-dest') === 'image') verboselog(`- fetching image: ${request.nextUrl.pathname}`)
  // else if (request.headers.get('sec-fetch-dest') === 'font') verboselog(`- fetching bundled fonts`)
  // else if (request.headers.get('sec-fetch-dest') === 'script') verboselog(`- fetching bundled script (JS)`)
  // else if (request.headers.get('sec-fetch-dest') === 'style') verboselog(`- fetching bundled style (CSS)`)
  // else if (request.headers.get('sec-fetch-dest') === 'document') verboselog(`- fetching document`)
  // else if (request.headers.get('sec-fetch-dest') === 'empty') verboselog(`- refetching document (hot update)`)
  // else if (request.url.endsWith('webpack.hot-update.json')) verboselog(`- refetching document (hot update) with web pack json`)
  // else verboselog(request) 

  // Is a route not a file request
  if (!request.url.includes('.')) {
    const headers = new Headers(request.headers);
    headers.set(HeaderFullPathKey, request.url);
    return NextResponse.next({ headers })
  }

}
