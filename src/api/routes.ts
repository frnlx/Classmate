import { RouteLookupType, route } from "@/server/lib/route";
import { sectionRoutes } from "./route/section";
import { userRoutes } from "./route/user";
import { classroomRoutes } from "./route/classroom";
import { categoryRoutes } from "./route/category";
import { resourceRoutes } from "./route/resource";

// callback wrapped in route() so that you can have autocomplete in the parameters.
const hello = route((_, res) => res.json({ok: 'ok'}))


// List of all available routes. ALl routes starts with /api/
export const routes: RouteLookupType = {
  'GET:/test': (_, res) => {
    throw 0;
  },
  ...userRoutes,
  ...classroomRoutes,
  ...categoryRoutes,
  ...sectionRoutes,
  ...resourceRoutes,
}


function test() {
  

}

const test2 = () => {

}

test2()