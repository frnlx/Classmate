import { ErrorRes, Res, ResponseGenerator, RouteError } from "@/api/responses";
import { Awaitable } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { RouteParams } from "@/components/lib/client-helper";

export const route = (cb: RouteHandler) => cb


/**
 * Handles the routes to nextjs. One need to call this and export it on a route file (in app folder).
 * This is run everytime nextjs calls the method in the dynamic route
 * It will match requested URLs with the route lookup object passed into the parameters
 * 
 * Todo: support query string
 * Todo: fragment 
 * 
 * @param request 
 * @param params 
 * @returns 
 */
export const routesHandler = (routes: RouteLookupType) => {

  return async (request: NextRequest, { params }: RouteParams) => {

    // Route matching algorithm
    // - does not validate if invalid path... so use carefully.
    // - format (method):(path)
    // example:
    // - 'GET:/user/[userid]'
    // - 'POST:/section/[sectionid]/createResource'
    // anything inside bracket will be passed to the callback.
    for (const route in routes) {

      const iMethod = route.split(':')[0]
      const reqMethod = request.method
      if (iMethod !== reqMethod) continue;

      // 'GET:/user/[userid]/joinClass'
      const iDirs = route.split(':')[1]

      // '/user/[userid]/joinClass' : () => NextResponse
      const iSubDirs = iDirs.split('/').slice(1)
      // ['user', '[userid]', 'joinClass']
      const reqSubDirs = params.slug
      // ['user', '34321213f', 'joinClass]

      // Check length of the directory
      if (iSubDirs.length !== reqSubDirs.length)
        continue;

      const subDirCount = iSubDirs.length
      let nextparams: string[] = [];
      let matching = true;
      for (let i = 0; i < subDirCount; i++) {
        // If matches '[]' then add to temporary slug
        if (iSubDirs[i].match(/\[(.*?)\]/)) {
          nextparams.push(reqSubDirs[i]);

          // If not then it has to match the route structure.
        } else {
          if (reqSubDirs[i] !== iSubDirs[i]) {
            matching = false;
            break;
          }
        }
      }

      // Run the function if matches.
      if (matching) {
        try {

          // Try to fetch data from request if there is any
          let data = undefined;
          try {
            data = await request.json()
          } catch (error) { }

          // Create response generator object
          const response = Res

          // Pass the param and Run the callback
          return await routes[route as `${method}:/${string}`](request, response, nextparams, data)

        } catch (error) {

          console.log(`Error caught on route: ${route} \n Error message:`)
          console.log(error)

          if ( error && error instanceof RouteError)
            return ErrorRes[error.responseType]()


          return ErrorRes.error()
        }
      }
    }

    // Route not found
    return ErrorRes.notfound()
  }
}

// Route Function Type
export type RouteHandler = (
  request: NextRequest,
  response: ResponseGenerator,
  params: string[],
  body?: any
) => Awaitable<Response>

export type RouteHandlerParam = Parameters<RouteHandler>

// Route Lookup Type 
export type RouteLookupType = {
  [key in `${method}:/${string}`]: RouteHandler
}

export type HandlerLookup = {
  [name: string]: RouteHandler
}

// Route Method Type
export type method =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"

// type RouteLookupV2 = t1 | t2

// type t1 = {
//   [key in `${method}:/${string}` | `/${string}`]?: RouteHandler
// }
// type t2 = {
//   [key in `/${string}`]?: RouteLookupV2
// }

// const test: RouteLookupV2 = {
//   'GET:/aasdfasdf': () => { },
//   '/asdf': {
//     'GET:/': () => {}
//   },
// }