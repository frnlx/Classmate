import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "~/env.mjs";
import { createTRPCContext } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";
// export API handler

export default createNextApiHandler(
  {
    router: appRouter,
    createContext: createTRPCContext,
    onError:
      (() => {
        if(env.NODE_ENV === 'development') 
          return ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
          }
        else 
          return undefined
      })()
  }
);

