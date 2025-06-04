import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getUsersRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/users", {
    schema: {
      summary: "Get all users",
      querystring: z.object({
        page: z.coerce.number().int().min(1).default(1),
      }),
      response: {
        200: z.object({
          data: z.array(
            z.object({
              id: z.string().uuid(),
              name: z.string().max(100).nullable(),
              email: z.string().email(),
            })
          )
        }).describe("A list of users")
      }
    }
  }, () => {
    return { data: [] }
  })
}
