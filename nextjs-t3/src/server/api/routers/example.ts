import { z } from "zod";

import {
  createRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createRouter({
  // Hello Route (Public Procedure)
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // GetAll Route (Public Procedure)
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  // GetSecretMessage (Protected Procedure)
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
