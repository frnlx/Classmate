import { RouteParams } from "@/component/lib/client-helper";
import { Res } from "@/server/lib/responses";
import { Awaitable } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

type RouteHandler = (request: NextRequest, params: string[], body?: any) => Awaitable<NextResponse>
type RouteLookupType = { [key: string]: RouteHandler }

let routeLookup: RouteLookupType = {}

/**
 * Handles the routes to nextjs. One need to call this and export it on a route.
 * @param request 
 * @param params 
 * @returns 
 */
export const routeHandler = async (request: NextRequest, { params }: RouteParams) => {

  // Route matching algorithm
  for (const route in routeLookup) {

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

        let data = undefined;
        try {
          let data = await request.json()
        } catch (error) { }
        return (await routeLookup[route])(request, nextparams, data)

      } catch (error) {

        console.log(`Error caught on route: ${route}`)
        console.log(error)

        return Res.error()
      }
    }
  }

  // Route not found
  return Res.notFound()

}

/**
 * Adds Routes to the Lookup so that the handler can lookup incoming requests.
 * @param lookups 
 */
export function routes(lookups: RouteLookupType) {
  // what would happen if existing route exists?
  routeLookup = { ...routeLookup, ...lookups }
}