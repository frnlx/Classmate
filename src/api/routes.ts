import { RouteLookupType, route } from "@/lib/route";
import { userRoutes } from "./route/user";
import { classroomRoutes } from "./route/classroom";
import { categoryRoutes } from "./route/category";
import { resourceRoutes } from "./route/resource";
import { rewardRoutes } from "./route/rewards";

// callback wrapped in route() so that you can have autocomplete in the parameters.
const hello = route((_, res) => res.json({ ok: "ok" }));

// List of all available routes. ALl routes starts with /api/
export const routes = {
  "GET:/test": (_, res) => {
    throw 0;
  },

  ...userRoutes,
  ...classroomRoutes,
  ...categoryRoutes,
  ...resourceRoutes,
  ...rewardRoutes,
} satisfies RouteLookupType;
