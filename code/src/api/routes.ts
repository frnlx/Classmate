import { RouteLookupType, route } from "@/server/lib/route";
import { userRoutes } from "./route/user";
import { classroomRoutes } from "./route/classroom";
import { categoryRoutes } from "./route/category";
import { sectionRoutes } from "./route/section";

// callback wrapped in route() so that you can have autocomplete in the parameters.
const hello = route((_, res) => res.json({ok: 'ok'}))

// List of all available routes. ALl routes starts with /api/
export const routes: RouteLookupType = {
  'GET:/test': hello,
  ...userRoutes,
  ...classroomRoutes,
  ...categoryRoutes,
  ...sectionRoutes,
}
