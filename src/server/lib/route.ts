import { RouteParams } from "@/component/lib/client-helper";
import { Res, ResponseGenerator } from "@/server/lib/responses";
import { Awaitable } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { RouteResponse } from "@/api/utils";

export type RouteHandler = (request: NextRequest, response: ResponseGenerator, params: string[], body?: any) => Awaitable<NextResponse>
export type RouteHandlerParam = Parameters<RouteHandler>;
export type RouteLookupType = { [key: string]: RouteHandler }

export const route = (cb: RouteHandler) => cb


/**
 * Handles the routes to nextjs. One need to call this and export it on a route file (in app folder).
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
          return (await routes[route])(request, response, nextparams, data)

        } catch (error) {

          if ( error && error instanceof RouteResponse)
            return Res[error.responseType]()

          console.log(`Error caught on route: ${route} \n Error message:`)
          console.log(error)

          return Res.error()
        }
      }
    }

    // Route not found
    return Res.notFound()
  }
}