import { routes } from "@/api/routes"
import { routesHandler } from "@/lib/route"

const handler = routesHandler(routes)
export {
  handler as GET, handler as POST,
  handler as PUT, handler as PATCH,
  handler as DELETE, handler as HEAD,
  handler as OPTIONS,
}
